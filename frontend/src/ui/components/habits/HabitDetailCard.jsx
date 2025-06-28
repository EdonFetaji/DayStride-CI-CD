// src/ui/components/habits/HabitDetailCard.jsx
import React from 'react';
import {Card, Text, Badge, Group, Title, Button} from '@mantine/core';
import {IconEdit, IconTrash} from '@tabler/icons-react';

const HabitDetailCard = ({habit, onEdit, onDelete}) => {
    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="md"
            className="bg-white text-gray-800  "
        >

            <section className="flex justify-between px-16">
                <div>
                    <Group position="apart" mb="sm">
                        <Title order={4} className="text-green-700">{habit.name}</Title>
                    </Group>
                    <Text size="sm" color="dimmed">
                        {habit.description || "No description provided."}
                    </Text>
                    <Badge mt="sm" color="gray" variant="light">
                        Created: {new Date(habit.created_at).toLocaleDateString()}
                    </Badge>
                </div>
                <div className="flex flex-col justify-around items-center">
                    <div className="rounded-lg border border-amber-500 hover:bg-amber-50">
                        <Button
                            variant="light"
                            color="orange"
                            leftSection={<IconEdit size={16}/>}
                            onClick={() => onEdit(habit)}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="rounded-lg border border-red-500 hover:bg-red-50">
                        <Button
                            variant="light"
                            color="red"
                            leftSection={<IconTrash size={16}/>}
                            onClick={() => onDelete(habit)}
                        >
                            Delete
                        </Button>
                    </div>


                </div>
            </section>
        </Card>
    );
};

export default HabitDetailCard;
