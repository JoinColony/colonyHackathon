# Colony Task Importer

## Project Description
[Colony](https://colony.io/) is aiming to be a platform for open organizations, our project is aiming to be the task importer platform for Colony.

For these open organizations, they still need project management tools to help create and edit tasks in Colony, assign workers and evaluators for tasks, make it easy for evaluators to evaluate work and for workers to submit work and all users to claim payouts.

We don't think it's feasible to replace project tasks from existing issue tracking tools like Github issues, Jira or Trello with Colony Tasks directly. The reasons for this is that there can be a lengthy process from tasks are proposed until it's ironed out, estimated and accepted in a sprint. Also, a lot of proposed issues are closed before they ever reach a sprint (duplicate, out of scope, etc.). If this process was to take place on the blockchain / Colony, it could be an expensive (transaction fees), heavily bureaucratic, and ineffective process.

Therefore, we want to propose a solution where we keep using existing tools like GitHub, Jira, Trello, etc. as a filtering/caching layer and only bring the issues that are accepted, suitable specified, adequately discussed and ready to be estimated into the colony as a colony task.

We created a dApp for facilitating the process of creating colony tasks: users can import Github issues directly into existing colony domain as colony tasks, they can also create colony tasks from scratch.

## Project Vision
Our vision for this project is to become the place to view and interact with colonies, colony tasks and colony-related transactions. With our platform, people can easily create tasks in colony, and other people who want to contribute can easily browse and find tasks they want to work on.

After login (see instructions below), the dApp will place you into the "tasks" page where you can create tasks and import them from GitHub. We have future plans to support other task tracking services, as well as adding tools to this dApp. We've been calling it "Colony Portal". Have a look through the various placeholder pages listed on the sidebar, and get an idea of where we want to go with this in the future.

## Project Detail
### Issue
This closes the issue colonyHackathon#[42](https://github.com/JoinColony/colonyHackathon/issues/42)

### Repository
The project code lives at https://github.com/colonyportal/colonyPortal for dApp, and https://github.com/colonyportal/colonyPortalNetwork which includes Colony Network and scripts to set up a test colony and domain for demo purpose.

### Final Commit
The final commit of our project for submission is: `860b81ed1b3bd79f6fd9073039b89f29767a1108`

### Team
The project was built with contributions from:

- Asgeir Sognefest - @sogasg on Github
- Jordan Ellis - @JordanEllis6809 on Github
- Jingyu Zhang - @JingyuZ on Github
- Patrick Q - @patrickqpan on Github

## Run App Locally
### Setup
```
$ git clone https://github.com/colonyportal/colonyPortal
$ cd ./colonyPortal
$ npm install
```

### Running Test Colony and Chain
```
$ npm run create:testColony
```

### Running App In Another Terminal
```
$ npm start
```
Run at http://localhost:3000/, and you can put colony address `0x4479B49eE193E6107Ed2Ad38A9b089Ee362542BA` to explore, which was created from test colony script.

---

## Additional Materials
We created a [demo video](https://www.youtube.com/watch?v=dQw4w9WgXcQ) to help understand the vision and how the parts of our project fit together.
