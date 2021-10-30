import React from "react";
import {Card, CardContent, CardHeader, makeStyles, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from "@material-ui/icons/Folder";
import clsx from "clsx";
import {pink} from "@material-ui/core/colors";
import folderActions from "../redux/actions/folderActions";
import {connect} from "react-redux";
import {apiGetFolderChildren} from "../redux/thunk/getFolderChildren";
import FolderDialog from "./FolderDialog";

const useStyles = makeStyles(theme => {
    return {
        root: {
            textAlign: 'center',
            width: 220,
            display: 'inline-block',
            margin: 10,
            borderRadius: theme.spacing(1)
        },
        icon: {
            fontSize: 75,
            margin: 0,
        },
        dialogItem: {
            marginTop: theme.spacing(1)
        },
        selectedItem: {
            borderColor: '#dd0000',
            backgroundColor: '#eeeeee'
        }
    }
})

const setFolderColor = (color) => {
    console.log(color)
    return makeStyles(theme => ({
        folderColor: {
            color: color
        }
    }))
}


const Element = (props) => {
    const classes = useStyles()
    const {folder} = props
    const {folderReducer, selectFolder, getFolderChildren, folderEnter} = props

    const folderClick = () => {
        // if (folderReducer.selectedFolder?.id !== folder.id) {
        //     selectFolder(folder)
        //     return
        // }

        folderEnter(folder)
        getFolderChildren(folder.id)
    }

    const fileNameReduction = (name) => (
        name.length < 20 ? name : name.substring(0, 20) + '...'
    )


    return (
        <Card className={clsx(classes.root, folder.id === folderReducer.selectedFolder?.id ? classes.selectedItem : '')}
              variant={'outlined'}
        >
            <CardHeader
                avatar={
                    <IconButton onClick={folderClick}>
                        <FolderIcon className={classes.icon} style={{color: folder.folderColorRgb}}/>
                    </IconButton>
                }
                action={
                    <FolderDialog data={folder}/>
                }
            />
            <CardContent>
                <Typography>
                    {fileNameReduction(folder.name)}
                </Typography>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state => ({
    folderReducer: state.folderReducer
})

const mapDispatchToProps = dispatch => ({
    selectFolder: (folder) => dispatch(folderActions.selectFolder(folder)),
    getFolderChildren: (folderId) => dispatch(apiGetFolderChildren(folderId)),
    folderEnter: (folder) => dispatch(folderActions.folderEnter(folder))
})

export default connect(mapStateToProps, mapDispatchToProps)(Element)
