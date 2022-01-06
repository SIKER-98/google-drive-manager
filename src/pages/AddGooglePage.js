import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, Divider, Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {signIn} from "../redux/thunk/signIn";
import authActions from "../redux/actions/authActions";
import {connect} from "react-redux";
import getAuthGoogleUrl from "../api/getAuthGoogleUrl";
import addNewGoogleDrive from "../api/addNewGoogleDrive";
import AlertSnackbar from "../components/AlertSnackbar";

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
            flexDirection: 'column',
            justifyContent: 'space-around',
            // '& *': {
            //     margin: theme.spacing(1)
            // }
        },
        contentGrid: {
            minHeight: '60vh',
            // backgroundColor: 'red'
        }
    }
})

const AddGooglePage = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const [gmail, setGmail] = useState('')
    const [authCode, setAuthCode] = useState('')
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: ''
    })

    const handleEmailChange = (event) => {
        setGmail(event.target.value)
    }

    const handleAuthCodeChange = (event) => {
        setAuthCode(event.target.value)
    }

    const goToAuthWebsiteClick = async () => {
        if (!gmail.includes('@gmail.com'))
            return

        await getAuthGoogleUrl(gmail)
            .then((authUrl) => {
                console.log('test', authUrl)
                window.open(authUrl, '_blank')
            })
    }

    const addNewDriveClick = async () => {
        if (authCode.length <= 0)
            return

        await addNewGoogleDrive(gmail, authCode)
            .then(status => {
                console.log(status)

                if (status === 500) {
                    setAlert({
                        show: true,
                        message: 'Something went wrong',
                        type: 'error',
                    })
                } else {
                    setAlert({
                        show: true,
                        message: 'Drive added',
                        type: 'success',
                    })
                }
            })
    }

    return (
        <Paper className={classes.paper}>
            <div className={classes.contentWrapper}>
                <Typography variant={'h4'}>Add new Google Drive</Typography>

                {/*nazwa maila*/}
                <TextField variant={'outlined'}
                           label={'Your gmail'}
                           margin={'normal'}
                           type={'email'}
                           onChange={handleEmailChange}
                />

                {/*generowanie authUrl*/}
                <Button variant={'contained'}
                        color={'secondary'}
                        onClick={goToAuthWebsiteClick}
                >Go to Auth Website</Button>

                {/*miejsce na authCode*/}
                <TextField variant={'outlined'}
                           label={'Your auth code'}
                           margin={'normal'}
                           onChange={handleAuthCodeChange}
                />

                {/*autoryzacja dysku*/}
                <Button variant={'contained'}
                        color={'primary'}
                        onClick={addNewDriveClick}
                >Add new Drive</Button>
            </div>


            {alert.show !== null ?
                <AlertSnackbar open={alert.show}
                               setOpen={() => setAlert({...alert, show: false})}
                               alertType={alert.type}
                               alert={alert.message}
                /> : null
            }
        </Paper>
    )
}


export default AddGooglePage
