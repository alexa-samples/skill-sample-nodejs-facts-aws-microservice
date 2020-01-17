# Section 2: Use S3 to Store Your Facts

In this section, you will move your data out of the API Gateway lambda and into S3 to decouple the data from your code. You will learn more about cloudformation and IAM roles.

## Step 1: Edit Cloudformation

We need to create some new infrastructure. While we could click in the AWS UI, since we already have a cloudformation template, let's edit this to add our new resources. This way it is easier to share or re-purpose for new tech stacks in the future.

1. Open up template.yml in your choice of text editor or IDE. 
2. Create an S3 resource. Do this by pasting the following under the comment "#Storage/DB":
    ```
      FactBucket:
        Type: AWS::S3::Bucket
        Properties:
            AccessControl: Private
    ```
    This can really go anywhere under "Resources:". Keep in mind indenting matters! This block simply tells cloudformation to create an S3 bucket with a generated name that is private. 
3. Since we want to call to S3 from our lambda, we need to update the IAM policy associated with that. Find the resources named, `LambdaExecutionRole`. Under Properties > Policies > action, add `s3:GetObject` to the list of other policies. 
4. We are almost done, but missing one crucial step. Since the S3 bucket name is generated for us, and we could simply hardcode the name into our function, if we ever need to move this stack elsewhere, the code would start to fail. S3 bucket names must be unique across all regions and accounts. To solve this, we are going to pass in an environment variable to our lambda. In the properties of `APIGatewayServiceLambda`, add the following block:
    ```
          Environment:
            Variables:
              S3BucketName: {Ref: FactBucket}
    ```
    This passes in an environment variable named "S3BucketName" with the value of the S3 bucket. This way we can now code against it (spoiler for step 2).
5. Go back to the Cloudformation console and upload the new template, but this time, click the existing stack and use *Update*
6. Use *Replace current template* and upload the new template with your modifications.
7. Click through like before until you start the template.

After this is complete, you are ready to modify your lambda code!

## Step 2: Modify our Lambda to Call S3

Right now, our data needs a code deployment to be updated -- it is entirely coupled to our codebase. To decouple this, we'll need to store our data object in S3 and fetch it as needed.

1. Open *S3* console.
2. Find and open your bucket. It will be named something like *STACK_NAME-factbucket-########* 
3. Create a local JSON file named `facts.json` and add your facts as a js array. Something like [this file](../Final/Fact-Service/facts.json).
4. Upload your json file to S3 using the *Upload* button. This should not be a public file.
5. Open the *Lambda* console.
6. Add in dependencies at the top to pull in the AWS SDK (included by default in the node.js path for AWS Lambda) and to initialize S3. It looks like this:
    ```javascript
    //Set up AWS Client
    const AWS = require('aws-sdk');
    AWS.config.update(
        {
             region: 'us-east-1'
        }
    );
    const S3 = new AWS.S3();

    const FACTS_KEY = "facts.json";
    ```
    We also added in a constant for the name of our S3 object. 
7. Now we need to make a call to S3. Take the following code which wraps the S3 SDK and does some handling of the response. Put this anywhere outside of the exports.get function:
    ```javascript
    // Uses AWS SDK to get an S3 Object of the given Key.
    function getS3Object(bucketName, key) {
        const params = {
            Bucket: bucketName,
            Key: key
        };
        return new Promise((resolve, reject) => {
            S3.getObject(params,  function(err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred. Let's log it.
                    reject(err);
                }

                const objectData = data.Body.toString();
                resolve(JSON.parse(objectData));
             });
         });
    }
    ```
    This is returning a promise. If an error happens, the reject function gets called, otherwise the object data will be parsed into a js object.
8. Now that we have our helper function, let's use it. Replace your inline data with the following to get the data object from S3:
    ```javascript
    const data = await getS3Object(process.env.S3BucketName, FACTS_KEY);
    ```
9. *Save* your code.
10. *Test*.
11. Try out that curl command again. You should observe the same behavior as before.

You have now completed your own microservice to vend random facts!

Go to the third section to set up a simple Alexa skill and use it to call your service for random facts. [Click here to get started](../Section3)
