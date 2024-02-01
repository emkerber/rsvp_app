-- database is called rsvp_app

CREATE TABLE "users" 
("id"           SERIAL          PRIMARY KEY,
 "username"     VARCHAR (255)   UNIQUE NOT NULL,
 "password"     VARCHAR (255)   NOT NULL,
 "access_level" INT             DEFAULT 0);

-- access_level 0 is guest, 1 is bouncer, 2 is admin

CREATE TABLE "parties"
("id"               SERIAL            PRIMARY KEY,
 "title"            VARCHAR (250),
 "date"             DATE,
 "time"             VARCHAR (250),
 "location"         VARCHAR (250),
 "parking_info"     VARCHAR (500),
 "description"      VARCHAR (500),
 "description_two"  VARCHAR (500));

CREATE TABLE "guests" 
("id"                   SERIAL          PRIMARY KEY,
 "party_id"             INT             REFERENCES "parties",
 "user_id"              INT             REFERENCES "users",
 "first_name"           VARCHAR (255)   NOT NULL,
 "last_name"            VARCHAR (255)   NOT NULL,
 "phone"                VARCHAR (12),
 "attending"            BOOLEAN,
 "attending_code"       VARCHAR (3),
 "attending_deets"      VARCHAR (500),
 "dietary_restrictions" VARCHAR (500),
 "additional_guests"    VARCHAR (500),
 "parking"              VARCHAR (255),
 "duties_indicated"     BOOLEAN,
 "questions_comments"   VARCHAR (500),
 "welcome_message"      VARCHAR (500)   DEFAULT 'Hooray!');

CREATE TABLE "duties" 
("id"           SERIAL     PRIMARY KEY,
 "guest_id"     INT        REFERENCES "guests",
 "setup"        BOOLEAN,
 "cleanup"      BOOLEAN,
 "hydration"    BOOLEAN,
 "photography"  BOOLEAN,
 "none"         BOOLEAN);

CREATE TABLE "pendings" 
("id"               SERIAL          PRIMARY KEY,
 "party_id"         INT             REFERENCES "parties",
 "user_id"          INT             REFERENCES "users",
 "first_name"       VARCHAR (255)   NOT NULL,
 "last_name"        VARCHAR (255)   NOT NULL,
 "phone"            VARCHAR (12),
 "resolved"         BOOLEAN         DEFAULT False,
 "denial_message"   VARCHAR (500));

-- for tracking visits to the app
CREATE TABLE "visits" 
("id"                 SERIAL          PRIMARY KEY,
 "first_name"         VARCHAR (255),
 "last_name"          VARCHAR (255),
 "when_it_happened"   TIMESTAMPTZ);

CREATE TABLE "attendance"
("id"             SERIAL          PRIMARY KEY,
 "guests_id"      INT             REFERENCES "guests",
 "party_id"       INT             REFERENCES "parties", -- used when there is no guests_id
 "name"           VARCHAR (255),                        -- used when there is no guests_id
 "arrival_time"   TIMESTAMPTZ,
 "notes"          VARCHAR (500));

-- test data:
INSERT INTO "parties" 
  (id, title, date, time, location, parking_info, description, description_two) 
VALUES 
  (1, 'BRINGOL', '12-17-2022', '7:00 pm', 'Edina, MN', 
    'Parking spaces are very limited! Please try to carpool or Lyft.',
    'The Bringol is back! Get ready to party like it''s 2019.',
    'Bring a can-do attitude. Hamm''s and sparkling water provided. Catering by Elizabeth A.');

INSERT INTO "guests" 
  (party_id, first_name, last_name) 
VALUES 
  (1, 'Liz', 'K'), 
  (1, 'Elizabeth', 'A'), 
  (1, 'Kendall', 'S');

INSERT INTO "pendings" 
  (party_id, first_name, last_name, resolved, denial_message) 
VALUES 
  (1, 'A', 'Person', True, 'You haven''t been very nice to me, so you''re not invited to my party.'), 
  (1, 'Another', 'Person', True, 'You haven''t been very nice to me, so you''re not invited to my party.');

-- -- after registering the admin user:
-- UPDATE "users"
-- SET "access_level" = 2
-- WHERE "id" = YOUR ID;