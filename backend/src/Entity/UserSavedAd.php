<?php

namespace App\Entity;

use App\Repository\AdShiftRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AdShiftRepository::class)]
class UserSavedAd extends BaseEntity
{
    #[ORM\ManyToOne(targetEntity: Ad::class)]
    #[ORM\JoinColumn(name: "ad_id", referencedColumnName: "id")]
    #[Groups(['basic'])]
    private Ad $ad;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    #[Groups(['basic'])]
    private User $user;

    public function getAd(): ?Ad
    {
        return $this->ad;
    }

    public function setAd(Ad $ad): self
    {
        $this->ad = $ad;
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
