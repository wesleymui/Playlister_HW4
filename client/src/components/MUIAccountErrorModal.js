import { Alert, Button, Modal } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../auth";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
            <Alert sx={style} severity="error">
                <div className="modal-dialog">
                <header className="dialog-header">
                    {msg}
                </header>
                <div id="confirm-cancel-container">
                    <Button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleClose}
                    >Cancel</Button>
                </div>
            </div>
            </Alert>
        </Modal>
    )

}