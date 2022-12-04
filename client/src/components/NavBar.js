import React, { useState } from 'react'

import { AppBar, Box, IconButton, Menu, MenuItem, TextField, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';

function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    function handleSortMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleSortMenuClose() {
        setAnchorEl(null);
    }

    const sortMenu =
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleSortMenuClose}
        >
            <MenuItem onClick={handleSortMenuClose}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleSortMenuClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortMenuClose}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleSortMenuClose}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleSortMenuClose}>Dislikes (High - Low)</MenuItem>
        </Menu>


    return (
            <AppBar position='static'>
            <Toolbar>
                <IconButton>
                    <HomeIcon fontSize='large' sx={{color: 'white'}}></HomeIcon>
                </IconButton>
                <IconButton>
                    <GroupIcon fontSize='large' sx={{color: 'white'}}></GroupIcon>
                </IconButton>
                <IconButton>
                    <PersonIcon fontSize='large' sx={{color: 'white'}}></PersonIcon>
                </IconButton>
                <Box component="div" sx={{paddingLeft: 40, flexGrow: 1}}>
                    <TextField 
                        id="filled-basic" 
                        label="Search" 
                        variant="filled" 
                        size='small'
                        sx={{bgcolor: 'white', borderRadius: 1, width: 500}}/>
                </Box>
                <Box>
                    <IconButton>
                        <SortIcon fontSize='large' sx={{color: 'white'}} onClick={handleSortMenuOpen}></SortIcon>
                    </IconButton>
                </Box>
            </Toolbar>
            { sortMenu }
        </AppBar>
    );
}

export default NavBar;