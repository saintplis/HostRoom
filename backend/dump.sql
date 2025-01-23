-- Adminer 4.8.1 PostgreSQL 17.2 dump

DROP TABLE IF EXISTS agendamentos;
DROP SEQUENCE IF EXISTS agendamentos_id_seq;
CREATE SEQUENCE agendamentos_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE public.agendamentos (
    id integer DEFAULT nextval('agendamentos_id_seq') NOT NULL,
    id_do_usuario integer NOT NULL,
    id_do_quarto integer NOT NULL,
    status text NOT NULL,
    data_inicial integer NOT NULL,
    data_final integer NOT NULL,
    valor_pago text NOT NULL,
    valor_total text NOT NULL,
    numero_de_pessoas integer NOT NULL,
    CONSTRAINT agendamentos_pkey PRIMARY KEY (id)
) WITH (oids = false);


DROP TABLE IF EXISTS descontos;
CREATE TABLE public.descontos (
    id integer NOT NULL,
    tipo integer NOT NULL,
    porcentagem integer NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS descricoes;
CREATE TABLE public.descricoes (
    id integer NOT NULL,
    restricoes text NOT NULL,
    tamanho integer NOT NULL,
    descricao text NOT NULL,
    moveis text NOT NULL,
    localizacao text NOT NULL,
    diaria money NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS funcionarios;
DROP SEQUENCE IF EXISTS funcionarios_id_seq;
CREATE SEQUENCE funcionarios_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE public.funcionarios (
    id integer DEFAULT nextval('funcionarios_id_seq') NOT NULL,
    id_do_usuario integer NOT NULL,
    id_do_funcionario integer NOT NULL,
    consentiu boolean NOT NULL,
    CONSTRAINT funcionarios_pkey PRIMARY KEY (id)
) WITH (oids = false);


DROP TABLE IF EXISTS quartos;
DROP SEQUENCE IF EXISTS quartos_id_seq;
CREATE SEQUENCE quartos_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE public.quartos (
    id integer DEFAULT nextval('quartos_id_seq') NOT NULL,
    id_do_usuario text NOT NULL,
    nome text NOT NULL,
    fotos text NOT NULL,
    compartilhado boolean NOT NULL,
    garagem integer NOT NULL,
    CONSTRAINT quartos_pkey PRIMARY KEY (id)
) WITH (oids = false);


DROP TABLE IF EXISTS usuarios;
DROP SEQUENCE IF EXISTS usuarios_id_seq;
CREATE SEQUENCE usuarios_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE public.usuarios (
    id integer DEFAULT nextval('usuarios_id_seq') NOT NULL,
    nome text NOT NULL,
    data_de_nascimento text NOT NULL,
    cpf text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    telefone text NOT NULL,
    cargo smallint NOT NULL,
    admin smallint NOT NULL,
    telefone_emerg text NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY (id)
) WITH (oids = false);


-- 2025-01-23 11:20:00.516685-03
