import React, {useState} from "react";
import {
    AppBar,
    Divider,
    Drawer,
    Grid, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, Toolbar, Tooltip
} from "@material-ui/core";
import {Typography} from "@mui/material";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import InboxIcon from '@material-ui/icons/Inbox';
import clsx from "clsx";
import DriveNav from "../components/DriveNav";
import RefreshIcon from "@material-ui/icons/Refresh";
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import {Login} from "@mui/icons-material";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import authOperations from "../redux/constants/authOperations";
import authActions from "../redux/actions/authActions";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GoogleIcon from '@mui/icons-material/Google';

const drawerWidth = 240
const useStyles = makeStyles(theme => {
    return {
        root: {
            display: 'flex',
            minHeight: '100vh'
        },
        item: {
            paddingTop: 1,
            paddingBottom: 1,
            color: 'rgba(255,255,255,0.7)',
            '&:hover, &:focus': {
                backgroundColor: 'rgba(24,41,44,0.8)',
            },
        },
        itemCategory: {
            backgroundColor: '#232F3E',
            boxShadow: '0 -1px 0 #404854 inset',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        firebase: {
            fontSize: 24,
            color: theme.palette.common.white,
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
        divider: {
            backgroundColor: '#313d4c',
        },

        progressBarItem: {
            padding: theme.spacing(1)
        },
        categoryHeader: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        categoryHeaderPrimary: {
            color: theme.palette.common.white
        },
        categoryItem: {
            backgroundColor: '#313d4c',
            boxShadow: '0 -1px 0 #404854 inset',
        },
        list: {
            backgroundColor: '#313d4c',
            minHeight: '100vh',
            width: drawerWidth
        },
        app: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        },
        link: {
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.7)',
            boxShadow: '0 -1px 0 #404854 inset',
            '&:hover': {
                color: theme.palette.common.white,
            },
            button: {
                borderColor: 'rgba(255,255,255,0.7)'
            }
        },
        main: {
            flex: 1,
            padding: theme.spacing(6, 4),
            background: '#EAEFF1'
        },
        footer: {
            padding: theme.spacing(2),
            background: '#EAEFF1'
        },
        hyperlink: {
            color: 'white',
            textDecoration: 'none'
        }
    }
})

const Layout = (props) => {
    const classes = useStyles()
    const {driveState, authState, logout} = props

    return (
        <div className={classes.root}>
            {/*// left nav*/}
            <List disablePadding className={classes.list}>
                <ListItem className={clsx(classes.firebase, classes.itemCategory)}>
                    Drive Manager
                </ListItem>

                <Link to={'/'}>
                    <ListItem button
                              className={clsx(classes.item, classes.itemCategory)}
                    >
                        <ListItemIcon className={classes.itemIcon}>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.itemPrimary}}>
                            Main Page
                        </ListItemText>
                    </ListItem>
                </Link>

                <Functionality authState={authState} logout={logout}/>

                <ListItem>
                    <ListItemText classes={{primary: classes.categoryHeaderPrimary}}>
                        Google Drives
                        <IconButton>
                            <RefreshIcon/>
                        </IconButton>
                    </ListItemText>
                </ListItem>

                <DriveNav authState={authState}/>
            </List>


            {/*central area*/}
            <div className={classes.app}>
                {/*// Top nav*/}
                <AppBar color={'primary'} position={'static'} elevation={0}>
                    <Toolbar>
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                {authState.email}
                            </Grid>
                            <Grid item xs/>
                            <Grid item>
                                <Link className={classes.link} href={'#'} variant={'body2'}>
                                    Go to docs
                                </Link>
                            </Grid>

                            <Grid item>
                                <Tooltip title={"Alerts / No alerts"}>
                                    <IconButton color={'inherit'}>
                                        <NotificationsIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                            <Grid item>
                                <IconButton color={"inherit"} className={classes.iconButtonAvatar}>
                                    <PersonIcon/>
                                </IconButton>
                            </Grid>

                        </Grid>
                    </Toolbar>
                </AppBar>

                {/*// content*/}
                <div className={classes.main}>
                    {props.children}
                </div>

                {/*// copyright}*/}
                <Typography variant={'body2'} color={'textSecondary'} align={'center'} className={classes.footer}>
                    {'Copyright © '}
                    <Link color={'inherit'} href={'#'}>
                        {'Hubert Sikorski '}
                    </Link>
                    {new Date().getFullYear()}
                </Typography>
            </div>
        </div>
    )
}

const Functionality = (props) => {
    const classes = useStyles()
    let history = useHistory();

    function logout() {
        props.logout()
        history.push('/')
    }

    return (
        <>
            <ListItem className={clsx(classes.categoryHeader, classes.categoryItem)}>
                <ListItemText classes={{primary: classes.categoryHeaderPrimary}}>
                    Authentication
                </ListItemText>
            </ListItem>

            {
                !props.authState.email &&
                <>
                    {/*logowanie*/}
                    <Link to={'/login'} style={{textDecoration: 'none', color: 'white', display: 'float'}}>
                        <ListItem button className={clsx(classes.item, classes.categoryItem)}>
                            <ListItemIcon className={classes.itemIcon}>
                                <LoginIcon/>
                            </ListItemIcon>
                            <ListItemText classes={{primary: classes.itemPrimary}}>
                                Login
                            </ListItemText>
                        </ListItem>
                    </Link>

                    {/*rejestracja*/}
                    <Link to={'/register'} style={{textDecoration: 'none', color: 'white', display: 'float'}}>
                        <ListItem button className={clsx(classes.item, classes.categoryItem)}>
                            <ListItemIcon className={classes.itemIcon}>
                                <AddModeratorIcon/>
                            </ListItemIcon>
                            <ListItemText classes={{primary: classes.itemPrimary}}>
                                Register
                            </ListItemText>
                        </ListItem>
                    </Link>
                </>
            }

            {
                props.authState.email &&
                <>
                    {/*userInfo*/}
                    <Link to={'/user'} style={{textDecoration: 'none', color: 'white', display: 'float'}}>
                        <ListItem button className={clsx(classes.item, classes.categoryItem)}>
                            <ListItemIcon className={classes.itemIcon}>
                                <PersonIcon/>
                            </ListItemIcon>

                            <ListItemText classes={{primary: classes.itemPrimary}}>
                                User info
                            </ListItemText>

                        </ListItem>
                    </Link>

                    {/*logout*/}
                    <ListItem button className={clsx(classes.item, classes.categoryItem)} onClick={() => logout()}>
                        <ListItemIcon className={classes.itemIcon}>
                            <ExitToAppIcon/>
                        </ListItemIcon>

                        <ListItemText classes={{primary: classes.itemPrimary}}>
                            Logout
                        </ListItemText>

                    </ListItem>

                    {/*addNewGoogleDrive*/}
                    <Link to={'/addGoogle'} style={{textDecoration: 'none', color: 'white', display: 'float'}}>
                        <ListItem button className={clsx(classes.item, classes.categoryItem)}>
                            <ListItemIcon className={classes.itemIcon}>
                                <GoogleIcon/>
                            </ListItemIcon>

                            <ListItemText classes={{primary: classes.itemPrimary}}>
                                Add new Gdrive
                            </ListItemText>

                        </ListItem>
                    </Link>
                </>
            }
        </>
    )
}


const mapStateToProps = state => ({
    driveState: state.driveReducer,
    authState: state.authReducer,
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(authActions.clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

function textWrapper(text, maxSize) {
    return text.length >= maxSize ? text.substring(0, maxSize) + '...' : text
}
