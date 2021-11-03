import React, {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle, Divider, IconButton,
    List,
    ListItem, ListItemIcon, ListItemText,
    makeStyles, Modal,
    Snackbar,
    Typography
} from "@material-ui/core";
import {connect} from "react-redux";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import folderActions from "../redux/actions/folderActions";

const useStyles = makeStyles(theme => ({
    dialogItem: {
        marginTop: theme.spacing(1)
    },
}))

const MoveDialog = (props) => {
    const classes = useStyles()
    const {folderState, folderSelectClear, unselectFolder} = props


    const handleUnselectClick = (folder) => {
        unselectFolder(folder)
    }

    const handleClearClick = () => {
        folderSelectClear()
        handleClose()
    }

    const handleClose = () => {
        props.setOpen(false)
    }

    const [open, setOpen] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <>

            <SpeedDial ariaLabel={'Selected folder'}
                       hidden={folderState.selectedFolder.length === 0}
                       sx={{position: 'fixed', bottom: 16, right: 16}}
                       icon={<Typography>{folderState.selectedFolder.length}</Typography>}
                       onClick={() => setOpen(true)}
            />
            <Modal open={open}
                   onClose={() => setOpen(false)}
            >
                <Box sx={{...style, width: 400}}>
                    <Typography variant={"h4"}>Selected items:</Typography>
                    <List style={{maxHeight: 300, overflow: 'auto'}}>
                        {folderState.selectedFolder.map(folder => (
                            <ListItem key={folder.id}>
                                <ListItemIcon>
                                    <IconButton edge={'end'}
                                                aria-label={'delete'}
                                                onClick={() => handleUnselectClick(folder)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText
                                    primary={folder.name + ''}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={handleClearClick}>Clear selected list</Button>
                </Box>
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    folderState: state.folderReducer
})

const mapDispatchToProps = dispatch => ({
    folderSelectClear: () => dispatch(folderActions.folderSelectClear()),
    unselectFolder: (item) => dispatch(folderActions.unselectFolder(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoveDialog)
