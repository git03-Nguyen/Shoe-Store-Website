--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2024-01-21 15:35:08

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
-- TOC entry 216 (class 1259 OID 24817)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    username character varying(200) NOT NULL,
    password text NOT NULL,
    email character varying(200),
    fullname character varying(200),
    avatar text,
    address character varying(200),
    codephone character varying(5),
    phonenumber character varying(20),
    dob date,
    creationdate timestamp without time zone,
    updationdate timestamp without time zone
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24816)
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.admins ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.admins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 24884)
-- Name: cartlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cartlist (
    id integer NOT NULL,
    userid integer NOT NULL,
    productid integer NOT NULL,
    quantity integer,
    postingdate timestamp without time zone
);


ALTER TABLE public.cartlist OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24883)
-- Name: cartlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cartlist ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cartlist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 24837)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    categoryname character varying(200),
    categorydescription text,
    creationdate timestamp without time zone,
    updatedate timestamp without time zone
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24836)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 24890)
-- Name: favoritelist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoritelist (
    id integer NOT NULL,
    userid integer NOT NULL,
    productid integer NOT NULL,
    postingdate timestamp without time zone
);


ALTER TABLE public.favoritelist OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24889)
-- Name: favoritelist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.favoritelist ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.favoritelist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 24845)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    userid integer NOT NULL,
    productid integer NOT NULL,
    quantity integer NOT NULL,
    orderdate timestamp without time zone,
    paymentmethod character varying(100),
    orderstatus character varying(100),
    CONSTRAINT orders_quantity_check CHECK ((quantity >= 1))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24844)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 24852)
-- Name: ordertrackhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ordertrackhistory (
    id integer NOT NULL,
    orderid integer,
    status character varying(100),
    remark character varying(200),
    postingdate timestamp without time zone
);


ALTER TABLE public.ordertrackhistory OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24851)
-- Name: ordertrackhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ordertrackhistory ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ordertrackhistory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 24858)
-- Name: productreviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productreviews (
    id integer NOT NULL,
    productid integer NOT NULL,
    userid integer NOT NULL,
    username character varying(200),
    quanlity integer,
    summary character varying(200),
    review text,
    reviewdate timestamp without time zone,
    CONSTRAINT productreviews_quanlity_check CHECK ((quanlity >= 0))
);


ALTER TABLE public.productreviews OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24857)
-- Name: productreviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.productreviews ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.productreviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 24867)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    categoryid integer,
    productname character varying(200),
    productcompany character varying(200),
    productprice character varying(50),
    productpricebeforediscount character varying(50),
    productdescription text,
    productimage1 text,
    productimage2 text,
    productimage3 text,
    shippingcharge character varying(50),
    productavailability integer,
    postingdate timestamp without time zone,
    updatedate timestamp without time zone,
    CONSTRAINT products_productavailability_check CHECK ((productavailability >= 0))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24866)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 24876)
-- Name: userlog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userlog (
    id integer NOT NULL,
    useremail character varying(200) NOT NULL,
    userip text NOT NULL,
    logintime timestamp without time zone,
    logouttime timestamp without time zone,
    status character varying(100)
);


ALTER TABLE public.userlog OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24875)
-- Name: userlog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.userlog ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.userlog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 24827)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(200) NOT NULL,
    password text NOT NULL,
    email character varying(200),
    fullname character varying(200),
    address character varying(200),
    avatar text,
    codephone character varying(5),
    phonenumber character varying(20),
    contactnumver character varying(20),
    shippingaddress character varying(200),
    shippingstate character varying(100),
    shippingcity character varying(100),
    billingaddress character varying(200),
    billingstate character varying(100),
    billingcity character varying(100),
    billingpincode character varying(100),
    registrationdate timestamp without time zone,
    updationdate timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24826)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4860 (class 0 OID 24817)
-- Dependencies: 216
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4876 (class 0 OID 24884)
-- Dependencies: 232
-- Data for Name: cartlist; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4864 (class 0 OID 24837)
-- Dependencies: 220
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (1, 'Casual', 'Casual shoes for everyday wear.', '2024-01-20 15:00:00', '2024-01-20 15:00:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (2, 'Formal', 'Formal shoes for special occasions.', '2024-01-20 15:05:00', '2024-01-20 15:05:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (3, 'Running', 'Running shoes for athletic activities.', '2024-01-20 15:10:00', '2024-01-20 15:10:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (4, 'Athletic', 'Athletic shoes for various sports and workouts.', '2024-01-20 15:15:00', '2024-01-20 15:15:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (5, 'Boots', 'Stylish and durable boots for different occasions.', '2024-01-20 15:20:00', '2024-01-20 15:20:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (6, 'Sandals', 'Comfortable sandals for warm weather.', '2024-01-20 15:25:00', '2024-01-20 15:25:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (7, 'Flats', 'Elegant and comfortable flats for women.', '2024-01-20 15:30:00', '2024-01-20 15:30:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (8, 'Sneakers', 'Trendy sneakers for a casual and sporty look.', '2024-01-20 15:35:00', '2024-01-20 15:35:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (9, 'Heels', 'Fashionable heels for a stylish appearance.', '2024-01-20 15:40:00', '2024-01-20 15:40:00');
INSERT INTO public.categories (id, categoryname, categorydescription, creationdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (10, 'Slippers', 'Cozy slippers for indoor comfort.', '2024-01-20 15:45:00', '2024-01-20 15:45:00');


--
-- TOC entry 4878 (class 0 OID 24890)
-- Dependencies: 234
-- Data for Name: favoritelist; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4866 (class 0 OID 24845)
-- Dependencies: 222
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4868 (class 0 OID 24852)
-- Dependencies: 224
-- Data for Name: ordertrackhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4870 (class 0 OID 24858)
-- Dependencies: 226
-- Data for Name: productreviews; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4872 (class 0 OID 24867)
-- Dependencies: 228
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (23, 2, 'Formal Oxford Shoes', 'EleganceShoes', '89.99', '109.99', 'Classic formal Oxford shoes for formal occasions.', 'img/product/product3.jpg', 'formal2.jpg', 'formal3.jpg', '8.00', 50, '2024-01-20 13:10:00', '2024-01-20 13:10:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (49, 5, 'Hiking Boots', 'AdventureSeeker', '79.99', '99.99', 'Sturdy hiking boots for outdoor exploration and hiking.', 'img/product/product19.jpg', 'hiking2.jpg', 'hiking3.jpg', '8.50', 50, '2024-01-20 14:30:00', '2024-01-20 14:30:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (50, 5, 'Elegant Ballet Flats', 'GracefulSteps', '39.99', '49.99', 'Elegant ballet flats for a graceful and comfortable style.', 'img/product/product20.jpg', 'ballet2.jpg', 'ballet3.jpg', '5.00', 110, '2024-01-20 14:35:00', '2024-01-20 14:35:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (21, 8, 'Casual Sneakers', 'SneakCo', '59.99', '79.99', 'Casual sneakers for everyday wear.', 'img/product/product1.jpg', 'sneaker2.jpg', 'sneaker3.jpg', '7.00', 100, '2024-01-20 13:00:00', '2024-01-20 13:00:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (22, 3, 'Running Shoes', 'RunFast', '74.99', '99.99', 'Performance running shoes for athletes.', 'img/product/product2.jpg', 'running2.jpg', 'running3.jpg', '8.00', 80, '2024-01-20 13:05:00', '2024-01-20 13:05:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (24, 10, 'Business Loafers', 'GentleSteps', '69.99', '89.99', 'Comfortable loafers for business attire.', 'img/product/product4.jpg', 'loafers2.jpg', 'loafers3.jpg', '6.00', 120, '2024-01-20 13:15:00', '2024-01-20 13:15:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (25, 8, 'High-Top Sneakers', 'UrbanStyle', '54.99', '69.99', 'Trendy high-top sneakers for a stylish look.', 'img/product/product5.jpg', 'hightop2.jpg', 'hightop3.jpg', '7.50', 90, '2024-01-20 13:20:00', '2024-01-20 13:20:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (26, 9, 'Wedding Shoes', 'ElegantEvents', '99.99', '129.99', 'Elegant shoes for weddings and special events.', 'img/product/product6.jpg', 'wedding2.jpg', 'wedding3.jpg', '9.00', 30, '2024-01-20 13:25:00', '2024-01-20 13:25:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (27, 8, 'Canvas Sneakers', 'CasualTrends', '44.99', '59.99', 'Lightweight canvas sneakers for a casual look.', 'img/product/product7.jpg', 'canvas2.jpg', 'canvas3.jpg', '6.50', 150, '2024-01-20 13:30:00', '2024-01-20 13:30:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (28, 6, 'Classic Brogues', 'TimelessStyle', '79.99', '99.99', 'Timeless classic brogues for a sophisticated appearance.', 'img/product/product8.jpg', 'brogue2.jpg', 'brogue3.jpg', '7.50', 70, '2024-01-20 13:35:00', '2024-01-20 13:35:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (29, 4, 'Athletic Training Shoes', 'FitZone', '64.99', '84.99', 'Versatile athletic training shoes for various workouts.', 'img/product/product9.jpg', 'training2.jpg', 'training3.jpg', '7.00', 110, '2024-01-20 13:40:00', '2024-01-20 13:40:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (30, 6, 'Summer Sandals', 'BeachComfort', '49.99', '69.99', 'Comfortable sandals for a relaxed summer style.', 'img/product/product10.jpg', 'sandals2.jpg', 'sandals3.jpg', '5.50', 80, '2024-01-20 13:45:00', '2024-01-20 13:45:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (41, 5, 'Leather Boots', 'UrbanChic', '79.99', '99.99', 'Stylish leather boots for a trendy urban look.', 'img/product/product11.jpg', 'boots2.jpg', 'boots3.jpg', '8.00', 60, '2024-01-20 13:50:00', '2024-01-20 13:50:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (42, 9, 'Suede Loafers', 'SophisticatedStyle', '69.99', '89.99', 'Luxurious suede loafers for a sophisticated appearance.', 'img/product/product12.jpg', 'suede2.jpg', 'suede3.jpg', '7.00', 80, '2024-01-20 13:55:00', '2024-01-20 13:55:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (43, 3, 'Trail Running Shoes', 'OutdoorAdventures', '89.99', '109.99', 'Durable trail running shoes for outdoor adventures.', 'img/product/product13.jpg', 'trail2.jpg', 'trail3.jpg', '9.00', 40, '2024-01-20 14:00:00', '2024-01-20 14:00:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (44, 1, 'Classic Pumps', 'EleganceByDesign', '59.99', '79.99', 'Classic pumps for a sophisticated and elegant look.', 'img/product/product14.jpg', 'pumps2.jpg', 'pumps3.jpg', '6.50', 70, '2024-01-20 14:05:00', '2024-01-20 14:05:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (45, 8, 'Skateboard Sneakers', 'SkateZone', '49.99', '69.99', 'Stylish sneakers designed for skateboard enthusiasts.', 'img/product/product15.jpg', 'skate2.jpg', 'skate3.jpg', '6.00', 90, '2024-01-20 14:10:00', '2024-01-20 14:10:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (46, 9, 'Velvet Evening Shoes', 'GlamorousNights', '99.99', '129.99', 'Luxurious velvet shoes for special evening occasions.', 'img/product/product16.jpg', 'velvet2.jpg', 'velvet3.jpg', '9.50', 30, '2024-01-20 14:15:00', '2024-01-20 14:15:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (47, 8, 'Slip-On Sneakers', 'EasyComfort', '44.99', '59.99', 'Comfortable slip-on sneakers for easy and casual wear.', 'img/product/product17.jpg', 'slipon2.jpg', 'slipon3.jpg', '5.50', 120, '2024-01-20 14:20:00', '2024-01-20 14:20:00');
INSERT INTO public.products (id, categoryid, productname, productcompany, productprice, productpricebeforediscount, productdescription, productimage1, productimage2, productimage3, shippingcharge, productavailability, postingdate, updatedate) OVERRIDING SYSTEM VALUE VALUES (48, 10, 'Trendy Mules', 'FashionForward', '54.99', '74.99', 'Trendy mules for a fashionable and modern look.', 'img/product/product18.jpg', 'mules2.jpg', 'mules3.jpg', '6.00', 100, '2024-01-20 14:25:00', '2024-01-20 14:25:00');


--
-- TOC entry 4874 (class 0 OID 24876)
-- Dependencies: 230
-- Data for Name: userlog; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4862 (class 0 OID 24827)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 215
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 1, false);


--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 231
-- Name: cartlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cartlist_id_seq', 1, false);


--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 10, true);


--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 233
-- Name: favoritelist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favoritelist_id_seq', 1, false);


--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 221
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 223
-- Name: ordertrackhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ordertrackhistory_id_seq', 1, false);


--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 225
-- Name: productreviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productreviews_id_seq', 1, false);


--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 227
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 229
-- Name: userlog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userlog_id_seq', 1, false);


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 4683 (class 2606 OID 24823)
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- TOC entry 4685 (class 2606 OID 24825)
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- TOC entry 4703 (class 2606 OID 24888)
-- Name: cartlist cartlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartlist
    ADD CONSTRAINT cartlist_pkey PRIMARY KEY (id);


--
-- TOC entry 4691 (class 2606 OID 24843)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 24894)
-- Name: favoritelist favoritelist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritelist
    ADD CONSTRAINT favoritelist_pkey PRIMARY KEY (id);


--
-- TOC entry 4693 (class 2606 OID 24850)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4695 (class 2606 OID 24856)
-- Name: ordertrackhistory ordertrackhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordertrackhistory
    ADD CONSTRAINT ordertrackhistory_pkey PRIMARY KEY (id);


--
-- TOC entry 4697 (class 2606 OID 24865)
-- Name: productreviews productreviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productreviews
    ADD CONSTRAINT productreviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4699 (class 2606 OID 24874)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4701 (class 2606 OID 24882)
-- Name: userlog userlog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userlog
    ADD CONSTRAINT userlog_pkey PRIMARY KEY (id);


--
-- TOC entry 4687 (class 2606 OID 24833)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4689 (class 2606 OID 24835)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4712 (class 2606 OID 24930)
-- Name: cartlist cartlist_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartlist
    ADD CONSTRAINT cartlist_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(id);


--
-- TOC entry 4713 (class 2606 OID 24925)
-- Name: cartlist cartlist_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartlist
    ADD CONSTRAINT cartlist_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 4714 (class 2606 OID 24940)
-- Name: favoritelist favoritelist_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritelist
    ADD CONSTRAINT favoritelist_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(id);


--
-- TOC entry 4715 (class 2606 OID 24935)
-- Name: favoritelist favoritelist_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritelist
    ADD CONSTRAINT favoritelist_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 4706 (class 2606 OID 24895)
-- Name: orders orders_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(id);


--
-- TOC entry 4707 (class 2606 OID 24900)
-- Name: orders orders_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 4708 (class 2606 OID 24905)
-- Name: ordertrackhistory ordertrackhistory_orderid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordertrackhistory
    ADD CONSTRAINT ordertrackhistory_orderid_fkey FOREIGN KEY (orderid) REFERENCES public.orders(id);


--
-- TOC entry 4709 (class 2606 OID 24910)
-- Name: productreviews productreviews_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productreviews
    ADD CONSTRAINT productreviews_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(id);


--
-- TOC entry 4710 (class 2606 OID 24915)
-- Name: productreviews productreviews_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productreviews
    ADD CONSTRAINT productreviews_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 4711 (class 2606 OID 24920)
-- Name: products products_categoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.categories(id);


-- Completed on 2024-01-21 15:35:08

--
-- PostgreSQL database dump complete
--

