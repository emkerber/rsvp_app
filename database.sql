
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (255) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR (10)
);

CREATE TABLE "guests" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "name" VARCHAR (255) UNIQUE NOT NULL,
    "attending" BOOLEAN,
    "perhaps_attending" VARCHAR (1000),
    "dietary_restrictions" BOOLEAN,
    "dietary_deets" VARCHAR (1000),
    "additional_guests" BOOLEAN,
    "additional_guests_deets" VARCHAR (1000),
    "parking" BOOLEAN,
    "overnight_parking" BOOLEAN,
    "duties" VARCHAR (500),
    "other_notes" VARCHAR (1000),
    "welcome_message" VARCHAR (1000)
);

CREATE TABLE "pending" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "name" VARCHAR (255) NOT NULL,
    "resolved" BOOLEAN DEFAULT False,
    "denial_message" VARCHAR (1000)
);

-- test data:
-- INSERT INTO "guests" (name) values ('Elizabeth Aadland'), ('Kendall Shayler');
-- INSERT INTO "pending" (name, resolved) values ('Lisa Brancaccio', True), ('Brian Franson', False);

