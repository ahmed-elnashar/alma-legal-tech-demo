'use client';
import {Roboto} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        }
    },
    palette: {
        primary: {
            main: '#000',
        },
        background: {
            default: '#ffffff',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    padding: '12px 32px',
                },
            },
        },
    },
});


export default theme;
