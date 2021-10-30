import React, {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    makeStyles,
    Slide, Snackbar,
    Tooltip,
    Typography
} from "@material-ui/core";
import folderColor from '../const/folderColor'
import CheckIcon from '@mui/icons-material/Check';
import MuiAlert from "@mui/material/Alert";
import {apiPutFolderChangeColor} from "../redux/thunk/putFolderChangeColor";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => (
    {
        dialogItem: {
            marginTop: theme.spacing(1)
        },
        colorBox: {
            width: 50,
            height: 50,
            margin: theme.spacing(1)
        },
        colorWrapper: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            maxWidth: 450
        }
    }
))

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ChangeColorDialog = (props) => {
    const [open, setOpen] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [alert, setAlert] = useState('')
    const [alertType, setAlertType] = useState('')

    const classes = useStyles()
    const {actualFolderColor, folderId, putFolderChangeColor} = props


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSnackClose = () => {
        setSnackOpen(false)
    }

    const colorBoxClick = (newColor) => {
        if (newColor !== actualFolderColor) {
            putFolderChangeColor({folderId, newColor})
            if (newColor !== actualFolderColor) {
                setAlertType('success')
                setAlert('Changed folder colour')
            } else {
                setAlertType('error')
                setAlert('Changed folder colour FAILED')
            }
            setSnackOpen(true)
        }

        setOpen(false)
    }

    return (
        <>
            <Button onClick={handleClickOpen}
                    fullWidth
                    color={'default'}
                    variant={'contained'}
                    className={classes.dialogItem}
            >
                Change colour
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
            >
                <DialogTitle>
                    Change folder colour
                </DialogTitle>

                <DialogContent className={classes.colorWrapper}>
                    {Object.keys(folderColor).map(key => (
                        <Tooltip title={key} key={key}>
                            <Box key={key}
                                 className={classes.colorBox}
                                 style={{backgroundColor: folderColor[key]}}
                                 alignItems={'center'}
                                 justifyContent={'center'}
                                 onClick={() => colorBoxClick(folderColor[key])}
                                 flexGrow={1}
                            >
                                {actualFolderColor === folderColor[key] &&
                                <CheckIcon style={{color: 'white'}}/>
                                }
                            </Box>
                        </Tooltip>
                    ))}
                </DialogContent>
            </Dialog>

            <Snackbar open={snackOpen}
                      autoHideDuration={2000}
                      onClose={handleSnackClose}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert onClose={handleClose} severity={alertType}>
                    {alert}
                </Alert>
            </Snackbar>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    putFolderChangeColor: (item) => dispatch(apiPutFolderChangeColor(item))
})

export default connect(null, mapDispatchToProps)(ChangeColorDialog)
