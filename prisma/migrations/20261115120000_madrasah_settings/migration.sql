-- CreateTable
CREATE TABLE `madrasah_settings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `nama_madrasah` VARCHAR(150) NOT NULL,
    `npsn` VARCHAR(20) NULL,
    `alamat` VARCHAR(255) NULL,
    `telepon` VARCHAR(30) NULL,
    `email` VARCHAR(100) NULL,
    `website` VARCHAR(100) NULL,
    `kepala_madrasah` VARCHAR(100) NULL,
    `nama_organisasi` VARCHAR(50) NOT NULL DEFAULT 'OSIM',
    `tahun_pelajaran` VARCHAR(20) NOT NULL DEFAULT '2024/2025',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
