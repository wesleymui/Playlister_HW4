import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { AppBar, Box, Card, CardContent, Container, Divider, Grid, Icon, IconButton, Menu, MenuItem, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import Home from '@mui/icons-material/Home';
import { borderRadius } from '@mui/system';
import YoutubePlayer from './YoutubePlayer';
import YouTube from 'react-youtube';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { FixedSizeList } from 'react-window';

/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

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

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ maxWidth: '90%', left: '5%', bgcolor: '#123456', borderRadius: 1, maxHeight: 600, overflow: 'auto'}}>
            {
                store.idNamePairs.map((pair) => (
                    <div>
                        <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                    <Divider/>
                    </div>
                ))
            }
            </List>;
    }
    return (
        <Grid container>
            <Grid item xs={12} sx={{flexGrow: 1}}>
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
                </AppBar>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{backgroundColor: '#4e76cb', paddingTop: 2, paddingBottom: 2}}>
                    { listCard }
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{backgroundColor: '#4e76cb'}}>
                    <Tabs indicatorColor='black' textColor='white'>
                        <Tab sx={{color: 'white'}} label="Player"/>
                        <Tab sx={{color: 'white'}} label="Comments"/>
                    </Tabs>
                    <Box sx={{ml: 6, mt: 2}}><YouTube videoId='xgiN9zNZCuM'></YouTube></Box>
                    <Box sx={{bgColor: 'blue'}}>
                        <Card>
                            <CardContent>
                                <Typography component="div" variant="h6" sx={{fontWeight: 700}}>Now Playing</Typography>
                                <Typography component="div" variant='p'>Playlist:</Typography>
                                <Typography component="div" variant='p'>Song #:</Typography>
                                <Typography component="div" variant='p'>Title:</Typography>
                                <Typography component="div" variant='p'>Artist:</Typography>
                                <IconButton>
                                    <SkipPreviousIcon fontSize='large'></SkipPreviousIcon>
                                </IconButton>
                                <IconButton>
                                    <PauseIcon fontSize='large'></PauseIcon>
                                </IconButton>
                                <IconButton>
                                    <PlayArrowIcon fontSize='large'></PlayArrowIcon>
                                </IconButton>
                                <IconButton>
                                    <SkipNextIcon fontSize='large'></SkipNextIcon>
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
            <div id="list-selector-heading">
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h4" color="black">Your Lists</Typography>
            </div>
            </Grid>
            { sortMenu }
        </Grid>
        /*<div id="playlist-selector">
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h4" color="common.white">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
        </div>*/)
}

export default HomeScreen;