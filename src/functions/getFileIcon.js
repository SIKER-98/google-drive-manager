// import fileType from "../const/fileType";
import {makeStyles} from "@material-ui/core";

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FunctionsIcon from '@mui/icons-material/Functions';

const useStyles = makeStyles(theme => {
    return {
        icon: {
            fontSize: 75,
            margin: 0,
        },
    }
})

const FileIcon = (props) => {
    const classes = useStyles()

    if (props.format === 'application/vnd.google-apps.folder') {
        console.log(classes.icon)
        return <FolderIcon sx={props.sx}
                           style={props.style}
        />
    } else if (props.format.includes('pdf')) {
        return <PictureAsPdfIcon sx={props.sx} style={props.style}/>
    } else if (props.format.includes('image')) {
        return <ImageIcon sx={props.sx} style={props.style}/>
    } else if (props.format.includes('video')) {
        return <VideoLibraryIcon sx={props.sx} style={props.style}/>
    } else if (props.format.includes('sheet')) {
        return <FunctionsIcon sx={props.sx} style={props.style}/>
    } else {
        return <InsertDriveFileIcon sx={props.sx} style={props.style}/>
    }
}

export default FileIcon

