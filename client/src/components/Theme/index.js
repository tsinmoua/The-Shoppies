import { unstable_createMuiStrictModeTheme as Theme } from '@material-ui/core';

const black = "#000000"
const yellow = "#efc62c"

export default Theme({
    palette: {
        common: {
            black: black,
            yellow: yellow
        },
        primary: {
            main: black
        },
        secondary: {
            main: yellow,
        }
    },
    typography: {
        fontFamily: 'Forum',
        htmlFontSize: 20,
        fontSize: 20
    }
})