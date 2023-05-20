--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: tb_alimento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_alimento (
    id integer NOT NULL,
    "tipoId" integer NOT NULL,
    nome text NOT NULL,
    cal integer NOT NULL,
    p integer NOT NULL,
    c integer NOT NULL,
    g integer NOT NULL,
    f integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "userId" integer NOT NULL,
    qnt numeric(65,30) NOT NULL
);


ALTER TABLE public.tb_alimento OWNER TO postgres;

--
-- Name: tb_alimento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_alimento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_alimento_id_seq OWNER TO postgres;

--
-- Name: tb_alimento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_alimento_id_seq OWNED BY public.tb_alimento.id;


--
-- Name: tb_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_group (
    id integer NOT NULL,
    description text NOT NULL,
    sets integer NOT NULL,
    "tb_workoutId" integer NOT NULL,
    type integer NOT NULL
);


ALTER TABLE public.tb_group OWNER TO postgres;

--
-- Name: tb_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_group_id_seq OWNER TO postgres;

--
-- Name: tb_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_group_id_seq OWNED BY public.tb_group.id;


--
-- Name: tb_group_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_group_type (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.tb_group_type OWNER TO postgres;

--
-- Name: tb_group_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_group_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_group_type_id_seq OWNER TO postgres;

--
-- Name: tb_group_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_group_type_id_seq OWNED BY public.tb_group_type.id;


--
-- Name: tb_tipo_refeicao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_tipo_refeicao (
    id integer NOT NULL,
    tipo text NOT NULL
);


ALTER TABLE public.tb_tipo_refeicao OWNER TO postgres;

--
-- Name: tb_tipo_refeicao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_tipo_refeicao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_tipo_refeicao_id_seq OWNER TO postgres;

--
-- Name: tb_tipo_refeicao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_tipo_refeicao_id_seq OWNED BY public.tb_tipo_refeicao.id;


--
-- Name: tb_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_user (
    id integer NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.tb_user OWNER TO postgres;

--
-- Name: tb_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_user_id_seq OWNER TO postgres;

--
-- Name: tb_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_user_id_seq OWNED BY public.tb_user.id;


--
-- Name: tb_workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_workout (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "lastTraining" boolean NOT NULL
);


ALTER TABLE public.tb_workout OWNER TO postgres;

--
-- Name: tb_workout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_workout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_workout_id_seq OWNER TO postgres;

--
-- Name: tb_workout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_workout_id_seq OWNED BY public.tb_workout.id;


--
-- Name: tb_alimento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_alimento ALTER COLUMN id SET DEFAULT nextval('public.tb_alimento_id_seq'::regclass);


--
-- Name: tb_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_group ALTER COLUMN id SET DEFAULT nextval('public.tb_group_id_seq'::regclass);


--
-- Name: tb_group_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_group_type ALTER COLUMN id SET DEFAULT nextval('public.tb_group_type_id_seq'::regclass);


--
-- Name: tb_tipo_refeicao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_tipo_refeicao ALTER COLUMN id SET DEFAULT nextval('public.tb_tipo_refeicao_id_seq'::regclass);


--
-- Name: tb_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_user ALTER COLUMN id SET DEFAULT nextval('public.tb_user_id_seq'::regclass);


--
-- Name: tb_workout id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_workout ALTER COLUMN id SET DEFAULT nextval('public.tb_workout_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5089363a-2d84-4a16-8d3e-a67203a74c32	3ab9696c2f3f1f58482be956bd4b8879f2b19dcb7fd774a596134afe0086f959	2022-04-28 01:41:07.543122-03	20220425000906_init	\N	\N	2022-04-28 01:41:07.527692-03	1
f5a068bb-f7f2-428f-baec-19102a1c537c	c4e6ae81bc6b676e93185cfcc8c89c1b8b364c9fb10205b468cc51a2ca2153fb	2022-04-28 01:41:07.558891-03	20220425012706_init	\N	\N	2022-04-28 01:41:07.544002-03	1
f4b16bde-8e65-46be-a5d7-c0c7efef1c81	1c7ed85ada80a392e94850b352c1abb58b634dda05be75411302d25659a8d78c	2022-04-28 01:41:07.576155-03	20220427050050_init	\N	\N	2022-04-28 01:41:07.559861-03	1
74f62c76-60dc-483d-aa87-5b0ac79ba49e	468d50dbaf4460b259b95174fa405d340b565d126a7d66d4940147d5325bd1a5	2022-04-28 01:41:07.596971-03	20220427051141_init	\N	\N	2022-04-28 01:41:07.577019-03	1
f5be52a3-15db-4cfe-b7ef-59e37351c4a5	36b04b2f8a8bdaec81bd65ab4b01a64d75caa0fb0b9fb9b0a34f42089b29c4bf	2022-04-28 01:41:07.602237-03	20220427051836_init	\N	\N	2022-04-28 01:41:07.597976-03	1
50fc704b-4318-4805-a6a0-49434675ed57	4ae53174157a121ab98b40bab91dc13e03027116a45ddea042224e5cb70c8310	2022-04-28 01:41:07.605924-03	20220427170423_workout	\N	\N	2022-04-28 01:41:07.602996-03	1
cc8308bc-8f05-430a-82fa-bbe505eea7f8	01c89a5333a8dfdc43e4ba0b419c56aa8ad34dc61bf752ffcd4a641ebaa5b073	2022-04-28 01:41:13.638698-03	20220428044113_init	\N	\N	2022-04-28 01:41:13.634629-03	1
cc40ec5b-636a-4a60-9734-0a79622143f6	09e0026c7997e49663f85957cebc0b085c3625ca22133b7b635f79f967262ae4	2022-04-28 01:45:48.839726-03	20220428044548_init	\N	\N	2022-04-28 01:45:48.827215-03	1
c256d5e1-2220-436c-9b2e-bfcc7dfb042f	3cb9a2020ecd36f7bf892f32bbc7974e37153aad1dcefcd4e0ab79cf3d474767	2022-05-03 17:56:12.656953-03	20220503205612_init	\N	\N	2022-05-03 17:56:12.627186-03	1
7212f05b-ba2b-42e8-ab89-ceed9476c18c	99518a9223e5cb26bbc6c56864078dd5b0dc6a144d3a87cae095a420f578bbfb	2023-04-21 16:37:47.836835-03	20230421193747_refeicao	\N	\N	2023-04-21 16:37:47.776577-03	1
84a73334-7a09-46cd-b186-f4d63edb5d71	8d099c2e3a7009ddb376bfb5499bf4bbeac64a499d830dd9ee36cd23a5a4aa9a	2023-04-23 12:33:42.601534-03	20230423153342_refeicao_include_date	\N	\N	2023-04-23 12:33:42.58841-03	1
5ba98db8-40d4-493f-8588-af9696fa04c2	680e14a53ba2b4c45f02bc6779ceebea4996f2af3d26784b814812e5fb837e25	2023-04-23 13:18:47.061776-03	20230423161846_remove_refeicao	\N	\N	2023-04-23 13:18:46.9505-03	1
ac98c151-ff87-4922-8581-4bd51371a5c9	b92e36b7ec81e9f9d35e1010f36d8db0ef2d1fe90c1db8dc7580ef7f58e68897	2023-04-23 18:15:03.484444-03	20230423211503_add_qnt_to_tb_alimento	\N	\N	2023-04-23 18:15:03.451167-03	1
\.


--
-- Data for Name: tb_alimento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_alimento (id, "tipoId", nome, cal, p, c, g, f, date, "userId", qnt) FROM stdin;
14	1	Arroz integral cozido	130	3	27	1	3	2023-04-23 03:00:00	1	105.000000000000000000000000000000
15	1	 Feijão carioca cozido	114	7	20	1	13	2023-04-23 03:00:00	1	150.000000000000000000000000000000
16	1	 Ameixa crua	27	0	7	0	1	2023-04-23 03:00:00	1	50.000000000000000000000000000000
17	1	 Carne bovina acém moído cozido	212	27	0	11	0	2023-04-23 03:00:00	1	100.000000000000000000000000000000
18	1	 Batata baroa cozida	120	1	28	0	3	2023-04-23 03:00:00	1	150.000000000000000000000000000000
19	1	 Porco pernil assado	655	80	0	35	0	2023-04-23 03:00:00	1	250.000000000000000000000000000000
20	1	 Maçã Argentina com casca crua	76	0	20	0	2	2023-04-23 03:00:00	1	120.000000000000000000000000000000
21	1	Arroz integral cozido	248	5	52	2	5	2023-04-29 03:00:00	11	200.000000000000000000000000000000
22	1	 Banana da terra crua	128	1	34	0	2	2023-04-29 03:00:00	11	100.000000000000000000000000000000
23	2	 Ma├º├ú Argentina com casca crua	63	0	17	0	2	2023-04-29 03:00:00	11	100.000000000000000000000000000000
24	2	 Banana da terra crua	256	3	67	0	3	2023-04-29 03:00:00	11	200.000000000000000000000000000000
25	2	 Carne bovina picanha com gordura crua	320	28	0	22	0	2023-04-29 03:00:00	11	150.000000000000000000000000000000
26	1	feijão	250	50	25	12	1	2023-04-23 03:00:00	1	200.000000000000000000000000000000
27	1	 Mamão Formosa cru	162	3	42	0	6	2023-04-30 03:00:00	11	360.000000000000000000000000000000
28	1	 Banana da terra crua	128	1	34	0	2	2023-04-30 03:00:00	11	100.000000000000000000000000000000
29	2	 Tucunaré filé congelado cru	88	18	0	1	0	2023-04-30 03:00:00	11	100.000000000000000000000000000000
30	2	Arroz integral cozido	149	3	31	1	3	2023-04-30 03:00:00	11	120.000000000000000000000000000000
\.


--
-- Data for Name: tb_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_group (id, description, sets, "tb_workoutId", type) FROM stdin;
70	peitoral	5	44	1
71	biceps	4	45	1
72	triceps	4	45	1
73	peitoral	4	46	1
74	biceps	4	46	1
75	esteira	25	46	2
76	peitoral	12	47	1
\.


--
-- Data for Name: tb_group_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_group_type (id, description) FROM stdin;
\.


--
-- Data for Name: tb_tipo_refeicao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_tipo_refeicao (id, tipo) FROM stdin;
1	Café da manhã
2	Almoço
3	Lanche
4	Jantar
\.


--
-- Data for Name: tb_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_user (id, email, name, password) FROM stdin;
1	luizvilarinho@gmail.com	luiz vilarinho	123
2	dasda@dasd.com	asdas	123
3	luizteste2@gmaillcom	luizteste2	123
4	luizteste3@gmail.com	luizteste3	123
8	luizteste4@gmail.com	luizteste4	123
9	luizteste5@gmail.com	luizteste5	123
10	luizteste6@gmail.com	luizteste6	123
11	luiz2@gmail.com	luiz2	123
\.


--
-- Data for Name: tb_workout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_workout (id, "userId", date, "lastTraining") FROM stdin;
44	1	2022-05-05 03:00:00	f
45	1	2022-06-13 03:00:00	f
46	10	2022-08-29 03:00:00	f
47	11	2023-04-30 03:00:00	f
\.


--
-- Name: tb_alimento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_alimento_id_seq', 30, true);


--
-- Name: tb_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_group_id_seq', 76, true);


--
-- Name: tb_group_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_group_type_id_seq', 1, false);


--
-- Name: tb_tipo_refeicao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_tipo_refeicao_id_seq', 1, true);


--
-- Name: tb_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_user_id_seq', 11, true);


--
-- Name: tb_workout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_workout_id_seq', 47, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: tb_alimento tb_alimento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_alimento
    ADD CONSTRAINT tb_alimento_pkey PRIMARY KEY (id);


--
-- Name: tb_group tb_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_group
    ADD CONSTRAINT tb_group_pkey PRIMARY KEY (id);


--
-- Name: tb_group_type tb_group_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_group_type
    ADD CONSTRAINT tb_group_type_pkey PRIMARY KEY (id);


--
-- Name: tb_tipo_refeicao tb_tipo_refeicao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_tipo_refeicao
    ADD CONSTRAINT tb_tipo_refeicao_pkey PRIMARY KEY (id);


--
-- Name: tb_user tb_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_user
    ADD CONSTRAINT tb_user_pkey PRIMARY KEY (id);


--
-- Name: tb_workout tb_workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_workout
    ADD CONSTRAINT tb_workout_pkey PRIMARY KEY (id);


--
-- Name: tb_user_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tb_user_email_key ON public.tb_user USING btree (email);


--
-- Name: tb_alimento tb_alimento_tipoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_alimento
    ADD CONSTRAINT "tb_alimento_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES public.tb_tipo_refeicao(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tb_alimento tb_alimento_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_alimento
    ADD CONSTRAINT "tb_alimento_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.tb_user(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tb_group tb_group_tb_workoutId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_group
    ADD CONSTRAINT "tb_group_tb_workoutId_fkey" FOREIGN KEY ("tb_workoutId") REFERENCES public.tb_workout(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tb_workout tb_workout_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_workout
    ADD CONSTRAINT "tb_workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.tb_user(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

