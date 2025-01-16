-- database is called rsvp_app

-- DROP TABLE "attendance";
-- DROP TABLE "visits";
-- DROP TABLE "pendings";
-- DROP TABLE "duties";
-- DROP TABLE "guests";
-- DROP TABLE "parties";

-- DROP TABLE "users";

CREATE TABLE "users" 
("id"           SERIAL          PRIMARY KEY,
 "username"     VARCHAR (255)   UNIQUE NOT NULL,
 "password"     VARCHAR (255)   NOT NULL,
 "access_level" INT             DEFAULT 0);

-- access_level 0 is guest, 1 is bouncer, 2 is admin

CREATE TABLE "parties"
("id"               SERIAL            PRIMARY KEY,
 "title"            VARCHAR (250),
 "date"             VARCHAR (250),
 "time"             VARCHAR (250),
 "location_name"    VARCHAR (250),
 "street_address"   VARCHAR (250), -- only displays after user RSVPs
 "city_state"       VARCHAR (250),
 "zip"              VARCHAR (5),   -- only displays after user RSVPs
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
 "welcome_message"      VARCHAR (500)   DEFAULT 'Hooray!',
 "invite_sent"          BOOLEAN         DEFAULT False);

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