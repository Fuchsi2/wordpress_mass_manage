# Wordpress_mass_manage (wmm)
 easy mass deployment tool for Wordpress behind traefik


# setup 

## Requirements
- docker or docker desktop
- docker-compose

## setup
### Linux (x86_64)
1. run following command after replacing docker-test.net with your own domain (<your-domain.tld>) `docker run --rm -v $(pwd)/wordpress-mass-manage/:/workspace -e wmm_domain=docker-test.net ghcr.io/fuchsi2/wmm_setup:main`
2. change directory into wordpress-mass-manage `cd wordpress-mass-manage/traefik` 
3. start traefik `docker-compose up -d`
4. move back `cd ..`
5. (Local installation only) add <your-domain.tld>, traefik.<your-domain.tld> and any other sub domain (for wordpress) you want to your hosts file. (keep in mind you have to add every subdomain to it you want to use)
6. executable to use: ./wordpress-mass-manage-linux

### Windows (x86_64)
1. run following command after replacing docker-test.net with your own domain (<your-domain.tld>) `docker run --rm -v &cd&/wordpress-mass-manage/:/workspace -e wmm_domain=docker-test.net ghcr.io/fuchsi2/wmm_setup:main`
2. change directory into wordpress-mass-manage `cd wordpress-mass-manage/traefik` 
3. start traefik `docker-compose up -d`
4. move back `cd ..`
5. (Local installation only) add <your-domain.tld>, traefik.<your-domain.tld> and any other sub domain (for wordpress) you want to your hosts file. (keep in mind you have to add every subdomain to it you want to use)
6. executable to use: ./wordpress-mass-manage-win.exe

### MAC (x86_64)
1. run following command after replacing docker-test.net with your own domain (<your-domain.tld>) `docker run --rm -v $(pwd)/wordpress-mass-manage/:/workspace -e wmm_domain=docker-test.net ghcr.io/fuchsi2/wmm_setup:main`
2. change directory into wordpress-mass-manage `cd wordpress-mass-manage/traefik` 
3. start traefik `docker-compose up -d`
4. move back `cd ..`
5. (Local installation only) add <your-domain.tld>, traefik.<your-domain.tld> and any other sub domain (for wordpress) you want to your hosts file. (keep in mind you have to add every subdomain to it you want to use)
6. executable to use: ./wordpress-mass-manage-macos

## usage

```
Usage: wmm [options] [command]

easily manage wordpress stacks

Options:
  -h, --help                             display help for command

Commands:
  list|ls [options]                      List all the Wordpress Stacks
  deploy <stack_name> <stack_subdomain>  Deploy a new stack
  stop <full_stack_name>                 stop a stack
  start <full_stack_name>                start a stack
  restart <full_stack_name>              restart a stack
  trash <full_stack_name>                move a stack to trash
  untrash <full_stack_name>              restore a stack from trash
  help [command]                         display help for command
```

## aditional
traeffik adminpanel: https://traefik.your.domain

traeffik panel User: admin

raeffik panel Password: admin

change user and password in traefik/data/configurations/dynamic.yml under user-auth > basicAuth > users (generate with https://hostingcanada.org/htpasswd-generator/)

