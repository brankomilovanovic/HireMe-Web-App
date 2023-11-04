<?php

namespace App\Handler;

use App\Entity\User;
use App\Repository\NotificationRepositroy;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class NotificationHandler extends BaseHandler
{
    public function __construct(NotificationRepositroy $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em)
    {
        parent::__construct($repository, $serializer, $passwordEncoder, $em);
    }

    public function read(int $id, User $user)
    {
        try {

            $user = $this->em->getRepository(User::class)->get($user->getId());
            $entity = $this->repository->get($id);

            if (!empty($entity)) {

                if ($entity->getToUser()->getId() !== $user->getId()) {
                    return $this->responseWithMessage("Dont have permission to update this", 401);
                }

                $entity->setIsRead(true);
                $entity->setDateUpdated(new \DateTime());

                return $this->response($this->repository->save($entity, true), true);
            }
            return $this->responseWithMessage('Not exist entity under that ID!', 404);
        }
        catch(\Exception $e){
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function readAll(User $user)
    {
        try {
            $notifications = $this->repository->getAllNotificationsByUser($user->getId());

            foreach ($notifications as $notification) {
                if (!empty($notification)) {
                    $notification->setIsRead(true);
                    $notification->setDateUpdated(new \DateTime());
                    $this->response($this->repository->save($notification, true), true);
                }
            }

            return $this->responseWithMessage('', 200);
        }
        catch(\Exception $e){
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }
}
