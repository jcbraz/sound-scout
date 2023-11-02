CREATE TABLE `feedback` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`title` varchar(50) NOT NULL,
	`description` varchar(250) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`resolved` boolean DEFAULT false,
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playlist` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`prompt` varchar(250),
	`suggestion` varchar(1000),
	`url` varchar(65),
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `playlist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`first_name` varchar(50),
	`last_name` varchar(50),
	`credits` tinyint NOT NULL DEFAULT 5,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `playlist` (`user_id`);