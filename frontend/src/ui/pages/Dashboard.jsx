import React, {useEffect, useState} from "react";
import DashboardRepository from "../../repository/DashBoardRepository";
import {Loader} from "@mantine/core";
import TodoInfoCard from "../components/todos/TodoInfoCard";
import HabitInfoCard from "../components/habits/HabitInfoCard";
import GoalInfoCard from "../components/goals/GoalInfoCard";
import ToDoRepository from "../../repository/ToDoRepository";
import HabitRepository from "../../repository/HabitRepository";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await DashboardRepository.fetchUserDashboard();
                setDashboardData(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleTodoToggle = async (todo) => {
        try {
            await ToDoRepository.partialUpdate(todo.id, {
                completed: !todo.completed
            });
            const res = await DashboardRepository.fetchUserDashboard();
            setDashboardData(res.data);
        } catch (err) {
            console.error("Failed to toggle todo", err);
        }
    };

    const handleHabitToggle = async (habit) => {
        try {
            await HabitRepository.partialUpdate(habit.id, {
                completed: !habit.completed
            });
            const res = await DashboardRepository.fetchUserDashboard();
            setDashboardData(res.data);
        } catch (err) {
            console.error("Failed to toggle habit", err);
        }
    };

    if (loading || !dashboardData) return <Loader/>;

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', {month: 'long'});

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className=" text-3xl text-left mb-6 ">Hello <span
                    className="font-bold text-blue-400">{dashboardData.username}</span> !</h1>
                <div className="bg-amber-50 w-[80%] text-amber-800 border border-amber-200 px-4 py-3 rounded-lg text-sm mb-8">
                    The dashboard displays information only for upcoming todos and goals, ensuring you see tasks and
                    objectives that are relevant and actionable for today and the future.
                </div>


                {/* Blue banner with date, todos, habits, goals */}
                <div
                    className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl shadow-lg flex overflow-hidden max-w-5xl w-full py-6 pr-6 pl-4">

                    {/* Date */}
                    <div className="flex flex-col justify-center items-center text-white p-8 w-32">
                        <div className="text-4xl font-bold">{day}</div>
                        <div className="text-lg mt-1">{month}</div>
                    </div>

                    {/* Content inside blue banner */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Todos and Habits in grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Todos */}
                            <div className="p-4 bg-white rounded-lg shadow border-l-4 border-amber-500">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold text-amber-600">To-Do Tasks</h2>
                                    <Link
                                        key="View Tasks"
                                        to="/todos"
                                        className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-3 py-1 rounded text-sm font-medium">
                                        View Tasks
                                    </Link>
                                </div>
                                <ul className="space-y-2">
                                    {dashboardData.todos.map((todo) => (
                                        <TodoInfoCard key={todo.id} todo={todo}
                                                      onToggleCompleted={() => handleTodoToggle(todo)}/>
                                    ))}
                                </ul>
                            </div>

                            {/* Habits */}
                            <div className="p-4 bg-white rounded-lg shadow border-l-4 border-green-500">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold text-green-600">Habits</h2>
                                    <Link
                                        to="/habits"
                                        className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded text-sm font-medium">
                                        Manage
                                    </Link>
                                </div>
                                <ul className="space-y-2">
                                    {dashboardData.habits.map((habit) => (
                                        <HabitInfoCard key={habit.id} habit={habit}
                                                       onToggleCompleted={() => handleHabitToggle(habit)}/>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Goals below in the same blue container */}
                        <div className="p-4 bg-white rounded-lg shadow border-l-4 border-indigo-600">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold text-blue-600">Goals</h2>
                                <Link
                                    to="/goals"
                                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded text-sm font-medium">
                                    Create Goal
                                </Link>
                            </div>
                            <ul className="space-y-2">
                                {dashboardData.goals.map((goal) => (
                                    <GoalInfoCard key={goal.id} goal={goal}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
