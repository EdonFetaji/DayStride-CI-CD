import {Card, Text, Group, Badge, Button, Title, Stack} from "@mantine/core";
import {IconUserPlus} from "@tabler/icons-react";

const GoalDetails = ({goal, onJoin}) => {
    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="md"
            className="bg-white text-gray-800"
        >
            <Group position="apart" mb="xs">
                <Title order={4} className="text-blue-500 font-semibold">
                    {goal.name}
                </Title>
                {goal.is_public && (
                    <Badge color="green" variant="light" size="sm">
                        Public
                    </Badge>
                )}
            </Group>

            <Text size="sm" color="dimmed" mb="sm">
                {goal.description || "No description provided."}
            </Text>

            <Group spacing="xs" mb="xs">
                {goal.end_date && (
                    <Badge color="blue" variant="outline">
                        Ends: {new Date(goal.end_date).toLocaleDateString()}
                    </Badge>
                )}
                {goal.location && (
                    <Badge color="gray" variant="light">
                        Location: {goal.location}
                    </Badge>
                )}
            </Group>

            {goal.is_public && (
                <Text size="xs" color="dimmed" mb="sm">
                    Shared by {goal.shared_count || 0} {goal.shared_count === 1 ? "user" : "users"}
                </Text>
            )}

        </Card>
    );
};

export default GoalDetails;
