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

const LoginPage = (props) => {
    const classes = useStyles()


    return (
        <Paper className={classes.paper}>

            <Grid container className={classes.contentGrid}>
                <Grid item xs/>

                <LoginFormComponent signIn={props.signIn}
                                    authState={props.authState}
                                    clearMessage={props.clearMessage}
                />
                <LoginDividerComponent/>
                <LoginToRegisterComponent/>

                <Grid item xs/>
            </Grid>
        </Paper>
    )
}

const LoginToRegisterComponent = (props) => {

    return (
        <Grid container item
              direction={'column'}
              spacing={6}
              xs={5}
        >
            <Grid item xs/>

            <Grid item>
                <Typography variant={'h5'} component={"h5"} align={'center'}>
                    Do you want to register?
                </Typography>

                <Typography variant={'h4'} component={"h4"} align={'center'}>
                    Click button bellow!
                </Typography>
            </Grid>
            <Grid item>
                <Link to={'/register'} style={{textDecoration: 'none'}}>
                    <Button variant={'contained'}
                            fullWidth
                            size={'large'}
                            color={'secondary'}>
                        Register
                    </Button>
                </Link>
            </Grid>
            <Grid item xs/>
        </Grid>
    )
}

const LoginDividerComponent = (props) => {

    return (
        <>
            <Grid item xs/>
            <Grid item xs={1}>
                <Divider orientation={'vertical'}/>
            </Grid>
            <Grid item xs/>
        </>
    )
}

const LoginFormComponent = (props) => {
    let history = useHistory();
    const [login, setLogin] = useState({
        username: '',
        password: '',

    })

    const [error, setError] = useState({
        username: false,
        password: false,
    })

    const handleChange = (event) => {
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        })

        setError({
            ...error,
            [event.target.name]: false
        })
    }

    useEffect(() => {
        if (props.authState.message === 'LoginSuccess') {
            props.clearMessage()
            history.push('/')
        } else if (props.authState.message === 'LoginFailed') {
            setError({
                ...error,
                password: true,
                username: true
            })
        }
    }, [props.authState.message])

    const formValidation = () => {
        setError({
            ...error,
            email: login.username === '' || login.username.length < 3,
            password: login.password === '' || login.password.length < 3,
        })

        return error.username || error.password
    }

    const loginClick = (e) => {
        e.preventDefault()

        if (!formValidation()) {
            props.signIn(login)
        }
    }

    return (
        <Grid container direction={'column'}
              item
              xs={5}
              spacing={6}
        >
            <Grid item xs/>

            <Grid item>
                <Typography align={'center'} variant={'h4'} component={'h4'}>Login</Typography>
            </Grid>

            <Grid item>
                <TextField fullWidth
                           name={'username'}
                           type={'text'}
                           error={error.username}
                           required
                           onChange={handleChange}
                           variant={'standard'}
                           label={'Username'}/>
            </Grid>
            <Grid item>
                <TextField fullWidth
                           name={'password'}
                           type={'password'}
                           error={error.password}
                           required
                           onChange={handleChange}
                           variant={'standard'}
                           label={'Password'}/>
            </Grid>

            <Grid item>
                <Button fullWidth
                        variant={'contained'}
                        color={'primary'}
                        onClick={loginClick}
                >
                    Sign in
                </Button>
            </Grid>

            <Grid item xs/>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => ({
    signIn: login => dispatch(signIn(login)),
    clearMessage: () => dispatch(authActions.setMessage())
})

const mapStateToProps = (state) => ({
    authState: state.authReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
