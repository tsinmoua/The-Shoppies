import { unstable_createMuiStrictModeTheme as Theme } from '@material-ui/core';

const navy = "#004080"
const orange = "#FFC04A"

export default Theme({
    palette: {
        common: {
            navy: navy,
            orange: orange
        },
        primary: {
            main: navy
        },
        secondary: {
            main: orange,
        }
    }
})