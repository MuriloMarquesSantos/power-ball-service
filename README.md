# Interview Exercise

Your goal is to extend the functionality of this Node.js service. 

Powerball is a popular US lottery game with draws twice a week.  For the purposes of this exercise, a Powerball lottery "ticket" includes the date of the draw and one or more "picks".  Each "pick" is a set of 5 integers (from `1`-`69`) along with a 6th integer (the _Powerball_, from `1`-`26`).

For example, a pick for the draw on `2017-11-09` might be: 

`02 14 19 21 61` `25`

Your application's API will accept data for a lottery ticket, and respond with whether each pick has won, the prize won per-pick, and the total of all prizes won on the ticket.  It is up to you to design and build this API. 

The Powerball winning numbers change on each "draw date". In order to determine a win or a loss, your application will have to retrieve the Powerball draw dates and winning numbers from the following public URL: 

https://data.ny.gov/resource/d6yy-54nr.json

To calculate the prize, consult the prize matrix image below: 

![](https://raw.githubusercontent.com/neocard-ca/interview/master/powerball_rules.png)


## Exercise Rules

- There is no time limit to this challenge.
- Use your best discretion with the design and requirements, but you can ask questions.
- You must use JavaScript and must extend this code base. 
- There is no need for a UI to solve this problem.
- Follow modern JavaScript and Node best practices and conventions to the best of your ability.
- You are free to add packages, tools or improvements to your project as you see fit.
- We expect you to write the kind of feature you would put into production, including tests and documentation as you see fit.

## Download

To checkout the source, you should clone it from github! 

## Installation

This app requires: 

- A Linux or MacOS Environment *(Windows Untested)*
- Node.js LTS 10.9+

If you do not have node.js installed: 

1. [Install NVM](https://github.com/creationix/nvm#installation)
2. [Install Node 10](https://github.com/creationix/nvm#usage) `nvm install 10.15.3`
3. [Switch to Node 10](https://github.com/creationix/nvm#usage) `nvm use 10.15.3`

## Starting the App

From the checked-out application folder, run: 

`npm install`

This will install dependencies.

`npm start`

You should see output like this: 

```
node index.js
App listening on port 3000
```

You can then hit the default endpoint: 

`http://localhost:3000/`

You should see something like this: 

```json
{
  "messsage": "Hello World"
}
```

To shutdown the server simply send a `^C`.

## Testing

To run the existing (sample) tests simply use: 

`npm test`

You should see output like this: 

```
 Test Suites: 3 passed, 3 total
 Tests:       5 passed, 5 total
 Snapshots:   0 total
 Time:        2.585s
 Ran all test suites. 
```

## Submission

You can submit via Github. If you use a private repository, add user: 

[https://github.com/krisread](https://github.com/krisread)


## Contact

We encourage you to use your best discretion, but also to ask questions and communicate if you need it.  


 
