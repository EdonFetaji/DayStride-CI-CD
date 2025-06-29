import React, {useEffect, useState} from "react";
import GoalRepository from "../../repository/GoalRepository";
import {
    Container,
    Title,
    SimpleGrid,
    Loader,
    Card,
    TextInput,
    Text,
    Button,
    Group,
} from "@mantine/core";
import {IconSearch, IconUserPlus, IconCheck} from "@tabler/icons-react";
import GoalDetails from "../components/goals/GoalDetails";

function GoalHub() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [joinedGoals, setJoinedGoals] = useState([]); // track joined goals

    const fetchGoals = async () => {
        try {
            const res = await GoalRepository.findAllPublic();
            setGoals(res.data);
        } catch (err) {
            console.error("Failed to fetch public goals:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async (goalId) => {
        try {
            await GoalRepository.joinGoal(goalId);
            setJoinedGoals((prev) => [...prev, goalId]);
            fetchGoals(); // optionally refresh
        } catch (err) {
            console.error("Failed to join goal:", err);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    // Filter goals:
    // - Name contains search
    // - Goal is NOT owned by the current user
    const filteredGoals = goals.filter(
        (goal) =>
            !goal.is_owner &&
            goal.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container size="md" py="xl">
            <Title order={2} ta="center" mb="lg">
                Public Goals Hub
            </Title>
            <TextInput
                placeholder="Search goals by name..."
                icon={<IconSearch size={18}/>}
                rightSection={<IconSearch size={25} color="gray"/>}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                size="md"
                radius="xl"
                mb="lg"
                className="w-[70%] p-1 m-auto rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-gray-50 shadow-sm transition duration-200"
            />

            {loading ? (
                <Group position="center">
                    <Loader/>
                </Group>
            ) : filteredGoals.length === 0 ? (
                <Text align="center" color="dimmed">
                    No goals found matching your search.
                </Text>
            ) : (
                <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="lg">
                    {filteredGoals.map((goal) => (
                        <Card
                            key={goal.id}
                            shadow="sm"
                            padding="md"
                            radius="md"
                            withBorder
                            style={{
                                transition: "transform 0.2s",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "scale(1.02)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                            }
                        >
                            <GoalDetails goal={goal}/>

                            <Group position="center" mt="sm">
                                {joinedGoals.includes(goal.id) ? (
                                    <Button
                                        fullWidth
                                        color="green"
                                        radius="md"
                                        leftSection={<IconCheck size={16}/>}
                                        disabled
                                        styles={{
                                            root: {borderRadius: "0.5rem"},
                                        }}
                                    >
                                        Joined
                                    </Button>
                                ) : (
                                    <Button
                                        fullWidth
                                        variant="light"
                                        color="blue"
                                        radius="md"
                                        leftSection={<IconUserPlus size={16}/>}
                                        onClick={() => handleJoin(goal.id)}
                                        styles={{
                                            root: {
                                                border: "1px solid #3b82f6",
                                                borderRadius: "0.5rem",
                                            },
                                        }}
                                    >
                                        Join Goal
                                    </Button>
                                )}
                            </Group>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
}

export default GoalHub;
