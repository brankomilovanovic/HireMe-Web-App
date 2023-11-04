<?php

namespace App\Repository;

use App\Entity\UserCompany;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class UserCompanyRepository extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = UserCompany::class;
        parent::__construct($registry, $paginator);
    }
}




