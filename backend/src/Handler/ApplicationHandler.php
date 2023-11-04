<?php

namespace App\Handler;

use App\Entity\Ad;
use App\Entity\Application;
use App\Entity\Enum\RoleEnum;
use App\Entity\Notification;
use App\Entity\User;
use App\Repository\ApplicationRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class ApplicationHandler extends BaseHandler
{
    public function __construct(ApplicationRepository $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em)
    {
        parent::__construct($repository, $serializer, $passwordEncoder, $em);
    }

    public function create(Request $request, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            if (!isset($params['adId'])) {
                return $this->parameterMissingResponse();
            }

            $user = $this->em->getRepository(User::class)->get($user->getId());
            $ad = $this->em->getRepository(Ad::class)->get($params['adId']);

            if (!$ad) {
                return $this->responseWithMessage('Ad dont exist', 400);
            }

            if($ad->getUser()->getId() === $user->getId()) {
                return $this->responseWithMessage('Cannot send application for self ad', 400);
            }

            $application = $this->repository->getByAdAndUser($ad->getId(), $user->getId());
            if($application) {
                return $this->responseWithMessage('Application already sent', 400);
            }

            $application = new Application();
            $application->setUser($user);
            $application->setAd($ad);

            if(isset($params['aboutYourself'])) {
                $application->setAboutYourself($params['aboutYourself']);
            }

            if(isset($params['motivationalLetter'])) {
                $application->setMotivationalLetter($params['motivationalLetter']);
            }

            $notification = new Notification();
            $notification->setTitle("<span>{$user->getName()} {$user->getSurname()} je poslao prijavu na oglas '<a href='/my-ads?adId={$ad->getId()}&showApplications=true'>{$ad->getTitle()}</a>'.</span>");
            $notification->setFromUser($user);
            $notification->setToUser($ad->getUser());
            $notification->setIsRead(false);
            $this->em->getRepository(Notification::class)->save($notification);

            return $this->response($this->repository->save($application), true);
        }
        catch(\Exception $e){
          return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function update(Request $request, int $id, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            $entity = $this->repository->get($id);

            if (!empty($entity)) {

                if ($entity->getUser()->getId() !== $user->getId() && $user->getRole() !== RoleEnum::ROLE_ADMIN) {
                    return $this->responseWithMessage("Dont have permission to update this", 401);
                }

                if(isset($params['adId'])) {
                    $ad = $this->em->getRepository(Ad::class)->get($params['adId']);
                    $entity->setAd($ad);
                }

                $entity->setDateUpdated(new \DateTime());

                return $this->response($this->repository->save($entity, true), true);
            }
            return $this->responseWithMessage('Not exist entity under that ID!', 404);
        }
        catch(\Exception $e){
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function delete(int $id, User $user)
    {
        try {
            $entity = $this->repository->get($id);

            if(!empty($entity)) {

                if ($entity->getUser()->getId() !== $user->getId() && $user->getRole() !== RoleEnum::ROLE_ADMIN) {
                    return $this->responseWithMessage("Dont have permission to update this", 401);
                }

                $entity->setDeleted(true);
                $this->repository->save($entity, true);
                return $this->responseWithMessage('Deleted', 200);
            }

            return $this->responseWithMessage('Not exist entity under that ID!', 404);
        }
        catch(\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function changeStatus(Request $request, int $id, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            if (!isset($params['status'])) {
                return $this->parameterMissingResponse();
            }

            $entity = $this->repository->get($id);

            if (!empty($entity)) {

                if (($entity->getUser()->getId() !== $user->getId() && $entity->getAd()->getUser()->getId() !== $user->getId()) && $user->getRole() !== RoleEnum::ROLE_ADMIN) {
                    return $this->responseWithMessage("Dont have permission to update this", 401);
                }

                $entity->setStatus($params['status']);
                $entity->setDateUpdated(new \DateTime());

                $notification = new Notification();
                $statusText = $params['status'] ? 'prihvatio' : 'odbio';
                $notification->setTitle("<span>{$entity->getAd()->getUser()->getName()} {$entity->getAd()->getUser()->getSurname()} je {$statusText} vasu prijavu na oglasu '<a href=''>{$entity->getAd()->getTitle()}</a>'.</span>");
                $notification->setFromUser($entity->getAd()->getUser());
                $notification->setToUser($entity->getUser());
                $notification->setIsRead(false);
                $this->em->getRepository(Notification::class)->save($notification);

                return $this->response($this->repository->save($entity, true), true);
            }
            return $this->responseWithMessage('Not exist entity under that ID!', 404);
        }
        catch(\Exception $e){
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function getByAdAndUser(int $id, User $user)
    {
        try {
            $entities = $this->repository->getByAdAndUser($id, $user->getId());
            return $this->response($entities);
        }
        catch(\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }
}
