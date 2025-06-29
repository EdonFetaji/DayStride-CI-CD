import {Card, Text, Group, Badge, Button, Title} from '@mantine/core';
import {IconEdit, IconTrash, IconLogout} from '@tabler/icons-react';

const GoalCard = ({goal, onEditClick, onDeleteClick, onLeaveClick, sharedCount = 0}) => {
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
                {!goal.is_owner && (
                    <Badge color="orange" variant="light" size="sm">
                        Shared
                    </Badge>
                )}
                {goal.is_public && goal.is_owner && (
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

            {goal.is_public && goal.is_owner && (
                <Text size="xs" color="dimmed" mb="sm">
                    Shared by {sharedCount} {sharedCount === 1 ? "user" : "users"}
                </Text>
            )}

            <Group position="right" spacing="xs" mt="sm">
                {goal.is_owner ? (
                    <>
                        <Button
                            variant="light"
                            color="orange"
                            radius="md"
                            leftSection={<IconEdit size={16}/>}
                            onClick={() => onEditClick(goal)}
                            styles={{
                                root: {border: '1px solid #f59e0b', borderRadius: '0.5rem'},
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="light"
                            color="red"
                            radius="md"
                            leftSection={<IconTrash size={16}/>}
                            onClick={() => onDeleteClick(goal)}
                            styles={{
                                root: {border: '1px solid #ef4444', borderRadius: '0.5rem'},
                            }}
                        >
                            Delete
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="light"
                        color="red"
                        radius="md"
                        leftSection={<IconLogout size={16}/>}
                        onClick={() => onLeaveClick(goal)}
                        styles={{
                            root: {border: '1px solid #ef4444', borderRadius: '0.5rem'},
                        }}
                    >
                        Leave
                    </Button>
                )}
            </Group>
        </Card>
    );
};

export default GoalCard;
