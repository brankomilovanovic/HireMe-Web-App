<?php

namespace App\Entity;

use App\Repository\UserIndividualRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserIndividualRepository::class)]
class UserIndividual extends BaseEntity
{
    #[ORM\Column(type: "string", nullable: true)]
    #[Groups(['basic'])]
    private ?string $address;

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
