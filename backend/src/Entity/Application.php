<?php

namespace App\Entity;

use App\Repository\ApplicationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ApplicationRepository::class)]
class Application extends BaseEntity
{
    #[ORM\ManyToOne(targetEntity: Ad::class)]
    #[ORM\JoinColumn(name: "ad_id", referencedColumnName: "id")]
    #[Groups(["basic"])]
    private Ad $ad;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    #[Groups(["basic"])]
    private User $user;

    #[ORM\Column(type: "boolean", nullable: true)]
    #[Groups(['basic'])]
    private bool $status;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(["basic"])]
    private string $aboutYourself;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(["basic"])]
    private string $motivationalLetter;

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

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getAboutYourself(): ?string
    {
        return $this->aboutYourself;
    }

    public function setAboutYourself(string $aboutYourself): self
    {
        $this->aboutYourself = $aboutYourself;

        return $this;
    }

    public function getMotivationalLetter(): ?string
    {
        return $this->motivationalLetter;
    }

    public function setMotivationalLetter(string $motivationalLetter): self
    {
        $this->motivationalLetter = $motivationalLetter;

        return $this;
    }
}
