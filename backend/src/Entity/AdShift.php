<?php

namespace App\Entity;

use App\Entity\Enum\ShiftTypeEnum;
use App\Repository\AdShiftRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AdShiftRepository::class)]
class AdShift extends BaseEntity
{
    #[ORM\Column(type: "string", nullable: true)]
    #[Groups(['basic'])]
    private ?string $name;

    #[ORM\Column(type: "integer", enumType: ShiftTypeEnum::class)]
    #[Groups(["basic"])]
    private ShiftTypeEnum $shiftType;

    #[ORM\ManyToOne(targetEntity: Ad::class, inversedBy: "shifts")]
    #[ORM\JoinColumn(name: "ad_id", referencedColumnName: "id")]
    private Ad $ad;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getAd(): ?Ad
    {
        return $this->ad;
    }

    public function setAd(Ad $ad): self
    {
        $this->ad = $ad;
        return $this;
    }

    public function getShiftType(): ?ShiftTypeEnum
    {
        return $this->shiftType;
    }

    public function setType(ShiftTypeEnum $shiftType): self
    {
        $this->shiftType = $shiftType;
        return $this;
    }
}
