create database tienda_virtual;

create table usuarios(
    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    apellido varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    telefono varchar(20) NOT NULL UNIQUE,
    imagen varchar(250) NULL,
    clave varchar(250) NOT NULL,
    creado timestamp(0) NOT NULL, 
    modificado timestamp(0) NOT NULL
 )