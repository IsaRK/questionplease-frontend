![](QuestionPleaseTitle.jpg)

![GitHub](https://img.shields.io/github/license/isaRK/questionplease-frontend)
![Azure DevOps builds](https://img.shields.io/azure-devops/build/isabelleriverain/questionplease-frontend/5)
[![Build Status](https://dev.azure.com/isabelleriverain/questionplease-frontend/_apis/build/status/questionplease-frontend%20-%202%20-%20CI?branchName=master)](https://dev.azure.com/isabelleriverain/questionplease-frontend/_build/latest?definitionId=5&branchName=master)
![FirstWebsite](https://img.shields.io/badge/First%20Website-yeah%20!-green)

## QuestionPlease project

A very simple question game, based on [Open Trivia DB questions](https://opentdb.com/)

## Why ?

It is my first website ! I used this simple project to learn and exercise on several tech and frameworks :

- React/Redux
- TypeScript
- Azure Functions in .NET
- Azure CosmosDB
- Azure authentification process (Authorization Code Flow)
- Azure pipelines
- [CSS-in-JS with Material-UI's styling solution](https://material-ui.com/styles/basics/)

## Installation

Clone the repository
Then go to your local repo

    npm install
    npm start

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser.

## Features

2 modes : with and without authentification

![](QuestionPleaseDemo.gif)

### With authentification

SignIn with your Windows account (any Microsoft account - personnal or organizationnal) :

- you'll be asked to choose a login
- the app will keep track of your score between sessions
- your score will be displayed in the leaderboard with your login (only if you are in the top 3 players)
- you'll never have the same question twice unless you choose to Retry the question

### Without authentification

- No login to choose
- Your score will not appear in the leaderboard
- You may have to answers the same question twice (or more)

## API Reference

This website uses Azure functions, written in C# :
[GitRepo of the backend API](https://github.com/IsaRK/questionplease-api)

## How to use?

[Go to game](https://questionplease-frontend.azurewebsites.net/)

## Contribute

New issues are welcome.
Please let me know before contributing !

## Credits

I followed many tutorials to ramp up on React/Redux/Azure frameworks.

I have link some of them in this GitHub Wiki.
I have also detailled some stuff - and pain points - I want to remember.

## License

QuestionPlease is released under the [MIT License](https://opensource.org/licenses/MIT)

MIT © [IsaRK](https://github.com/IsaRK)
