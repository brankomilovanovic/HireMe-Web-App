<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230903163928 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CA6A7DC786');
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CAF8050BAA');
        $this->addSql('DROP INDEX IDX_BF5476CAF8050BAA ON notification');
        $this->addSql('DROP INDEX IDX_BF5476CA6A7DC786 ON notification');
        $this->addSql('ALTER TABLE notification ADD from_user_id INT DEFAULT NULL, ADD to_user_id INT DEFAULT NULL, DROP from_user, DROP to_user');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CA2130303A FOREIGN KEY (from_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CA29F6EE60 FOREIGN KEY (to_user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_BF5476CA2130303A ON notification (from_user_id)');
        $this->addSql('CREATE INDEX IDX_BF5476CA29F6EE60 ON notification (to_user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CA2130303A');
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CA29F6EE60');
        $this->addSql('DROP INDEX IDX_BF5476CA2130303A ON notification');
        $this->addSql('DROP INDEX IDX_BF5476CA29F6EE60 ON notification');
        $this->addSql('ALTER TABLE notification ADD from_user INT DEFAULT NULL, ADD to_user INT DEFAULT NULL, DROP from_user_id, DROP to_user_id');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CA6A7DC786 FOREIGN KEY (to_user) REFERENCES user (id)');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CAF8050BAA FOREIGN KEY (from_user) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_BF5476CAF8050BAA ON notification (from_user)');
        $this->addSql('CREATE INDEX IDX_BF5476CA6A7DC786 ON notification (to_user)');
    }
}
