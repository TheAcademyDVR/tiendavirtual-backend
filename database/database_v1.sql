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

        create table role(
        id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name varchar(100) NOT NULL UNIQUE,
        image varchar(255) NULL,
        route varchar(255) NOT NULL,
        created_at timestamp(0) NOT NULL, 
        updated_at timestamp(0) NOT NULL
    )

INSERT INTO `tienda_virtual`.`roles`
(`name`,`route`,`created_at`,`updated_at`)VALUES
('ADMINISTRADOR','/administrator/orders/list','2023-03-27','20-03-28');
INSERT INTO `tienda_virtual`.`roles`
(`name`,`route`,`created_at`,`updated_at`)VALUES
('REPARTIDOR','/delivery/orders/list','2023-03-27','20-03-28');
INSERT INTO `tienda_virtual`.`roles`
(`name`,`route`,`created_at`,`updated_at`)VALUES
('CLIENTE','/client/orders/list','2023-03-27','20-03-28');

   create table user_has_roles(
        id_user BIGINT NOT NULL,
        id_rol BIGINT NOT NULL,
        created_at timestamp(0) NOT NULL, 
        updated_at timestamp(0) NOT NULL,
        FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY(id_user, id_rol)
    )


    SELECT U.id, U.email, U.name, U.lastname, U.image, U.phone, U.password,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'id', R.id,
			'name', R.name,
			'image', R.image,
			'route', R.route
        )
    ) as roles
FROM users U
INNER JOIN user_has_roles UHR ON UHR.id_user = U.id
INNER JOIN roles R ON UHR.id_rol = R.id
WHERE U.email = 'prueba24@gmail.com'
group by U.id


CREATE TABLE categories (
    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description text NOT NULL UNIQUE,
    image varchar(255) NULL,
    created_at timestamp(0) NOT NULL, 
    updated_at timestamp(0) NOT NULL 
)

CREATE TABLE products(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(180) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    image1 VARCHAR(255)  NULL,
    image2 VARCHAR(255)  NULL,
    image3 VARCHAR(255)  NULL,
    id_category BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_category) references categories(id) ON UPDATE CASCADE ON DELETE CASCADE
)