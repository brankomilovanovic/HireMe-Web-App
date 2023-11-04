import strings from "../localization";

export const calculateDaysAgo = (dateString) => {
    if(dateString) {
        const postDate = new Date(dateString);
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - postDate;

        const minuteInMilliseconds = 60 * 1000;
        const hourInMilliseconds = 60 * minuteInMilliseconds;
        const dayInMilliseconds = 24 * hourInMilliseconds;

        if (differenceInMilliseconds < minuteInMilliseconds) {
            const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
            return `Postavljeno pre ${differenceInSeconds} ${differenceInSeconds === 1 ? 'sekunde' : 'sekundi'}`;
        } else if (differenceInMilliseconds < hourInMilliseconds) {
            const differenceInMinutes = Math.floor(differenceInMilliseconds / minuteInMilliseconds);
            return `Postavljeno pre ${differenceInMinutes} ${differenceInMinutes === 1 ? 'minute' : 'minuta'}`;
        } else if (differenceInMilliseconds < dayInMilliseconds) {
            const differenceInHours = Math.floor(differenceInMilliseconds / hourInMilliseconds);
            return `Postavljeno pre ${differenceInHours} ${differenceInHours === 1 ? 'sat' : 'sata'}`;
        } else {
            const differenceInDays = Math.floor(differenceInMilliseconds / dayInMilliseconds);
            return `Postavljeno pre ${differenceInDays} ${differenceInDays === 1 ? 'dan' : 'dana'}`;
        }
    }
    return dateString;
};

export const getMonthName = (month) => {
    switch(month) {
        case 0: return strings.months.january;
        case 1: return strings.months.february;
        case 2: return strings.months.march;
        case 3: return strings.months.april;
        case 4: return strings.months.may;
        case 5: return strings.months.june;
        case 6: return strings.months.july;
        case 7: return strings.months.august;
        case 8: return strings.months.september;
        case 9: return strings.months.october;
        case 10: return strings.months.november;
        case 11: return strings.months.december;
    }
}

export const formatDateWithTime = (date) => {
    let day = date.getDate();
    let month = getMonthName(date.getMonth())
    let year = date.getFullYear()
    let h = date.getHours()
    let m = date.getMinutes()
    let partOfTheDay = h >= 12 ? 'pm' : 'am'
    let formatDate = day + ' ' + month + ' ' + year + ', ' + h + ':' + m + partOfTheDay
    return formatDate
}

export const convertUTCToLocalTime = (utcDate) => {
    return utcDate?.getTime() ? new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000) : new Date();

}