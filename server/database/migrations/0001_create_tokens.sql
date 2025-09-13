CREATE TABLE `tokens` (
	`email` text,
	`hash` text NOT NULL,
	FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tokens_email_unique` ON `tokens` (`email`);