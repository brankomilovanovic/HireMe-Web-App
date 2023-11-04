<?php

namespace App\Doctrine\EventSubscriber;
use App\Doctrine\Filter\EntityDeleteFilter;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LoadClassMetadataEventArgs;
use Symfony\Component\DependencyInjection\ContainerInterface;

class EntityDeleteSubscriber implements EventSubscriber
{
    private ContainerInterface $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function getSubscribedEvents(): array
    {
        return ['loadClassMetadata'];
    }

    public function loadClassMetadata(LoadClassMetadataEventArgs $eventArgs)
    {
        if ($eventArgs->getClassMetadata()->hasField('deleted')) {
            $this->addDeleteFilter();
        }
    }

    private function addDeleteFilter()
    {
        $entityManager = $this->container->get('doctrine')->getManager();
        $entityManager->getConfiguration()->addFilter('deleted', EntityDeleteFilter::class);
        $filter = $entityManager->getFilters()->enable('deleted');
        $filter->setParameter('deleted', false);
    }
}