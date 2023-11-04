<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230806191629 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ad_shift (id INT AUTO_INCREMENT NOT NULL, ad_id INT DEFAULT NULL, shift INT NOT NULL, date_created DATETIME NOT NULL, date_updated DATETIME NOT NULL, deleted TINYINT(1) NOT NULL, INDEX IDX_986B61C04F34D596 (ad_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE ad_shift ADD CONSTRAINT FK_986B61C04F34D596 FOREIGN KEY (ad_id) REFERENCES ad (id)');
        $this->addSql('ALTER TABLE ad DROP shifts');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ad_shift DROP FOREIGN KEY FK_986B61C04F34D596');
        $this->addSql('DROP TABLE ad_shift');
        $this->addSql('ALTER TABLE ad ADD shifts VARCHAR(255) DEFAULT NULL');
    }
}
