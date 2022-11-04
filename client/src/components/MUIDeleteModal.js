import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#123456',
    boxShadow: 24,
};

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
        store.unmarkListForDeletion();
    }

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    Delete the {name} playlist?
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
    );
}