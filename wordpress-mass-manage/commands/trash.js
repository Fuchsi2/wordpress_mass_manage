const { execSync } = require("child_process");
const fs = require("fs");
const chalk = require('chalk')


function trash(stack_name) {

    if (fs.existsSync("./../wordpress/"+stack_name)) {
        // execSync("docker-compose down",{cwd:"./../wordpress/"+stack_name})
        var created_stacks = JSON.parse(execSync("docker-compose ls -a --format json").toString()).filter(stack=>{return stack.Name.startsWith("wp_")})
        var created_stack = created_stacks.filter(st=>{return st.Name==stack_name})[0]
        if (created_stack == undefined) {
            fs.renameSync("./../wordpress/"+stack_name,"./../wordpress/_trash/"+stack_name)
            console.log("")
            console.log(chalk.green("successfully moved to trash"))
        }else {
            console.log("")
            console.log(chalk.red("stack is not \"down (created/stopped)\""))
        }
        
    }else {
        console.log("")
        console.log(chalk.red("Stack does not exist"))
    }

    
}

module.exports = trash;