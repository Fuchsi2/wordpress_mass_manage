const { execSync } = require("child_process");
const fs = require("fs");
const chalk = require('chalk')

const conf = require('./../wmm-conf.json')

function trash(stack_name) {

    if (fs.existsSync(conf.cwd + "wordpress/"+stack_name)) {
        var created_stacks = JSON.parse(execSync("docker-compose ls -a --format json").toString()).filter(stack=>{return stack.Name.startsWith("wp_")})
        var created_stack = created_stacks.filter(st=>{return st.Name==stack_name})[0]
        if (created_stack == undefined) {
            fs.renameSync(conf.cwd + "wordpress/"+stack_name, conf.cwd + "wordpress/_trash/" + stack_name)

            // remove from subdomain list
            var subdomain_list = JSON.parse(fs.readFileSync(conf.cwd + "/wordpress/subdomain_list.json",{encoding:'utf-8'}))

            subdomain_list[stack_name.replace("wp_","")] =  "trash_" + subdomain_list[stack_name.replace("wp_","")];

            fs.writeFileSync(conf.cwd + "/wordpress/subdomain_list.json",JSON.stringify(subdomain_list))


            console.log("")
            console.log(chalk.green("stack successfully moved to trash"))
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