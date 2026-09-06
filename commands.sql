CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs (author, url, title) values ('Driving instructor', 'https://google.fi','Parking 101');
insert into blogs (author, url, title, likes) values ('Chef', 'https://google.fi', '10 Best Breakfast Recipes', 12);