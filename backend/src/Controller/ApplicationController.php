<?php

namespace App\Controller;

use App\Handler\ApplicationHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class ApplicationController extends BaseController
{
    private ApplicationHandler $handler;

    function __construct(ApplicationHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/application', methods: ['POST'])]
    public function create(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->create($request, $user);
    }

    #[Route('/api/application/{id}/status', methods: ['PATCH'])]
    public function changeStatus(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->changeStatus($request, $id, $user);
    }

    #[Route('/api/application/{id}', methods: ['PUT'])]
    public function update(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->update($request, $id, $user);
    }

    #[Route('/api/application/{id}', methods: ['DELETE'])]
    public function delete(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->delete($id, $user);
    }

    #[Route('/api/applications', methods: ['GET'])]
    public function getAll(Request $request)
    {
        return $this->handler->getAll($request);
    }

    #[Route('/api/applications/user/{id}', methods: ['GET'])]
    public function getAllByUser(Request $request, int $id)
    {
        return $this->handler->getAll($request, $id, 'user');
    }

    #[Route('/api/applications/ad/{id}', methods: ['GET'])]
    public function getAllByAd(Request $request, int $id)
    {
        return $this->handler->getAll($request, $id, 'ad');
    }

    #[Route('/api/application/{id}', methods: ['GET'])]
    public function get(Request $request, int $id)
    {
        return $this->handler->get($request, $id);
    }

    #[Route('/api/application/ad/{id}', methods: ['GET'])]
    public function getByAdAndUser(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->responseWithMessage('', 204);
        }

        return $this->handler->getByAdAndUser($id, $user);
    }
}
