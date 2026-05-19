PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_targets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`target_date` integer NOT NULL,
	`target_status` text DEFAULT 'NEW' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_targets`("id", "name", "description", "target_date", "target_status", "created_at", "updated_at") SELECT "id", "name", "description", "target_date", "target_status", "created_at", "updated_at" FROM `targets`;--> statement-breakpoint
DROP TABLE `targets`;--> statement-breakpoint
ALTER TABLE `__new_targets` RENAME TO `targets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;