
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200) UNIQUE NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR (10),
    "date_added" DATE
);

CREATE TABLE "guest_list" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200) UNIQUE NOT NULL,
    "user_id" INT REFERENCES "user" ON DELETE CASCADE,
    "attending" VARCHAR (10),
    "notes_attending" VARCHAR (1000),
    "diet_restrictions" BOOLEAN,
    "notes_diet_restrictions" VARCHAR (1000),
    "add_friends" BOOLEAN,
    "notes_add_friends" VARCHAR (1000),
    "sleepover" BOOLEAN,
    "notes_general" VARCHAR (1000),
    "last_updated" DATE
);

CREATE TABLE "pending" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200) UNIQUE NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "date_added" DATE
);