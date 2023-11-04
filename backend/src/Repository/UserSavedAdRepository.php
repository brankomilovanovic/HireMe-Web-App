<?php

namespace App\Repository;

use App\Entity\UserSavedAd;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class UserSavedAdRepository extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = UserSavedAd::class;
        parent::__construct($registry, $paginator);
    }

    public function getAllAdsIdsByUser($userId, $deleted = false) {
        $results = $this->createQueryBuilder('savedAd')
            ->select('ad.id')
            ->leftJoin('savedAd.user', 'user')
            ->leftJoin('savedAd.ad', 'ad')
            ->where('user.id = :userId')
            ->andWhere('user.deleted = false')
            ->andWhere('savedAd.deleted = :deleted')
            ->setParameter('userId', $userId)
            ->setParameter('deleted', $deleted)
            ->getQuery()
            ->getResult();
        return array_column($results, 'id');
    }
}




