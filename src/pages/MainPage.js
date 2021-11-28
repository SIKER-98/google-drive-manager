import React, {useEffect, useState} from "react";
import {
    AppBar, Box,
    Button, CircularProgress,
    Grid,
    IconButton,
    Input,
    makeStyles,
    Paper,
    TextField,
    Toolbar,
    Tooltip, Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from '@material-ui/icons/Refresh';
import Element from "../components/Element";
import {connect} from "react-redux";
import {apiGetFolderRootId} from "../redux/thunk/getFolderRootId";
import {apiGetFolderChildren} from "../redux/thunk/getFolderChildren";
import {apiFetchFolder} from "../redux/thunk/fetchFolder";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import folderActions from "../redux/actions/folderActions";
import AddIcon from '@mui/icons-material/Add';
import {apiPostCreateFolder} from "../redux/thunk/postCreateFolder";
import AlertSnackbar from "../components/AlertSnackbar";
import MoveDialog from "../components/MoveDialog";
import {apiPutFolderMove} from "../redux/thunk/putFolderMove";
import axios from "axios";

const useStyles = makeStyles(theme => {
    return {
        paper: {
            minHeight: '100%',
            margin: 'auto',
            overflow: 'hidden'
        },
        searchBar: {
            borderBottom: '1px solid, rgba (0,0,0,0.12)'
        },
        searchInput: {
            fontSize: theme.typography.fontSize
        },
        block: {
            display: 'block'
        },
        addUser: {
            marginRight: theme.spacing(1)
        },
        contentWrapper: {
            margin: '20px 16px',
            display: 'flex',
            flexWrap: 'wrap',

        },
        dialogItem: {
            marginTop: theme.spacing(1)
        },
        input: {
            display: 'none'
        }
    }
})

const MainPage = (props) => {
    const [folderName, setFolderName] = useState('')
    const [alert, setAlert] = useState('')
    const [alertType, setAlertType] = useState('')
    const [snack, setSnack] = useState(false)
    const [progress, setProgress] = useState({
        show: false,
        progress: '0'
    })

    const classes = useStyles()
    const {folderState} = props
    const {
        getAllFolders, getChildren, getFolderRootId,
        folderBack, createFolder, folderSelectClear, folderMove,
        driveState
    } = props

    useEffect(() => {
        if (driveState.selectedDrive != null)
            getFolderRootId();
    }, [driveState.selectedDrive])

    useEffect(() => {
        if (folderState.rootFolderId)
            getChildren(folderState.rootFolderId)
    }, [folderState.rootFolderId])


    const arrowBackClick = () => {
        folderBack()

        if (folderState.folderStack.length > 0) {
            getChildren(folderState.folderStack[folderState.folderStack.length - 1].id)
        } else {
            getChildren(folderState.rootFolderId)
        }
    }

    const handleFolderName = (event) => {
        setFolderName(event.target.value)
    }

    const createFolderClick = () => {
        createFolder({folderName, parents: [folderState.currentFolder]})

        setAlert('Folder added')
        setAlertType('info')
        setSnack(true)
    }

    const reloadFolders = () => {
        getChildren(folderState.currentFolder)

        setAlert('Reloaded data')
        setAlertType('info')
        setSnack(true)
    }

    const pasteButtonClick = () => {
        folderState.selectedFolder.forEach(item => {
            folderMove({folder: item, destination: folderState.currentFolder})
        })

        folderSelectClear()
        getChildren(folderState.currentFolder)
    }

    const handleFileSelect = ({target}) => {
        if (target.files.length === 0)
            return

        const data = new FormData()
        data.append('file', target.files[0])
        const url = `http://localhost:8000/gdrive/${driveState.selectedDrive}/upload/${folderState.currentFolder}`
        axios.post(url, data, {
            onUploadProgress: ProgressEvent => {
                setProgress({
                    show: true,
                    progress: (ProgressEvent.loaded / ProgressEvent.total * 100)
                })
            }
        })
            .then(res => {
                setProgress({
                    show: false,
                    progress: 0
                })
                setAlert('File uploaded')
                setAlertType('success')
                setSnack(true)
                console.log(res)
                getChildren(folderState.currentFolder)
            })
            .catch(e => {
                setProgress({
                    show: false,
                    progress: 0
                })
                setAlert('File uploaded FAILED')
                setAlertType('error')
                setSnack(true)
                console.log(e)
            })
    }

    return (
        <Paper className={classes.paper}
        >
            <AppBar className={classes.searchBar} position={'sticky'} color={'default'} elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item>
                            <IconButton disabled={folderState?.folderStack?.length === 0}
                                        onClick={() => arrowBackClick()}
                            >
                                <ArrowBackIcon className={classes.block} color={'inherit'}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <SearchIcon className={classes.block} color={'inherit'}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder={'Search by name'}
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput
                                }}
                            />
                        </Grid>
                        <Grid item>

                            {/*<ActionDialogSlide classes={classes}/>*/}
                            <Tooltip title={'Reload'}>
                                <IconButton onClick={reloadFolders}>
                                    <RefreshIcon className={classes.block} color={'inherit'}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <AppBar className={classes.searchBar} position={'sticky'} color={'inherit'} elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems={'flex-end'}>

                        <Grid item>
                            <TextField label="New folder name" variant="standard" onChange={handleFolderName}/>
                            <IconButton disabled={folderName === ''}
                                        onClick={createFolderClick}
                            >
                                <AddIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs/>

                        {progress.show &&
                        <Grid item>
                            <Box sx={{position: 'relative', display: 'inline-flex'}}>
                                <CircularProgress variant="determinate" value={progress.progress}/>
                                <Box sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                >
                                    <Typography variant="caption" component="div" color="text.secondary">
                                        {Math.round(progress.progress)}%
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        }

                        <Grid item>
                            <label htmlFor={'upload-button'}>
                                <Input multiple
                                       type={'file'}
                                       id={'upload-button'}
                                       onChange={handleFileSelect}
                                       className={classes.input}/>
                                <Button color={'primary'} variant={'contained'} component={'span'}>
                                    Upload
                                </Button>
                            </label>
                        </Grid>

                        <Grid item>
                            <Button variant={'contained'}
                                    onClick={pasteButtonClick}
                                    color={'secondary'}
                                    disabled={folderState.selectedFolder.length === 0}
                                    className={classes.addUser}>
                                Paste
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant={'contained'} color={'secondary'} className={classes.addUser}>
                                Filter
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <div className={classes.contentWrapper}>
                {folderState.currentFolderChildren.map(folder => (
                    <Element key={folder.id} folder={folder}/>
                ))}
            </div>

            {alert !== '' ?
                <AlertSnackbar open={snack}
                               setOpen={setSnack}
                               alertType={alertType}
                               alert={alert}
                /> : null
            }

            <MoveDialog open={true}
                        setOpen={() => {
                            console.log('working')
                        }}
                        message={'Test'}
            />
        </Paper>
    )
}

const mapStateToProps = state => ({
    folderState: state.folderReducer,
    driveState: state.driveReducer,
})

const mapDispatchToProps = dispatch => ({
    getAllFolders: () => dispatch(apiFetchFolder()),
    getChildren: (folderId) => dispatch(apiGetFolderChildren(folderId)),
    getFolderRootId: () => dispatch(apiGetFolderRootId()),
    folderBack: () => dispatch(folderActions.folderBack()),
    createFolder: item => dispatch(apiPostCreateFolder(item)),
    folderSelectClear: () => dispatch(folderActions.folderSelectClear()),
    folderMove: item => dispatch(apiPutFolderMove(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
