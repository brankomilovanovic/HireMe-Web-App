<?php

namespace App\Doctrine\Filter;

use Doctrine\ORM\Mapping\ClassMetaData;
use Doctrine\ORM\Query\Filter\SQLFilter;

class EntityDeleteFilter extends SQLFilter
{
    public function addFilterConstraint(ClassMetadata $targetEntity, $targetTableAlias): string
    {
        if (!$targetEntity->reflClass->hasProperty('deleted')) {
            return '';
        }
        return $targetTableAlias . '.deleted = false';
    }
}