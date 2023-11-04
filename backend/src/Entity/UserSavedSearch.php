<?php

namespace App\Entity;

use App\Repository\UserSavedSearchRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserSavedSearchRepository::class)]
class UserSavedSearch extends BaseEntity
{
    #[ORM\Column(type: "string", nullable: true)]
    #[Groups(["basic"])]
    private ?string $whatSearch;

    #[ORM\Column(type: "string", nullable: true)]
    #[Groups(["basic"])]
    private ?string $whereSearch;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    #[Groups(["basic"])]
    private User $user;

    public function getWhatSearch(): ?string
    {
        return $this->whatSearch;
    }

    public function setWhatSearch(string $whatSearch): self
    {
        $this->whatSearch = $whatSearch;
        return $this;
    }

    public function getWhereSearch(): ?string
    {
        return $this->whereSearch;
    }

    public function setWhereSearch(string $whereSearch): self
    {
        $this->whereSearch = $whereSearch;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

}
