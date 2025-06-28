import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import {styled} from "@mui/material/styles";
import edit_icon from "../../../assests/edit-icon.svg"
import logoIcon from "../../../assests/logo.svg";

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


const EditGoalDialog = ({open, onClose, onEdit, goal}) => {
    const [formData, setFormData] = useState({
        name: goal.name,
        description: goal.description,
        end_date: goal.end_date,
        location: goal.location,
        is_public: goal.is_public,
    });

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = () => {
        onEdit(goal.id, formData);
        onClose();
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <div className={" flex justify-center gap-5"}>

                <DialogTitle className="text-amber-700 flex-1 !text-3xl  w-[75%] font-bold text-2xl text-center">Edit Goal</DialogTitle>
                <img src={edit_icon} alt="Logo" width={35} height={35}/>
            </div>

            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                />
                <TextField
                    margin="dense"
                    label="End Date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    margin="dense"
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="is_public"
                            checked={formData.is_public}
                            onChange={handleChange}
                        />
                    }
                    label="Public"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="warning">
                    Edit
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default EditGoalDialog;
