import React, {useEffect, useState} from "react";
import {
    Stack,
    Title,
    Loader,
    Button,
    Group,
    Card,
    Container,
    Divider,
} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";

import useGoal from "../../hooks/useGoal.js";
import GoalGrid from "../components/goals/GoalGrid.jsx";
import EditGoalDialog from "../components/goals/EditGoalDialog.jsx";
import DeleteGoalDialog from "../components/goals/DeleteGoalDialog.jsx";
import AddGoalDialog from "../components/goals/AddGoalDialog.jsx";
import GradientSegmentedControl from "../components/animations/SegmentedControl.jsx";

const Goals = () => {
    const {userGoals, loading, onAdd, onEdit, onDelete} = useGoal();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const [timeFilter, setTimeFilter] = useState("Upcoming");
    const [filteredGoals, setFilteredGoals] = useState([]);

    const handleEditClick = (goal) => {
        setSelectedGoal(goal);
        setEditOpen(true);
    };

    const handleDeleteClick = (goal) => {
        setSelectedGoal(goal);
        setDeleteOpen(true);
    };

    useEffect(() => {
        const now = new Date();
        let filtered = [...userGoals];

        if (timeFilter === "Upcoming") {
            filtered = filtered.filter(
                (goal) =>
                    !goal.end_date || new Date(goal.end_date) >= now
            );
        } else if (timeFilter === "Past") {
            filtered = filtered.filter(
                (goal) =>
                    goal.end_date && new Date(goal.end_date) < now
            );
        }

        setFilteredGoals(filtered);
    }, [timeFilter, userGoals]);

    return (
        <Container size="lg" className="my-10">
            <Card
                shadow="md"
                p="lg"
                radius="md"
                className="border-2 border-blue-500 bg-white"
            >
                <Stack>
                    <section className="flex items-center justify-around">
                        <h1  className="text-blue-700 text-2xl font-bold">
                            My Goals
                        </h1>
                        <GradientSegmentedControl value={timeFilter} onChange={setTimeFilter}/>
                        <Button
                            leftSection={<IconPlus size={16}/>}
                            onClick={() => setAddOpen(true)}
                            variant="light"
                            color="blue"
                            radius="md"
                        >
                            New Goal
                        </Button>
                    </section>

                    <Divider className="my-2"/>

                    {loading ? (
                        <Loader/>
                    ) : (
                        <GoalGrid
                            goals={filteredGoals}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    )}
                </Stack>
            </Card>

            <AddGoalDialog
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onAdd={onAdd}
            />

            {selectedGoal && editOpen && (
                <EditGoalDialog
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    onEdit={onEdit}
                    goal={selectedGoal}
                />
            )}

            {selectedGoal && deleteOpen && (
                <DeleteGoalDialog
                    open={deleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    onDelete={onDelete}
                    goal={selectedGoal}
                />
            )}
        </Container>
    );
};

export default Goals;
