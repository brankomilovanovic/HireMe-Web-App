<?php

namespace App\Entity;

use App\Entity\Enum\AdStatusEnum;
use App\Entity\Enum\AdTypeEnum;
use App\Entity\Enum\JobTypeEnum;
use App\Repository\AdRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AdRepository::class)]
class Ad extends BaseEntity
{
    #[ORM\Column(type: "string")]
    #[Groups(['basic'])]
    private string $title;

    #[ORM\Column(type: "text")]
    #[Groups(["basic"])]
    private string $description;

    #[ORM\Column(type: "text")]
    #[Groups(["basic"])]
    private string $shortDescription;

    #[ORM\Column(type: "string")]
    #[Groups(["basic"])]
    private string $city;

    #[ORM\Column(type: "string")]
    #[Groups(["basic"])]
    private string $address;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(["basic"])]
    private ?string $workingHours;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    #[Groups(['basic'])]
    private User $user;

    #[ORM\Column(type: "integer", nullable: true, enumType: JobTypeEnum::class)]
    #[Groups(["basic"])]
    private JobTypeEnum $jobType;

    #[ORM\Column(type: "integer", nullable: true, enumType: AdTypeEnum::class)]
    #[Groups(["basic"])]
    private AdTypeEnum $adType;

    #[ORM\Column(type: "integer", nullable: true, enumType: AdStatusEnum::class)]
    #[Groups(["basic"])]
    private AdStatusEnum $adStatus;

    #[ORM\Column(type: "decimal", precision: 8, scale: 2, nullable: true)]
    #[Groups(["basic"])]
    private ?float $salary;

    #[ORM\OneToMany(mappedBy: "ad", targetEntity: AdShift::class)]
    #[Groups(["basic"])]
    private $shifts;

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getShortDescription(): ?string
    {
        return $this->shortDescription;
    }

    public function setShortDescription(string $shortDescription): self
    {
        $this->shortDescription = $shortDescription;

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


    public function getWorkingHours(): ?int
    {
        return $this->workingHours;
    }

    public function setWorkingHours(int $workingHours): self
    {
        $this->workingHours = $workingHours;

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

    public function getShifts()
    {
        return $this->shifts;
    }

    public function setShifts(array $shifts): self
    {
        $this->shifts = $shifts;
        return $this;
    }

    public function getJobType(): ?JobTypeEnum
    {
        return $this->jobType;
    }


    public function setJobType(JobTypeEnum $jobType): self
    {
        $this->jobType = $jobType;

        return $this;
    }

    public function getAdType(): ?AdTypeEnum
    {
        return $this->adType;
    }


    public function setAdType(AdTypeEnum $adType): self
    {
        $this->adType = $adType;

        return $this;
    }

    public function getAdStatus(): ?AdStatusEnum
    {
        return $this->adStatus;
    }


    public function setAdStatus(AdStatusEnum $adStatus): self
    {
        $this->adStatus = $adStatus;

        return $this;
    }

    public function getSalary(): ?float
    {
        return $this->salary;
    }


    public function setSalary(float $salary): self
    {
        $this->salary = $salary;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }


    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }
}