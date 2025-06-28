import React, {useState} from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button
} from '@mui/material';
import {styled} from '@mui/material/styles';
import add_icon from "../../../assests/add-icon.svg";

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

const initialFormData = {
    name: '',
    description: '',
};

const AddHabitDialog = ({open, onClose, onAdd}) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        onAdd(formData);
        setFormData(initialFormData);
        onClose();
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <div className="flex justify-center gap-5">
                <DialogTitle className="text-amber-700 flex-1 text-2xl text-center">Add Habit</DialogTitle>
                <img src={add_icon} alt="Add" width={35} height={35}/>
            </div>
            <DialogContent>
                <TextField name="name" label="Habit Name" value={formData.name} onChange={handleChange} fullWidth
                           margin="dense"/>
                <TextField name="description" label="Description" value={formData.description} onChange={handleChange}
                           fullWidth multiline rows={3} margin="dense"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained"
                        className="bg-amber-700 hover:bg-amber-800 text-white">
                    Add Habit
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default AddHabitDialog;
