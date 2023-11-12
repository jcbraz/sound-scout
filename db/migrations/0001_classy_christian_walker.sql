CREATE TABLE `features` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`plan_id` int NOT NULL,
	`feature` varchar(150) NOT NULL,
	CONSTRAINT `features_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `plan` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(25) NOT NULL,
	`pre_header` varchar(100),
	`credits` smallint NOT NULL,
	`price` decimal(3,2) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `plan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `playlist` MODIFY COLUMN `id` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `credits` smallint NOT NULL DEFAULT 5;--> statement-breakpoint
CREATE INDEX `plan_idx` ON `features` (`plan_id`);