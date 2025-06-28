import React from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Group,
    Burger,
    Text,
    Button,
    Flex,
    Box,
    Paper,
} from '@mantine/core';
import {IconMenu2} from '@tabler/icons-react';

const pages = [
    {path: '/', name: 'Home'},
    {path: '/dashboard', name: 'Dashboard'},
    {path: '/habits', name: 'Habits'},
    {path: '/todos', name: 'Todos'},
    {path: '/goals', name: 'Goals'},
    {path: '/goalhub', name: 'Goal Hub'},
];
import logoIcon from '../../../../assests/logo.svg';
import {UnstyledButton} from '@mantine/core';

const Header = () => {
    return (
        <Paper shadow="sm" radius={0} p="md" withBorder  className="shadow-lg">
            <Container size="xl">
                <Flex align="center" justify="space-between">
                    <Group gap="sm">
                        {/*<IconMenu2 size={24} color="#4f46e5"/>*/}
                        <img src={logoIcon} alt="Logo" width={42} height={42}/>
                        <Text fw={700} size="xl" color="black">
                            <span className="text-[1.4em] text-black font-bold leading-none">DayStride</span>
                        </Text>
                    </Group>
                    <Group gap="sm">
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
                </Flex>
            </Container>
        </Paper>
    );
};

export default Header;
