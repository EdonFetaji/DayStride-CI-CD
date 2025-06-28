import {useEffect, useState} from "react";
import axiosInstance from "../axios/axios";

const useCurrentUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get("/current-user/")
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return {user, loading};
};

export default useCurrentUser;
