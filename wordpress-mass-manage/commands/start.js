const { execSync } = require("child_process");
const fs = require("fs");
const chalk = require('chalk')


function start(stack_name) {

    if (fs.existsSync("./../wordpress/"+stack_name)) {
        execSync("docker-compose up -d",{cwd:"./../wordpress/"+stack_name})
        console.log("")
        console.log(chalk.green("started successfully"))
    }else {
        console.log("")
        console.log(chalk.red("Stack does not exist"))
    }

    
}

module.exports = start;
