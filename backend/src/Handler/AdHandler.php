<?php

namespace App\Handler;

use App\Entity\Ad;
use App\Entity\AdShift;
use App\Entity\Enum\AdStatusEnum;
use App\Entity\Enum\AdTypeEnum;
use App\Entity\Enum\JobTypeEnum;
use App\Entity\Enum\RoleEnum;
use App\Entity\Enum\ShiftTypeEnum;
use App\Entity\User;
use App\Repository\AdRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class AdHandler extends BaseHandler
{
    public function __construct(AdRepository $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em)
    {
        parent::__construct($repository, $serializer, $passwordEncoder, $em);
    }

    public function create(Request $request, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            if (!isset($params['title']) || !isset($params['description']) || !isset($params['address'])
                || !isset($params['jobType']) || !isset($params['city']) || !isset($params['salary'])
                || !isset($params['shortDescription']) || !isset($params['adType'])) {
                return $this->parameterMissingResponse();
            }

            $user = $this->em->getRepository(User::class)->get($user->getId());

            if (!$user) {
                return $this->responseWithMessage('User dont exist', 400);
            }

            $ad = new Ad();
            $ad->setTitle($params['title']);
            $ad->setDescription($params['description']);
            $ad->setShortDescription($params['shortDescription']);
            $ad->setAddress($params['address']);
            $ad->setCity($params['city']);
            $ad->setAdType(AdTypeEnum::from($params['adType']));
            $ad->setUser($user);
            $ad->setJobType(JobTypeEnum::from($params['jobType']));
            $ad->setSalary($params['salary']);
            $ad->setAdStatus(AdStatusEnum::ACTIVE);

            if (isset($params['workingHours'])) {
                $ad->setWorkingHours($params['workingHours']);
            }

            if(isset($params['salary'])) {
                $ad->setSalary($params['salary']);
            }

            $ad = $this->repository->save($ad);

            if(isset($params['shifts'])) {
                $shifts = [];
                foreach ($params['shifts'] as $shift) {
                    $adShift = new AdShift();
                    $adShift->setType(ShiftTypeEnum::from($shift));
                    $adShift->setAd($ad);
                    $shifts[] = $this->em->getRepository(AdShift::class)->save($adShift);
                }
                $ad->setShifts($shifts);
            }

            return $this->response($ad, true);
        } catch (\Exception $e) {
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

                if (isset($params['title'])) {
                    $entity->setTitle($params['title']);
                }

                if (isset($params['description'])) {
                    $entity->setDescription($params['description']);
                }

                if (isset($params['address'])) {
                    $entity->setAddress($params['address']);
                }

                if (isset($params['city'])) {
                    $entity->setCity($params['city']);
                }

                if (isset($params['adType'])) {
                    $entity->setAdType(AdTypeEnum::from($params['adType']));
                }

                if (isset($params['jobType'])) {
                    $entity->setJobType(JobTypeEnum::from($params['jobType']));
                }

//                if(isset($params['shifts'])) {
//                    $shifts = [];
//                    foreach ($params['shifts'] as $shift) {
//                        $adShift = new AdShift();
//                        $adShift->setType(ShiftTypeEnum::from($shift));
//                        $adShift->setAd($entity);
//                        $shifts[] = $this->em->getRepository(AdShift::class)->save($adShift);
//                    }
//                    $entity->setShifts($shifts);
//                }

                if (isset($params['shortDescription'])) {
                    $entity->setShortDescription($params['shortDescription']);
                }

                if (isset($params['salary'])) {
                    $entity->setSalary($params['salary']);
                }

                if (isset($params['workingHours'])) {
                    $entity->setWorkingHours($params['workingHours']);
                }

                $entity->setDateUpdated(new \DateTime());

                return $this->response($this->repository->save($entity, true), true);
            }
            return $this->responseWithMessage('Not exist entity under that ID!', 404);
        } catch (\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function updateAdStatus(Request $request, int $id, int $status, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            $entity = $this->repository->get($id);

            if (!empty($entity)) {

                if ($entity->getUser()->getId() !== $user->getId() && $user->getRole() !== RoleEnum::ROLE_ADMIN) {
                    return $this->responseWithMessage("Dont have permission to update this", 401);
                }

                $entity->setAdStatus(AdStatusEnum::from($status));

                $entity->setDateUpdated(new \DateTime());

                return $this->response($this->repository->save($entity, true), true);
            }
        }
    catch
        (\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function getMyAdsByStatus(User $user, int $status, $count = false)
    {
        try {
            $entities = $this->repository->getMyAdsByStatus($user->getId(), AdStatusEnum::from($status), $count);
            return $this->response($entities);
        }
        catch(\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

}