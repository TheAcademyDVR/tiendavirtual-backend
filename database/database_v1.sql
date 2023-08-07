create database tienda_virtual;

    create table users(
        id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        lastname varchar(100) NOT NULL,
        email varchar(100) NOT NULL UNIQUE,
        phone varchar(20) NOT NULL UNIQUE,
        image varchar(250) NULL,
        password varchar(250) NOT NULL,
        created_at timestamp(0) NOT NULL, 
        updated_at timestamp(0) NOT NULL
    )