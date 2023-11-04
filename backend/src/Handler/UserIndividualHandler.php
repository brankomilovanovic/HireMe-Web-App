<?php

namespace App\Handler;

use App\Entity\User;
use App\Entity\UserIndividual;
use App\Repository\UserIndividualRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserIndividualHandler extends BaseHandler
{
    public function __construct(UserIndividualRepository $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em)
    {
        parent::__construct($repository, $serializer, $passwordEncoder, $em);
    }

    public function create(Request $request, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            $user = $this->em->getRepository(User::class)->get($user->getId());

            if (!$user) {
                return $this->responseWithMessage('User dont exist', 400);
            }

            $userIndividual = $this->repository->get($user->getId(), 'user');

            if($userIndividual) {
                return $this->responseWithMessage('User is already individual!', 409);
            }

            $userIndividual = new UserIndividual();
            $userIndividual->setUser($user);

            return $this->response($this->repository->save($userIndividual), true);
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
