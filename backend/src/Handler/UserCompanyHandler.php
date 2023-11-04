<?php

namespace App\Handler;

use App\Entity\Enum\RoleEnum;
use App\Entity\User;
use App\Entity\UserCompany;
use App\Repository\UserCompanyRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserCompanyHandler extends BaseHandler
{
    public function __construct(UserCompanyRepository $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em)
    {
        parent::__construct($repository, $serializer, $passwordEncoder, $em);
    }

    public function create(Request $request, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            if (!isset($params['userId'])) {
                return $this->parameterMissingResponse();
            }

            $user = $this->em->getRepository(User::class)->get($user->getId());

            if (!$user) {
                return $this->responseWithMessage('User dont exist', 400);
            }

            $userCompany = $this->repository->get($user->getId(), 'user');

            if($userCompany) {
                return $this->responseWithMessage('User already have company!', 409);
            }

            $userCompany = new UserCompany();
            if(isset($params['name'])) {
                $userCompany->setName($params['name']);
            }
            if(isset($params['address'])) {
                $userCompany->setAddress($params['address']);
            }
            $userCompany->setUser($user);

            return $this->response($this->repository->save($userCompany), true);
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

                if (isset($params['name'])) {
                    $entity->setName($params['name']);
                }

                if (isset($params['address'])) {
                    $entity->setSurname($params['address']);
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
}
