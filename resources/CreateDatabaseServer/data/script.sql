-- postgresql
-- Name database: ShoeStoreDB
-- Use this version for Website



create table users(
	id int GENERATED ALWAYS AS IDENTITY,
	username varchar(200) unique not null,
	password text not null,
	email varchar(200),
	fullName varchar(200),
	avatar text,
	phoneNumber varchar(20),
	address varchar(200),
	isAdmin bool default false,
	registrationDate timestamp,
	updationDate timestamp,
	
	primary key(id)
);

create table categories(
	id int GENERATED ALWAYS AS IDENTITY,
	categoryName varchar(200),
	categoryDescription text,
	creationDate timestamp,
	updateDate timestamp,
	
	primary key(id),
	unique(categoryName)
);

create table orders(
	id int GENERATED ALWAYS AS IDENTITY,
	userId int not null,
	total real,
	orderDate timestamp,
	paymentMethod varchar(100),
	orderStatus varchar(100),
	contactPhone varchar(20),
	shippingAddress varchar(200),
	email varchar(200),
	fullName varchar(200),
	
	primary key(id)
);

create table orderdetail(
	id int GENERATED ALWAYS AS IDENTITY,
	orderId int not null,
	productId int not null,
	quantity int check(quantity >= 1) not null,
	color varchar(100),
	size real,
	
	primary key(id)
);

create table ordertrackhistory(
	id int GENERATED ALWAYS AS IDENTITY,
	orderId int,
	status varchar(100), -- example: Đang vận chuyển
	remark varchar(200), -- example: Đã tới kho Hà Nội
	postingDate timestamp,
	
	primary key(id)
);

create table productreviews(
	id int GENERATED ALWAYS AS IDENTITY,
	productId int not null,
	userId int not null,
	userName varchar(200),
	quanlity int check(quanlity >= 0),
	summary varchar(200),
	review text,
	reviewDate timestamp,
	
	primary key(id)
);

create table products(
	id int GENERATED ALWAYS AS IDENTITY,
	categoryId int,
	productName varchar(200),
	productSlug varchar(200),
	productBrand varchar(200),
	productColors text[],
	productSizes real[],
	productPrice varchar(50),
	productPriceBeforeDiscount varchar(50),
	productDescription text,
	productAdditionalInformation text,
	productImage text,
	productThumbImages text[],
	productBigImages text[],
	productVideoThumbImage text,
	productVideoBigImage text,
	productVideo text,
	productGender varchar(100),
	shippingCharge varchar(50),
	productAvailability int check(productAvailability >= 0),
	postingDate timestamp,
	updateDate timestamp,
	
	primary key(id),
	unique(productName)
);

create table userlog(
	id int GENERATED ALWAYS AS IDENTITY,
	userEmail varchar(200) not null,
	userIp text not null,
	loginTime timestamp,
	logoutTime timestamp,
	status varchar(100),
		
	primary key(id)
);

create table cartlist(
	id int GENERATED ALWAYS AS IDENTITY,
	userId int not null,
	productId int not null,
	quantity int,
	color varchar(100),
	size real,
	postingDate timestamp,
	
	primary key(id),
	unique(userId, productId)
);

create table favoritelist(
	id int GENERATED ALWAYS AS IDENTITY,
	userId int not null,
	productId int not null,
	postingDate timestamp,
		
	primary key(id)
);

create table promotions(
	id int GENERATED ALWAYS AS IDENTITY,
	promotionName varchar(200),
	discount real, -- unit %
	startDate date,
	endDate date,
	
	primary key (id)
);

create table promotionandproduct(
	id int GENERATED ALWAYS AS IDENTITY,
	promotionId int,
	productId int,
	
	primary key (id),
	unique(promotionId, productId)
);

-- Add foreign key
alter table orders add foreign key (userId) references users;
alter table orderdetail add foreign key (orderId) references orders;
alter table orderdetail add foreign key (productId) references products;
alter table ordertrackhistory add foreign key (orderId) references orders;
alter table productreviews add foreign key (productId) references products;
alter table productreviews add foreign key (userId) references users;
alter table products add foreign key (categoryId) references categories;
alter table cartlist add foreign key (userId) references users;
alter table cartlist add foreign key (productId) references products;
alter table favoritelist add foreign key (userId) references users;
alter table favoritelist add foreign key (productId) references products;
alter table promotionandproduct add foreign key (promotionId) references promotions;
alter table promotionandproduct add foreign key (productId) references products;

-- Add trigger
CREATE OR REPLACE FUNCTION public.delete_related_lists_before_user()
RETURNS trigger AS $$
BEGIN
    DELETE FROM cartlist WHERE userid = OLD.id;
    DELETE FROM favoritelist WHERE userid = OLD.id;
		DELETE FROM productreviews WHERE userid = OLD.id;
		UPDATE orders SET userId = null WHERE userId = OLD.id;
    RETURN OLD;
END;
$$;

CREATE OR REPLACE TRIGGER trigger_delete_related_lists
BEFORE DELETE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.delete_related_lists_before_user();

-- Add trigger
CREATE OR REPLACE FUNCTION delete_related_lists_before_product()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM cartlist WHERE productid = OLD.id;
    DELETE FROM favoritelist WHERE productid = OLD.id;
		DELETE FROM productreviews WHERE productid = OLD.id;
		DELETE FROM promotionandproduct WHERE productid = OLD.id;
		UPDATE orderdetail SET productid = null WHERE productid = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_delete_related_lists_product
BEFORE DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION delete_related_lists_before_product();
