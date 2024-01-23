-- postgresql
-- Name database: SnearkerShopDB

create table admins(
	id int GENERATED ALWAYS AS IDENTITY,
	username varchar(200) unique not null,
	password text not null,
	email varchar(200),
	fullName varchar(200),
	avatar text,
	address varchar(200),
	codePhone varchar(5),
	phoneNumber varchar(20),
	dob date,
	creationDate timestamp,
 	updationDate timestamp,
	
	primary key(id)
);

create table users(
	id int GENERATED ALWAYS AS IDENTITY,
	username varchar(200) unique not null,
	password text not null,
	email varchar(200),
	fullName varchar(200),
	address varchar(200),
	avatar text,
	codePhone varchar(5),
	phoneNumber varchar(20), -- user's number phone
	contactNumver varchar(20), -- In case: reserver order for somebody.
	shippingAddress varchar(200), -- In case: reserver order for somebody.
	shippingState varchar(100), -- In case: reserver order for somebody.
	shippingCity varchar(100), -- In case: reserver order for somebody.
	billingAddress varchar(200), -- user's address, I think so.
	billingState varchar(100), -- user's state, I think so.
	billingCity varchar(100), -- user's city, I think so.
	billingPinCode varchar(100), -- user's pincode, I think so.
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
	productId int not null,
	quantity int check(quantity >= 1) not null,
	color varchar(100),
	size real,
	orderDate timestamp,
	paymentMethod varchar(100),
	orderStatus varchar(100),
	
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
alter table orders add foreign key (productId) references products;
alter table orders add foreign key (userId) references users;
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