<?php

namespace App\Entity;

use App\Repository\NotificationRepositroy;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: NotificationRepositroy::class)]
class Notification extends BaseEntity
{
    #[ORM\Column(type: "string")]
    #[Groups(['basic'])]
    private ?string $title;

    #[ORM\Column(type: "string", nullable: true)]
    #[Groups(['basic'])]
    private ?string $description;

    #[ORM\Column(type: "boolean", nullable: true)]
    #[Groups(['basic'])]
    private ?bool $isRead;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "from_user_id", referencedColumnName: "id", nullable: true)]
    #[Groups(['basic'])]
    private User $fromUser;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "to_user_id", referencedColumnName: "id", nullable: true)]
    private User $toUser;

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function isRead(): bool
    {
        return $this->isRead;
    }

    public function setIsRead(bool $isRead): void
    {
        $this->isRead = $isRead;
    }

    public function getFromUser(): User
    {
        return $this->fromUser;
    }

    public function setFromUser(User $user): void
    {
        $this->fromUser = $user;
    }

    public function getToUser(): User
    {
        return $this->toUser;
    }

    public function setToUser(User $user): void
    {
        $this->toUser = $user;
    }
}
