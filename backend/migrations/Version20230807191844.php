<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230807191844 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD userCompany_id INT DEFAULT NULL, ADD userIndividual_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64995BA35FF FOREIGN KEY (userCompany_id) REFERENCES user_company (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649C7CE4953 FOREIGN KEY (userIndividual_id) REFERENCES user_individual (id)');
        $this->addSql('CREATE INDEX IDX_8D93D64995BA35FF ON user (userCompany_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649C7CE4953 ON user (userIndividual_id)');
        $this->addSql('ALTER TABLE user_company DROP FOREIGN KEY FK_17B21745A76ED395');
        $this->addSql('DROP INDEX IDX_17B21745A76ED395 ON user_company');
        $this->addSql('ALTER TABLE user_company DROP user_id');
        $this->addSql('ALTER TABLE user_individual DROP FOREIGN KEY FK_20F43AFBA76ED395');
        $this->addSql('DROP INDEX IDX_20F43AFBA76ED395 ON user_individual');
        $this->addSql('ALTER TABLE user_individual ADD address VARCHAR(255) DEFAULT NULL, DROP user_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64995BA35FF');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649C7CE4953');
        $this->addSql('DROP INDEX IDX_8D93D64995BA35FF ON user');
        $this->addSql('DROP INDEX IDX_8D93D649C7CE4953 ON user');
        $this->addSql('ALTER TABLE user DROP userCompany_id, DROP userIndividual_id');
        $this->addSql('ALTER TABLE user_company ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_company ADD CONSTRAINT FK_17B21745A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_17B21745A76ED395 ON user_company (user_id)');
        $this->addSql('ALTER TABLE user_individual ADD user_id INT DEFAULT NULL, DROP address');
        $this->addSql('ALTER TABLE user_individual ADD CONSTRAINT FK_20F43AFBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_20F43AFBA76ED395 ON user_individual (user_id)');
    }
}
