<?php

namespace App\Handler;

use App\Entity\Ad;
use App\Entity\Enum\RoleEnum;
use App\Entity\User;
use App\Entity\UserSavedSearch;
use App\Repository\UserSavedSearchRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserSavedSearchHandler extends BaseHandler
{
    public function __construct(UserSavedSearchRepository $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em)
    {
        parent::__construct($repository, $serializer, $passwordEncoder, $em);
    }

    public function create(Request $request, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            if (!isset($params['what']) && !isset($params['where'])) {
                return $this->parameterMissingResponse();
            }

            $user = $this->em->getRepository(User::class)->get($user->getId());

            if(empty($user)) {
                return $this->responseWithMessage('User does not exist', 400);
            }

            $userSavedSearch = $this->repository->getSavedSearchByWhatOrWhere($params['what'] ?? '', $params['where'] ?? '', $user);

            if(!empty($userSavedSearch)) {
                return $this->responseWithMessage('Already exist', 409);
            }

            $userSavedSearch = new UserSavedSearch();
            if(isset($params['where'])) {
                $userSavedSearch->setWhereSearch($params['where']);
            }
            if(isset($params['what'])) {
                $userSavedSearch->setWhatSearch($params['what']);
            }
            $userSavedSearch->setUser($user);

            return $this->response($this->repository->save($userSavedSearch), true);
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

    public function getAllByUser(Request $request, User $user)
    {
        try {
            $entities = $this->repository->getAll($request, $user, 'user');

            if (!empty($entities)) {
                $transformedEntities = [];

                foreach ($entities['items'] as $entity) {
                    $transformedEntities[] = [
                        'item' => $entity,
                        'count' => $this->em->getRepository(Ad::class)->getAllAdsByWhatOrWhere($entity->getWhatSearch(), $entity->getWhereSearch(), true)
                    ];
                }

                return $this->response($transformedEntities);
            }

            return $this->responseWithMessage('', 204);
        } catch (\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

}
