import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Nota VIP
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
