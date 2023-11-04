<?php

namespace App\Repository;

use App\Entity\Application;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class ApplicationRepository extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = Application::class;
        parent::__construct($registry, $paginator);
    }

    public function getByAdAndUser($ad, $user, $deleted = false) {
        return $this->findOneBy([
            'ad' => $ad,
            'user' => $user,
            'deleted' => $deleted,
        ]);
    }
}




