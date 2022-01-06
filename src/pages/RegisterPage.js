import React, {useEffect, useState} from "react";
import {Button, Divider, Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {signUp} from "../redux/thunk/signUp";
import {connect} from "react-redux";
import {signIn} from "../redux/thunk/signIn";
import authActions from "../redux/actions/authActions";

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

const RegisterPage = (props) => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>

            <Grid container className={classes.contentGrid}>
                <Grid item xs/>

                <RegisterToLoginComponent/>
                <RegisterDividerComponent/>
                <RegisterFormComponent signUp={props.signUp}
                                       signIn={props.signIn}
                                       authState={props.authState}
                                       clearMessage={props.clearMessage}
                />

                <Grid item xs/>
            </Grid>
        </Paper>
    )
}

const RegisterToLoginComponent = (props) => {

    return (
        <Grid container item
              direction={'column'}
              spacing={6}
              xs={5}
        >
            <Grid item xs/>

            <Grid item>
                <Typography variant={'h5'} component={"h5"} align={'center'}>
                    Do you have account?
                </Typography>

                <Typography variant={'h4'} component={"h4"} align={'center'}>
                    Click button bellow!
                </Typography>
            </Grid>
            <Grid item>
                <Link to={'/login'} style={{textDecoration: 'none'}}>
                    <Button variant={'contained'}
                            fullWidth
                            size={'large'}
                            color={'secondary'}>
                        Login
                    </Button>
                </Link>
            </Grid>
            <Grid item xs/>
        </Grid>
    )
}

const RegisterDividerComponent = (props) => {
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

const RegisterFormComponent = (props) => {
    let history = useHistory();
    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [error, setError] = useState({
        username: false,
        email: false,
        password: false,
        passwordConfirm: false
    })

    useEffect(() => {
        if (props.authState.message === 'Registered') {
            props.clearMessage()
            history.push('/login')
        } else if (props.authState.message === 'AlreadyExist') {
            setError({
                ...error,
                username: true
            })
        }
    }, [props.authState.message])

    const handleChange = (event) => {
        setRegister({
            ...register,
            [event.target.name]: event.target.value
        })

        setError({
            ...error,
            [event.target.name]: false
        })
    }

    const formValidation = () => {
        setError({
            username: register.username === '' || register.username.length < 3 || props.authState.message === 'AlreadyExist',
            email: register.email === '' || register.email.length < 3 || props.authState.message === 'AlreadyExist',
            password: register.password === '' || register.password.length < 3 || register.password !== register.passwordConfirm,
            passwordConfirm: register.passwordConfirm === '' || register.passwordConfirm.length < 3 || register.password !== register.passwordConfirm
        })

        return error.username || error.email || error.password
    }

    const registerClick = (e) => {
        e.preventDefault()

        if (!formValidation()) {
            props.signUp(register)
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
                <Typography align={'center'} variant={'h4'} component={'h4'}>REGISTER</Typography>
            </Grid>

            <Grid item>
                <TextField fullWidth
                           name={'username'}
                           error={error.username}
                           variant={'standard'}
                           required
                           type={'text'}
                           onChange={handleChange}
                           label={'Username'}/>
            </Grid>
            <Grid item>
                <TextField fullWidth
                           name={'email'}
                           error={error.email}
                           variant={'standard'}
                           required
                           type={'email'}
                           onChange={handleChange}
                           label={'Email'}/>
            </Grid>
            <Grid item>
                <TextField fullWidth
                           name={'password'}
                           error={error.password}
                           variant={'standard'}
                           required
                           type={'password'}
                           onChange={handleChange}
                           label={'Password'}/>
            </Grid>
            <Grid item>
                <TextField fullWidth
                           name={'passwordConfirm'}
                           error={error.passwordConfirm}
                           variant={'standard'}
                           required
                           type={'password'}
                           onChange={handleChange}
                           label={'Password confirmation'}/>
            </Grid>

            <Grid item>
                <Button fullWidth
                        variant={'contained'}
                        onClick={registerClick}
                        color={'primary'}
                >
                    Sign up
                </Button>
            </Grid>

            <Grid item xs/>
        </Grid>
    )
}

const mapDispatchToProps = (dispatch) => ({
    signUp: (register) => dispatch(signUp(register)),
    signIn: (login) => dispatch(signIn(login)),
    clearMessage: () => dispatch(authActions.setMessage())
})

const mapStateToProps = (state) => ({
    authState: state.authReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
