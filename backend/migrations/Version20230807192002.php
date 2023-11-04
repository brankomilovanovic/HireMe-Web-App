<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230807192002 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649AE271C0D');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649979B1AD6');
        $this->addSql('DROP INDEX IDX_8D93D649979B1AD6 ON user');
        $this->addSql('DROP INDEX IDX_8D93D649AE271C0D ON user');
        $this->addSql('ALTER TABLE user ADD userCompany_id INT DEFAULT NULL, ADD userIndividual_id INT DEFAULT NULL, DROP company_id, DROP individual_id');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64995BA35FF FOREIGN KEY (userCompany_id) REFERENCES user_company (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649C7CE4953 FOREIGN KEY (userIndividual_id) REFERENCES user_individual (id)');
        $this->addSql('CREATE INDEX IDX_8D93D64995BA35FF ON user (userCompany_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649C7CE4953 ON user (userIndividual_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64995BA35FF');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649C7CE4953');
        $this->addSql('DROP INDEX IDX_8D93D64995BA35FF ON user');
        $this->addSql('DROP INDEX IDX_8D93D649C7CE4953 ON user');
        $this->addSql('ALTER TABLE user ADD company_id INT DEFAULT NULL, ADD individual_id INT DEFAULT NULL, DROP userCompany_id, DROP userIndividual_id');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649AE271C0D FOREIGN KEY (individual_id) REFERENCES user_individual (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649979B1AD6 FOREIGN KEY (company_id) REFERENCES user_company (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649979B1AD6 ON user (company_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649AE271C0D ON user (individual_id)');
    }
}
