const { execSync } = require("child_process");
const fs = require("fs");
const chalk = require('chalk')


function stop(stack_name) {

    if (fs.existsSync("./../wordpress/"+stack_name)) {
        execSync("docker-compose down",{cwd:"./../wordpress/"+stack_name})
        console.log("")
        console.log(chalk.green("stopped successfully"))
    }else {
        console.log("")
        console.log(chalk.red("Stack does not exist"))
    }

    
}

module.exports = stop;
