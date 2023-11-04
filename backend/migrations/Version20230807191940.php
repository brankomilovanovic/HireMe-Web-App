<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230807191940 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6498793FC17');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6494FBF094F');
        $this->addSql('DROP INDEX IDX_8D93D6494FBF094F ON user');
        $this->addSql('DROP INDEX IDX_8D93D6498793FC17 ON user');
        $this->addSql('ALTER TABLE user ADD company_id INT DEFAULT NULL, ADD individual_id INT DEFAULT NULL, DROP company, DROP individual');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649979B1AD6 FOREIGN KEY (company_id) REFERENCES user_company (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649AE271C0D FOREIGN KEY (individual_id) REFERENCES user_individual (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649979B1AD6 ON user (company_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649AE271C0D ON user (individual_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649979B1AD6');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649AE271C0D');
        $this->addSql('DROP INDEX IDX_8D93D649979B1AD6 ON user');
        $this->addSql('DROP INDEX IDX_8D93D649AE271C0D ON user');
        $this->addSql('ALTER TABLE user ADD company INT DEFAULT NULL, ADD individual INT DEFAULT NULL, DROP company_id, DROP individual_id');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6498793FC17 FOREIGN KEY (individual) REFERENCES user_individual (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6494FBF094F FOREIGN KEY (company) REFERENCES user_company (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6494FBF094F ON user (company)');
        $this->addSql('CREATE INDEX IDX_8D93D6498793FC17 ON user (individual)');
    }
}
