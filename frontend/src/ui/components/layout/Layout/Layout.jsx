import React from 'react';
import {Box, Container} from '@mui/material';
import Header from '../Header/Header.jsx';
import {Outlet} from 'react-router-dom';

const Layout = () => {
    //  backgroundColor: '#f3f4f6',
    return (
        <Box sx={{minHeight: '100vh', color: '#1a1a1a', overflow: 'hidden'}}
             className="bg-gray-200">

            <Header/>
            <Container disableGutters maxWidth="xl">

                <Outlet/>
            </Container>
        </Box>
    );
};

export default Layout;
