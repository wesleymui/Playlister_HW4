import { Alert, AlertTitle, Button, Collapse, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import AuthContext from "../auth";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'navy',
    boxShadow: 24,
};

export default function MUIAccountErrorModal() {
    const { auth } = useContext(AuthContext);

    let msg = "";
    if(auth.error) {
        msg = auth.error;
    }

    function handleClose() {
        auth.closeErrorModal();
    }
    return (
        <Modal
            open={auth.error != null} 
        >
            <Collapse in={auth.error != null}>
                <Alert variant="filled" severity="error" action={
                    <IconButton aria-label="close" color="inherit" size="large" onClick={handleClose}>
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }>
                    <AlertTitle><strong>Error</strong></AlertTitle>
                    <div className="error-modal-dialog">
                        <header className="dialog-header">
                            {msg}
                        </header>
                    </div>
                </Alert>
            </Collapse>
        </Modal>
    )

}