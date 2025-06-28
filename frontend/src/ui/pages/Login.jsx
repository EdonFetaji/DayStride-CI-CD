import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {TextInput, PasswordInput, Button, Title} from '@mantine/core';
import logoIcon from '../../assests/logo.svg'; // adjust path as needed

const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(credentials.username, credentials.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials or server error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <img src={logoIcon} alt="Logo" width={40} height={40}/>
                    <span className="text-2xl font-bold text-black leading-none">DayStride</span>
                </div>

                <Title align="center" className="text-amber-700 text-3xl font-bold mb-4">
                    Welcome Back
                </Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextInput
                        label="Username"
                        name="username"
                        placeholder="Your username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Your password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <Button
                        fullWidth
                        type="submit"
                        className="bg-amber-700 hover:bg-amber-800 transition text-white font-semibold"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
