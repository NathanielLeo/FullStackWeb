-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 16, 2024 at 07:45 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend_cdtt`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_banner`
--

CREATE TABLE `cdtt_banner` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `position` enum('slideshow','ads') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'slideshow',
  `sort_order` int UNSIGNED NOT NULL,
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_banner`
--

INSERT INTO `cdtt_banner` (`id`, `name`, `link`, `image`, `description`, `position`, `sort_order`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'banner1', 'banner01.jpg', 'banner01.jpg', 'Mô tả banner', 'slideshow', 1, 1, 1, '2024-07-30 13:31:11', '2024-10-07 07:03:28', 1),
(2, 'banner2', 'banner02.png', 'banner02.jpg', 'Mô tả banner', 'slideshow', 1, 1, 1, '2024-07-30 13:31:11', '2024-10-07 08:16:09', 1),
(3, 'banner3', 'banner03.webp', 'banner01.jpg', 'Mô tả banner', 'slideshow', 1, 1, 1, '2024-07-30 13:31:11', '2024-10-07 08:09:21', 1),
(4, 'banner4', 'banner04.jpg', 'banner04.jpg', 'Mô tả banner', 'slideshow', 1, 1, 1, '2024-07-30 13:31:11', '2024-10-07 08:07:02', 1),
(5, 'banner5', 'banner05.jpg', 'banner05.jpg', 'Mô tả banner', 'slideshow', 1, 1, 1, '2024-07-30 13:31:11', '2024-10-07 08:16:04', 1),
(17, 'banner5', 'banner05.jpg', 'banner05.jpg', 'Mô tả banner', 'slideshow', 1, 1, 1, '2024-07-30 13:31:11', '2024-10-07 08:16:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_brand`
--

CREATE TABLE `cdtt_brand` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `sort_order` int UNSIGNED NOT NULL DEFAULT '1',
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_brand`
--

INSERT INTO `cdtt_brand` (`id`, `name`, `slug`, `image`, `description`, `sort_order`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Levents', '1', 'br1.jpg', 'fdbdf', 1, 1, 1, '2024-10-12 22:31:06', '2024-10-12 22:31:06', 1),
(2, 'SWE', '1', 'br2.jpg', 'fdbdf', 1, 1, 1, '2024-10-12 22:31:06', '2024-10-12 22:31:06', 1),
(3, 'NOWSG\n', '1', 'br3.jpg', 'fdbdf', 1, 1, 1, '2024-10-12 22:31:06', '2024-10-12 22:31:06', 1),
(4, 'PARADOX', '1', 'br4.jpg', 'fdbdf', 1, 1, 1, '2024-10-12 22:31:06', '2024-10-12 22:31:06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_category`
--

CREATE TABLE `cdtt_category` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int UNSIGNED NOT NULL DEFAULT '0',
  `sort_order` int UNSIGNED NOT NULL DEFAULT '1',
  `image` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_category`
--

INSERT INTO `cdtt_category` (`id`, `name`, `slug`, `parent_id`, `sort_order`, `image`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Áo', 'sadsd', 3, 1, 'ctg1.jpg', 'Mô tả category', 1, NULL, '2023-09-22 07:00:08', '2023-09-22 07:25:33', 1),
(2, 'Giầy', 'ao-thun-nam', 0, 1, 'ctg2.jpg', 'Mô tả category', 1, NULL, '2023-09-22 07:02:19', '2023-09-22 07:02:19', 1),
(3, 'Dép và SANDAL', 'sadsad', 2, 1, 'ctg3.jpg', 'Mô tả category', 1, NULL, '2023-09-22 07:07:38', '2023-09-22 07:07:38', 1),
(4, 'Quần', 'dsfd safddsfdsfds fds fds fds fdsf', 3, 1, 'ctg4.jpg', 'Mô tả category', 1, NULL, '2023-09-22 07:08:09', '2023-09-22 07:08:09', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_config`
--

CREATE TABLE `cdtt_config` (
  `id` bigint UNSIGNED NOT NULL,
  `site_name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phones` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hotline` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zalo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_config`
--

INSERT INTO `cdtt_config` (`id`, `site_name`, `email`, `phones`, `address`, `hotline`, `zalo`, `facebook`, `status`) VALUES
(1, 'Nguyễn Tiến Hoàng Long', 'longh@gmail.com', '0394459156', '20 Tăng Nhơn Phú, Phước Long B, Tp. Thủ Đức, Hồ Chí Minh 715939, Việt Nam', '1900.633.349 ', 'https://www.zalo.me/0394459156', 'https://www.facebook.com/www.mwc.vn/', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_contact`
--

CREATE TABLE `cdtt_contact` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `replay_id` int UNSIGNED NOT NULL DEFAULT '0',
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_contact`
--

INSERT INTO `cdtt_contact` (`id`, `name`, `email`, `phone`, `title`, `content`, `replay_id`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Nathaniel Leo', 'longh@gmail.com', '0394459156', 'dsgfsd', 'gửggđsv', 1, 1, 1, '2024-10-17 08:26:17', '2024-10-17 08:26:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_menu`
--

CREATE TABLE `cdtt_menu` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_id` int UNSIGNED NOT NULL,
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_menu`
--

INSERT INTO `cdtt_menu` (`id`, `name`, `link`, `type`, `table_id`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'rghtg', 'dfdfsdf', 'sdvds', 1, 1, 1, '2024-10-17 09:19:13', '2024-10-17 09:19:13', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_order`
--

CREATE TABLE `cdtt_order` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_order`
--

INSERT INTO `cdtt_order` (`id`, `user_id`, `name`, `email`, `phone`, `address`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 'rgfdsv', 'fnfnbd', '546433', 'dfb', 1, '2024-10-24 08:33:38', '2024-10-17 08:33:38', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_orderdetail`
--

CREATE TABLE `cdtt_orderdetail` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `qty` int UNSIGNED NOT NULL,
  `price` double(12,2) UNSIGNED NOT NULL,
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_orderdetail`
--

INSERT INTO `cdtt_orderdetail` (`id`, `product_id`, `qty`, `price`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 1, 3453.00, 1, 1, '2024-10-17 01:34:05', '2024-10-17 01:34:05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_post`
--

CREATE TABLE `cdtt_post` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `topic_id` int UNSIGNED DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `thumbnail` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('post','page') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_post`
--

INSERT INTO `cdtt_post` (`id`, `title`, `topic_id`, `content`, `description`, `thumbnail`, `type`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Toàn văn lời điếu tại Lễ truy điệu Tổng Bí thư Nguyễn Phú Trọng', 1, 'Sự kiện và vấn đề', 'Ủy viên Bộ Chính trị, Chủ tịch nước Tô Lâm, Trưởng Ban Lễ tang đọc Lời điếu, tiễn đưa Tổng Bí thư Nguyễn Phú Trọng về nơi an nghỉ cuối cùng.Ngày 26/7, Lễ truy điệu đồng chí Nguyễn Phú Trọng, Tổng Bí thư Ban Chấp hành Trung ương Đảng Cộng sản Việt Nam được cử hành trọng thể theo nghi thức Quốc tang tại Nhà tang lễ Quốc gia, số 5 Trần Thánh Tông (Hà Nội), đồng thời Lễ truy điệu cũng được tổ chức tại Hội trường Thống Nhất (Thành phố Hồ Chí Minh) và quê nhà Tổng Bí thư tại xã Đông Hội, huyện Đông Anh (Hà Nội).', 'post1.png', 'post', 1, 1, '2024-10-17 09:21:56', '2024-10-30 09:21:56', 1),
(2, 'Hơn 3.100 hệ thống thông tin chưa triển khai đầy đủ phương án đảm bảo an toàn', 1, 'Sự kiện và vấn đề', 'Tính đến tháng 6/2024, trong số hơn 7.200 hệ thống thông tin của các cơ quan, tổ chức nhà nước, vẫn còn trên 3.100 hệ thống chưa triển khai đầy đủ phương án bảo đảm an toàn theo hồ sơ đề xuất cấp độ đã được duyệt...', 'post2.jpg', 'post', 1, 1, '2024-10-17 09:21:56', '2024-10-30 09:21:56', 1),
(3, 'Giá vàng đảo chiều tăng mạnh', 1, 'Sự kiện và vấn đề', 'Chốt phiên giao dịch rạng sáng nay (24/7), giá vàng giao ngay tại thị trường New York đã đảo chiều tăng mạnh hơn 13 USD/ounce. Trong nước, chiều qua, giá vàng miếng SJC vẫn duy trì ở mốc gần 80 triệu đồng/lượng ở chiều bán ra.', 'post3.jpg', 'post', 1, 1, '2024-10-17 09:21:56', '2024-10-30 09:21:56', 1),
(4, '16 nhà thiết kế Việt mở màn Tuần lễ Thời trang Thái Lan 2022', 1, 'Thời trang', 'Vietnam International Fashion Tour là tour diễn không chỉ kết nối các nhà thiết kế, giới mộ điệu thời trang và công chúng mà còn mang sứ mệnh lan tỏa, tôn vinh, quảng bá hình ảnh đất nước con người Việt Nam với công chúng quốc tế thông qua các câu chuyện thời trang. Sau thời gian dài “đóng băng” vì dịch Covid-19, sự kiện được kì vọng là điểm sáng lạc quan cho văn hóa, du lịch và thời trang Việt Nam.', 'post4.jpeg', 'post', 1, 1, '2024-10-17 09:21:56', '2024-10-30 09:21:56', 1),
(5, 'Thanh Hằng xuất hiện táo bạo', 1, 'Thời trang', 'Ngày 9/5, Tuần lễ thời trang Quốc tế Việt Nam Xuân Hè 2022 công bố chủ đề #ReFashion về nền thời trang phát triển bền vững sau đại dịch thu hút sự tham gia của hàng loạt các nhà thiết kế tên tuổi cùng nhiều thương hiệu thời trang trong nước và quốc tế.', 'post5.jpg', 'post', 1, 1, '2024-10-17 09:21:56', '2024-10-30 09:21:56', 1),
(6, 'Tuần lễ thời trang quốc tế Việt Nam Xuân Hè trở lại hậu đại dịch', 1, 'Thời trang', 'Ban tổ chức sự kiện đã nỗ lực vượt qua những khó khăn do ảnh hưởng của COVID-19 để mang đến tuần thời trang một màu sắc tươi sáng và thắp lên hy vọng phục hồi, phát triển cho nền thời trang Việt Nam.', 'post6.jpeg', 'post', 1, 1, '2024-10-17 09:21:56', '2024-10-30 09:21:56', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_product`
--

CREATE TABLE `cdtt_product` (
  `id` bigint UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `brand_id` int UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(12,2) UNSIGNED NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_product`
--

INSERT INTO `cdtt_product` (`id`, `category_id`, `brand_id`, `name`, `slug`, `detail`, `price`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 1, 'product1', 'dfsbdsf', 'sdvds', 2341.00, 'mô tả', 1, 1, '2024-10-07 14:31:10', '2024-11-07 14:17:57', 1),
(2, 2, 2, 'product02', 'dfsbdsf', 'sdvds', 2342.00, 'mô tả', 1, 1, '2024-10-07 14:31:10', '2024-10-07 14:31:10', 1),
(3, 3, 3, 'product04', 'dfsbdsf', 'sdvds', 123.00, 'mô tả', 1, 1, '2024-10-07 14:31:10', '2024-10-12 13:17:24', 1),
(4, 4, 4, 'product03', 'dfsbdsf', 'sdvds', 2341.00, 'mô tả', 1, 1, '2024-10-07 14:31:10', '2024-10-12 13:17:24', 1),
(8, 4, 4, 'product03', 'dfsbdsf', 'sdvds', 2341.00, 'mô tả', 1, 1, '2024-10-07 14:31:10', '2024-10-12 13:17:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_product_image`
--

CREATE TABLE `cdtt_product_image` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `thumbnail` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_product_image`
--

INSERT INTO `cdtt_product_image` (`id`, `product_id`, `thumbnail`) VALUES
(1, 1, 'sp1.jpg'),
(2, 2, 'sp2.jpg'),
(3, 3, 'sp3.jpg'),
(4, 4, 'sp4.jpg'),
(5, 8, 'sp3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_product_sale`
--

CREATE TABLE `cdtt_product_sale` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `price_sale` double(12,2) UNSIGNED NOT NULL,
  `date_begin` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_product_sale`
--

INSERT INTO `cdtt_product_sale` (`id`, `product_id`, `price_sale`, `date_begin`, `date_end`, `status`) VALUES
(1, 1, 456.00, '2024-10-28 02:54:11', '2024-11-05 00:00:00', 1),
(2, 2, 234.00, '2024-10-14 02:54:11', '2024-10-14 02:54:11', 1),
(3, 3, 456.00, '2024-10-14 02:54:11', '2024-10-14 02:54:11', 1),
(4, 4, 234.00, '2024-10-14 02:54:11', '2024-10-14 02:54:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_product_store`
--

CREATE TABLE `cdtt_product_store` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `type` enum('import','export') COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(12,2) UNSIGNED NOT NULL,
  `qty` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_product_store`
--

INSERT INTO `cdtt_product_store` (`id`, `product_id`, `type`, `price`, `qty`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 'export', 3453.00, 1, 1, '2024-10-14 10:52:35', '2024-10-14 10:52:35', 1),
(2, 1, 'import', 3453.00, 1, 1, '2024-10-14 10:52:35', '2024-10-14 10:52:35', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_topic`
--

CREATE TABLE `cdtt_topic` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int UNSIGNED NOT NULL DEFAULT '1',
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_topic`
--

INSERT INTO `cdtt_topic` (`id`, `name`, `slug`, `sort_order`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'dfhdfh', 'dsvds', 1, 'dvđvsv', 1, 1, '2024-10-17 10:16:19', '2024-10-17 10:16:19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cdtt_user`
--

CREATE TABLE `cdtt_user` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` enum('admin','customer') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `created_by` int UNSIGNED NOT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cdtt_user`
--

INSERT INTO `cdtt_user` (`id`, `name`, `password`, `fullname`, `gender`, `thumbnail`, `email`, `phone`, `address`, `roles`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Leo', '123456', 'Nathaniel Leo', 'male', 'a1.png', 'long@gmail.com', '0394459156', 'dsvs', 'admin', 1, 1, '2024-10-17 10:25:48', '2024-10-17 10:25:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_09_16_091727_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('yZ3tR9EhPeMypq5I4V5uprZ6T2Kos1rd70nEqg4F', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2JVWU9lc3lHZWVHa3M2bUZETUFWWDhISWNJOGxoNlpaZzVhT2hrUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1728229887);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cdtt_banner`
--
ALTER TABLE `cdtt_banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_brand`
--
ALTER TABLE `cdtt_brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_category`
--
ALTER TABLE `cdtt_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_config`
--
ALTER TABLE `cdtt_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_contact`
--
ALTER TABLE `cdtt_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_menu`
--
ALTER TABLE `cdtt_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_order`
--
ALTER TABLE `cdtt_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_orderdetail`
--
ALTER TABLE `cdtt_orderdetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_post`
--
ALTER TABLE `cdtt_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_product`
--
ALTER TABLE `cdtt_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_product_image`
--
ALTER TABLE `cdtt_product_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_product_sale`
--
ALTER TABLE `cdtt_product_sale`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_product_store`
--
ALTER TABLE `cdtt_product_store`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_topic`
--
ALTER TABLE `cdtt_topic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cdtt_user`
--
ALTER TABLE `cdtt_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cdtt_banner`
--
ALTER TABLE `cdtt_banner`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `cdtt_brand`
--
ALTER TABLE `cdtt_brand`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cdtt_category`
--
ALTER TABLE `cdtt_category`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cdtt_config`
--
ALTER TABLE `cdtt_config`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cdtt_contact`
--
ALTER TABLE `cdtt_contact`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cdtt_menu`
--
ALTER TABLE `cdtt_menu`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cdtt_order`
--
ALTER TABLE `cdtt_order`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cdtt_orderdetail`
--
ALTER TABLE `cdtt_orderdetail`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cdtt_post`
--
ALTER TABLE `cdtt_post`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cdtt_product`
--
ALTER TABLE `cdtt_product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cdtt_product_image`
--
ALTER TABLE `cdtt_product_image`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cdtt_product_sale`
--
ALTER TABLE `cdtt_product_sale`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cdtt_product_store`
--
ALTER TABLE `cdtt_product_store`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cdtt_topic`
--
ALTER TABLE `cdtt_topic`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cdtt_user`
--
ALTER TABLE `cdtt_user`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
