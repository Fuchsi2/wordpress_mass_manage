const { execSync } = require('child_process')
const fs = require('fs')
const chalk = require('chalk')

const conf = require('./../wmm-conf.json')

function list (options) {
    var subdomain_list = JSON.parse(fs.readFileSync(conf.cwd + "/wordpress/subdomain_list.json",{encoding:'utf-8'}))
    if (options.trash) {
        var stacks_available = fs.readdirSync(conf.cwd + 'wordpress/_trash').filter(dir=>{return dir.startsWith("wp_")})

        console.log("")
        
        if (stacks_available.length == 0) {
            console.log("No stacks in trash:")
        }else {
            console.log("Stacks in trash | Domain")
            for (const stack of stacks_available) {
                var stackdomain = subdomain_list[stack.replace("wp_","")].replace("trash_","") + "." + conf.domain
                console.log(stack + " | " + stackdomain)
            }
            
        }
    }else {
    
        var stacks_available = fs.readdirSync(conf.cwd + 'wordpress').filter(dir=>{return dir.startsWith("wp_")})
        var created_stacks = JSON.parse(execSync("docker-compose ls -a --format json").toString()).filter(stack=>{return stack.Name.startsWith("wp_")})

        var stacks = []

        for (const stack of stacks_available) {
            var created_stack = created_stacks.filter(st=>{return st.Name==stack})[0]
            var status = ""
            var status_type = {
                ok: chalk.green,
                warning: chalk.yellow,
                error: chalk.red,
                critical: chalk.red.bold
            }
            
            if (created_stack != undefined) {
                switch (created_stack.Status) {
                    case "running(2)":
                        status = status_type.ok("up (running)")
                        break;
                    case "exited(1), running(1)":
                        status = status_type.warning("up (partially running)")
                        break;
                    case "running(1), exited(1)": // is this a thing? idk
                        status = status_type.warning("up (partially running)")
                        break;
                    case "exited(2)":
                        status = status_type.error("up (stopped)")
                        break;
                    case undefined:
                        status = status_type.warning("down (created/stopped)")
                        break;
                    default:
                        status = status_type.critical("unknown")
                        break;
                }
            }else {
                status = status_type.warning("down (created/stopped)")
                // console.log(stack)
                // console.log(created_stacks)
                // console.log(created_stack)
            }
            

            stacks.push({name:stack, status: status})
        }

        // console.log(stacks_available)
        // console.log(created_stacks)
        console.log("")
        
        if (stacks.length == 0) {
            console.log("No stacks running")
        }else {
            console.log("Stack name: Status | Domain")

            for (const stack of stacks) {
                var stackdomain = subdomain_list[stack.name.replace("wp_","")] + "." + conf.domain
                console.log(stack.name + ": " + stack.status + " | " + stackdomain)
            }
        }
    }
    
}
module.exports = list