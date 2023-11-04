<?php

namespace App\Controller;

use App\Entity\Enum\AdStatusEnum;
use App\Handler\AdHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class AdController extends BaseController
{
    private AdHandler $handler;

    function __construct(AdHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/ad', methods: ['POST'])]
    public function create(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->create($request, $user);
    }

    #[Route('/api/ad/{id}', methods: ['PUT'])]
    public function update(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->update($request, $id, $user);
    }

    #[Route('/api/ad/status/{id}/{status}', methods: ['PATCH'])]
    public function updateAdStatus(Request $request, int $id, int $status)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->updateAdStatus($request, $id, $status, $user);
    }

    #[Route('/api/ad/{id}', methods: ['DELETE'])]
    public function delete(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->delete($id, $user);
    }

    #[Route('/api/ads', methods: ['GET'])]
    public function getAll(Request $request)
    {
        $params = json_decode($request->getContent(), true);
        return $this->handler->getAll($request, isset($params['adStatus']) ? $params['adStatus'] : AdStatusEnum::ACTIVE, 'adStatus');
    }

    #[Route('/api/ad/{id}', methods: ['GET'])]
    public function get(Request $request, int $id)
    {
        return $this->handler->get($request, $id);
    }

    #[Route('/api/ads/my/count/{status}', methods: ['GET'])]
    public function getMyAdsCount(Request $request, int $status)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->getMyAdsByStatus($user, $status, true);
    }

    #[Route('/api/ads/my/{status}', methods: ['GET'])]
    public function getMyAds(Request $request, int $status)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->getMyAdsByStatus($user, $status);
    }

    #[Route('/api/ad/user/{id}', methods: ['GET'])]
    public function getByUser(Request $request, int $id)
    {
        return $this->handler->get($request, $id, "user");
    }

    #[Route('/api/ads/user/{id}', methods: ['GET'])]
    public function getAllByUser(Request $request, int $id)
    {
        return $this->handler->getAll($request, $id, "user");
    }
}
