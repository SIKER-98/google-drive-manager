import React, {useState} from "react";
import {
    AppBar,
    Divider,
    Drawer,
    Grid, IconButton,
    Link,
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
        }
    }
})

const categories = [
    {
        id: 'Develop',
        children: [
            {id: 'Authentication', icon: <PeopleIcon/>, active: true},
            {id: 'Database', icon: <DnsRoundedIcon/>},
            {id: 'Storage', icon: <PermMediaOutlinedIcon/>},
            {id: 'Hosting', icon: <PublicIcon/>},
            {id: 'Functions', icon: <SettingsEthernetIcon/>},
            {id: 'ML Kit', icon: <SettingsInputComponentIcon/>},
        ],
    },
    {
        id: 'Quality',
        children: [
            {id: 'Analytics', icon: <SettingsIcon/>},
            {id: 'Performance', icon: <TimerIcon/>},
            {id: 'Test Lab', icon: <PhonelinkSetupIcon/>},
        ],
    },
];

const drives = [
    {
        id: '1',
        email: 'test@1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        total: 23,
        empty: 10,
        trash: 2
    },
    {
        id: 2,
        email: 'test@2',
        total: 50,
        empty: 44,
        trash: 3
    },
    {
        id: '3',
        email: 'test@3',
        total: 10,
        empty: 2,
        trash: 3
    },
]

const Layout = (props) => {
    const classes = useStyles()


    return (
        <div className={classes.root}>
            {/*// left nav*/}
            <List disablePadding className={classes.list}>
                <ListItem className={clsx(classes.firebase, classes.itemCategory)}>
                    Drive Manager
                </ListItem>

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

                {categories.map(({id, children}) => (
                    <React.Fragment key={id}>
                        <ListItem className={clsx(classes.categoryHeader, classes.categoryItem)}>
                            <ListItemText classes={{primary: classes.categoryHeaderPrimary}}>
                                {id}
                            </ListItemText>
                        </ListItem>

                        {children.map(({id: childId, icon, active}) => (
                            <ListItem key={childId}
                                      button
                                      className={clsx(classes.item, active && classes.itemActiveItem, classes.categoryItem)}>
                                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                <ListItemText classes={{primary: classes.itemPrimary}}>
                                    {childId}
                                </ListItemText>
                            </ListItem>
                        ))}

                        <Divider className={classes.divider}/>
                    </React.Fragment>
                ))}

                <ListItem>
                    <ListItemText classes={{primary: classes.categoryHeaderPrimary}}>
                        Google Drives
                    </ListItemText>
                </ListItem>
                {drives.map(gdrive => (
                    <ListItem key={gdrive.id}
                              button
                              className={classes.item}>
                        <InboxIcon className={classes.itemIcon}/>
                        <ListItemText variant="body2" color="white" classes={{primary: classes.itemPrimary}}>
                            {textWrapper(gdrive.email, 12)}
                        </ListItemText>

                        <Typography variant="body2" color="white" classes={{primary: classes.itemPrimary}}>
                            {gdrive.empty}/{gdrive.total}GB
                        </Typography>
                    </ListItem>
                ))}
            </List>


            {/*central area*/}
            <div className={classes.app}>
                {/*// Top nav*/}
                <AppBar color={'primary'} position={'static'} elevation={0}>
                    <Toolbar>
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                MAIN PAGE
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

export default Layout

function textWrapper(text, maxSize) {
    return text.length >= maxSize ? text.substring(0, maxSize) + '...' : text
}
