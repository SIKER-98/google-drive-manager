import React, {useEffect, useState} from "react";
import {AppBar, Button, Grid, IconButton, makeStyles, Paper, TextField, Toolbar, Tooltip} from "@material-ui/core";
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
        }
    }
})

const MainPage = (props) => {
    const [folderName, setFolderName] = useState('')
    const [alert, setAlert] = useState('')
    const [alertType, setAlertType] = useState('')
    const [snack, setSnack] = useState(false)

    const classes = useStyles()
    const {folderState} = props
    const {
        getAllFolders, getChildren, getFolderRootId,
        folderBack, folderSelectClear, createFolder
    } = props

    useEffect(() => {
        getFolderRootId();
    }, [])

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
                    <Grid container spacing={2} alignItems={'right'}>

                        <Grid item>
                            <TextField label="New folder name" variant="standard" onChange={handleFolderName}/>
                            <IconButton disabled={folderName === ''}
                                        onClick={createFolderClick}
                            >
                                <AddIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs/>
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
        </Paper>
    )
}

const mapStateToProps = state => ({
    folderState: state.folderReducer,
})

const mapDispatchToProps = dispatch => ({
    getAllFolders: () => dispatch(apiFetchFolder()),
    getChildren: (folderId) => dispatch(apiGetFolderChildren(folderId)),
    getFolderRootId: () => dispatch(apiGetFolderRootId()),
    folderBack: () => dispatch(folderActions.folderBack()),
    folderSelectClear: () => dispatch(folderActions.folderSelectClear()),
    createFolder: item => dispatch(apiPostCreateFolder(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
