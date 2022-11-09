const { execSync } = require("child_process");
const fs = require("fs");
const chalk = require('chalk')

const conf = require('./../wmm-conf.json')

function stop(stack_name) {

    if (fs.existsSync(conf.cwd + "wordpress/"+stack_name)) {
        execSync("docker-compose down",{cwd: conf.cwd + "wordpress/"+stack_name})
        console.log("")
        console.log(chalk.green("stopped successfully"))
    }else {
        console.log("")
        console.log(chalk.red("Stack does not exist"))
    }

    
}

module.exports = stop;
