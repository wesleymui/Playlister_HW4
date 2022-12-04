import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, createTheme, ThemeProvider } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#123456',
    boxShadow: 24,
};


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

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Dialog open={store.listMarkedForDeletion !== null}>
            <ThemeProvider theme={theme}>
            <DialogTitle>
                Delete Playlist?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the {name} playlist?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={handleDeleteList}
                >Confirm</Button>
                <Button
                    variant='contained'
                    onClick={handleCloseModal}
                >Cancel</Button>
            </DialogActions>
            </ThemeProvider>
        </Dialog>
        /*
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    Are you sure you want to delete the {name} playlist?
                </header>
                <div id="confirm-cancel-container">
                    <Button
                        variant='contained'
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteList}
                        disableElevation
                    >Confirm</Button>
                    <Button
                        variant='contained'
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                        disableElevation
                    >Cancel</Button>
                </div>
            </div>
            </Box>
        </Modal>
        */
    );
}