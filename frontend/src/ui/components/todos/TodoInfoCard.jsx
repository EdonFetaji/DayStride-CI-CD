// src/ui/components/todos/TodoInfoCard.jsx
import React from "react";
import {Card, Text, Group, Title, Badge, Switch} from "@mantine/core";
import {IconCalendar} from "@tabler/icons-react";

const TodoInfoCard = ({todo, onToggleCompleted}) => {
    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="md"
            className="bg-white text-gray-800"
        >
            <section className="flex justify-between items-center px-2">
                {/* Left side: Task info */}
                <div>
                    <Title order={5} className="text-amber-600">
                        {todo.name}
                    </Title>
                    {todo.deadline && (
                        <Group spacing="xs" mt="xs">
                            <Badge
                                color="amber"
                                variant="outline"
                                leftSection={<IconCalendar size={14}/>}
                            >
                                Due: {new Date(todo.deadline).toLocaleDateString()} @{" "}
                                {new Date(todo.deadline).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Badge>
                        </Group>
                    )}
                </div>

                {/* Right side: Completed switch */}
                <div className="pl-4">
                    <Switch
                        size="md"
                        color="orange"
                        checked={todo.completed}
                        onChange={onToggleCompleted}
                        // label="Completed"
                    />
                </div>
            </section>
        </Card>
    );
};

export default TodoInfoCard;
