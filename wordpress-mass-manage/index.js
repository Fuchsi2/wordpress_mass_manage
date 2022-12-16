const { program } = require('commander')


const list = require('./commands/list')
const deploy = require('./commands/deploy')
const stop = require('./commands/stop')
const start = require('./commands/start')
const trash = require('./commands/trash')
const untrash = require('./commands/untrash')

program
    .name('wmm')
    .description('easily manage wordpress stacks')

program
    .command('list')
    .alias('ls')
    .description('List all the Wordpress Stacks')
    .option('-t, --trash')
    .action(list);

program
    .command('deploy <stack_name> <stack_subdomain>')
    .description('Deploy a new stack')
    .action(deploy);

program
    .command('stop <full_stack_name>')
    .description('stop a stack')
    .action(stop);

program
    .command('start <full_stack_name>')
    .description('start a stack')
    .action(start);

program
    .command('restart <full_stack_name>')
    .description('restart a stack')
    .action(full_stack_name=> {
        stop(full_stack_name)
        start(full_stack_name)
    });

program
    .command('trash <full_stack_name>')
    .description('move a stack to trash')
    .action(trash);

program
    .command('untrash <full_stack_name>')
    .description('restore a stack from trash')
    .action(untrash);

// program
//     .command('conf')
//     .description('debug')
//     .action(()=> {
//         const conf = require('./wmm-conf.json')
//         console.log(JSON.stringify(conf))
//     })

program.parse()