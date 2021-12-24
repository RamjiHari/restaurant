-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 24, 2021 at 06:49 AM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `r1ngaze`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` bigint(20) NOT NULL,
  `tableId` bigint(20) NOT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `token` varchar(100) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `line1` varchar(50) DEFAULT NULL,
  `line2` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `booking_item`
--

CREATE TABLE `booking_item` (
  `id` bigint(20) NOT NULL,
  `bookingId` bigint(20) NOT NULL,
  `itemId` bigint(20) NOT NULL,
  `sku` varchar(100) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `discount` float NOT NULL DEFAULT '0',
  `quantity` float NOT NULL DEFAULT '0',
  `unit` smallint(6) NOT NULL DEFAULT '0',
  `status` smallint(6) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `vendorId` bigint(20) DEFAULT NULL,
  `title` varchar(75) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `summary` tinytext,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `sku` varchar(100) NOT NULL,
  `quantity` float NOT NULL DEFAULT '0',
  `unit` smallint(6) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` bigint(20) NOT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `title` varchar(75) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `summary` tinytext,
  `price` float NOT NULL DEFAULT '0',
  `createdAt` varchar(100) NOT NULL,
  `updatedAt` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `userId`, `title`, `image`, `summary`, `price`, `createdAt`, `updatedAt`) VALUES
(36, 5, 'Hydrababd Biryanis', 'Biryani_Home.jpeg', 'Changes Required', 100, '', 'Thu Dec 23 2021 08:28:47 GMT+0530 (India Standard Time)'),
(37, 1, 'Amboor Biryani', 'images.jpeg', 'Amboor ', 200, '', NULL),
(38, 5, 'Thalapkatu', 'images.jpeg', 'Thalapakatu', 200, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `itemss`
--

CREATE TABLE `itemss` (
  `id` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `vendorId` bigint(20) DEFAULT NULL,
  `title` varchar(75) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `slug` varchar(100) NOT NULL,
  `summary` tinytext,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `cooking` tinyint(1) NOT NULL DEFAULT '0',
  `sku` varchar(100) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `quantity` float NOT NULL DEFAULT '0',
  `unit` smallint(6) NOT NULL DEFAULT '0',
  `recipe` text,
  `instructions` text,
  `createdAt` varchar(100) NOT NULL,
  `updatedAt` varchar(100) DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `item_chef`
--

CREATE TABLE `item_chef` (
  `id` bigint(20) NOT NULL,
  `itemId` bigint(20) NOT NULL,
  `chefId` bigint(20) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `title` varchar(75) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `summary` tinytext,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `menu_item`
--

CREATE TABLE `menu_item` (
  `id` bigint(20) NOT NULL,
  `menuId` bigint(20) NOT NULL,
  `itemId` bigint(20) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` bigint(20) NOT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `vendorId` bigint(20) DEFAULT NULL,
  `token` varchar(100) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  `subTotal` float NOT NULL DEFAULT '0',
  `itemDiscount` float NOT NULL DEFAULT '0',
  `tax` float NOT NULL DEFAULT '0',
  `shipping` float NOT NULL DEFAULT '0',
  `total` float NOT NULL DEFAULT '0',
  `promo` varchar(50) DEFAULT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `grandTotal` float NOT NULL DEFAULT '0',
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `line1` varchar(50) DEFAULT NULL,
  `line2` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` bigint(20) NOT NULL,
  `orderId` bigint(20) NOT NULL,
  `itemId` bigint(20) NOT NULL,
  `sku` varchar(100) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `discount` float NOT NULL DEFAULT '0',
  `quantity` float NOT NULL DEFAULT '0',
  `unit` smallint(6) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` bigint(20) NOT NULL,
  `itemId` bigint(20) NOT NULL,
  `ingredientId` bigint(20) NOT NULL,
  `quantity` float NOT NULL DEFAULT '0',
  `unit` smallint(6) NOT NULL DEFAULT '0',
  `instructions` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `site_name` varchar(100) NOT NULL,
  `site_url` varchar(100) NOT NULL,
  `site_title` varchar(100) NOT NULL,
  `site_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `site_name`, `site_url`, `site_title`, `site_description`) VALUES
(1, 'Restaurant', 'http://localhost:8888/Ramesh/suv/restaurant/backEnd/', 'Learn and grow', 'AllSkills help you to learn');

-- --------------------------------------------------------

--
-- Table structure for table `table_top`
--

CREATE TABLE `table_top` (
  `id` bigint(20) NOT NULL,
  `code` varchar(100) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  `capacity` smallint(6) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `vendorId` bigint(20) NOT NULL,
  `orderId` bigint(20) NOT NULL,
  `code` varchar(100) NOT NULL,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `mode` smallint(6) NOT NULL DEFAULT '0',
  `status` smallint(6) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `passwordHash` varchar(32) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `vendor` tinyint(1) NOT NULL DEFAULT '0',
  `chef` tinyint(1) NOT NULL DEFAULT '0',
  `agent` tinyint(1) NOT NULL DEFAULT '0',
  `registeredAt` datetime NOT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `intro` tinytext,
  `profile` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `middleName`, `lastName`, `mobile`, `email`, `passwordHash`, `admin`, `vendor`, `chef`, `agent`, `registeredAt`, `lastLogin`, `intro`, `profile`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, '', 0, 0, 0, 0, '2021-12-21 10:55:21', NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL, NULL, '', 0, 0, 0, 0, '2021-12-21 10:55:21', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `active` int(5) NOT NULL DEFAULT '1',
  `privilege` int(5) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `active`, `privilege`) VALUES
(1, 'ram@gmail.com', 'ram@gmail.com', '123', 1, 1),
(2, 'v', 'v', 'v', 1, 1),
(3, 'vj', 'vj@gmail.com', '123', 1, 1),
(5, 'dhaya', 'dhayac2d@gmail.com', '123', 1, 1),
(6, 'admin', 'admin@gmail.com', '123', 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_booking_table` (`tableId`),
  ADD KEY `idx_booking_user` (`userId`);

--
-- Indexes for table `booking_item`
--
ALTER TABLE `booking_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_booking_item_booking` (`bookingId`),
  ADD KEY `idx_booking_item_item` (`itemId`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_slug` (`slug`),
  ADD KEY `idx_ingredient_user` (`userId`),
  ADD KEY `idx_ingredient_vendor` (`vendorId`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itemss`
--
ALTER TABLE `itemss`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_slug` (`slug`),
  ADD KEY `idx_item_user` (`userId`),
  ADD KEY `idx_item_vendor` (`vendorId`);

--
-- Indexes for table `item_chef`
--
ALTER TABLE `item_chef`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_item_chef` (`itemId`,`chefId`),
  ADD KEY `idx_item_chef_item` (`itemId`),
  ADD KEY `idx_item_chef_chef` (`chefId`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_slug` (`slug`),
  ADD KEY `idx_menu_user` (`userId`);

--
-- Indexes for table `menu_item`
--
ALTER TABLE `menu_item`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_menu_item` (`menuId`,`itemId`),
  ADD KEY `idx_menu_item_menu` (`menuId`),
  ADD KEY `idx_menu_item_item` (`itemId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_user` (`userId`),
  ADD KEY `idx_order_vendor` (`vendorId`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_item_order` (`orderId`),
  ADD KEY `idx_order_item_item` (`itemId`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_recipe_item_ingredient` (`itemId`,`ingredientId`),
  ADD KEY `idx_recipe_item` (`itemId`),
  ADD KEY `idx_recipe_ingredient` (`ingredientId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_top`
--
ALTER TABLE `table_top`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_transaction_user` (`userId`),
  ADD KEY `idx_transaction_vendor` (`vendorId`),
  ADD KEY `idx_transaction_order` (`orderId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_mobile` (`mobile`),
  ADD UNIQUE KEY `uq_email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking_item`
--
ALTER TABLE `booking_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `itemss`
--
ALTER TABLE `itemss`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item_chef`
--
ALTER TABLE `item_chef`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_item`
--
ALTER TABLE `menu_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `table_top`
--
ALTER TABLE `table_top`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_booking_table` FOREIGN KEY (`tableId`) REFERENCES `table_top` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_booking_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `booking_item`
--
ALTER TABLE `booking_item`
  ADD CONSTRAINT `fk_booking_item_booking` FOREIGN KEY (`bookingId`) REFERENCES `booking` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_booking_item_item` FOREIGN KEY (`itemId`) REFERENCES `itemss` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD CONSTRAINT `fk_ingredient_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ingredient_vendor` FOREIGN KEY (`vendorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `itemss`
--
ALTER TABLE `itemss`
  ADD CONSTRAINT `fk_item_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_item_vendor` FOREIGN KEY (`vendorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `item_chef`
--
ALTER TABLE `item_chef`
  ADD CONSTRAINT `fk_item_chef_chef` FOREIGN KEY (`chefId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_item_chef_item` FOREIGN KEY (`itemId`) REFERENCES `itemss` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `fk_menu_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `menu_item`
--
ALTER TABLE `menu_item`
  ADD CONSTRAINT `fk_menu_item_item` FOREIGN KEY (`itemId`) REFERENCES `itemss` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_menu_item_menu` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fk_order_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_order_vendor` FOREIGN KEY (`vendorId`) REFERENCES `user` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `fk_order_item_item` FOREIGN KEY (`itemId`) REFERENCES `itemss` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_order_item_order` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `fk_recipe_item` FOREIGN KEY (`itemId`) REFERENCES `itemss` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `fk_transaction_order` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_transaction_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_transaction_vendor` FOREIGN KEY (`vendorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
