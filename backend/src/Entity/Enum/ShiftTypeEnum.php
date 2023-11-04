<?php

namespace App\Entity\Enum;

enum ShiftTypeEnum: int
{
    case MORNING_SHIFT = 1;
    case AFTERNOON_SHIFT = 2;
    case NIGHT_SHIFT = 3;
}
