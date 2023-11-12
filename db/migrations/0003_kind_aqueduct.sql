ALTER TABLE `features` MODIFY COLUMN `included` boolean NOT NULL DEFAULT true;--> statement-breakpoint
ALTER TABLE `plan` MODIFY COLUMN `pre_header` varchar(100) NOT NULL;