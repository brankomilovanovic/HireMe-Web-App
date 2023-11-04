<?php

namespace App\Controller;

use App\Handler\UserSavedSearchHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class UserSavedSearchController extends BaseController
{
    private UserSavedSearchHandler $handler;

    function __construct(UserSavedSearchHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/userSavedSearch', methods: ['POST'])]
    public function create(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->responseWithMessage('No found user', 401);
        }

        return $this->handler->create($request, $user);
    }

    #[Route('/api/userSavedSearch/{id}', methods: ['DELETE'])]
    public function delete(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->delete($id, $user);
    }

    #[Route('/api/userSavedSearch/user', methods: ['GET'])]
    public function getAllSavedSearchesByUser(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if (empty($user)) {
            return $this->responseWithMessage('No found user', 204);
        }

        return $this->handler->getAllByUser($request, $user);
    }

    #[Route('/api/userSavedSearch/user/last', methods: ['GET'])]
    public function getLastSavedSearchesByUser(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if (empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->get($request, $user, 'user');
    }
}
