# Section 3: Set up an Alexa Skill

In this section, you will set up an Alexa-Hosted Fact skill. You will learn some basics of Alexa skill building and how to make a REST call from Node.js.

## Step 1: Set up your Alexa-Hosted Fact Skill

[Click here to see the set up instructions for the basic Alexa Hosted Fact Skill](./Alexa-Fact-Skill). All of the code artifacts needed and instructions can be found in the Alexa-Fact-Skill directory.

## Step 2: Write an API call

Now that we have our public API and our basic fact skill up and running, we can now integrate our Alexa Service into our Fact Service to vend the fact.

1. Open *Code* tab in your Alexa skill console. 
2. Let's make a GET client. Create a new file in the lambda folder. You can right click on the lambda directory and select *Create File*. Name this `get_http.js`
3. Drop the following code into this file:
    ```javascript
    const https = require("https");

    module.exports = function (url) {
        return new Promise((resolve, reject) => {
            https.get(url, response => {
                const { statusCode } = response;
                const contentType = response.headers['content-type'];

                let error;
                if (statusCode !== 200) {
                    error = new Error(`Request Failed.\n${statusCode}`);
                } else if (!/^application\/json/.test(contentType)) {
                    error = new Error('Invalid content-type' + 
                        `Expected application/json but got ${contentType}`);
                    
                }

                if (error) {
                    response.resume();
                    reject(error)
                }

                response.setEncoding('utf8');

                let rawData = '';
                response.on('data', chunk => { rawData += chunk });

                response.on('end', () => {
                    resolve(JSON.parse(rawData));
                });

            });
        });
    }
    ```
    This function is simply returning a promise which will fail if there is a non-200 status code or the response is not JSON. Otherwise it will return our random fact string.
4. Now, let's use this code in our index.js. Switch to that file now.
5. Import the get_http client. Add this line to the top of your file. `const httpGet = require('./get_http.js');`
6. Delete the `const data = [...]` object since our datastore is S3.
7. In the `GetNewFactHandler.handle()` method, remove all of the code:
    ```javascript
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
    ```
8. Now, let's use our GET client to make a call to our server and store this in const randomFact. Add the following to your `GetNewFactHandler.handle()` method:
    ```javascript
        const url = "https://pgxrhxwiz2.execute-api.us-east-1.amazonaws.com/staging/fact";
        const randomFact = await httpGet(url);
    ```
    Replace the url and path with the specifics from your hostname and path configuration for your AWS Microservice.
9. *Deploy* the code.
10. Switch to the *Test* tab in the developer console. 
11. Test your skill! Make sure it is giving you random facts.

Congratulations! You are a full stack engineer now! You created a random fact microservice, an Alexa Skill, and hooked them together to create a random fact skill. 

I hope this was a helpful tutorial. Feel free to send feedback on Twitter to @JoeMoCode or @sleepydeveloper. Happy Hacking!
