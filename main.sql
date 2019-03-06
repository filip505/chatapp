create table person
(
	id uuid default uuid_generate_v4() not null
		constraint person_pkey
			primary key,
	email varchar
		constraint person_email_key
			unique,
	image varchar,
	number varchar
		constraint person_number_key
			unique,
	key varchar,
	firstname varchar,
	lastname varchar,
	password varchar
)
;

create table token
(
	id uuid default uuid_generate_v4() not null
		constraint token_pkey
			primary key,
	"personId" uuid not null
		constraint "token_personId_fkey"
			references person
				on delete cascade
)
;

create table message
(
	id uuid default uuid_generate_v4() not null
		constraint message_pkey
			primary key,
	text varchar,
	"senderId" uuid
		constraint "message_senderId_fkey"
			references person
				on delete cascade,
	"receiverId" uuid
		constraint "message_receiverId_fkey"
			references person
				on delete cascade,
	"conversationId" uuid not null,
	"createdAt" timestamp default now() not null
)
;

create table conversation
(
	id uuid default uuid_generate_v4() not null
		constraint conversation_id_pk
			primary key,
	"lastMessageId" uuid,
	created_at timestamp default now() not null,
	updated_at timestamp
)
;

alter table message
	add constraint message_conversation_id_fk
		foreign key ("conversationId") references conversation
			on update cascade on delete cascade
;

create table subject
(
	"personId" uuid not null
		constraint subject_person_id_fk
			references person
				on update cascade on delete cascade,
	"conversationId" uuid not null
		constraint subject_conversation_id_fk
			references conversation
				on update cascade on delete cascade,
	"companionId" uuid not null
		constraint subject_companion_id_fk
			references person
				on update cascade on delete cascade,
	constraint subject_conversation_id_pk
		primary key ("conversationId", "personId")
)
;

