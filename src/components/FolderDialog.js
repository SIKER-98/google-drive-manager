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
    Slide, TextField,
    Typography
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChangeColorDialog from "./ChangeColorDialog";
import {apiDeleteFolder} from "../redux/thunk/deleteFolder";
import {connect} from "react-redux";
import {apiGetFolderChildren} from "../redux/thunk/getFolderChildren";
import AlertSnackbar from "./AlertSnackbar";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {apiPutFolderChangeName} from "../redux/thunk/putFolderChangeName";
import apiShareFolder from "../api/apiShareFolder";
import folderActions from "../redux/actions/folderActions";


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
    const [share, setShare] = useState(false)
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: ''
    })


    const [edit, setEdit] = useState({
        edit: false,
        newName: ''
    })

    const classes = useStyles()
    const {data} = props
    const {
        deleteFolder, folderState, editFolder, selectFolder,
        changeFolderPermission, getFolderChildren} = props


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setEdit({...edit, edit: false})
        setOpen(false)
    }

    const handleEditClick = () => {
        setEdit({edit: true, newName: data.name})
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
            if (key === 'permissions') {
                let permission = data[key].find(folder => folder.type === 'anyone')
                permission = permission ? permission.role : 'private'
                return (
                    <Typography key={key}>
                        <b>{key.toUpperCase()}</b>: {permission}
                    </Typography>
                )
            }
            return (
                <Typography key={key}>
                    <b>{key.toUpperCase()}</b>: {data[key]}
                </Typography>
            )
        })
    }

    const folderDelete = () => {
        deleteFolder(data.id)

        if (folderState.currentFolderChildren.findIndex(child => child.id = data.id) >= 0) {
            setAlert({
                show: true,
                message: 'Delete folder',
                type: 'success'
            })
        } else {
            setAlert({
                show: true,
                message: 'Something went wrong',
                type: 'error',
            })
        }
    }

    const folderEdit = (ok) => {
        if (ok) {
            editFolder({folderId: data.id, newName: edit.newName})
            setAlert({
                show: true,
                message: 'Changed folder name',
                type: 'info'
            })
            setEdit({...edit, edit: false})
        } else {
            setEdit({...edit, edit: false})
        }
    }

    const folderShareClick = async (role) => {
        const response = await apiShareFolder(folderState.gdrive, {folderId: data.id, role})
        // console.log(response.data.webViewLink)
        getFolderChildren(folderState.currentFolder)

        if (role !== 'private' && response.data?.webViewLink) {
            await navigator.clipboard.writeText(response.data.webViewLink)
            //     changeFolderPermission({folderId: data.id, role})
            setAlert({
                show: true,
                message: `Folder shared, Link '${response.data.webViewLink}' COPIED`,
                type: 'success'
            })
        } else if (role !== 'private') {
            setAlert({
                show: true,
                message: `Something went wrong!`,
                type: 'error'
            })
        } else {
            //     changeFolderPermission({folderId: data.id, role})
            setAlert({
                show: true,
                message: `Folder changed to private`,
                type: 'success'
            })
        }
    }

    const moveClick = () => {
        console.log('here',folderState.selectedFolder.findIndex(item => item.id === data.id))
        if (folderState.selectedFolder.findIndex(item => item.id === data.id)<0) {
            selectFolder(data)
            console.log('here2')
        }
        handleClose()
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
                    <Button onClick={moveClick}
                            fullWidth
                            color={'primary'}
                            variant={'outlined'}
                            className={classes.dialogItem}
                    >
                        Move
                    </Button>

                    {/*edycja pliku*/}
                    {edit.edit ?
                        <Box>
                            <TextField label="New name"
                                       variant="standard"
                                       value={edit.newName}
                                       onChange={(event) => {
                                           setEdit({...edit, newName: event.target.value})
                                       }}
                            />
                            <IconButton onClick={() => folderEdit(true)}>
                                <DoneIcon/>
                            </IconButton>
                            <IconButton onClick={() => folderEdit(false)}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        :
                        <Button onClick={handleEditClick}
                                fullWidth
                                color={'secondary'}
                                variant={'outlined'}
                                className={classes.dialogItem}
                        >
                            Edit
                        </Button>
                    }

                    {/*udostepnianie pliku*/}
                    <Box>
                        <Button onClick={() => folderShareClick('private')}
                                color={'secondary'}
                                variant={'contained'}
                                className={classes.dialogItem}
                                fullWidth
                        >
                            Private
                        </Button>
                    </Box>
                    <Box>
                        <Button onClick={() => folderShareClick('reader')}
                                color={'primary'}
                                variant={'contained'}
                                className={classes.dialogItem}
                                style={{marginRight: '1%', width: '49%'}}
                        >
                            Reader
                        </Button>
                        <Button onClick={() => folderShareClick('writer')}
                                color={'primary'}
                                variant={'contained'}
                                className={classes.dialogItem}
                                style={{marginLeft: '1%', width: '49%'}}
                        >
                            Writer
                        </Button>
                    </Box>

                    <Button onClick={folderDelete}
                            fullWidth
                            color={'secondary'}
                            variant={'contained'}
                            className={classes.dialogItem}
                    >
                        Delete
                    </Button>
                </DialogContent>

                {alert.show !== null ?
                    <AlertSnackbar open={alert.show}
                                   setOpen={() => setAlert({...alert, show: false})}
                                   alertType={alert.type}
                                   alert={alert.message}
                    /> : null
                }
            </Dialog>
        </>
    )
}

const mapStateToProps = state => ({
    folderState: state.folderReducer,
})

const mapDispatchToProps = dispatch => ({
    deleteFolder: folderId => dispatch(apiDeleteFolder(folderId)),
    editFolder: item => dispatch(apiPutFolderChangeName(item)),
    changeFolderPermission: item => dispatch(folderActions.folderSetPermission(item)),
    getFolderChildren: item => dispatch(apiGetFolderChildren(item)),
    selectFolder: item => dispatch(folderActions.selectFolder(item))
})


export default connect(mapStateToProps, mapDispatchToProps)(FolderDialog)
