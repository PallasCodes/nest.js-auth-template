# Nest.js Authentication + Swagger template

The purpose of this template is to provide you with a ready to use Nest.js project with a basic authentication system and Swagger integration so you can focus on developing your back-end application.

This template uses Passport.js with the JWT Strategy.

## Prerequisites

You should already have installed

1. Docker
2. Node.js
3. Nest.js CLI
4. Yarn

## Setup

1. Duplicate the ".template.env" file and rename it to just ".env"
2. Replace the data with your own configuration
3. Open the project on your terminal and install all dependencies

```
yarn
```

## Running the project

1. Open the project on your terminal and run the "docker-compose" file

```bash
docker-compose up -d
```

2. Run the project with yarn

```bash
yarn start:dev
```

## Using the authentication system

### Protecting routes

Import the "Auth" decorator and add it on the route you want to add authentication.

```typescript
import { Auth } from 'src/auth/decorators'

@Auth()
@Post()
createProduct(@Body() createProductDto: CreateProductDto) {
  return this.productService.createProduct(createProductDto)
}
```

### Using the user roles system

Import the "ValidRoles" interface and add the allowed roles on the route.

```typescript
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'

@Auth(ValidRoles.admin)
@Post()
createProduct(@Body() createProductDto: CreateProductDto) {
  return this.productService.createProduct(createProductDto)
}
```

### Getting the authenticated user on the request

Import the "GetUser" decorator and add it within the route's request method decorator. You'll need to add the "Authentication" decorator too.

```typescript
import { Auth } from 'src/auth/decorators'
import { GetUser } from '../auth/decorators'

@Auth()
@Post( @GetUser() user: User)
createProduct(@Body() createProductDto: CreateProductDto) {
  return this.productService.createProduct(createProductDto)
}
```

## Documenting your API with Swagger

Check the Nest.js official documentation. Here's a [link](https://docs.nestjs.com/openapi/introduction).
