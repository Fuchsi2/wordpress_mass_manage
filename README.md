# Wordpress_mass_manage (wmm)
 easy mass deployment tool for Wordpress behind traefik


# Setup 

## Requirements
- docker or docker desktop
- docker-compose

## Linux (x86_64) / MAC (x86_64)
1. run following command after replacing docker-test.net with your own domain (<your-domain.tld>) 
```bash
docker run --rm -v $(pwd)/wordpress-mass-manage/:/workspace -e wmm_domain=docker-test.net ghcr.io/fuchsi2/wmm_setup:main
```
2. change directory into wordpress-mass-manage 
```bash
cd wordpress-mass-manage/traefik
```
3. (Public installation only, OPTIONAL) Uncomment the following lines to generate SSL-Certificates:

`wordpress-mass-manage/wordpress/docker-compose-template.yml`:
```
#- "traefik.http.routers.<#FULL_STACK_NAME>-secure.tls=true"
#- "traefik.http.routers.<#FULL_STACK_NAME>-secure.tls.certresolver=letsencrypt"
```
`wordpress-mass-manage/traefik/docker-compose.yml`:
```
#- "traefik.http.routers.traefik-secure.tls=true"
#- "traefik.http.routers.traefik-secure.tls.certresolver=letsencrypt"
```
4. start traefik 
```bash
docker-compose up -d
```
5. move back 
```bash
cd ..
```
6. (Local installation only) add <your-domain.tld>, traefik.<your-domain.tld> and any other sub domain (for wordpress) you want to use to the bottom of the hosts file  (run `nano /etc/hosts` as admin). (keep in mind you have to add every subdomain to it you want to use)
 ```
 127.0.0.1 <your-domain.tld>
 127.0.0.1 traefik.<your-domain.tld>
 127.0.0.1 <wordpress-subdomain>.<your-domain.tld> #(for example testing1.docker-test.net) repeat this for all subdomains
 ```
 `CTRL / STRG + X` then `y` then `ENTER` to exit
7. executable to use: ./wordpress-mass-manage-linux

## Windows (x86_64)
1. run following command after replacing docker-test.net with your own domain (<your-domain.tld>) 
```bash
docker run --rm -v &cd&/wordpress-mass-manage/:/workspace -e wmm_domain=docker-test.net ghcr.io/fuchsi2/wmm_setup:main
```
2. change directory into wordpress-mass-manage 
```bash
cd wordpress-mass-manage/traefik
``` 
3. (Public installation only, OPTIONAL) Uncomment the following lines to generate SSL-Certificates:

`wordpress-mass-manage/wordpress/docker-compose-template.yml`:
```
#- "traefik.http.routers.<#FULL_STACK_NAME>-secure.tls=true"
#- "traefik.http.routers.<#FULL_STACK_NAME>-secure.tls.certresolver=letsencrypt"
```
`wordpress-mass-manage/traefik/docker-compose.yml`:
```
#- "traefik.http.routers.traefik-secure.tls=true"
#- "traefik.http.routers.traefik-secure.tls.certresolver=letsencrypt"
```
4. start traefik 
```bash
docker-compose up -d
```
5. move back 
```bash
cd ..
```
6. (Local installation only) add <your-domain.tld>, traefik.<your-domain.tld> and any other sub domain (for wordpress) you want to use to the bottom of the hosts file  (run `notepad %windir%\system32\drivers\etc\hosts` as admin). (keep in mind you have to add every subdomain to it you want to use)
 ```
 127.0.0.1 <your-domain.tld>
 127.0.0.1 traefik.<your-domain.tld>
 127.0.0.1 <wordpress-subdomain>.<your-domain.tld> #(for example testing1.docker-test.net) repeat this for all subdomains
 ```
7. executable to use: wordpress-mass-manage-win.exe

# updating the setup
```bash
docker pull ghcr.io/fuchsi2/wmm_setup:main
```
## update everything
Follow step 1 of the setup

## only update the executable
### Linux (x86_64) / MAC (x86_64)
1. run following command after replacing docker-test.net with your own domain (<your-domain.tld>) 
```bash
docker run --rm -v $(pwd):/workspace -e wmm_domain=docker-test.net ghcr.io/fuchsi2/wmm_setup:main -x
```

### Windows (x86_64)
1. run following command after replacing docker-test.net with your own domain (<your-domain.tld>) 
```bash
docker run --rm -v &cd&/wordpress-mass-manage/:/workspace -e wmm_domain=docker-test.net ghcr.io/fuchsi2/wmm_setup:main -x
```

# usage

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

traeffik panel Password: admin

change user and password in `traefik/data/configurations/dynamic.yml` under user-auth > basicAuth > users (generate with `https://hostingcanada.org/htpasswd-generator/` (use Bcrypt mode))
