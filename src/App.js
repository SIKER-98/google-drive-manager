import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import store from "./redux/store";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import {createTheme, ThemeProvider} from '@material-ui/core'
import {brown, blueGrey} from '@material-ui/core/colors'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AddGooglePage from "./pages/AddGooglePage";

const theme = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    }
})

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path={'/'} exact component={HomePage}/>
                            <Route path={'/login'} component={LoginPage}/>
                            <Route path={'/register'} component={RegisterPage}/>
                            <Route path={'/main'} component={MainPage}/>
                            <Route path={'/user'} component={UserPage}/>
                            <Route path={'/addGoogle'} component={AddGooglePage}/>
                        </Switch>

                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
