CREATE TABLE `subscription_notifications` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `question_id` bigint,
  `reply_id` bigint,
  `user_id` bigint,
  `status` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `subscription_notifications` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `subscription_notifications` ADD FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `subscription_notifications` ADD FOREIGN KEY (`reply_id`) REFERENCES `replies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;