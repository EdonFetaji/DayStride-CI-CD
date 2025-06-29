import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { IconLogin, IconLogout } from '@tabler/icons-react';
import {
    Container,
    Group,
    Text,
    Flex,
    Paper,
    Button,
} from '@mantine/core';
import logoIcon from '../../../../assests/logo.svg';

const pages = [
    {path: '/dashboard', name: 'Dashboard'},
    {path: '/habits', name: 'Habits'},
    {path: '/todos', name: 'Todos'},
    {path: '/goals', name: 'Goals'},
    {path: '/goalhub', name: 'Goal Hub'},
];

const Header = () => {
    const navigate = useNavigate();
    const tokens = localStorage.getItem("tokens");

    const handleLogout = () => {
        localStorage.removeItem("tokens");
        navigate("/login");
    };

    return (
        <Paper shadow="sm" radius={0} p="md" withBorder className="shadow-lg">
            <Container size="xl">
                <Flex align="center" justify="space-between">
                    <Link to={"/"} className="flex-1">
                        <Group gap="sm">
                            <img src={logoIcon} alt="Logo" width={42} height={42}/>
                            <Text fw={700} size="xl" color="black">
                                <span className="text-[1.4em] text-black font-bold leading-none">DayStride</span>
                            </Text>
                        </Group>
                    </Link>

                    <Group gap="sm" className="flex-1">
                        {pages.map((page) => (
                            <Link
                                key={page.name}
                                to={page.path}
                                className="rounded-lg font-semibold text-[1.1em] px-4 py-2 text-gray-700 hover:text-amber-900 hover:bg-amber-100 hover:shadow-sm border border-transparent hover:border-amber-300 transition-all duration-200"
                            >
                                {page.name}
                            </Link>
                        ))}


                    </Group>

                    {tokens ? (
                        <Button
                            variant="light"
                            color="red"
                            radius="md"
                            leftSection={<IconLogout size={16}/>}
                            onClick={handleLogout}
                            styles={{
                                root: {border: '1px solid #ef4444', borderRadius: '0.5rem'},
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            variant="light"
                            color="green"
                            radius="md"
                            leftSection={<IconLogin size={16}/>}
                            onClick={() => navigate("/login")}
                            styles={{
                                root: {border: '1px solid #22c55e', borderRadius: '0.5rem'},
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Flex>
            </Container>
        </Paper>
    );
};

export default Header;
