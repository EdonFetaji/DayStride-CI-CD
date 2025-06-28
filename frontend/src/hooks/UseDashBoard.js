import {useCallback, useEffect, useState} from "react";
import DashBoardRepository from "../repository/DashBoardRepository";

const initialState = {
    data: [],
    loading: true,
};

const useDashboard = () => {
    const [state, setState] = useState(initialState);

    const fetchData = useCallback(() => {
        setState({data: [], loading: true});
        DashBoardRepository.fetch()
            .then((res) => {
                setState({data: res.data, loading: false});
            })
            .catch((err) => {
                console.error("Failed to fetch dashboard data:", err);
                setState({data: [], loading: false});
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {...state};
};

export default useDashboard;
