import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import edit_icon from "../../../assests/edit-icon.svg";

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

const EditHabitDialog = ({open, onClose, onEdit, habit}) => {
    const [formData, setFormData] = useState({name: '', description: ''});

    useEffect(() => {
        if (habit) {
            setFormData({
                name: habit.name || '',
                description: habit.description || '',
            });
        }
    }, [habit]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        if (habit) {
            onEdit(habit.id, formData);
            onClose();
        }
    };

    if (!habit) return null;

    return (
        <StyledDialog open={open} onClose={onClose}>
            <div className="flex justify-center gap-5">
                <DialogTitle className="text-amber-700 flex-1 text-2xl text-center">Edit Habit</DialogTitle>
                <img src={edit_icon} alt="Edit" width={35} height={35}/>
            </div>
            <DialogContent>
                <TextField
                    name="name"
                    label="Habit Name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    className="bg-amber-700 hover:bg-amber-800 text-white"
                >
                    Save Changes
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default EditHabitDialog;
