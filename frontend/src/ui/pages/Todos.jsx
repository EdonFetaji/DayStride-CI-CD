import React, {useEffect, useState} from "react";
import {
    Container,
    Card,
    Title,
    Group,
    Stack,
    Select,
    Divider,
    SimpleGrid,
    Button,
} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import ToDoRepository from "../../repository/ToDoRepository.js";
import TodoDetailsCard from "../../ui/components/todos/TodoDetailCard.jsx";

import AddTodoDialog from "../../ui/components/todos/AddTodosDialog.jsx";
import EditTodoDialog from "../../ui/components/todos/EditTodosDialog.jsx";
import DeleteTodoDialog from "../../ui/components/todos/DeleteTodosDialog.jsx";

import GradientSegmentedControl from "../../ui/components/animations/SegmentedControl";


const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState(null);
    const [deadlineFilter, setDeadlineFilter] = useState(null);

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const [timeFilter, setTimeFilter] = useState('Upcoming');

    const handleAdd = async (data) => {
        try {
            await ToDoRepository.create(data);
            const res = await ToDoRepository.findAll();
            setTodos(res.data);
        } catch (err) {
            console.error("Add failed:", err);
        }
    };

    const handleEdit = async (id, data) => {
        try {
            await ToDoRepository.update(id, data);
            const res = await ToDoRepository.findAll();
            setTodos(res.data);
        } catch (err) {
            console.error("Edit failed:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await ToDoRepository.delete(id);
            const res = await ToDoRepository.findAll();
            setTodos(res.data);
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };


    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await ToDoRepository.findAll();
                setTodos(res.data);
                console.log(res.data)
                setFilteredTodos(res.data);
            } catch (err) {
                console.error("Failed to fetch todos", err);
            }
        };
        fetchTodos();
    }, []);

    useEffect(() => {
        let filtered = [...todos];

        if (priorityFilter) {
            filtered = filtered.filter((todo) => `${todo.priority}` === priorityFilter);
        }

        if (deadlineFilter === "today") {
            const today = new Date().toISOString().split("T")[0];
            filtered = filtered.filter((todo) => todo.due_date === today);
        }

        const now = new Date();

        if (timeFilter === "Upcoming") {
            filtered = filtered.filter(
                (todo) =>
                    !todo.due_date || new Date(todo.due_date) >= now
            );
        } else if (timeFilter === "Past") {
            filtered = filtered.filter(
                (todo) =>
                    todo.due_date && new Date(todo.due_date) < now
            );
        }

        setFilteredTodos(filtered);
    }, [priorityFilter, deadlineFilter, todos, timeFilter]);


    return (
        <Container size="lg" className="my-10">
            <Card
                shadow="md"
                p="lg"
                radius="md"
                className="border-2 border-amber-500 bg-white"
            >
                <Stack p="md">
                    <div className=" flex flex-col gap-8 justify-evenly">
                        <div className=" flex items-center">
                            <h1 className="text-amber-700  font-bold text-2xl">
                                My Todos
                            </h1>
                            <div className="flex-1 flex justify-center items-center">

                                <GradientSegmentedControl value={timeFilter} onChange={setTimeFilter} />
                            </div>
                        </div>
                        <div className=" flex justify-evenly  ">
                            <Select
                                placeholder="Filter by priority"
                                data={["1", "2", "3", "4"]}
                                value={priorityFilter}
                                onChange={setPriorityFilter}
                                clearable
                            />
                            <Select
                                placeholder="Deadline"
                                data={[{value: "today", label: "Due Today"}]}
                                value={deadlineFilter}
                                onChange={setDeadlineFilter}
                                clearable
                            />


                            <Button
                                leftSection={<IconPlus size={16}/>}
                                variant="light"
                                color="blue"
                                radius="md"
                                onClick={() => setAddDialogOpen(true)}
                                className=" ml-[20%]"
                            >
                                Add Todo
                            </Button>
                        </div>
                    </div>

                    <Divider className="my-2"/>

                    <SimpleGrid cols={1} spacing="md">
                        {filteredTodos.map((todo) => (
                            <TodoDetailsCard
                                key={todo.id}
                                todo={todo}
                                onEdit={(todo) => {
                                    setSelectedTodo(todo);
                                    setEditDialogOpen(true);
                                }}
                                onDelete={(todo) => {
                                    setSelectedTodo(todo);
                                    setDeleteDialogOpen(true);
                                }}
                            />

                        ))}
                    </SimpleGrid>
                </Stack>
            </Card>

            <AddTodoDialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                onAdd={handleAdd}
            />

            {selectedTodo && (
                <EditTodoDialog
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    onEdit={handleEdit}
                    todo={selectedTodo}
                />
            )}

            {selectedTodo && (
                <DeleteTodoDialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    onDelete={handleDelete}
                    todo={selectedTodo}
                />
            )}

        </Container>
    );
};

export default Todos;
