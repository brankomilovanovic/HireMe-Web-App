import strings from "../localization";

export const Shift = {
    MORNING_SHIFT: 1,
    AFTERNOON_SHIFT: 2,
    NIGHT_SHIFT: 3
};

export const getShiftName = (shift) => {
    let shiftName = {
        [Shift.MORNING_SHIFT]: strings.constants.shifts.morningShift,
        [Shift.AFTERNOON_SHIFT]: strings.constants.shifts.afternoonShift,
        [Shift.NIGHT_SHIFT]: strings.constants.shifts.nightShift,
    };
    return shiftName[shift] ?? shift;
};

export function getShiftTypes() {
    return [
        {
            id: Shift.MORNING_SHIFT,
            name: getShiftName(Shift.MORNING_SHIFT)
        },
        {
            id: Shift.AFTERNOON_SHIFT,
            name: getShiftName(Shift.AFTERNOON_SHIFT)
        },
        {
            id: Shift.NIGHT_SHIFT,
            name: getShiftName(Shift.NIGHT_SHIFT)
        }
    ];
}