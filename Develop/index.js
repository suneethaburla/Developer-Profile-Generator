const maths = require("./generateHTML.js");
const fs = require("fs");
const axios = require("axios")
const inquirer = require("inquirer");
let data = {};
const questions = [
    {
        type: "input",
        message: "Enter your github username",
        name: "name"
      },
      {
        type: "list",
        message: "what is your favorite color",
        choices: ['green', 'blue', 'pink', 'red'],
        name: "color"
      }
  
];

function writeToFile(fileName, data) {
 
}

function init() {
    inquirer
    .prompt(questions)
    .then(function({ username, color }) {
      const queryUrl = `https://api.github.com/users/${username}`;
      
      axios.get(queryUrl)
      .then((res) => {

        switch(color) {
            case 'green':
                data.color=0;
                break;
                case 'blue':
                data.color=1;
                break
                case 'pink':
                data.color=2;
                break
                case 'red':
                data.color=3;
                break;
                default:
                    console.log("");
        }

                data.username = username;
                data.numOfRepo = res.data.public_repos;
                data.name = res.data.name
                console.log(res.data.name);
                data.followers = res.data.followers;
                console.log(res.data.followers);
                data.following = res.data.following;
                data.portPic = res.data.avatar_url;
                data.location = res.data.location;
                data.blog = res.data.blog; 
                data.company = res.data.company
                data.bio = res.data.bio

        const repoNames = res.data.map(function(repo) {
          return repo.name;
        });
        const repoNamesStr = repoNames.join("\n");
    
        fs.writeFile("repos.txt", repoNamesStr, function(err) {
          if (err) {
            throw err;
          }
    
          console.log(`Saved ${repoNames.length} repos`);
          
        });
      });
    });
}
init();
