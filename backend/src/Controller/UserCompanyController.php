<?php

namespace App\Controller;

use App\Handler\UserCompanyHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class UserCompanyController extends BaseController
{
    private UserCompanyHandler $handler;

    function __construct(UserCompanyHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/userCompany', methods: ['POST'])]
    public function create(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->create($request, $user);
    }

    #[Route('/api/userCompany/{id}', methods: ['PUT'])]
    public function update(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->update($request, $id, $user);
    }

    #[Route('/api/userCompany/{id}', methods: ['DELETE'])]
    public function delete(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->delete($id, $user);
    }

    #[Route('/api/userCompanies', methods: ['GET'])]
    public function getAll(Request $request)
    {
        return $this->handler->getAll($request);
    }

    #[Route('/api/userCompany/{id}', methods: ['GET'])]
    public function get(Request $request, int $id)
    {
        return $this->handler->get($request, $id);
    }

    #[Route('/api/userCompany/user/{id}', methods: ['GET'])]
    public function getByUser(Request $request, int $id)
    {
        return $this->handler->get($request, $id, "user");
    }
}
