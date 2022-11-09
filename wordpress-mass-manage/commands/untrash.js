const { execSync } = require("child_process");
const fs = require("fs");
const chalk = require('chalk')

const conf = require('./../wmm-conf.json')

function untrash(stack_name) {

    if (fs.existsSync(conf.cwd + "wordpress/_trash/"+stack_name)) {
        fs.renameSync(conf.cwd + "wordpress/_trash/"+stack_name,conf.cwd + "wordpress/"+stack_name)
        console.log("")
        console.log(chalk.green("stack successfully restored from trash"))
        
    }else {
        console.log("")
        console.log(chalk.red("Stack does not exist in trash"))
    }

    
}

module.exports = untrash;