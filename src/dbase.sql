DROP DATABASE IF EXISTS `lifesupportfinder`;
CREATE DATABASE `homebakers`; 
USE `lifesupportfinder`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;
SET SQL_MODE='ALLOW_INVALID_DATES';

CREATE TABLE `location` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(256) DEFAULT NULL,
    `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO location (name) VALUES ('Thrissur');
INSERT INTO location (name) VALUES ('Chalakudy');

CREATE TABLE `product` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(256) DEFAULT NULL,
    `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO product (name) VALUES ('Oxygen');
INSERT INTO product (name) VALUES ('Water bed');


CREATE TABLE `shop` (
    `id` int NOT NULL AUTO_INCREMENT,
    `email` varchar(256) DEFAULT NULL,
    `password` varchar(256) DEFAULT NULL,
    `name` varchar(256) DEFAULT NULL,
    `phone` varchar(10) DEFAULT NULL,
    `location_name` varchar(256) DEFAULT NULL,
    `location_id` int NOT NULL, 
    `latitude` decimal(10,8) DEFAULT NULL,
    `longitude` decimal(11,8) DEFAULT NULL,
    `address` varchar(256) DEFAULT NULL,
    `reset_password` int DEFAULT 1,
    `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `shop_details` (
    `id` int NOT NULL AUTO_INCREMENT,
    `shope_id` int NOT NULL, 
    `product_id` int NOT NULL, 
    `status` tinyint(1) DEFAULT '0',
    `quantity` int DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;