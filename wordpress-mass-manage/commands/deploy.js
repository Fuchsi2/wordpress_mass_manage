const { execSync } = require("child_process");
const fs = require("fs");
const crypto = require('crypto');
const chalk = require('chalk')

const conf = require('./../wmm-conf.json')

function rand_str(length) {
    return crypto.randomBytes(Math.floor(length / 2)).toString("hex");
}

function find_in_named(named_array, value, replacestr) {
    for (const stack in named_array) {
        if (Object.hasOwnProperty.call(named_array, stack)) {
            const element = named_array[stack];
            if (element.replace(replacestr,"") == value) return true
        }
    }
    return false
}

function deploy(stack_name, stack_subdomain) {
    var subdomain_list = JSON.parse(fs.readFileSync(conf.cwd + "/wordpress/subdomain_list.json",{encoding:'utf-8'}))

    stack_subdomain = stack_subdomain.toLocaleLowerCase()

    if (!stack_subdomain.match(/\w+/)) {
        console.log(chalk.red("Subdomain must only contain Word characters (a-z, A-Z, 0-9, -, _)"))
        return 1
    }
    
    if (find_in_named(subdomain_list, stack_subdomain, "trash_")) {
        console.log(chalk.red("Subdomain does already exist"))
        return 2
    }

    stack_name = stack_name.toLocaleLowerCase()
    var full_stack_name = stack_name + "_" + rand_str(4).padStart(4,"0")
    var stack_dir = conf.cwd + "wordpress/wp_" + full_stack_name
    fs.mkdirSync(stack_dir);
    var mysql_passwd = rand_str(16);
    var template = fs.readFileSync(conf.cwd + "wordpress/docker-compose-template.yml",{encoding:"utf-8"})
        .replace(/<#MYSQL_PASSWORD>/g,mysql_passwd)
        .replace(/<#FULL_STACK_NAME>/g,full_stack_name)
        .replace(/<#TRAEFIK_HOST>/g, stack_subdomain + "." + conf.domain);

    fs.writeFileSync(stack_dir + "/docker-compose.yml",template );

    if ((process.platform == "linux" || process.platform == "darwin")
     && execSync("docker image ls | grep -E 'mysql.*5\.7|wordpress'",{cwd:stack_dir}).toString().split("\n").length < 3) {
        console.log(chalk.cyan("Pulling images..."))
        execSync("docker-compose pull",{cwd:stack_dir})
        console.log(chalk.green("All images pulled"))
    } else if (process.platform == "win32"
     && !execSync("docker image ls | findstr /R \"mysql.*5\.7\"",{cwd:stack_dir}).toString().includes("mysql")
     && !execSync("docker image ls | findstr /R \"wordpress\"",{cwd:stack_dir}).toString().includes("wordpress")) {

        console.log(chalk.cyan("Pulling images..."))
        execSync("docker pull wordpress",{cwd:stack_dir})
        execSync("docker pull mysql:5.7",{cwd:stack_dir})
        console.log(chalk.green("All images pulled"))
    }
    execSync("docker-compose up -d",{cwd:stack_dir});
    console.log("")
    // console.log(stack_subdomain)
    console.log(chalk.green("Deploy successful"))

    // add to subdomain list

    subdomain_list[full_stack_name] = stack_subdomain;

    fs.writeFileSync(conf.cwd + "/wordpress/subdomain_list.json",JSON.stringify(subdomain_list))


    // TODO: auto subdomain registration with cloudflare?
}

module.exports = deploy;
