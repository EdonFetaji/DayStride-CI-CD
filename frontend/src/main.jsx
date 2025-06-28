import '@mantine/core/styles.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import {MantineProvider} from '@mantine/core';
import {AuthProvider} from './contexts/AuthContext.jsx'; // FIXED LINE

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </MantineProvider>
    </StrictMode>
);
