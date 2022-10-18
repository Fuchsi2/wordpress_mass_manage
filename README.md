# Wordpress_mass_manage (wmm)
 easy mass deployment tool for Wordpress behind traefik


# setup 

1. clone repo
2. start traefik `docker-compose up -d`
3. use wmm
4. (testing only) add docker-test.net, t1.docker-test.net, t2.docker-test.net and traefik.docker-test.net to your hosts file

https://traefik.docker-test.net

User: admin

Password: admin

change in traefik/data/configurations/dynamic.yml under user-auth > basicAuth > users
