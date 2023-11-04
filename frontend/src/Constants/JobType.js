import strings from "../localization";

export const JobType = {
    FULL_TIME: 1,
    PART_TIME: 2
};

export const getJobTypeName = (type) => {
    let jobTypeName = {
        [JobType.FULL_TIME]: strings.constants.jobType.fullTime,
        [JobType.PART_TIME]: strings.constants.jobType.partTime
    };
    return jobTypeName[type] ?? type;
};

export function getJobTypes() {
    return [
        {
            id: JobType.FULL_TIME,
            name: getJobTypeName(JobType.FULL_TIME)
        },
        {
            id: JobType.PART_TIME,
            name: getJobTypeName(JobType.PART_TIME)
        }
    ];
}