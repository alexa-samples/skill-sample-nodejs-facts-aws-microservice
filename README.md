# Call an AWS Serverless Service from an Alexa Skill
This is a basic AWS serverless service example. It uses Lambda, APIG, and S3 to create a fact-vending service. In step 3, you will create an Alexa-Hosted Fact skill and call your REST service from there. Going through this tutorial should be within the free tier limits of these services. You can use this example as a starting point for other serverless services and for calling REST APIs from an Alexa skill.

# License

This library is licensed under the Amazon Software License.

# Setup Instructions

Each subfolder (Section 1-3) has the starting code for that section if you want to jump ahead. If you are looking for the end result, See: [Final].

## Prerequisites

1. You will need an [AWS Developer Account](https://aws.amazon.com/free/).
2. You will need an [Amazon Developer Account for the Alexa portion](https://developer.amazon.com/).

## Table of Contents

* [Section 1: Setup up Basic Infrastructure](./Section1/README.md)
* [Section 2: Use S3 to Store Your Facts](./Section2/README.md)
* [Section 3: Set up an Alexa Skill](./Section3/README.md)

## Section 1: Set up Basic Infrastructure

In this section, you learn to will use Cloudformation and S3 to set up a serverless microservice which vends a random fact about a topic of your choice. You will populate this with your own set of facts using the Lambda console to edit Node.js code.

## Section 2: Use S3 to Store Your Facts

In this section, you will move your data out of the API Gateway lambda and into S3 to decouple the data from your code. You will learn more about cloudformation and IAM roles.

## Section 3: Set up an Alexa Skill

In this section, you will set up an Alexa-Hosted Fact skill. You will learn some basics of Alexa skill building and how to make a REST call from Node.js.

[Get Started](./Section1/README.md)