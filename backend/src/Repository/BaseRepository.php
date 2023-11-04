<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;

class BaseRepository extends ServiceEntityRepository
{
    protected $class;
    protected $paginator;

    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        parent::__construct($registry, $this->class);
        $this->paginator = $paginator;
    }

    public function get($value, string $criteria = "id", bool $deleted = false)
    {
        return $this->findOneBy([
            $criteria => $value,
            'deleted' => $deleted
        ]);
    }

    public function getAll(Request $request, $value, $criteria = '', bool $deleted = false)
    {
        $page = $request->query->get('page', 1);
        $perPage = $request->query->get('perPage', 10);
        $term = $request->query->get('term', '');
        $sortBy = $request->query->get('sortBy', 'date_created');
        $sortOrder = $request->query->get('sortOrder', 'DESC');
        $searchFields = $request->query->get('searchFields') !== null ? explode(",", $request->query->get('searchFields')) : [];
        $what = $request->query->get('what', '');
        $where = $request->query->get('where', '');

        $queryBuilder = $this->createQueryBuilder('entity')
            ->where('entity.deleted = :deleted')
            ->setParameter('deleted', $deleted);

        $conditions = [
            'user' => 'user',
            'fromUser' => 'fromUser',
            'toUser' => 'toUser',
        ];

        foreach ($conditions as $associationName => $alias) {
            if ($this->getClassMetadata()->hasAssociation($associationName) && !$this->getClassMetadata()->hasAssociation('ad')) {
                $queryBuilder
                    ->join("entity.$associationName", $alias)
                    ->andWhere("$alias.deleted = false");
            }
        }

        if ($this->getClassMetadata()->hasAssociation('ad')) {
            $queryBuilder
                ->join("entity.ad", 'ad')
                ->leftJoin('ad.user', 'user')
                ->andWhere('user.deleted = false');
        }

        if ($value && $criteria) {
            $queryBuilder->andWhere("entity.$criteria = :$criteria")->setParameter($criteria, $value);
        }

        $queryBuilder->orderBy('entity.' . $sortBy, $sortOrder);

        if (!empty($term)) {
            $this->getSearchTerm($term, $searchFields, $queryBuilder);
        }

        $this->getSearchWhatOrWhere($what, $where, $queryBuilder);

        $query = $queryBuilder->getQuery();

        $total = $this->getTotalCount($queryBuilder);
        $results = $this->paginator->paginate($query, $page, $perPage);

        return [
            'total' => $total,
            'items' => $results,
        ];
    }

    public function save($entity, bool $flush = true)
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $entity;
    }

    private function getSearchWhatOrWhere($what = '', $where = '', $queryBuilder)
    {
        if ((!empty($what)) || (!empty($where))) {
            $orX = $queryBuilder->expr()->orX();

            if (!empty($where)) {
                $orX->add($queryBuilder->expr()->like("entity.address", ":where"));
                $orX->add($queryBuilder->expr()->like("entity.city", ":where"));
                $queryBuilder->andWhere($orX)->setParameter('where', '%'.$where.'%');
            }

            if (!empty($what)) {
                $orX->add($queryBuilder->expr()->like("entity.title", ":what"));
                $orX->add($queryBuilder->expr()->like("entity.description", ":what"));
                $queryBuilder->andWhere($orX)->setParameter('what', '%'.$what.'%');
            }
        }
    }

    private function getSearchTerm($term, $searchFields, $queryBuilder)
    {
        if(empty($searchFields)) {
            $searchFields = $this->getClassMetadata()->getFieldNames();
        }

        $orX = $queryBuilder->expr()->orX();

        foreach ($searchFields as $field) {
            $orX->add($queryBuilder->expr()->like("entity.$field", ":term"));
        }

        $queryBuilder->andWhere($orX)->setParameter('term', '%'.$term.'%');
    }

    private function getTotalCount($queryBuilder): int
    {
        $countQueryBuilder = clone $queryBuilder;
        $countQueryBuilder->resetDQLPart('orderBy');
        $countQuery = $countQueryBuilder->select('COUNT(entity.id)')->getQuery();
        $totalCount = $countQuery->getSingleScalarResult();
        return (int) $totalCount;
    }
}