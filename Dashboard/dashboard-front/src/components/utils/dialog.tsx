import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(
    {
        companyName,
        companyId,
        editFunction,
    }: {
        companyName: string,
        companyId: string,
        editFunction: Function,
    }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open Edit dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const companyName = formJson.newCompanyName;
                        console.log({companyName, companyId});
                        await editFunction({ companyName, companyId })

                        handleClose();
                    },
                }}
            >
                <DialogTitle>Update Company Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To change "{companyName}" company name, please enter the new name here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="newCompanyName"
                        label="New Company Name"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Change</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
