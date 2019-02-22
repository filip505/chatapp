CREATE TABLE migrations
(
  id        SERIAL  NOT NULL
    CONSTRAINT "PK_8c82d7f526340ab734260ea46be"
    PRIMARY KEY,
  timestamp BIGINT  NOT NULL,
  name      VARCHAR NOT NULL
);

CREATE TABLE person
(
  id        UUID NOT NULL
    CONSTRAINT person_pkey
    PRIMARY KEY,
  email     VARCHAR
    CONSTRAINT person_email_key
    UNIQUE,
  image     VARCHAR,
  number    VARCHAR
    CONSTRAINT person_number_key
    UNIQUE,
  key       VARCHAR,
  firstname VARCHAR,
  lastname  VARCHAR,
  password  VARCHAR
);

CREATE TABLE token
(
  id         UUID NOT NULL
    CONSTRAINT token_pkey
    PRIMARY KEY,
  "personId" UUID
    CONSTRAINT "token_personId_fkey"
    REFERENCES person
    ON DELETE CASCADE
);

CREATE TABLE message
(
  id           UUID NOT NULL
    CONSTRAINT message_pkey
    PRIMARY KEY,
  text         VARCHAR,
  "senderId"   UUID
    CONSTRAINT "message_senderId_fkey"
    REFERENCES person
    ON DELETE CASCADE,
  "receiverId" UUID
    CONSTRAINT "message_receiverId_fkey"
    REFERENCES person
    ON DELETE CASCADE
);

CREATE TABLE conversation
(
  person_1     UUID
    CONSTRAINT conversation_person_1_pk
    UNIQUE
    CONSTRAINT conversation_1__fk
    REFERENCES person
    ON UPDATE CASCADE ON DELETE CASCADE,
  person_2     UUID
    CONSTRAINT conversation_2__fk
    REFERENCES person
    ON UPDATE CASCADE ON DELETE CASCADE,
  id           UUID NOT NULL
    CONSTRAINT conversation_id_pk
    PRIMARY KEY,
  last_message UUID
    CONSTRAINT conversation_message_id_fk
    REFERENCES message
    ON UPDATE CASCADE ON DELETE SET NULL,
  created_at   DATE NOT NULL,
  updated_at   INTEGER,
  CONSTRAINT conversation_person_1_person_2_pk
  UNIQUE (person_1, person_2)
);