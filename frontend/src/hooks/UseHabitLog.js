import {useCallback, useEffect, useState} from "react";
import HabitLogRepository from "../repository/HabitLogRepository";

const initialState = {
    habitlogs: [],
    loading: true,
};

const useHabitLog = () => {
    const [state, setState] = useState(initialState);

    const fetchHabitLogs = useCallback(() => {
        setState({habitlogs: [], loading: true});
        HabitLogRepository.findAll()
            .then((res) => {
                setState({habitlogs: res.data, loading: false});
            })
            .catch((err) => {
                console.error("Failed to fetch habitlogs:", err);
                setState({habitlogs: [], loading: false});
            });
    }, []);

    const onAdd = useCallback((data) => {
        HabitLogRepository.create(data)
            .then(() => fetchHabitLogs())
            .catch((err) => console.error("Add habitlogs failed:", err));
    }, [fetchHabitLogs]);

    const onEdit = useCallback((id, data) => {
        HabitLogRepository.update(id, data)
            .then(() => fetchHabitLogs())
            .catch((err) => console.error("Edit habitlogs failed:", err));
    }, [fetchHabitLogs]);

    const onDelete = useCallback((id) => {
        HabitLogRepository.delete(id)
            .then(() => fetchHabitLogs())
            .catch((err) => console.error("Delete habitlogs failed:", err));
    }, [fetchHabitLogs]);

    useEffect(() => {
        fetchHabitLogs();
    }, [fetchHabitLogs]);

    return {...state, onAdd, onEdit, onDelete};
};

export default useHabitLog;
