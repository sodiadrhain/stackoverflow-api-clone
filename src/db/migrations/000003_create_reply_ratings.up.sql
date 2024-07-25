CREATE TABLE `reply_ratings` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `reply_id` bigint,
  `user_id` bigint,
  `up_vote` tinyint NOT NULL DEFAULT 0,
  `down_vote` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `reply_ratings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `reply_ratings` ADD FOREIGN KEY (`reply_id`) REFERENCES `replies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;