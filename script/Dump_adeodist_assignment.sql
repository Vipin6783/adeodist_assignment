CREATE DATABASE  IF NOT EXISTS `adeodist_assignment` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `adeodist_assignment`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: adeodist_assignment
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed`
--

LOCK TABLES `feed` WRITE;
/*!40000 ALTER TABLE `feed` DISABLE KEYS */;
INSERT INTO `feed` VALUES (1,'Test feed 1','http://localhost:3333//example1','First feed for testing','2023-06-22 02:50:57','2023-06-22 02:50:57','2023-06-25 16:03:56'),(2,'Test feed 2','http://localhost:3333//example2','second feed for testing','2023-06-22 02:51:57','2023-06-22 02:56:30','2023-06-22 02:57:18'),(3,'Test feed4','http://localhost:3333//example4','this is test feed 4','2023-06-22 17:12:10','2023-06-22 17:12:10','2023-06-25 15:38:05'),(4,'Watch','http://localhost:3333//watch','Expensive watches','2023-06-24 10:28:09','2023-06-24 10:28:09','2023-06-25 16:14:27'),(5,'Shoes','http://localhost:3333//shoes','Nike shoes wit 25% offer','2023-06-24 10:28:37','2023-06-24 10:28:37','2023-06-25 19:16:01'),(6,'NewTelevision','http://localhost:3333//jackets','25% offer on jackets','2023-06-25 15:35:01','2023-06-25 16:03:01','2023-06-25 19:55:16'),(7,'Television','http://localhost:3333//television','25% offer of on televisions','2023-06-25 16:02:07','2023-06-25 19:54:16',NULL),(8,'Shirt sale','http://localhost:3333//shirts','25% offer on shirts sales','2023-06-25 19:52:40','2023-06-25 19:52:40',NULL),(9,'Trouser sale','http://localhost:3333//Trouser','25% offer on Trouser sales','2023-06-25 19:53:03','2023-06-25 19:53:03',NULL);
/*!40000 ALTER TABLE `feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module_permissions`
--

DROP TABLE IF EXISTS `module_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `permissions` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `module_permissions_role_id_idx` (`role_id`),
  KEY `fk_module_permissions_role_id_idx` (`role_id`) USING BTREE,
  CONSTRAINT `module_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_permissions`
--

LOCK TABLES `module_permissions` WRITE;
/*!40000 ALTER TABLE `module_permissions` DISABLE KEYS */;
INSERT INTO `module_permissions` VALUES (1,1,'{\"feed\": [1, 2, 3, 4, 5], \"user\": [1, 2, 3, 4, 5]}'),(2,2,'{\"feed\": [2, 5], \"user\": [1, 2, 4]}'),(3,3,'{\"feed\": [2], \"user\": []}');
/*!40000 ALTER TABLE `module_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'CREATE'),(2,'READ'),(3,'UPDATE'),(4,'DELETE'),(5,'MODIFY_PERMISSIONS');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'SUPER_ADMIN',NULL),(2,'ADMIN',NULL),(3,'BASIC_USER',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Super Admin',1,'superadmin@mailinator.com','superadmin123','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),(2,'Vipin',2,'vip@mailinator.com','vip123','2023-06-22 02:14:46','2023-06-22 02:33:21','2023-06-22 02:41:01'),(3,'nikhil',2,'nikhil@mailinator.com','nikhil123','2023-06-24 04:33:58','2023-06-24 04:33:58',NULL),(4,'ram',2,'ram@mailinator.com','Adeodist123','2023-06-24 11:04:06','2023-06-24 11:04:06','2023-06-25 15:33:59'),(5,'ram',2,'ram@mailinator.com','Adeodist123','2023-06-24 11:04:38','2023-06-24 11:04:38','2023-06-25 16:00:58'),(6,'ram',2,'ram@mailinator.com','Adeodist123','2023-06-24 11:04:50','2023-06-24 11:04:50',NULL),(7,'Admin-user',2,'admin@mailinator.com','Admin123','2023-06-25 15:00:20','2023-06-25 15:07:48',NULL),(8,'Admin user',2,'admin1@mailinator.com','Admin123','2023-06-25 15:31:24','2023-06-25 15:31:24',NULL),(9,'Basic new user',3,'basicuser@mailinator.com','User123','2023-06-25 15:31:48','2023-06-25 15:33:05','2023-06-25 16:11:56'),(10,'Basic user1',3,'basicuser1@mailinator.com','User123','2023-06-25 15:46:39','2023-06-25 15:46:39',NULL),(11,'Basic user 2',3,'basicuser2@mailinator.com','User123','2023-06-25 15:58:06','2023-06-25 15:58:06',NULL),(12,'Admin new user ',2,'admin2@mailinator.com','Admin123','2023-06-25 15:58:26','2023-06-25 16:00:08',NULL),(13,'Basic user creted by admin',3,'basicUser3@mailinator.com','User123','2023-06-25 16:10:33','2023-06-25 16:10:33','2023-06-25 19:51:40'),(14,'User 123',3,'basicuser123@mailinator.com','User123','2023-06-25 19:48:47','2023-06-25 19:48:47',NULL),(15,'Latest User ',3,'admin123@mailinator.com','User123','2023-06-25 19:49:02','2023-06-25 19:51:09',NULL),(16,'User new',3,'userbasics@mailinator.com','User123','2023-06-25 20:00:27','2023-06-25 20:00:27',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_feed_access_mapping`
--

DROP TABLE IF EXISTS `user_feed_access_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_feed_access_mapping`
--

LOCK TABLES `user_feed_access_mapping` WRITE;
/*!40000 ALTER TABLE `user_feed_access_mapping` DISABLE KEYS */;
INSERT INTO `user_feed_access_mapping` VALUES (6,3,1,0,'2023-06-24 05:00:52','2023-06-24 05:14:54',NULL),(7,3,2,0,'2023-06-24 05:00:52','2023-06-24 05:14:54',NULL),(8,3,3,NULL,'2023-06-24 11:01:23','2023-06-24 11:01:23',NULL),(9,3,4,NULL,'2023-06-24 11:01:23','2023-06-24 11:01:23',NULL),(10,3,5,NULL,'2023-06-24 11:01:23','2023-06-24 11:01:23',NULL),(11,4,1,NULL,'2023-06-24 11:05:52','2023-06-24 11:05:52',NULL),(12,4,3,1,'2023-06-24 11:05:52','2023-06-24 11:35:20',NULL),(13,4,4,NULL,'2023-06-24 11:05:52','2023-06-24 11:05:52',NULL),(14,4,5,NULL,'2023-06-24 11:05:52','2023-06-24 11:05:52',NULL),(15,5,1,NULL,'2023-06-25 15:39:41','2023-06-25 15:39:41',NULL),(16,5,5,NULL,'2023-06-25 15:39:41','2023-06-25 15:39:41',NULL),(17,7,4,1,'2023-06-25 16:06:23','2023-06-25 16:14:12',NULL),(18,7,5,NULL,'2023-06-25 16:06:23','2023-06-25 16:06:23',NULL),(19,7,6,1,'2023-06-25 16:06:23','2023-06-25 16:08:04',NULL),(20,8,5,NULL,'2023-06-25 17:43:42','2023-06-25 17:43:42',NULL),(21,8,6,NULL,'2023-06-25 17:43:42','2023-06-25 17:43:42',NULL),(22,13,5,1,'2023-06-25 18:23:56','2023-06-25 18:26:07',NULL),(23,13,6,NULL,'2023-06-25 18:23:56','2023-06-25 18:23:56',NULL),(24,7,7,1,'2023-06-25 19:57:31','2023-06-25 19:58:46',NULL),(25,7,8,NULL,'2023-06-25 19:57:31','2023-06-25 19:57:31',NULL),(26,14,7,NULL,'2023-06-25 20:03:25','2023-06-25 20:03:25',NULL),(27,14,8,NULL,'2023-06-25 20:03:25','2023-06-25 20:03:25',NULL);
/*!40000 ALTER TABLE `user_feed_access_mapping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-26  2:01:34
