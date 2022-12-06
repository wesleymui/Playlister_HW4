import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { AppBar, Box, Card, CardContent, Container, createTheme, Divider, Grid, Icon, IconButton, Menu, MenuItem, Tab, Tabs, TextField, ThemeProvider, Toolbar } from '@mui/material';
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
import NavBar from './NavBar';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import MUIEditSongModal from './MUIEditSongModal';

/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadPlaylists();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
        //Open up list!
    }
    const theme = createTheme ({
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
    });

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ maxWidth: '90%', left: '5%', bgcolor: '#123456', borderRadius: 1, maxHeight: 600, overflow: 'auto'}}>
            {
                store.playlists.map((list) => (
                    <div>
                        <ListCard
                        key={list._id}
                        list={list}
                        selected={store.currentList && (list._id === store.currentList._id)}
                    />
                    <Divider/>
                    </div>
                ))
            }
            </List>;
    }
    return (
        <Grid container sx={{backgroundColor: '#4e76cb', pb: 2}}>
            <ThemeProvider theme={theme}>
                <Grid item xs={12} sx={{flexGrow: 1}}>
                    <NavBar/>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{backgroundColor: '#4e76cb', pt: 2}}>
                        { listCard }
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{backgroundColor: '#4e76cb'}}>
                        <Tabs indicatorColor='white' textColor='white'>
                            <Tab sx={{color: 'white', borderColor: 'black'}} label="Player"/>
                            <Tab sx={{color: 'white'}} label="Comments"/>
                        </Tabs>
                        
                        <YoutubePlayer/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%', pt: 1, backgroundColor: '#4e76cb'}}>
                            <Fab 
                                color="primary" 
                                aria-label="add"
                                id="add-list-button"
                                onClick={handleCreateNewList}
                            >
                                <AddIcon />
                            </Fab>
                                <Typography variant="h4" color="white">Your Lists</Typography>
                    </Box>
                </Grid>
                <MUIDeleteModal/>
                <MUIRemoveSongModal/>
                <MUIEditSongModal/>
            </ThemeProvider>
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