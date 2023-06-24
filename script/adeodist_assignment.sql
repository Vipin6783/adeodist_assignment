CREATE TABLE `role` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(20) NOT NULL,
   `role_id` int DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `role_id` (`role_id`),
   CONSTRAINT `role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `user` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(100) DEFAULT NULL,
   `role_id` int NOT NULL,
   `email` varchar(100) DEFAULT NULL,
   `password` varchar(75) DEFAULT NULL,
   `createdAt` datetime NOT NULL,
   `updatedAt` datetime NOT NULL,
   `deletedAt` datetime DEFAULT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `id_UNIQUE` (`id`),
   KEY `user_role_id_idx` (`email`),
   KEY `fk_user_role_id_idx_idx` (`role_id`),
   KEY `fk_user_role_id_idx` (`role_id`) USING BTREE,
   CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

 CREATE TABLE `feed` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(100) NOT NULL,
   `url` varchar(100) NOT NULL,
   `description` varchar(1000) NOT NULL,
   `createdAt` datetime NOT NULL,
   `updatedAt` datetime NOT NULL,
   `deletedAt` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

 CREATE TABLE `permissions` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(20) NOT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

 CREATE TABLE `module_permissions` (
   `id` int NOT NULL AUTO_INCREMENT,
   `role_id` int DEFAULT NULL,
   `permissions` json NOT NULL,
   PRIMARY KEY (`id`),
   KEY `module_permissions_role_id_idx` (`role_id`),
   KEY `fk_module_permissions_role_id_idx` (`role_id`) USING BTREE,
   CONSTRAINT `module_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

 CREATE TABLE `user_feed_access_mapping` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
   `feed_id` int NOT NULL,
   `can_delete` tinyint(1) DEFAULT NULL,
   `createdAt` datetime NOT NULL,
   `updatedAt` datetime NOT NULL,
   `deletedAt` datetime DEFAULT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `id_UNIQUE` (`id`),
   KEY `fk_admin_feed_access_mapping_user_idx_idx` (`user_id`),
   KEY `fk_admin_feed_access_mapping_user_idx_idx1` (`feed_id`),
   KEY `fk_admin_feed_access_mapping_user_idx` (`user_id`) USING BTREE,
   KEY `fk_admin_feed_access_mapping_feed_idx` (`feed_id`) USING BTREE,
   CONSTRAINT `user_feed_access_mapping_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
   CONSTRAINT `user_feed_access_mapping_ibfk_2` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci