import React from 'react';
import {Card, Text, Badge, Group, Title, Button} from '@mantine/core';
import {
    IconCheck,
    IconAlertTriangle,
    IconClock,
    IconEdit,
    IconTrash,
    IconCalendar,
} from '@tabler/icons-react';

const getStatusBadge = (status) => {
    switch (status) {
        case true:
            return <Badge color="green" leftSection={<IconCheck size={14}/>}>Completed</Badge>;
        default:
            return <Badge color="red" leftSection={<IconAlertTriangle size={14}/>}>Overdue</Badge>;
    }
};

const TodoDetailsCard = ({todo, onEdit, onDelete}) => {



    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="sm"
            className="bg-white text-gray-800"
        >
            <section className="flex justify-between px-6 py-2">

                <div className="space-y-16">
                    <Group position="apart" mb="sm">
                        <Title order={4} className="text-indigo-700">{todo.name}</Title>
                    </Group>

                    <Text size="sm" color="dimmed">
                        {todo.description || 'No description provided.'}
                    </Text>

                    <Group spacing="sm" mt="sm">
                        {todo.due_date && (
                            <Badge color="blue" variant="outline" leftSection={<IconCalendar size={12}/>}>
                                {new Date(todo.due_date).toLocaleDateString()}
                            </Badge>
                        )}
                        {todo.due_time && (
                            <Badge color="blue" variant="outline" leftSection={<IconClock size={12}/>}>
                                {todo.due_time.slice(0, 5)}

                            </Badge>
                        )}
                        {todo.priority && (
                            <Badge color="gray" variant="outline">
                                Priority: {todo.priority}
                            </Badge>
                        )}
                        {todo.category && (
                            <Badge color="teal" variant="light">
                                {todo.category}
                            </Badge>
                        )}
                    </Group>
                </div>

                <div className="flex flex-col justify-evenly items-center">
                    <p className="text-center font-bold">Status: </p>
                    {getStatusBadge(todo.completed)}
                </div>

                {/* Action Buttons */}
                <section className="flex flex-col justify-around items-center">
                    <div className="rounded-lg border border-amber-500 hover:bg-amber-50">
                        <Button
                            variant="light"
                            color="orange"
                            leftSection={<IconEdit size={16}/>}
                            onClick={() => onEdit(todo)}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="rounded-lg border border-red-500 hover:bg-red-50">
                        <Button
                            variant="light"
                            color="red"
                            leftSection={<IconTrash size={16}/>}
                            onClick={() => onDelete(todo)}
                        >
                            Delete
                        </Button>
                    </div>
                </section>

            </section>
        </Card>


    );
};

export default TodoDetailsCard;
