import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./redux/store";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import {createTheme, ThemeProvider} from '@material-ui/core'
import {brown, blueGrey} from '@material-ui/core/colors'
import LoginPage from "./pages/LoginPage";

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
                        {/*<MainPage/>*/}
                        <LoginPage/>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
