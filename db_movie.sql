-- -------------------------------------------------------------
-- TablePlus 5.9.0(538)
--
-- https://tableplus.com/
--
-- Database: db_movie
-- Generation Time: 2024-04-06 21:47:27.6230
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int DEFAULT NULL,
  `banner_image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cinema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cinema_name` varchar(100) DEFAULT NULL,
  `cinema_group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cinema_group_id` (`cinema_group_id`),
  CONSTRAINT `cinema_ibfk_1` FOREIGN KEY (`cinema_group_id`) REFERENCES `cinema_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cinema_chain` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chain_name` varchar(100) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cinema_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `cinema_chain_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cinema_chain_id` (`cinema_chain_id`),
  CONSTRAINT `cinema_group_ibfk_1` FOREIGN KEY (`cinema_chain_id`) REFERENCES `cinema_chain` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_name` varchar(100) DEFAULT NULL,
  `trailer` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `premiere_day` datetime DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `showing` tinyint(1) DEFAULT NULL,
  `showing_soon` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `movie_booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `schedule_id` int DEFAULT NULL,
  `seat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `movie_booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `movie_booking_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `movie_schedule` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `movie_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cinema_id` int DEFAULT NULL,
  `movie_id` int DEFAULT NULL,
  `showing_datetime` datetime DEFAULT NULL,
  `ticket_price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cinema_id` (`cinema_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `movie_schedule_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`id`),
  CONSTRAINT `movie_schedule_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_name` varchar(50) DEFAULT NULL,
  `seat_type` varchar(50) DEFAULT NULL,
  `cinema_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cinema_id` (`cinema_id`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `user_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cinema` (`id`, `cinema_name`, `cinema_group_id`) VALUES
(1, 'CGV_D5_1', 2),
(2, 'CGV_D5_2', 2),
(3, 'CGV_D5_3', 2);

INSERT INTO `cinema_chain` (`id`, `chain_name`, `logo`) VALUES
(2, 'CGV_MEGA', 'MEGA_CGV.jpeg'),
(3, 'CineStar', 'CineStart.jpeg'),
(4, 'LotteCinema', 'LotteCinema.jpeg');

INSERT INTO `cinema_group` (`id`, `group_name`, `address`, `cinema_chain_id`) VALUES
(2, 'CGV_district_5', 'Tran Hung Dao street, district 5', 2),
(3, 'CGV_district_10', 'Nguyen Tri Phuong street, district 10', 2),
(4, 'CGV_premium', 'Nguyen Tri Phuong street, district 1', 2);

INSERT INTO `seat` (`id`, `seat_name`, `seat_type`, `cinema_id`) VALUES
(1, 'FRONT_ROW_1', 'NORMAL', 1),
(2, 'FRONT_ROW_2', 'NORMAL', 1),
(3, 'FRONT_ROW_3', 'NORMAL', 1),
(4, 'FRONT_ROW_4', 'NORMAL', 1),
(5, 'FRONT_ROW_5', 'NORMAL', 1),
(6, 'COUPLE_1', 'COUPLE', 1),
(7, 'COUPLE_2', 'COUPLE', 1),
(8, 'COUPLE_3', 'COUPLE', 1);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;