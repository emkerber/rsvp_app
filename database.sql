CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (255) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT False
);

CREATE TABLE "parties" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (250),
    "theme" VARCHAR (250),
    "date" DATE,
    "location" VARCHAR (250)
);

CREATE TABLE "guests" (
    "id" SERIAL PRIMARY KEY,
    "party_id" INT REFERENCES "parties",
    "user_id" INT REFERENCES "users",
    "first_name" VARCHAR (255) NOT NULL,
    "last_name" VARCHAR (255) NOT NULL,
    "email" VARCHAR (255),
    "attending" BOOLEAN,
    "perhaps_attending" VARCHAR (1000),
    "dietary_restrictions" VARCHAR (1000),
    "additional_guests" VARCHAR (1000),
    "parking" VARCHAR (255),
    "duties" VARCHAR (1000),
    "other_notes" VARCHAR (1000),
    "welcome_message" VARCHAR (1000) DEFAULT 'Hooray!'
);

CREATE TABLE "pendings" (
    "id" SERIAL PRIMARY KEY,
    "party_id" INT REFERENCES "parties",
    "user_id" INT REFERENCES "users",
    "first_name" VARCHAR (255) NOT NULL,
    "last_name" VARCHAR (255) NOT NULL,
    "resolved" BOOLEAN DEFAULT False,
    "denial_message" VARCHAR (1000)
);

CREATE TABLE "visits" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR (255),
    "whenithappened" TIMESTAMPTZ
);

-- test data:
INSERT INTO "parties" (title, theme, date, location) 
  VALUES ('Bringol', 'my birthday', '12-17-2022', 'Edina, MN');

INSERT INTO "guests" (party_id, first_name, last_name) 
  VALUES (1, 'Liz', 'Kerber'), (1, 'Elizabeth', 'Aadland'), (1, 'Kendall', 'Shayler');

INSERT INTO "pendings" (party_id, first_name, last_name, resolved, denial_message) 
  VALUES (1, 'Lisa', 'Brancaccio', True, 'You haven''t been very nice to me, so you''re not invited to my party.'), 
  (1, 'Brian', 'Franson', True, 'You haven''t been very nice to me, so you''re not invited to my party.');
