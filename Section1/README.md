# Section 1: Set up Basic Infrastructure

In this section, you learn to will use Cloudformation and S3 to set up a serverless microservice which vends a random fact about a topic of your choice. You will populate this with your own set of facts using the Lambda console to edit Node.js code.

## Step 0: Facts?

Since we are making a service to vend facts, take a minute or five to think of what kind of facts you would like to vend with the service. If you do not think of anything, the default is cat facts, and the world probably does not need another cat fact service. 

1. Think of your topic.
2. Find some facts for the topic and write these down. Bonus points if it's in a JSON array. 

## Step 1: Set Up Basic Infrastructure

Most of our infrastructure is modeled using [AWS Cloudformation](https://aws.amazon.com/cloudformation/) in the file, template.yml which uses the [YAML format](https://en.wikipedia.org/wiki/YAML). We are going to run this file in order to create our base set of resources for the stack.

1. Log into [AWS](https://console.aws.amazon.com/console/home).
2. Open [Cloudformation](https://console.aws.amazon.com/cloudformation/home). See: *Services v* in the top left corner and search for *Cloudformation*.
3. Click *Create stack* > *With new resources (standard)*
4. This will bring you to the Create stack page *Specify template* step. 
5. Select *Template is ready* and *Upload a template file*
6. Click the *Choose file* button. Upload the template.yml from [here](./Fact-Service/template.yml).
7. Click *Next*
8. On the *Specify stack details* step, you will need to put in your stack name. Name this something relevant to your service. For example, something like *MyFactStack* will do.
9. There are two *Parameters* defined in this template. *FactType* and *Stage*. *FactType* should be relevant to your fact. *Stage* is mostly used to name resources. So you can have multiple different stacks. For instance, one can be "stable" while the other is "dev". You can keep *Stage* as is.
10. Click *Next*
11. Click *Next* again. Nothing to do in *Configure stack options*
12. Acknowledge all of the checkboxes under Capabilities and transforms. This is simply you authorizing Cloudformation to create resources. 
13. Click *Create stack*.

While we wait for the script to complete, let's look at what this it is doing. You can always refresh under *Events* to see your specific output. This is useful for debugging if anything goes wrong, too.

This script is going to create our Microservice API using API Gateway (and deploy it), a lambda to execute when the API is hit with some starter code, an IAM Role so the lambda can write logs and execute, and a permission to allow our API Gateway to invoke the lambda. In addition, this template creates a log group to write logs to which is named after our lambda. The output (seen under the *Outputs* tab), is the publicly available URL to access our deployment of the API Gateway.

If you would like a visual representation of the pieces and their connection, check out the *Template* tab and click *View in Designer*.

## Step 2: Update your Lambda

First, let's make sure there is code in our lambda and modify that code for our fact.

1. Open [Lambda](https://console.aws.amazon.com/lambda/home). See: *Services v* in the top left corner and search for *Lambda*.
2. Open the lambda titled *FACT_NAME-Vendor-Lambda-STAGE_NAME* by selecting it. 
3. Scroll down to *Function code* and take a look at the node.js code. 
4. Inside, you will see a data array. Change the data in here to your set of facts.
5. *Save* your changes.
6. Time to test! In the header, you will see a *Test* button. Click this.
7. You need to set up some input for your test. Since our lambda does not take input, you can choose any template including the hello world one. Save this as any name you would like. This is a nice feature if you want to save a number of tests for different scenarios for a more complex project.
8. Click *Test* again. Observe your random fact!

If there is an error, the stack trace will be in the *Execution result* block that appears under the lambda name. Also, this appears in your code editor window.

Curious where the starter code came from? Check out the Lambda definition in the template.yml file. It has `Type: AWS::Serverless::Function`. This is grabbing the code from a Zip file to initialize the lambda from a public S3 bucket owned by the Alexa team. On redeploys of your stack, the lambdas are not recreated so your code is preserved. Either way, it is generally a good idea to use source control like git and upload the code to lambda as it is changed!

Once this is working, move on to Step 3 where you will verify the API Gateway.

## Step 3: Calling API Gateway

Now, it is time to make sure our APIGateway is deployed to the internet and is invoking our lambda.

1. Open [API Gateway](https://console.aws.amazon.com/apigateway). See: *Services v* in the top left corner and search for *API Gateway*.
2. Click on your API, *fact-api-staging*.
3. On the left, click *stages*. This will bring up your deployment stages. 
4. The stage name from your template parameter will be shown. In my case, it is called *staging*. Click this.
5. You will see the invoke URL. This is the public HTTPS url. Copy this URL.
6. Since we made this a GET request, let's use a tool locally to verify this. If you are on a *nix system, use curl:

    ```
    curl -X GET https://usc3ya14r5.execute-api.us-east-1.amazonaws.com/staging/
    ```
    Or feel free to use any tool that works for you! Web browsers also work, so you can simply click the link. 
    **Be sure to replace the url above with your own.**
7. Once you are seeing a random fact, you are ready to go to the next section. [Click here](../Section2)
