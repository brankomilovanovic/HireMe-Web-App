import strings from "../localization";

export const AdType = {
    FIND: 1,
    OFFER: 2
};

export const getAdTypeName = (type) => {
    let adTypeName = {
        [AdType.FIND]: strings.constants.adType.find,
        [AdType.OFFER]: strings.constants.adType.offer
    };
    return adTypeName[type] ?? type;
};

export function getAdTypes() {
    return [
        {
            id: AdType.FIND,
            name: getAdTypeName(AdType.FIND)
        },
        {
            id: AdType.OFFER,
            name: getAdTypeName(AdType.OFFER)
        }
    ];
}