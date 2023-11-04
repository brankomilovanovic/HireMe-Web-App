<?php

namespace App\Handler;

use App\Entity\Ad;
use App\Entity\Enum\RoleEnum;
use App\Entity\User;
use App\Entity\UserSavedAd;
use App\Repository\UserSavedAdRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserSavedAdHandler extends BaseHandler
{
    public function __construct(UserSavedAdRepository $repository, SerializerInterface $serializer,
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

            if(!empty($entity)) {
                return $this->responseWithMessage('Ad does not exist', 400);
            }

            $userSavedAd = new UserSavedAd();
            $userSavedAd->setUser($user);
            $userSavedAd->setAd($ad);

            return $this->response($this->repository->save($userSavedAd), true);
        }
        catch(\Exception $e){
          return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function delete(int $id, User $user)
    {
        try {
            $entity = $this->repository->get($id, 'ad');

            if(!empty($entity)) {

                if ($entity->getUser()->getId() !== $user->getId() && $user->getRole() !== RoleEnum::ROLE_ADMIN) {
                    return $this->forbiddendResponse();
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

    public function getAllAdsByUser(Request $request, $id)
    {
        try {
            $entities = $this->repository->getAll($request, $id, 'user');
            if (!empty($entities)) {
                $ads = [];
                foreach ($entities['items'] as $entity) {
                    $ads[] = $entity->getAd();
                }
                $entities['items'] = $ads;
                return $this->response($entities, $request->query->get('extend', false));
            }
            return $this->responseWithMessage('', 204);
        }
        catch(\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function getAllAdsIdsByUser(Request $request, $id)
    {
        try {
            $entities = $this->repository->getAllAdsIdsByUser($id);
            return $this->response($entities);
        }
        catch(\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }
}
