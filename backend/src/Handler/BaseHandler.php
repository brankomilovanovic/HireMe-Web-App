<?php
namespace App\Handler;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class BaseHandler
{
    protected $repository;
    protected $serializer;
    protected $passwordEncoder;
    protected $em;


    public function __construct(EntityRepository $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em)
    {
        $this->repository = $repository;
        $this->serializer = $serializer;
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
    }

    protected function response($data = null, $extend = false, $statusCode = 200, $headers = [])
    {
        if(!$data) {
            return $this->responseWithMessage('', 204);
        }

        $groups = ['basic'];

        if ($extend) {
            $groups[] = 'extend';
        }

        $serializedData = $this->serializer->serialize($data, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedData, $statusCode, $headers, true);
    }

    protected function responseWithMessage($message = '', $statusCode = 200, $headers = [])
    {
        $data = [
            'message' => $message,
        ];

        return new JsonResponse($data, $statusCode, $headers);
    }

    protected function parameterMissingResponse()
    {
        return $this->responseWithMessage('Parameters missing', 400);
    }

    protected function forbiddendResponse()
    {
        return $this->responseWithMessage('Forbidden request', 403);
    }

    public function getAll(Request $request, $value = '', $criteria = '')
    {
        try {
            $entities = $this->repository->getAll($request, $value, $criteria);

            if (!empty($entities)) {
                return $this->response($entities, $request->query->get('extend', false));
            }

            return $this->responseWithMessage('', 204);
        }
        catch(\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }

    }

    public function get(Request $request, $value, string $criteria = "id")
    {
        try {
            $entity = $this->repository->get($value, $criteria);

            if(!empty($entity)) {
                return $this->response($entity, $request->query->get('extend', false));
            }

            return $this->responseWithMessage('', 204);
        }
        catch(\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function delete(int $id, User $user)
    {
        try {
            $entity = $this->repository->get($id);

            if(!empty($entity)) {
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