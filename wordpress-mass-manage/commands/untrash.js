const { execSync } = require("child_process");
const fs = require("fs");
const chalk = require('chalk')

const conf = require('./../wmm-conf.json')

function untrash(stack_name) {

    if (fs.existsSync(conf.cwd + "wordpress/_trash/"+stack_name)) {
        fs.renameSync(conf.cwd + "wordpress/_trash/"+stack_name,conf.cwd + "wordpress/"+stack_name)

        // add to subdomain list
        var subdomain_list = JSON.parse(fs.readFileSync(conf.cwd + "/wordpress/subdomain_list.json",{encoding:'utf-8'}))

        subdomain_list[stack_name.replace("wp_","")] = subdomain_list[stack_name.replace("wp_","")].replace("trash_","")

        fs.writeFileSync(conf.cwd + "/wordpress/subdomain_list.json",JSON.stringify(subdomain_list))

        console.log("")
        console.log(chalk.green("stack successfully restored from trash"))
        
    }else {
        console.log("")
        console.log(chalk.red("Stack does not exist in trash"))
    }

    
}

module.exports = untrash;