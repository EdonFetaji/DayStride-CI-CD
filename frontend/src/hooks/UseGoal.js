// src/hooks/useGoal.js
import {useCallback, useEffect, useState} from "react";
import GoalRepository from "../repository/GoalRepository";

const initialState = {
    goals: [],
    userGoals: [],
    loading: true,
};

const useGoal = () => {
    const [state, setState] = useState(initialState);

    const fetchGoals = useCallback(() => {
        setState((prev) => ({...prev, loading: true}));
        GoalRepository.findAllPublic()
            .then((res) => {
                setState((prev) => ({...prev, goals: res.data, loading: false}));
            })
            .catch((err) => {
                console.error("Failed to fetch public goals:", err);
                setState((prev) => ({...prev, goals: [], loading: false}));
            });
    }, []);

    const fetchUserGoals = useCallback(() => {
        setState((prev) => ({...prev, loading: true}));
        GoalRepository.findUserGoals()
            .then((res) => {
                setState((prev) => ({...prev, userGoals: res.data, loading: false}));
            })
            .catch((err) => {
                console.error("Failed to fetch user goals:", err);
                setState((prev) => ({...prev, userGoals: [], loading: false}));
            });
    }, []);

    const onAdd = useCallback((data) => {
        GoalRepository.create(data)
            .then(() => {
                fetchGoals();
                fetchUserGoals();
            })
            .catch((err) => console.error("Add goal failed:", err));
    }, [fetchGoals, fetchUserGoals]);

    const onEdit = useCallback((id, data) => {
        GoalRepository.update(id, data)
            .then(() => {
                fetchGoals();
                fetchUserGoals();
            })
            .catch((err) => console.error("Edit goal failed:", err));
    }, [fetchGoals, fetchUserGoals]);

    const onDelete = useCallback((id) => {
        GoalRepository.delete(id)
            .then(() => {
                fetchGoals();
                fetchUserGoals();
            })
            .catch((err) => console.error("Delete goal failed:", err));
    }, [fetchGoals, fetchUserGoals]);

    useEffect(() => {
        fetchGoals();
        fetchUserGoals();
    }, [fetchGoals, fetchUserGoals]);

    return {...state, onAdd, onEdit, onDelete, fetchGoals, fetchUserGoals};
};

export default useGoal;
