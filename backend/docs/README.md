```bash
CREATE database orders_db;
CREATE USER cygen WITH PASSWORD 'PASS_HERE';
GRANT ALL PRIVILEGES ON DATABASE orders_db TO cygen;
GRANT USAGE ON SCHEMA public TO cygen;
ALTER USER cygen CREATEDB;

GRANT ALL ON SCHEMA public TO cygen;

\c orders_db
-- Grant privileges to cygen user as well
GRANT USAGE, CREATE ON SCHEMA public TO cygen;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cygen;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cygen;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cygen;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cygen;
```

```bash
# Open Prisma Studio to view your database
npx prisma studio
```



# Create user module, service, and controller

```bash
nest generate resource orders


npx prisma migrate dev --name init 
npx prisma generate
```