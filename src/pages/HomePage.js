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

const HomePage = (props) => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            Home Page
        </Paper>
    )
}


export default HomePage
