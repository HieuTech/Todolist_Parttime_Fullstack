-- CreateTable
CREATE TABLE `Todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `todo_title` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
