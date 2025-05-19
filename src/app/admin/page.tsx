"use client";

import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import AdminSidebar from "@/app/components/AdminSidebar";
import AdminContent from "@/app/components/AdminContent";

const theme = createTheme();

export default function AdminMainPage() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AdminSidebar/>
                <AdminContent/>
            </Box>
        </ThemeProvider>
    );
}
