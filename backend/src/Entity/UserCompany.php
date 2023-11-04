<?php

namespace App\Entity;

use App\Repository\UserCompanyRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserCompanyRepository::class)]
class UserCompany extends BaseEntity
{
    #[ORM\Column(type: "string", nullable: true)]
    #[Groups(['basic'])]
    private ?string $name;

    #[ORM\Column(type: "string", nullable: true)]
    #[Groups(['basic'])]
    private ?string $address;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }
}
