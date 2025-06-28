// src/ui/components/goals/GoalInfoCard.jsx
import React from 'react';
import {Card, Text, Badge, Group, Title} from '@mantine/core';
import {IconMapPin, IconCalendar} from '@tabler/icons-react';

const GoalInfoCard = ({goal}) => {
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
                    <Title order={5} className="text-blue-600">{goal.name}</Title>
                    <Group spacing="xs" mt="xs">
                        {goal.end_date && (
                            <Badge
                                color="blue"
                                variant="outline"
                                leftSection={<IconCalendar size={14}/>}
                            >
                                Ends: {new Date(goal.end_date).toLocaleDateString()}
                            </Badge>
                        )}
                        {goal.location && (
                            <Badge
                                color="gray"
                                variant="light"
                                leftSection={<IconMapPin size={14}/>}
                            >
                                {goal.location}
                            </Badge>
                        )}
                    </Group>
                </div>
            </section>
        </Card>
    );
};

export default GoalInfoCard;
