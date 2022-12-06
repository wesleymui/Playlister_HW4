import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const style = {
    color: 'blue',
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);

    let title = ""
    let artist = ""
    let youTubeId = ""

    if(store.currentSong) {
        title = store.currentSong.title;
        artist = store.currentSong.artist;
        youTubeId = store.currentSong.youTubeId;
    }
    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        title = event.target.value;
    }

    function handleUpdateArtist(event) {
        artist = event.target.value;
    }

    function handleUpdateYouTubeId(event) {
        youTubeId = event.target.value;
    }

    return (
        <Dialog
            open={store.currentModal === "EDIT_SONG"}
            sx={{color: 'beige' }}
        >
                <DialogTitle><b>Edit Song</b></DialogTitle>
                <DialogContent
                    id="edit-song-modal-content"
                    className="modal-center">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="edit-song-modal-title-textfield"
                        label="Title:"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={title}
                        onChange={handleUpdateTitle}
                    />
                    <TextField
                        autoFocus margin='dense'
                        id="edit-song-modal-title-textfield" 
                        className='modal-textfield' 
                        label="Artist:"
                        type="text" 
                        fullWidth
                        variant='standard'
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} 
                    />
                    <TextField
                        autoFocus margin='dense'
                        id="edit-song-modal-title-textfield" 
                        className='modal-textfield' 
                        label="You Tube Id:"
                        type="text" 
                        fullWidth
                        variant='standard'
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        onClick={handleConfirmEditSong}>
                            Confirm
                        </Button>
                    <Button
                        variant='contained'
                        onClick={handleCancelEditSong}>
                            Cancel
                        </Button>
                </DialogActions>
        </Dialog>
    );
}