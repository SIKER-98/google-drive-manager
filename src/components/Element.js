import React from "react";
import {Card, CardContent, CardHeader, makeStyles, Typography} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from "@material-ui/icons/Folder";
import clsx from "clsx";
import folderActions from "../redux/actions/folderActions";
import {connect} from "react-redux";
import {apiGetFolderChildren} from "../redux/thunk/getFolderChildren";
import FolderDialog from "./FolderDialog";
import FileIcon from "../functions/getFileIcon";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from "axios";


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


const Element = (props) => {
    const classes = useStyles()
    const {folder} = props
    const {folderReducer, getFolderChildren, folderEnter} = props

    const folderClick = async () => {
        if (!folder.mimeType.includes('folder'))
            await openElement(folder.id)
        else {
            folderEnter(folder)
            getFolderChildren(folder.id)
        }
    }

    const fileNameReduction = (name) => (
        name.length < 20 ? name : name.substring(0, 20) + '...'
    )

    const openElement = async (id) => {
        const response = await axios.get(`http://localhost:8000/` + `gdrive/${folderReducer.gdrive}/file/publicURL/${id}`)
        window.open(response.data.webViewLink, '_blank')
    }


    return (
        <Card className={clsx(classes.root, folder.id === folderReducer.selectedFolder?.id ? classes.selectedItem : '')}
              variant={'outlined'}
        >
            <CardHeader
                avatar={
                    <IconButton onClick={folderClick}>
                        <FileIcon format={folder.mimeType} sx={{fontSize: 75, margin: 0}}
                                  className={classes.icon}
                                  style={{color: folder.folderColorRgb}}/>
                        {/*<FolderIcon className={classes.icon} style={{color: folder.folderColorRgb}}/>*/}
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
    getFolderChildren: (folderId) => dispatch(apiGetFolderChildren(folderId)),
    folderEnter: (folder) => dispatch(folderActions.folderEnter(folder))
})

export default connect(mapStateToProps, mapDispatchToProps)(Element)
