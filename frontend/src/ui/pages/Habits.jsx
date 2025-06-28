// src/pages/Habits.jsx

import React, { useEffect, useState } from "react";
import {
    Container,
    Card,
    Title,
    Group,
    Stack,
    Divider,
    SimpleGrid,
    Button,
    Text,
} from "@mantine/core";
import { IconPlus, IconList } from "@tabler/icons-react";
import HabitRepository from "../../repository/HabitRepository";
import HabitLogRepository from "../../repository/HabitLogRepository";
import HabitDetailCard from "../components/habits/HabitDetailCard";
import HabitLogInfoCard from "../components/habits/HabitLogCard";
import AddHabitDialog from "../components/habits/AddHabitDialog";
import EditHabitDialog from "../components/habits/EditHabitDialog";
import DeleteHabitDialog from "../components/habits/DeleteHabitDialog";

const Habits = () => {
    const [habits, setHabits] = useState([]);
    const [habitLogs, setHabitLogs] = useState([]);
    const [logsVisible, setLogsVisible] = useState(false);
    const [loadingLogs, setLoadingLogs] = useState(false);

    const [selectedHabit, setSelectedHabit] = useState(null);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const fetchHabits = async () => {
        try {
            const res = await HabitRepository.findAll();
            setHabits(res.data);
        } catch (err) {
            console.error("Failed to fetch habits", err);
        }
    };

    const fetchHabitLogs = async () => {
        try {
            setLoadingLogs(true);
            const res = await HabitLogRepository.findAll();
            setHabitLogs(res.data ?? []); // fallback to empty array if backend returns `null`
            setLogsVisible(true);
        } catch (err) {
            console.error("Failed to fetch habit logs", err);
            setHabitLogs([]); // ensure empty state is shown on error
            setLogsVisible(true);
        } finally {
            setLoadingLogs(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const handleAdd = async (data) => {
        try {
            await HabitRepository.create(data);
            fetchHabits();
        } catch (err) {
            console.error("Add habit failed", err);
        }
    };

    const handleEdit = async (id, data) => {
        try {
            await HabitRepository.update(id, data);
            fetchHabits();
        } catch (err) {
            console.error("Edit habit failed", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await HabitRepository.delete(id);
            fetchHabits();
        } catch (err) {
            console.error("Delete habit failed", err);
        }
    };

    return (
        <Container size="lg" className="my-10">
            {/* Habits Card */}
            <Card shadow="md" p="lg" radius="md" className="border-2 border-green-500 bg-white">
                <Stack p="md">
                    <Group position="apart">
                        <Title order={3} className="text-green-700">My Habits</Title>
                        <div className="flex gap-2">
                            <Button
                                leftSection={<IconList size={16} />}
                                variant="light"
                                color="green"
                                radius="md"
                                onClick={fetchHabitLogs}
                                loading={loadingLogs}
                            >
                                Show Habit Logs
                            </Button>
                            <Button
                                leftSection={<IconPlus size={16} />}
                                variant="light"
                                color="green"
                                radius="md"
                                onClick={() => setAddOpen(true)}
                            >
                                Add Habit
                            </Button>
                        </div>
                    </Group>

                    <Divider className="my-2" />

                    <SimpleGrid cols={1} spacing="md">
                        {habits.map((habit) => (
                            <HabitDetailCard
                                key={habit.id}
                                habit={habit}
                                onEdit={(h) => {
                                    setSelectedHabit(h);
                                    setEditOpen(true);
                                }}
                                onDelete={(h) => {
                                    setSelectedHabit(h);
                                    setDeleteOpen(true);
                                }}
                            />
                        ))}
                    </SimpleGrid>
                </Stack>
            </Card>

            {/* Habit Logs Card */}
            {logsVisible && (
                <Card
                    shadow="md"
                    p="lg"
                    radius="md"
                    className="mt-6 bg-white border-l-4 border-green-800"
                >
                    <Stack>
                        <Title order={4} className="text-green-800">Habit Logs</Title>
                        {habitLogs.length === 0 ? (
                            <Text color="dimmed" className="text-center py-4">
                                No previous logs of completed habits.
                            </Text>
                        ) : (
                            <SimpleGrid cols={1} spacing="sm">
                                {habitLogs.map((log) => (
                                    <HabitLogInfoCard key={log.id} habitLog={log} />
                                ))}
                            </SimpleGrid>
                        )}
                    </Stack>
                </Card>
            )}

            {/* Dialogs */}
            <AddHabitDialog
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onAdd={handleAdd}
            />

            {selectedHabit && (
                <EditHabitDialog
                    open={editOpen}
                    onClose={() => {
                        setEditOpen(false);
                        setSelectedHabit(null);
                    }}
                    onEdit={handleEdit}
                    habit={selectedHabit}
                />
            )}

            {selectedHabit && (
                <DeleteHabitDialog
                    open={deleteOpen}
                    onClose={() => {
                        setDeleteOpen(false);
                        setSelectedHabit(null);
                    }}
                    onDelete={handleDelete}
                    habit={selectedHabit}
                />
            )}
        </Container>
    );
};

export default Habits;
