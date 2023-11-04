<?php

namespace App\Repository;

use App\Entity\Ad;
use App\Entity\Enum\AdStatusEnum;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class AdRepository extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = Ad::class;
        parent::__construct($registry, $paginator);
    }

    public function getMyAdsByStatus($userId, $status, $count = false, $deleted = false) {
        $queryBuilder = $this->createQueryBuilder('ad')
            ->where('ad.user = :userId')
            ->andWhere('ad.adStatus = :status')
            ->andWhere('ad.deleted = :deleted')
            ->setParameter('userId', $userId)
            ->setParameter('status', $status)
            ->setParameter('deleted', $deleted);
        if ($count) {
            return $queryBuilder->select('COUNT(ad.id)')->getQuery()->getSingleScalarResult();
        } else {
            return $queryBuilder->getQuery()->getResult();
        }
    }

    public function getAllAdsByWhatOrWhere($what = '', $where = '', $count = false, $status = AdStatusEnum::ACTIVE, $deleted = false) {
        $queryBuilder = $this->createQueryBuilder('ad')
            ->join("ad.user", 'user')
            ->where('ad.deleted = :deleted')
            ->andWhere('user.deleted = :deleted')
            ->andWhere('ad.adStatus = :status')
            ->setParameter('deleted', $deleted)
            ->setParameter('status', $status);

        $orX = $queryBuilder->expr()->orX();

        if (!empty($where)) {
            $orX->add($queryBuilder->expr()->like("ad.address", ":where"));
            $orX->add($queryBuilder->expr()->like("ad.city", ":where"));
            $queryBuilder->andWhere($orX)->setParameter('where', '%'.$where.'%');
        }

        if (!empty($what)) {
            $orX->add($queryBuilder->expr()->like("ad.title", ":what"));
            $orX->add($queryBuilder->expr()->like("ad.description", ":what"));
            $queryBuilder->andWhere($orX)->setParameter('what', '%'.$what.'%');
        }

        if ($count) {
            return $queryBuilder->select('COUNT(ad.id)')->getQuery()->getSingleScalarResult();
        } else {
            return $queryBuilder->getQuery()->getResult();
        }
    }
}




