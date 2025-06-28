import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './ui/components/layout/Layout/Layout.jsx';
import Home from './ui/pages/Home.jsx';
import Login from './ui/pages/Login.jsx';
import Register from './ui/pages/Register.jsx';
import Dashboard from './ui/pages/Dashboard.jsx';
import Habits from './ui/pages/Habits.jsx';
import Todos from './ui/pages/Todos.jsx';
import Goals from './ui/pages/Goals.jsx';
import GoalHub from './ui/pages/GoalHub.jsx';
import ProtectedRoute from './ui/components/routing/ProtectedRoute.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="habits" element={<Habits/>}/>
                        <Route path="todos" element={<Todos/>}/>
                        <Route path="goals" element={<Goals/>}/>
                    </Route>

                    <Route path="goalhub" element={<GoalHub/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
