CREATE TABLE `users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255),
  `display_name` varchar(255),
  `fullname` varchar(255),
  `role` varchar(255) NOT NULL DEFAULT "user",
  `location` varchar(255),
  `photo` varchar(255),
  `last_login` timestamp,
  `verified` tinyint NOT NULL DEFAULT 0,
  `verified_at` timestamp,
  `is_banned` tinyint NOT NULL DEFAULT 0,
  `last_visited_page` varchar(255),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `questions` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `user_id` bigint,
  `edited` tinyint NOT NULL DEFAULT 0,
  `status` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `replies` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `reply` text NOT NULL,
  `question_id` bigint,
  `user_id` bigint,
  `edited` tinyint NOT NULL DEFAULT 0,
  `status` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `ratings` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `question_id` bigint,
  `user_id` bigint,
  `up_vote` tinyint NOT NULL DEFAULT 0,
  `down_vote` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `subscriptions` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `question_id` bigint,
  `user_id` bigint,
  `status` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `questions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `replies` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `replies` ADD FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ratings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ratings` ADD FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `subscriptions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `subscriptions` ADD FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;