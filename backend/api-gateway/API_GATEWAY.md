# API Gateway

The api-gateway service uses Bun with ElysiaJS to re-route all the incoming requests to the target host. Every requests is made to api-gateway where it is authorized/authenticated before re-routing. Once authorized, the request is forwarded to target host available on private network. The response is then returned to the user.

For public routes, such as public GET requests and authentication requests where `userId` is not needed, the api-gateway ignores the JWT based authorization and forwards the request to target host anyway.

## Graphical Representation

Graphical representation of the API Gateway can be described as:

```
Client --> Request --> API Gateway[ Request --> Authorization --> Custom Headers --> Service --> Response ] --> Response --> Client
```

## Get Re-routed

To start api-gateway, you can either start docker container or execute the following command in terminal:

```bash
cd backed/api-gateway
bun run dev
```

This will start api-gateway server at port `3000`

## Configuration

| Name        | Value | Description                                                                            |
| ----------- | ----- | -------------------------------------------------------------------------------------- |
| SERVER PORT | 3000  | When executed through `bun run dev` command, the server listens on default port `3000` |
| DOCKER PORT | 3001  | When executed through Dockerfile, the container maps port `3000` to `3001`             |
