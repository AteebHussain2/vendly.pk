-- -- 1. Create the Store Database
-- -- Note: 'user_db' is created automatically by the POSTGRES_DB env var
-- SELECT 'CREATE DATABASE store_db'
-- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'store_db')\gexec

-- -- 2. Connect to the new database and ensure the user has permissions
-- \c store_db;
-- GRANT ALL PRIVILEGES ON SCHEMA public TO vendly;

-- -- 3. (Optional) Create any other relational DBs here
-- -- CREATE DATABASE order_db;
-- -- \c order_db;
-- -- GRANT ALL PRIVILEGES ON SCHEMA public TO vendly;