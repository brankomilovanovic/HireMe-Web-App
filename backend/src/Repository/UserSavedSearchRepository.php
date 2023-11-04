<?php

namespace App\Repository;

use App\Entity\UserSavedSearch;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class UserSavedSearchRepository extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = UserSavedSearch::class;
        parent::__construct($registry, $paginator);
    }

    public function getSavedSearchByWhatOrWhere($what = '', $where = '', $user, $deleted = false) {
        $criteria = [
            'user' => $user,
            'deleted' => $deleted,
        ];

        if (!empty($what)) {
            $criteria['whatSearch'] = $what;
        }

        if (!empty($where)) {
            $criteria['whereSearch'] = $where;
        }

        return $this->findOneBy($criteria);
    }

}




