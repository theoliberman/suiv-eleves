CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`passwordHash` text,
	`admin` integer DEFAULT false NOT NULL,
	`name` text GENERATED ALWAYS AS (UPPER(SUBSTR(SUBSTR("email", 1, INSTR("email", '@') - 1), 1, 1))
    || ' ' || UPPER(SUBSTR(SUBSTR("email", 1, INSTR("email", '@') - 1), 2, 1)) ||
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    SUBSTR(SUBSTR("email", 1, INSTR("email", '@') - 1), 3)
    , '0', ''),'1', ''),'2', ''),'3', ''),'4', ''),'5', ''),'6', ''),'7', ''),'8', ''),'9', '')) VIRTUAL NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);