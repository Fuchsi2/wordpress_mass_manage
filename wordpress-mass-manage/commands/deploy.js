const { execSync } = require("child_process");
const fs = require("fs");
const crypto = require('crypto');
const chalk = require('chalk')

function rand_str(length) {
    return crypto.randomBytes(Math.floor(length / 2)).toString("hex");
}

function deploy(stack_name, stack_subdomain) {
    var full_stack_name = stack_name + "_" + rand_str(4).padStart(4,"0")
    var stack_dir = "./../wordpress/wp_" + full_stack_name
    fs.mkdirSync(stack_dir);
    var mysql_passwd = rand_str(16);
    var template = fs.readFileSync("./../wordpress/docker-compose-template.yml",{encoding:"utf-8"})
        .replace(/<#MYSQL_PASSWORD>/g,mysql_passwd)
        .replace(/<#FULL_STACK_NAME>/g,full_stack_name)
        .replace(/<#TRAEFIK_HOST>/g, stack_subdomain+".docker-test.net");

    fs.writeFileSync(stack_dir + "/docker-compose.yml",template )
    execSync("docker-compose up -d",{cwd:stack_dir})
    console.log("")
    // console.log(stack_subdomain)
    console.log(chalk.green("Deploy successful"))

}

module.exports = deploy;
