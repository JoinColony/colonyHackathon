# Competitive Programmers Collective

## Project Description
Competitive Programmers Collective is a Colony that aims to bring together and help programmers grow their problem-solving skills and ranking, and keep track of reputation across the internet. It is a decentralized community made up of programmers and learners.

It integrates [uPort Connect](https://www.uport.me/) which is an easy way to allow users to own their decentralized identity on ethereum, allowing them to sign in across devices with secure management of keys and data.

## Why?
The [Slide Deck](https://slides.com/sidthekidder/cp-collective) presents the vision behind cp-collective, what it can be and what I aim to create.

Most programmers/college students interviewing for CS jobs usually end up practicing competitive programming questions for interview coding rounds. There are various sites that help exist to help you with this - Topcoder, Leetcode, HackerRank etc. BUT all these sites are disconnected and your contest history/ranking - the reputation and respect gained by solving problems previously - are not transferable or owned by you. CP-Collective wishes to change this scenario, and create an ecosystem where you are in control of your points. With the support and combined reputation of the collective community, many companies and hiring recruiters would line up to interview highly-ranked (or rich in $PROG token) members of the colony.

## How? 
Earn your reputation and $PROG by solving problems and competing in contests across various competitive programming sites. Help others earn by evaluating their correct or incorrect submissions. Cash in your reputation while applying for jobs/coding interviews. There is something to gain for everyone, from students to professionals.


#### Installation
- nodejs and npm must be installed on your system
- ganache-cli must be running on localhost:8545
- truffle-pig must be running with deployed colonyJS contracts
- for the above steps, first install this repository: [https://github.com/joinColony/colonyNetwork](https://github.com/joinColony/colonyNetwork)
- add ```"deploy-contracts": "./node_modules/.bin/truffle migrate --compile-all --reset",
    "start-ganache": "ganache-cli -d --gasLimit 7000000 --acctKeys ganache-accounts.json --noVMErrorsOnRPCResponse",
    "start-trufflepig": "trufflepig --ganacheKeyFile ganache-accounts.json"```
    to the `scripts` object in `package.json` of the above repo
- finally run `npm run start-ganache`, `npm run deploy-contracts`, and `npm run start-trufflepig` in different terminals

Now to run the app itself,
- navigate to the root directory of the project and run the following:
- `sudo npm install -g @angular/cli`
- `npm install`
- `node src/initColonyData.js`
- `ng serve`
- open http://localhost:4500
- additionally, see the [demo video](https://www.youtube.com/watch?v=o0ULFONjPlI) for a tour of the functionality

#### Tech Overview

##### ColonyJS APIs Used
- createToken
- createColony
- getColonyClient
- getDomain
- domainCount
- getTask
- taskCount
- getTaskRole
- setTaskRoleUser
- setTaskDueDate (multi-sig)
- createTask
- submitTaskDeliverable
- generateSecret
- submitTaskWorkRating

All API calls (colonyJS + IPFS) can be found in `src/app/data.service.ts`.

##### Seed Data
The `src/initColonyData.js` sets up the 4 colonies and 14 domains. More data can be added by following the same format. The newly created IDs are written to `src/app/generated_constants.js` which is later imported by the angular app to map domain IDs to names.

### Issue
This closes the issue [colonyHackathon#76](https://github.com/JoinColony/colonyHackathon/issues/76)

### Repository
The project code lives at https://github.com/sidthekidder/cp-collective

### Final Commit
The final commit of my project for submission is:
https://github.com/sidthekidder/cp-collective/commit/657294d36142558f9cd5567d75eb7862b8cebd3f

### Team
The project was built with contributions from:

- Siddhartha Sahai (@sidthekidder on GitHub, Twitter)

---

## Additional Materials

I have created a [demo video](https://www.youtube.com/watch?v=o0ULFONjPlI) that walks through the functionality of the cp-collective colony so far. It shows the flow of the decentralized webapp, and how questions are created, solved and evaluated. 

There is a [slide deck](https://slides.com/sidthekidder/cp-collective) that presents the vision behind cp-collective, what it can be and what I aimed to create.

