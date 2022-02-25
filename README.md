# Marketplace

No-code NFT marketplaces powered.

Tech Stack:

- Typescript
- Apollo GraphQL
- React

## Getting Started

```
$ npm run dev
```

## Release

### Proxy

The active marketplace can be set by starting the ngnix with [default.conf](/templates/default.conf.template) will set the subdomain header based on the current hostname context of the request. The nginx conf relies on envstub provided by the official [nginx image](https://hub.docker.com/_/nginx) on Dockerhub.


| Environment Variable | Description | Production | Development |
| ----------- | ----------- | -------- | ------- |
| HOSTNAME      | The hostname of the proxy. | name.market | localhost |
| PORT   | The listening port of the proxy | PORT | 8081 |
| WEB_PORT | The port of the web server. | 3000 | 8080 |
| WEB_HOST | The host of the web server. | PROXY_HOST | host.docker.internal |

When releasing to production the PORT is assigned by heroku and the PROXY_HOST the heroku provided DNS for the app running the proxy.

For local development run the docker-compose in the project root directory (assumes using Docker for Desktop) and visit `{subdomain}.localhost:8081`.
