CREATE TABLE `payment_reminder` (
  `payment_reminder_id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `domain_link` VARCHAR(255) NOT NULL,
  `product` VARCHAR(255) NOT NULL,
  `first_alert` BOOLEAN NOT NULL,
  `second_alert` BOOLEAN NOT NULL,
  `disconnect_site` BOOLEAN NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `modification_date` DATETIME NOT NULL,
  `created_by` VARCHAR(255) NOT NULL,
  `modified_by` VARCHAR(255) NOT NULL,
  `db_name` VARCHAR(255) NOT NULL,
  `server_name` VARCHAR(255) NOT NULL,
  `alert_type` VARCHAR(255) NOT NULL,
  `cron_run` BOOLEAN NOT NULL,
  PRIMARY KEY (`payment_reminder_id`)
);