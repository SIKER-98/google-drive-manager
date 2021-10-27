import React, {useEffect} from "react";
import {AppBar, Button, Grid, IconButton, makeStyles, Paper, TextField, Toolbar, Tooltip} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from '@material-ui/icons/Refresh';
import Element from "../components/Element";
import {connect} from "react-redux";
import {apiGetFolderRootId} from "../redux/thunk/getFolderRootId";
import {apiGetFolderChildren} from "../redux/thunk/getFolderChildren";
import {apiFetchFolder} from "../redux/thunk/fetchFolder";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    const classes = useStyles()
    const {folderState} = props
    const {getAllFolders, getChildren, getFolderRootId} = props

    useEffect(() => {
        getFolderRootId();
    }, [])

    useEffect(() => {
        if (folderState.rootFolderId)
            getChildren(folderState.rootFolderId)
    }, [folderState.rootFolderId])


    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position={'sticky'} color={'default'} elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item>
                            <IconButton>
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
                            <Button variant={'contained'} color={'primary'} className={classes.addUser}>
                                Filter
                            </Button>
                            {/*<ActionDialogSlide classes={classes}/>*/}
                            <Tooltip title={'Reload'}>
                                <IconButton>
                                    <RefreshIcon className={classes.block} color={'inherit'}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <div className={classes.contentWrapper}>
                {folderState.currentFolderChildren.map(folder => (
                    <Element key={folder.id} folder={folder}/>
                ))}
            </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
