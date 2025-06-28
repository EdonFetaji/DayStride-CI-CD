// src/ui/components/goals/GoalDetailsCard.jsx
import React from "react";
import {
    Card,
    Text,
    Group,
    Badge,
    Title,
    Stack,
    Divider,
} from "@mantine/core";

const GoalDetailsCard = ({goal, sharedCount = 0}) => {
    if (!goal) return null;

    return (
        <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack spacing="sm">
                <Group position="apart">
                    <Title order={3}>{goal.name}</Title>
                    {goal.is_public && (
                        <Badge color="green" variant="light">
                            Public
                        </Badge>
                    )}
                </Group>

                <Text size="sm" color="dimmed">
                    {goal.description}
                </Text>

                <Divider my="sm"/>

                <Group spacing="sm">
                    <Badge color="blue" variant="outline">
                        Ends on: {goal.end_date}
                    </Badge>
                    <Badge color="gray" variant="outline">
                        Location: {goal.location}
                    </Badge>
                </Group>

                {goal.is_public && (
                    <Text size="xs" color="gray" mt="xs">
                        Shared by {sharedCount} {sharedCount === 1 ? "user" : "users"}
                    </Text>
                )}

                <Text size="xs" color="dimmed">
                    Created by: {goal.owner?.username || "Unknown"}
                </Text>
            </Stack>
        </Card>
    );
};

export default GoalDetailsCard;
