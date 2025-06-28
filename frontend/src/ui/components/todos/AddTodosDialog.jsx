import React, {useState} from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, FormControlLabel, Checkbox, MenuItem, Button
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
    category: '',
    description: '',
    due_date: '',
    due_time: '',
    priority: '3',
    completed: false,
};

const AddTodoDialog = ({open, onClose, onAdd}) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = () => {
        onAdd(formData);
        setFormData(initialFormData);
        onClose();
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <div className="flex justify-center gap-5">
                <DialogTitle className="text-amber-700 flex-1 text-2xl text-center">Add New Task</DialogTitle>
                <img src={add_icon} alt="Add" width={35} height={35}/>
            </div>
            <DialogContent>
                <TextField name="name" label="Task Name" value={formData.name} onChange={handleChange} fullWidth
                           margin="dense"/>
                <TextField name="category" label="Category" value={formData.category} onChange={handleChange} fullWidth
                           margin="dense"/>
                <TextField name="description" label="Description" value={formData.description} onChange={handleChange}
                           fullWidth multiline rows={3} margin="dense"/>
                <TextField name="due_date" label="Due Date" type="date" value={formData.due_date}
                           onChange={handleChange} fullWidth InputLabelProps={{shrink: true}} margin="dense"/>
                <TextField name="due_time" label="Due Time" type="time" value={formData.due_time}
                           onChange={handleChange} fullWidth InputLabelProps={{shrink: true}} margin="dense"/>
                <TextField select name="priority" label="Priority" value={formData.priority} onChange={handleChange}
                           fullWidth margin="dense">
                    <MenuItem value="1">High</MenuItem>
                    <MenuItem value="2">Medium</MenuItem>
                    <MenuItem value="3">Low</MenuItem>
                </TextField>
                <FormControlLabel
                    control={<Checkbox name="completed" checked={formData.completed} onChange={handleChange}/>}
                    label="Completed"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained"
                        className="bg-amber-700 hover:bg-amber-800 text-white">
                    Add Task
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default AddTodoDialog;
