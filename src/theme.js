import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#77A6F7",
            light: "#D3E3FC",
            contrastText: "#FFF",
        },
    },
    typography: {
        fontFamily: 'Quicksand',
    }
});

export default theme;