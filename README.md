# Emergency Dispatching Simulation

Testing and viewing the simulation can be done online at https://eds.tactor.dev/.

### Setting Up
1. `npm install`.

#### Setting up the database
1. Create an account on Neon. In the dashboard, click **Connect**. 
2. Select the correct branch, copy the POOLED and UN_POOLED keys.
3. Copy these into the .env following the example below.


> .env format:
> ```
> DATABASE_URL=<neon-database-pooled>
> DATABASE_URL_UNPOOLEd=<neon-database-unpooled>
> SALT_ROUNDS=<number>
> SESSION_SECRET=<secret>
> ```

#### Initialising:
1. Update the schema: `npx drizzle-kit push --config=db/drizzle.config.ts`.
2. Initialise the contents: `npx tsx ./db/init.ts`.

#### Running:
1. `npm run dev`.


Made by tactordev.
