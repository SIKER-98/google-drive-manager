import React, {useState} from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertSnackbar = props => {
    // const [open, setOpen] = useState(props.open ? props.open : false)
    const {alertType = 'success', alert = ''} = props

    const handleClose = () => {
        props.setOpen(false)
    }

    return (
        <Snackbar open={props.open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        >
            <Alert onClose={handleClose} severity={alertType}>
                {alert}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackbar
