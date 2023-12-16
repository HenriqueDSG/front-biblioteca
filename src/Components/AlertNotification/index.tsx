import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import "./index.css"

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

interface Props {
    open: boolean,
    severity: AlertColor,
    message: string,
    handleClose: Function,
    minHeight?: string
}

const AlertNotification: React.FC<Props> = (props) => {

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
        function Alert(props, ref,) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
        });

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        props.handleClose(false);
    };

    return (
        <Snackbar open={props.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose} style={{ zIndex: 9999 }}>
            <Alert variant="filled" severity={props.severity} onClose={handleClose} style={{ minHeight: (props.minHeight) ? props.minHeight : "48px" }}>
                <span className={"spanNotificacao"}>{props.message}</span>
            </Alert>
        </Snackbar>
    );
};

export default AlertNotification;