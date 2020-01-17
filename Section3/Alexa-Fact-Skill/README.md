# Simple Fact Skill Basic

## What You Will Need
* [Amazon Developer Account](http://developer.amazon.com/alexa)
* This sample code

## Setting Up the Demo
If you use Alexa hosted, follow the steps:

1. Create a new Alexa Hosted skill using Node.js
2. Copy paste the file models/en-US.json into the json editor of the interaction model. 
3. Build your interaction model and skill changes.
4. Go to the *Code* tab. Copy paste the index.js into the index.js file already in your hosted environment. (SkillCode > lambda > index.js)
5. Deploy and enjoy!

## Making Your Own Facts

1. Go to the *Build* tab
2. Click *Invocation*. 
3. Change *Skill Invocation Name* to your own name. For instance, "cat facts"
4. *Build Model*
5. Go to the *Code* tab. Find the array, `const data`.
6. Change the strings to your own data set!
7. *Deploy* the code.

## Running the Demo
To start the demo say "Alexa, open space facts" or "Alexa, ask space facts for a fact"
