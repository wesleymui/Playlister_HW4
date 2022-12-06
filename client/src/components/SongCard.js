import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import AuthContext from '../auth';
import { Button, Link, ListItemButton, Typography } from '@mui/material';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        if (event.detail === 1) {
            console.log("current song clicked");
            store.setCurrentSong(song, index);
        }
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            console.log("double clicked!");
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <ListItemButton
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
            sx={{pt: 1, pb: 1}}
            selected={song === store.currentSong}
        >
            <Typography variant='h6' sx={{color: 'white', pl: 2, pr: 1}}>{index + 1}.</Typography>
            <Typography
                id={'song-' + index + '-link'}
                className="song-link"
                variant='h6'
                sx={{flexGrow: 1, color: 'white'}}
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
                
            </Typography>
            <IconButton
                aria-label="close"
                id={"remove-song-" + index}
                className="list-card-button"
                color="inherit"
                size="small"
                sx={{color: 'white', br: 2}}
                onClick={handleRemoveSong}>
                    <CloseIcon fontSize="inherit"/>
            </IconButton>
        </ListItemButton>
    );
}

export default SongCard;