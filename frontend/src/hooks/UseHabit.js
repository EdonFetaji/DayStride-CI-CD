import {useCallback, useEffect, useState} from "react";
import HabitRepository from "../repository/HabitRepository";

const initialState = {
    habits: [],
    loading: true,
};

const useHabit = () => {
    const [state, setState] = useState(initialState);

    const fetchHabits = useCallback(() => {
        setState({habits: [], loading: true});
        HabitRepository.findAll()
            .then((res) => {
                setState({habits: res.data, loading: false});
            })
            .catch((err) => {
                console.error("Failed to fetch habits:", err);
                setState({habits: [], loading: false});
            });
    }, []);

    const onAdd = useCallback((data) => {
        HabitRepository.create(data)
            .then(() => fetchHabits())
            .catch((err) => console.error("Add habits failed:", err));
    }, [fetchHabits]);

    const onEdit = useCallback((id, data) => {
        HabitRepository.update(id, data)
            .then(() => fetchHabits())
            .catch((err) => console.error("Edit habits failed:", err));
    }, [fetchHabits]);

    const onDelete = useCallback((id) => {
        HabitRepository.delete(id)
            .then(() => fetchHabits())
            .catch((err) => console.error("Delete habits failed:", err));
    }, [fetchHabits]);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    return {...state, onAdd, onEdit, onDelete};
};

export default useHabit;
