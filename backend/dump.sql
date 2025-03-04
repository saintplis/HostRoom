-- Adminer 4.8.1 PostgreSQL 17.3 dump

DROP TABLE IF EXISTS "agendamentos";
DROP SEQUENCE IF EXISTS agendamentos_id_seq;
CREATE SEQUENCE agendamentos_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."agendamentos" (
    "id" integer DEFAULT nextval('agendamentos_id_seq') NOT NULL,
    "id_do_usuario" integer NOT NULL,
    "id_do_quarto" integer NOT NULL,
    "status" text NOT NULL,
    "data_inicial" integer NOT NULL,
    "data_final" integer NOT NULL,
    "valor_pago" text NOT NULL,
    "valor_total" text NOT NULL,
    "numero_de_pessoas" integer NOT NULL,
    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "descontos";
CREATE TABLE "public"."descontos" (
    "id" integer NOT NULL,
    "tipo" integer NOT NULL,
    "porcentagem" integer NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "descricoes";
CREATE TABLE "public"."descricoes" (
    "id" integer NOT NULL,
    "restricoes" text NOT NULL,
    "tamanho" integer NOT NULL,
    "descricao" text NOT NULL,
    "moveis" text NOT NULL,
    "localizacao" text NOT NULL,
    "diaria" money NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "email_codigos";
DROP SEQUENCE IF EXISTS email_codigos_id_seq;
CREATE SEQUENCE email_codigos_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."email_codigos" (
    "id" integer DEFAULT nextval('email_codigos_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "email" text NOT NULL,
    "codigo" text NOT NULL,
    "expira_em" integer NOT NULL,
    "usado" smallint DEFAULT '0' NOT NULL,
    "tipo" smallint DEFAULT '0' NOT NULL,
    CONSTRAINT "email_codigos_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "funcionarios";
DROP SEQUENCE IF EXISTS funcionarios_id_seq;
CREATE SEQUENCE funcionarios_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."funcionarios" (
    "id" integer DEFAULT nextval('funcionarios_id_seq') NOT NULL,
    "id_do_usuario" integer NOT NULL,
    "id_do_funcionario" integer NOT NULL,
    "consentiu" boolean NOT NULL,
    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "quartos";
DROP SEQUENCE IF EXISTS quartos_id_seq;
CREATE SEQUENCE quartos_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."quartos" (
    "id" integer DEFAULT nextval('quartos_id_seq') NOT NULL,
    "id_do_usuario" integer NOT NULL,
    "nome" text NOT NULL,
    "fotos" text NOT NULL,
    "compartilhado" boolean NOT NULL,
    "garagem" integer NOT NULL,
    "comodos" smallint NOT NULL,
    "banheiros" smallint NOT NULL,
    "cafe_da_manha" smallint NOT NULL,
    "preco_por_noite" text NOT NULL,
    "preco_mensal" text NOT NULL,
    "descricao" text NOT NULL,
    CONSTRAINT "quartos_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "usuarios";
DROP SEQUENCE IF EXISTS usuarios_id_seq;
CREATE SEQUENCE usuarios_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."usuarios" (
    "id" integer DEFAULT nextval('usuarios_id_seq') NOT NULL,
    "nome" text NOT NULL,
    "data_de_nascimento" text NOT NULL,
    "cpf" text NOT NULL,
    "email" text NOT NULL,
    "senha" text NOT NULL,
    "telefone" text NOT NULL,
    "cargo" smallint NOT NULL,
    "admin" smallint NOT NULL,
    "telefone_emerg" text NOT NULL,
    "validado" smallint DEFAULT '0' NOT NULL,
    "foto" text,
    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2025-03-03 14:37:47.508054-03
