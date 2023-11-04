<?php

namespace App\Repository;

use App\Entity\AdShift;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class AdShiftRepository extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = AdShift::class;
        parent::__construct($registry, $paginator);
    }
}




