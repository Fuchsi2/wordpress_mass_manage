const { execSync } = require("child_process");
const fs = require("fs");
const crypto = require('crypto');
const chalk = require('chalk')

const conf = require('./../wmm-conf.json')

function rand_str(length) {
    return crypto.randomBytes(Math.floor(length / 2)).toString("hex");
}

function deploy(stack_name, stack_subdomain) {
    stack_subdomain = stack_subdomain.toLocaleLowerCase()
    stack_name = stack_name.toLocaleLowerCase()
    var full_stack_name = stack_name + "_" + rand_str(4).padStart(4,"0")
    var stack_dir = conf.cwd + "wordpress/wp_" + full_stack_name
    fs.mkdirSync(stack_dir);
    var mysql_passwd = rand_str(16);
    var template = fs.readFileSync(conf.cwd + "wordpress/docker-compose-template.yml",{encoding:"utf-8"})
        .replace(/<#MYSQL_PASSWORD>/g,mysql_passwd)
        .replace(/<#FULL_STACK_NAME>/g,full_stack_name)
        .replace(/<#TRAEFIK_HOST>/g, stack_subdomain + "." + conf.domain);

    if (process.platform == "linux" || process.platform == "darwin"
     && !execSync("docker image ls | grep -E 'mysql.*5\.7|wordpress'",{cwd:stack_dir}).toString().split("\n").length < 2) {
        console.log(chalk.cyan("Pulling images..."))
        execSync("docker-compose pull'",{cwd:stack_dir})
        console.log(chalk.green("All images pulled"))
    } else if (process.platform == "win32"
     && !execSync("docker image ls | findstr /R \"mysql.*5\.7\"",{cwd:stack_dir}).toString().includes("mysql")
     && !execSync("docker image ls | findstr /R \"wordpress\"",{cwd:stack_dir}).toString().includes("wordpress")) {

        console.log(chalk.cyan("Pulling images..."))
        execSync("docker pull wordpress",{cwd:stack_dir})
        execSync("docker pull mysql:5.7",{cwd:stack_dir})
        console.log(chalk.green("All images pulled"))
    }

    fs.writeFileSync(stack_dir + "/docker-compose.yml",template )
    execSync("docker-compose up -d",{cwd:stack_dir})
    console.log("")
    // console.log(stack_subdomain)
    console.log(chalk.green("Deploy successful"))

}

module.exports = deploy;
