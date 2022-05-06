create database offenses;
use offenses;


create table login(
login_id int primary key,
login_password Varchar(20) not null,
user_type varchar(20)
);

create table area(
area_pin int primary key,
area_name varchar(20),
area_city varchar(20),
area_district varchar(20),
area_state varchar(20)
);

insert into area values
(700088,'Tartala','Kolkata','Kolkata','West Bengal');

select * from area;
desc area;


create table police(
police_id int primary key auto_increment,
police_name varchar(50),
police_dob date,
police_designation varchar(40)
);

insert into police(police_name, police_dob,police_designation) values ("Deepit","2000-10-15","IPS");
select * from police;
desc police;


create table litigation(
crime_id int primary key auto_increment,
crime_type varchar(20),
crime_place  varchar(20),
crime_time time,
crime_description varchar(1000),
area_pin int,
Foreign key(area_pin) references area(area_pin),
police_id int,
Foreign key(police_id) references police(police_id),
curr_status varchar(20)
);

select * from litigation;
-- delete from litigation where crime_id between 1 and 14 ;

desc litigation;

create table users(
user_id int primary key auto_increment,
f_name varchar(20) not null,
l_name varchar(20) not null,
photo_id varchar(100) not null,
address varchar(100),
mobile_no bigint
);

insert into users values
(1,'saurav','Prasad','cdsbhcbsd','taratala','9830403211');

select * from users;
desc users;

create table missing_record(
missing_id int primary key auto_increment,
crime_id int,
area_pin int,
foreign key(crime_id) references litigation(crime_id),
foreign key(area_pin) references area(area_pin),
missing_date date,
missing_time time,
missing_pic varchar(100)
);

select * from missing_record;
desc missing_record;

create table reported_crime(
reported_id int primary key	auto_increment,
user_id int,
area_pin int,
reported_time time,
reported_date date,
reported_ctype varchar(20),
reprorted_desc varchar(1000),
repoted_place varchar(50),
doc varchar(100),
foreign key(user_id) references users(user_id),
foreign key(area_pin) references area(area_pin)
);

insert into reported_crime values
(1,1,700088,'20:15:00','2022:04:21','Murder','bla blah blah','taratala','zvhjcashcj');

select * from reported_crime;
desc reported_crime;

create table withdrawals(
request_id int primary key auto_increment,
reported_id int,
foreign key(reported_id) references reported_crime(reported_id),
request_time time,
request_date date,
request_reason varchar(100)
);

select * from withdrawals;
desc withdrawals;

create table suspect(
suspect_id int primary key auto_increment,
crime_id int,
foreign key(crime_id) references litigation(crime_id),
suspect_name varchar(50),
suspect_age int,
suspect_address varchar(100),
suspect_desc varchar(50)
);

select * from suspect;
desc suspect;

create table criminal(
crimianl_id int primary key auto_increment,
crime_id int,
foreign key(crime_id) references litigation(crime_id),
criminal_name varchar(50),
criminal_dob date,
criminal_address varchar(100),
crimianl_photo varchar(100)
);

select * from criminal;
desc criminal;

create table victims(
victim_id int primary key auto_increment,
crime_id int,
foreign key(crime_id) references litigation(crime_id),
victim_name varchar(50),
victim_age int,
victim_address varchar(100)
);

select * from victims;
desc victims;

create table admin(
admin_id int primary key auto_increment,
admin_name varchar(50),
admin_dob date,
authorized_by int
);


select * from admin;
desc admin;






-- trigger
-- create trigger insert_users AFTER insert on login for each row
-- begin
-- if (login.user_type like "police")
-- then 
-- insert into police(


