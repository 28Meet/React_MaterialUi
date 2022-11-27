import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteModal({open, name, deleteData, close}) {

    return (
        <>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Do you want to delete ${name} record ?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="grey" onClick={close} autoFocus>Cancel</Button>
                    <Button variant="contained" color="error" onClick={deleteData}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}