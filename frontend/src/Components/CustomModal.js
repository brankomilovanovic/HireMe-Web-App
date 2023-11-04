import { Divider, Modal, Paper } from "@mui/material";
import React from "react";

const CustomModal = ({
        children,
        showModal = false, 
        onClose = () => {},
        title = "",
        style
    }) => {
    

    return (
        <Modal
            open={Boolean(showModal)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            id = 'custom-modal'
            onClose={onClose}
        >
            <Paper style={style}>
                <div className="custom-modal-header">
                    <div>{title}</div>
                    <img src='/images/close.svg' className="image" onClick={onClose} />
                </div>
                <Divider />
                {children}
            </Paper>
        </Modal>
    );

}
export default CustomModal
