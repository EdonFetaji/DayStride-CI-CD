import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button
} from '@mui/material';
import {styled} from '@mui/material/styles';
import delete_icon from "../../../assests/delete-icon.svg";

const StyledDialog = styled(Dialog)(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: '1rem',
        padding: theme.spacing(3),
        backgroundColor: '#ffffffcc',
        backdropFilter: 'blur(8px)',
        width: '100%',
        maxWidth: '600px',
    },
}));

const DeleteTodoDialog = ({open, onClose, onDelete, todo}) => {
    const handleSubmit = () => {
        onDelete(todo.id);
        onClose();
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <div className="flex justify-center gap-5">
                <DialogTitle className="text-amber-700 flex-1 text-2xl text-center">Delete Task</DialogTitle>
                <img src={delete_icon} alt="Delete" width={35} height={35}/>
            </div>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{todo.name}</strong>? This cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default DeleteTodoDialog;
