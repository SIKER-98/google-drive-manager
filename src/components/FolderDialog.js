import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Slide,
    Typography
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChangeColorDialog from "./ChangeColorDialog";

const useStyles = makeStyles(theme => (
    {
        dialogItem: {
            marginTop: theme.spacing(1)
        },
        dialogWindow: {}
    }
))

const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction={"up"} ref={ref} {...props}/>
    }
)

const FolderDialog = (props) => {
    const [open, setOpen] = useState(false)

    const classes = useStyles()
    const {data} = props

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const convertSize = (size) => {
        if (size < 1000) {
            return `${size}B`
        }
        size = (size / 1000).toFixed(3)
        if (size < 1000) {
            return `${size}KB`
        }
        size = (size / 1000).toFixed(3)
        if (size < 1000) {
            return `${size}Mb`
        }
        size = (size / 1000).toFixed(3)
        return `${size}GB`
    }

    const convertDate = (date) => {
        let year, month, day, hour, min, sec
        year = date.substring(0, 4)
        month = date.substring(5, 7)
        day = date.substring(8, 10)
        hour = date.substring(11, 13)
        min = date.substring(14, 16)
        sec = date.substring(17, 19)

        return `${hour}:${min}:${sec} ${day}.${month}.${year}`
    }

    const listFolderData = (folder) => {
        return Object.keys(folder).map(key => {
            if (key === 'modifiedTime' || key === 'createdTime')
                return (
                    <Typography key={key}>
                        <b>{key.toUpperCase()}</b>: {convertDate(data[key])}
                    </Typography>
                )
            if (key === 'size')
                return (
                    <Typography key={key}>
                        <b>{key.toUpperCase()}</b>: {convertSize(data[key])}
                    </Typography>
                )
            if (key === 'trashed' || key === 'explicitlyTrashed')
                return (
                    <Typography key={key}>
                        <b>{key.toUpperCase()}</b>: {data[key] ? 'True' : 'False'}
                    </Typography>
                )

            return (
                <Typography key={key}>
                    <b>{key.toUpperCase()}</b>: {data[key]}
                </Typography>
            )
        })
    }

    return (
        <>
            <IconButton aria-label={'actions'} onClick={handleClickOpen}>
                <MoreVertIcon/>
            </IconButton>
            <Dialog open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    className={classes.dialogWindow}
                    onClose={handleClose}
            >
                <DialogTitle id={'alert-dialog'}>
                    Folder info
                </DialogTitle>
                <>
                    <DialogContent>
                        <DialogContentText>
                            {listFolderData(data)}
                        </DialogContentText>

                        {data.mimeType === 'application/vnd.google-apps.folder' &&
                        <ChangeColorDialog
                            actualFolderColor={data?.folderColorRgb}
                            folderId={data.id}
                        />
                        }
                        <Button onClick={handleClose}
                                fullWidth
                                color={'primary'}
                                variant={'outlined'}
                                className={classes.dialogItem}
                        >
                            Move
                        </Button>
                        <Button onClick={handleClose}
                                fullWidth
                                color={'primary'}
                                variant={'contained'}
                                className={classes.dialogItem}
                        >
                            Edit
                        </Button>
                        <Button onClick={handleClose}
                                fullWidth
                                color={'secondary'}
                                variant={'outlined'}
                                className={classes.dialogItem}
                        >
                            Share
                        </Button>
                        <Button onClick={handleClose}
                                fullWidth
                                color={'secondary'}
                                variant={'contained'}
                                className={classes.dialogItem}
                        >
                            Delete
                        </Button>
                    </DialogContent>
                </>
            </Dialog>
        </>
    )
}

export default FolderDialog
