-- database name is rsvp_app

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (255) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "access_level" INT 
    DEFAULT 0
);

CREATE TABLE "parties" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR (250),
  "date" DATE,
  "time" VARCHAR (250),
  "location" VARCHAR (250),
  "parking_info" VARCHAR (1000),
  "description" VARCHAR (2000),
  "description_two" VARCHAR (2000)
);

CREATE TABLE "guests" (
  "id" SERIAL PRIMARY KEY,
  "party_id" INT REFERENCES "parties",
  "user_id" INT REFERENCES "users",
  "first_name" VARCHAR (255) NOT NULL,
  "last_name" VARCHAR (255) NOT NULL,
  "email" VARCHAR (255),
  "attending" BOOLEAN,
  "attending_code" VARCHAR (3),
  "attending_deets" VARCHAR (1000),
  "dietary_restrictions" VARCHAR (1000),
  "additional_guests" VARCHAR (1000),
  "parking" VARCHAR (255),
  "duties_indicated" BOOLEAN,
  "questions_comments" VARCHAR (1000),
  "welcome_message" VARCHAR (1000) 
    DEFAULT 'Hooray!!'
);

CREATE TABLE "duties" (
  "id" SERIAL PRIMARY KEY,
  "guest_id" INT REFERENCES "guests",
  "setup" BOOLEAN,
  "cleanup" BOOLEAN,
  "hydration" BOOLEAN,
  "photography" BOOLEAN,
  "none" BOOLEAN
);

CREATE TABLE "pendings" (
  "id" SERIAL PRIMARY KEY,
  "party_id" INT REFERENCES "parties",
  "user_id" INT REFERENCES "users",
  "first_name" VARCHAR (255) NOT NULL,
  "last_name" VARCHAR (255) NOT NULL,
  "email" VARCHAR (255),
  "resolved" BOOLEAN 
    DEFAULT False,
  "denial_message" VARCHAR (1000)
);

CREATE TABLE "visits" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(255),
  "last_name" VARCHAR (255),
  "when_it_happened" TIMESTAMPTZ
);

-- test data:
INSERT INTO "parties" (title, date, time, location, parking_info, description, description_two) 
  VALUES ('BRINGOL', '12-17-2022', '7:00 pm', 'Edina, MN', 'Parking spaces are very limited! Please try to carpool or Lyft.',
  'The Bringol is back! Get ready to party like it''s 2019.',
  'Bring a can-do attitude. Hamm''s and seltzers provided. Catering by Elizabeth Aadland.');

INSERT INTO "guests" (party_id, first_name, last_name) 
  VALUES (1, 'Liz', 'Kerber'), (1, 'Elizabeth', 'Aadland'), (1, 'Kendall', 'Shayler');

INSERT INTO "pendings" (party_id, first_name, last_name, resolved, denial_message) 
  VALUES (1, 'Lisa', 'Brancaccio', True, 'You haven''t been very nice to me, so you''re not invited to my party.'), 
  (1, 'Brian', 'Franson', True, 'You haven''t been very nice to me, so you''re not invited to my party.');
