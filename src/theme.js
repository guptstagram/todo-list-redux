import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#77A6F7",
            light: "#D3E3FC",
            contrastText: "#FFF",
        },
        secondary: {
            light: "FFCCBC",
            main: "#F78888",
            contrastText: "#000",
        },
    },
    typography: {
        fontFamily: 'Quicksand',
    }
});

export default theme;