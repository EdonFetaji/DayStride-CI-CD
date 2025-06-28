import React from 'react';
import {Card, Text, Group, Badge} from '@mantine/core';
import {IconClock, IconCalendar} from '@tabler/icons-react';

const HabitLogInfoCard = ({habitLog}) => {
    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="md"
            className="bg-white text-gray-800"
        >
            <Group position="apart" mb="xs">
                <Text weight={600} className="text-green-700">
                    {habitLog.habit.name}
                </Text>
            </Group>

            <Group spacing="xs" mt="xs">
                <Badge
                    color="green"
                    variant="light"
                    leftSection={<IconCalendar size={14}/>}
                >
                    {new Date(habitLog.date).toLocaleDateString()}
                </Badge>
                <Badge
                    color="blue"
                    variant="light"
                    leftSection={<IconClock size={14}/>}
                >
                    {habitLog.time.slice(0, 5)}
                </Badge>
            </Group>
        </Card>
    );
};

export default HabitLogInfoCard;
