CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (255) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR (10)
);

CREATE TABLE "guests" (
    "id" SERIAL PRIMARY KEY,
    "party_id" INT REFERENCES "parties",
    "user_id" INT REFERENCES "users",
    "name" VARCHAR (255) UNIQUE NOT NULL,
    "email" VARCHAR (255),
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

CREATE TABLE "pendings" (
    "id" SERIAL PRIMARY KEY,
    "party_id" INT REFERENCES "parties",
    "user_id" INT REFERENCES "users",
    "name" VARCHAR (255) NOT NULL,
    "resolved" BOOLEAN DEFAULT False,
    "denial_message" VARCHAR (1000)
);

CREATE TABLE "parties" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (250),
    "theme" VARCHAR (250),
    "date" DATE,
    "location" VARCHAR (250)
);

CREATE TABLE "visits" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "whenithappened" TIMESTAMPTZ
);

-- test data:
-- INSERT INTO "guests" (name) values ('Elizabeth Aadland'), ('Kendall Shayler');
-- INSERT INTO "pendings" (name, resolved, denial_message) 
--   VALUES ('Lisa Brancaccio', True, 'You haven''t been very nice to me, so you''re not invited to my party.'), 
--   ('Brian Franson', True, 'You haven''t been very nice to me, so you''re not invited to my party.');
