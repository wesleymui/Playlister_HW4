import { Button, createTheme, Grid, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import GlobalStoreContext from "../store";

export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    const theme = createTheme({
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
    });

    function handleRegister() {
        history.push("/register/");
    }

    function handleLogIn() {
        history.push("/login/");
    }

    function handleGuest() {

    }

    return (
        <div id="splash-screen">
            <h2 id="splash-header">This is Playlister</h2>
            <p id="splash-text"><em>Organizing your favorite music for free</em></p>
            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Stack spacing={2}>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" sx={{bgcolor: 'green'}} onClick={handleRegister}>Create Account</Button>
                            <Button variant="contained" sx={{bgcolor: 'green'}} onClick={handleLogIn}>Log In</Button>
                            <Button variant="contained" sx={{bgcolor: 'green'}} onClick={handleGuest}>Continue as Guest</Button>
                        </ThemeProvider>
                    </Stack>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </div>
    )
}