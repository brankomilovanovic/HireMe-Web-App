<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230810232022 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_saved_search (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, what VARCHAR(255) DEFAULT NULL, `where` VARCHAR(255) DEFAULT NULL, date_created DATETIME NOT NULL, date_updated DATETIME NOT NULL, deleted TINYINT(1) NOT NULL, INDEX IDX_503ADCBEA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_saved_search ADD CONSTRAINT FK_503ADCBEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_saved_search DROP FOREIGN KEY FK_503ADCBEA76ED395');
        $this->addSql('DROP TABLE user_saved_search');
    }
}
