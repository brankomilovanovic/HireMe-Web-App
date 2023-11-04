<?php

namespace App\Repository;

use App\Entity\UserIndividual;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class UserIndividualRepository extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = UserIndividual::class;
        parent::__construct($registry, $paginator);
    }
}




