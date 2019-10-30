const inquirer = require("inquirer");
// importing ballclock function
const ballClock = require('./clock')

// Use inquirer for user input
function promptUser() {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "Pick a number of balls between 27 and 127",
            validate: function (value) {
                if (isNaN(value) === false && value > 26 && value < 128) {
                    return true;
                }
                console.log(" !!!! Choose a valid number please!!!");
                return false;
                
                
                
            }
        }
    ])
        .then(function (answer) {
            let balls = parseInt(answer.quantity);
            ballClock(balls);
            postFunction();
        });
}
// User chooses to exit program or run function again
function postFunction() {
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Would you like to play again or leave? p or l: ",
        }
    ])
        .then(function (answer) {
            if (answer.choice === "l") {
                console.log("\n Thanks for using my Ball Clock!")
                process.exit();
            }
            if (answer.choice === "p") {
                promptUser();
            }
        });
}
// starts main function on load
promptUser();