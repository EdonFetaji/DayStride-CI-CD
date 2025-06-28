import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import {styled} from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: '1rem',
        padding: theme.spacing(3),
        backgroundColor: '#ffffffcc',
        backdropFilter: 'blur(8px)',
        width: '100%', // allow width control
        maxWidth: '600px', // change this to your preferred width
    },
}));

import delete_icon from "../../../assests/delete-icon.svg"

const DeleteGoalDialog = ({open, onClose, onDelete, goal}) => {
    const handleSubmit = () => {
        onDelete(goal.id);
        onClose();
    };

    return (
        <StyledDialog open={open} onClose={onClose}>

            <div className={" flex justify-center gap-5"}>

                <DialogTitle className="text-amber-700  !text-3xl flex-1 w-[75%] font-bold text-2xl ">Delete
                    Goal</DialogTitle>

                <img src={delete_icon} alt="Logo" width={35} height={35}/>
            </div>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{goal.name}</strong>? This action cannot be undone.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </DialogContent>
        </StyledDialog>
    );
};

export default DeleteGoalDialog;
