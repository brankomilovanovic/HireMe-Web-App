<?php

namespace App\Controller;

use App\Handler\UserIndividualHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class UserIndividualController extends BaseController
{
    private UserIndividualHandler $handler;

    function __construct(UserIndividualHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/userIndividual', methods: ['POST'])]
    public function create(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->create($request, $user);
    }

    #[Route('/api/userIndividual/{id}', methods: ['PUT'])]
    public function update(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->update($request, $id, $user);
    }

    #[Route('/api/userIndividual/{id}', methods: ['DELETE'])]
    public function delete(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->delete($id, $user);
    }

    #[Route('/api/userIndividuals', methods: ['GET'])]
    public function getAll(Request $request)
    {
        return $this->handler->getAll($request);
    }

    #[Route('/api/userIndividual/{id}', methods: ['GET'])]
    public function get(Request $request, int $id)
    {
        return $this->handler->get($request, $id);
    }

    #[Route('/api/userIndividual/user/{id}', methods: ['GET'])]
    public function getByUser(Request $request, int $id)
    {
        return $this->handler->get($request, $id, "user");
    }
}
