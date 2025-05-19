"use client";

import {Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography,} from '@mui/material';

const drawerWidth = 300;

export default function AdminSidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(200deg, #f7fcca 5%, #ffffff 40%)',
                },
            }}
        >
            <Box sx={{p: 2}}>
                {/* Logo */}
                <Typography variant="h4" component="h2" sx={{fontWeight: '600', mb: 4}}>alma</Typography>
            </Box>

            {/* Menu Items */}
            <List>
                <ListItem component="div">
                    <ListItemButton>
                        <ListItemText primary="Leads"/>
                    </ListItemButton>
                </ListItem>
                <ListItem component="div">
                    <ListItemButton>
                        <ListItemText primary="Settings"/>
                    </ListItemButton>
                </ListItem>
            </List>

            {/* User Profile */}
            <Box sx={{mt: 'auto', p: 2,}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Avatar>A</Avatar>
                    <Typography>Admin</Typography>
                </Box>
            </Box>
        </Drawer>
    );
}
