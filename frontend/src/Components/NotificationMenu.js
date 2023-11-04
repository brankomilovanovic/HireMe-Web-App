import React from "react";
import {Avatar, Menu, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import strings from "../localization";
import { convertUTCToLocalTime, formatDateWithTime } from "../Util/DateUtil";
import { getNotifications, setAllNotificationsRead, setNotificationRead } from "../Services/NotificationService";
import { setNotifications } from "../Slices/NotificationSlice";
import { getNotReadNotifications } from "../Util/NotificationUtil";

const NotificationMenu = ({notificationMenuAnchorEl, closeNotificationMenu}) => {

    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications.notifications)

    const handleMarkAllAsRead = () => {
        setAllNotificationsRead().then(() => {
            getNotifications({extend: true}).then(response => {
                dispatch(setNotifications(response?.data?.items || []));
            });
        });
    }

    const handleClickOnNotification = (notification) => {
        setNotificationRead(notification.id).then(() => {
            getNotifications({extend: true}).then(response => {
                dispatch(setNotifications(response?.data?.items || []));
            });
        });
    }

    const renderNotifications = () => {
        let result = []

        for (let notification of notifications) {
            if(notification) {
                result.push(
                    <div key={'notification-' + notification?.id} onClick={() => handleClickOnNotification(notification)} className="notification">
                        <div className="content-wrap">
                            <div className="content">
                                <div className="profile">
                                    { 
                                        notification?.fromUser &&
                                        <React.Fragment>
                                            <Avatar src={notification?.fromUser?.profileImage}/>
                                            <Tooltip title={notification.fromUser?.name + ' ' + notification.fromUser?.surname}>
                                                <span className="name">{notification.fromUser?.name} {notification.fromUser?.surname}</span>
                                            </Tooltip>
                                        </React.Fragment>
                                    }
                                    { !notification?.fromUser &&
                                        <Tooltip title={strings.base.name}>
                                            <span className="name">{strings.base.name}</span>
                                        </Tooltip>
                                    }
                                </div>
                                <div className="text">
                                    <p className="notification-text" dangerouslySetInnerHTML={{ __html: notification?.title }} />
                                    <span className={!notification?.isRead ? "created active" : "created"}>
                                        {formatDateWithTime(convertUTCToLocalTime(new Date(notification?.date_created)))}
                                    </span>
                                </div>
                            </div>
                            <div className="notification-border"/>
                        </div>
    
                        <div className={!notification.isRead ? "notification-dot active" : "notification-dot"}/>
                    </div>
                )
            }
        }
        return result
    }

    return (
        <Menu
            id='notification-menu'
            anchorEl={notificationMenuAnchorEl}
            open={Boolean(notificationMenuAnchorEl)}
            onClose={closeNotificationMenu}
            className="header-popup-menu notification-menu"
            PaperProps={{
                elevation: 0,
                sx: {
                    width: 520,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    ml: 1, mt: 1,
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        right: 23,
                        width: 10,
                        height: 10,
                        bgcolor: '#104c88',
                        transform: 'translateY(-50%) rotate(45deg)',
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            <div className="notifications-header">
                <span>{strings.components.notification.notRead} ({getNotReadNotifications(notifications)?.length})</span>
                <span className="all-read-link" onClick={() => handleMarkAllAsRead()}>{strings.components.notification.markAllAsRead}</span>
            </div>
            <div className="list">
                {renderNotifications()}
            </div>
            <div className="all-activity" onClick={() => closeNotificationMenu()}>
                {strings.components.notification.seeAllNotifications}
            </div>
        </Menu>
    )
}

export default NotificationMenu;