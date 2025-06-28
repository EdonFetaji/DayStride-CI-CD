import React from 'react';
import {Card, Text, Badge, Group, Title, Switch, Tooltip} from '@mantine/core';
import {IconCalendarStats, IconCheck, IconX} from '@tabler/icons-react';

const HabitInfoCard = ({habit, onToggleCompleted}) => {
    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="md"
            className="bg-white text-gray-800"
        >
            <section className="flex justify-between items-center px-4">
                <div className="space-y-2">
                    <Title order={5} className="text-green-700">{habit.name}</Title>
                    <Text size="sm" color="dimmed">
                        {habit.description || "No description provided."}
                    </Text>
                </div>

                <Tooltip label={habit.completed ? "Completed" : "Not completed"} withArrow>
                    <Switch
                        checked={habit.completed}
                        onChange={() => onToggleCompleted(habit)}
                        color="green"
                        size="md"
                        onLabel={<IconCheck size={14}/>}
                        offLabel={<IconX size={14}/>}
                    />
                </Tooltip>
            </section>
        </Card>
    );
};

export default HabitInfoCard;
