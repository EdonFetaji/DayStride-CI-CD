import React, {useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Slide,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import add_icon from "../../../assests/add-icon.svg";

const initialFormData = {
    name: '',
    description: '',
    end_date: '',
    location: '',
    is_public: false,
};

// White blurred dialog with rounded corners
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


const AddGoalDialog = ({open, onClose, onAdd}) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = () => {
        onAdd(formData);
        setFormData(initialFormData);
        onClose();
    };

    return (
        <StyledDialog open={open} onClose={onClose} TransitionComponent={Slide} keepMounted>

            <div className={" flex justify-center "}>

                <DialogTitle className="text-amber-700 flex-1  !text-2xl  w-[75%] font-bold text-2xl text-center">
                    Create a New Goal
                </DialogTitle>
                <img src={add_icon} alt="Logo" width={35} height={35}/>
            </div>
            <DialogContent>
                <div className="flex flex-col gap-4 py-1 px-1">
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                    />
                    <TextField
                        label="End Date"
                        name="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.is_public}
                                onChange={handleChange}
                                name="is_public"
                                sx={{color: '#d97706'}} // amber tone
                            />
                        }
                        label="Make this goal public"
                    />
                </div>
            </DialogContent>

            <DialogActions className="px-6 pb-4 pt-2">
                <Button onClick={onClose} className="text-gray-600 hover:text-black">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    className="bg-amber-700 hover:bg-amber-800 text-white"
                >
                    Add Goal
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default AddGoalDialog;
