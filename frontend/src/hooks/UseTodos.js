// src/hooks/useTodos.js
import {useCallback, useEffect, useState} from "react";
import ToDoRepository from "../repository/ToDoRepository";

const initialState = {
    todos: [],
    loading: true,
};

const useTodos = () => {
    const [state, setState] = useState(initialState);

    const fetchTodos = useCallback(() => {
        setState({todos: [], loading: true});
        ToDoRepository.findAll()
            .then((res) => {
                setState({todos: res.data, loading: false});
            })
            .catch((err) => {
                console.error("Failed to fetch todos:", err);
                setState({todos: [], loading: false});
            });
    }, []);

    const onAdd = useCallback((data) => {
        ToDoRepository.create(data)
            .then(() => fetchTodos())
            .catch((err) => console.error("Add todo failed:", err));
    }, [fetchTodos]);

    const onEdit = useCallback((id, data) => {
        ToDoRepository.update(id, data)
            .then(() => fetchTodos())
            .catch((err) => console.error("Edit todo failed:", err));
    }, [fetchTodos]);

    const onDelete = useCallback((id) => {
        ToDoRepository.delete(id)
            .then(() => fetchTodos())
            .catch((err) => console.error("Delete todo failed:", err));
    }, [fetchTodos]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return {...state, onAdd, onEdit, onDelete};
};

export default useTodos;
