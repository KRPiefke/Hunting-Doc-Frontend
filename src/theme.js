import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1E5128',
        },
        secondary: {
            main: '#FCB62A',
        },
    },
});

const MyThemeProvider = props => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {props.children}
        </ThemeProvider>
    );
};

export default MyThemeProvider;
