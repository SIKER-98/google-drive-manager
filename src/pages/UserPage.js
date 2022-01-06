import React, {useEffect, useState} from "react";
import {Button, Divider, Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {signIn} from "../redux/thunk/signIn";
import authActions from "../redux/actions/authActions";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => {
    return {
        paper: {
            minHeight: '100%',
            margin: 'auto',
            overflow: 'hidden',
            padding: '20px 16px',
        },
        contentWrapper: {
            margin: '20px 16px',
            display: 'flex',
            flexWrap: 'wrap',

        },
        contentGrid: {
            minHeight: '60vh',
            // backgroundColor: 'red'
        }
    }
})

const UserPage = (props) => {
    const classes = useStyles()
    const {authState} = props

    return (
        <Paper className={classes.paper}>
            <Typography variant={"h4"}>User info:</Typography>
            <Typography variant={'body1'}><b>Username:</b> {authState.username}</Typography>
            <Typography variant={'body1'}><b>Email:</b> {authState.email}</Typography>
            <Typography variant={'body1'}><b>Access Token:</b> {authState.accessToken}</Typography>
            <Typography variant={'body1'}><b>Refresh Token:</b> {authState.refreshToken}</Typography>
        </Paper>
    )
}

const mapStateToProps = state =>({
    authState: state.authReducer,
})


export default connect(mapStateToProps,null)(UserPage)
