<?php

namespace App\Controller;

use App\Handler\UserSavedAdHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class UserSavedAdController extends BaseController
{
    private UserSavedAdHandler $handler;

    function __construct(UserSavedAdHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/userSavedAd', methods: ['POST'])]
    public function create(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->create($request, $user);
    }

    #[Route('/api/userSavedAd/{id}', methods: ['DELETE'])]
    public function delete(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->delete($id, $user);
    }

    #[Route('/api/userSavedAd/{id}', methods: ['GET'])]
    public function get(Request $request, int $id)
    {
        return $this->handler->get($request, $id);
    }

    #[Route('/api/userSavedAds/user/{id}', methods: ['GET'])]
    public function getAllAdsByUser(Request $request, int $id)
    {
        return $this->handler->getAllAdsByUser($request, $id);
    }

    #[Route('/api/userSavedAds/user/{id}/ids', methods: ['GET'])]
    public function getAllAdsIdsByUser(Request $request, int $id)
    {
        return $this->handler->getAllAdsIdsByUser($request, $id);
    }
}
