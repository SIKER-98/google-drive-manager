import React, {useEffect} from "react";
import {ListItem, ListItemText, makeStyles} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import {Typography} from "@mui/material";
import {connect} from "react-redux";
import {apiGetGoogleDrive} from "../redux/thunk/getGoogleDrive";
import driveOperations from "../redux/constants/driveOperations";
import driveActions from "../redux/actions/driveActions";
import folderActions from "../redux/actions/folderActions";

const useStyles = makeStyles(theme => {
    return {
        item: {
            paddingTop: 1,
            paddingBottom: 1,
            color: 'rgba(255,255,255,0.7)',
            '&:hover, &:focus': {
                backgroundColor: 'rgba(24,41,44,0.8)',
            },
        },

        itemActiveItem: {
            color: '#4fc3f7',
        },
        itemPrimary: {
            fontSize: 'inherit',
        },
        itemIcon: {
            color: 'rgba(255,255,255,0.7)',
            minWidth: 'auto',
            marginRight: theme.spacing(2),
        },
    }
})

function textWrapper(text, maxSize) {
    return text.length >= maxSize ? text.substring(0, maxSize) + '...' : text
}

const DriveNav = (props) => {
    const classes = useStyles()
    const {driveReducer, getGoogleDrive, selectDrive, folderSelectClear} = props

    useEffect(() => {
        getGoogleDrive()
    }, [])

    const clickDrive = (gdrive) => {
        selectDrive(gdrive)
        if (gdrive !== driveReducer.selectedDrive)
            folderSelectClear()
    }

    return (
        driveReducer.gdriveList?.map((gdrive, index) =>
            <ListItem key={index}
                      button
                      className={classes.item}>
                <InboxIcon className={classes.itemIcon}/>
                <ListItemText variant="body2"
                              color="white"
                              classes={{primary: classes.itemPrimary}}
                              onClick={() => clickDrive(gdrive)}
                >
                    {textWrapper(gdrive, 17)}
                </ListItemText>

                {/*<Typography variant="body2" color="white" classes={{primary: classes.itemPrimary}}>*/}
                {/*    {gdrive.empty}/{gdrive.total}GB*/}
                {/*</Typography>*/}
            </ListItem>
        )
    )
}

const mapStateToProps = state => ({
    driveReducer: state.driveReducer,
})

const mapDispatchToProps = dispatch => ({
    getGoogleDrive: () => dispatch(apiGetGoogleDrive()),
    selectDrive: (item) => dispatch(driveActions.select(item)),
    folderSelectClear: () => dispatch(folderActions.folderSelectClear())
})

export default connect(mapStateToProps, mapDispatchToProps)(DriveNav)
