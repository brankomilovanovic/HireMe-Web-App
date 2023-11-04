import strings from "../localization";

export const AdStatus = {
    ACTIVE: 1,
    INACTIVE: 2
};

export const getAdStatusName = (status) => {
    let statusName = {
        [AdStatus.ACTIVE]: strings.constants.adStatus.active,
        [AdStatus.INACTIVE]: strings.constants.adStatus.inactive
    };
    return statusName[status] ?? status;
};