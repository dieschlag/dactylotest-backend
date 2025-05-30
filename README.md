# Dactylotest Backend

Backend of Dactylotest, a web app allowing a user to test its writing speed on a keyboard.

## Running the server

Install the depedencies:

```bash
pnpm i
```

Apply the migrations and generate the client:

```bash
npx prisma migrate dev && npx prisma generate
```

Run the server:

```bash
pnpm run dev
```

## Scope for the backend

- have a secure login and register system
- have a role system integrated into the app
- make a proper documentation of the backend using Swagger
- deploy the project via a CI/CD
- use best practices of technologies used
