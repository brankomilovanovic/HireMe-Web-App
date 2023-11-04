export const getNotReadNotifications = (notifications) => {

    if(!notifications) {
        return [];
    }

    return notifications.filter(x => !x.isRead);
}