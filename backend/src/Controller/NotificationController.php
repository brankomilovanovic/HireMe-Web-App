<?php

namespace App\Controller;

use App\Handler\NotificationHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class NotificationController extends BaseController
{
    private NotificationHandler $handler;

    function __construct(NotificationHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/notification/read/{id}', methods: ['PATCH'])]
    public function read(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->read($id, $user);
    }

    #[Route('/api/notifications/read/all', methods: ['PATCH'])]
    public function readAll(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->readAll($user);
    }

    #[Route('/api/notifications', methods: ['GET'])]
    public function getAllNotificationsByUser(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if (empty($user)) {
            return $this->responseWithMessage('', 204);
        }

        return $this->handler->getAll($request, $user->getId(), 'toUser');
    }
}
