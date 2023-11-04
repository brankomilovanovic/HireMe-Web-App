<?php

namespace App\Repository;

use App\Entity\Notification;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class NotificationRepositroy extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = Notification::class;
        parent::__construct($registry, $paginator);
    }

    public function getAllNotificationsByUser($user, $isRead = false, $deleted = false) {
        return $this->findBy([
            'toUser' => $user,
            'isRead' => $isRead,
            'deleted' => $deleted,
        ]);
    }
}




