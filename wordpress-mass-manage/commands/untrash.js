const { execSync } = require("child_process");
const fs = require("fs");
const chalk = require('chalk')


function untrash(stack_name) {

    if (fs.existsSync("./../wordpress/_trash/"+stack_name)) {
        fs.renameSync("./../wordpress/_trash/"+stack_name,"./../wordpress/"+stack_name)
        console.log("")
        console.log(chalk.green("stack successfully restored from trash"))
        
    }else {
        console.log("")
        console.log(chalk.red("Stack does not exist in trash"))
    }

    
}

module.exports = untrash;