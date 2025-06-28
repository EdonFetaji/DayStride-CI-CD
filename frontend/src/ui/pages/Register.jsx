import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../../axios/axios';
import logoIcon from "../../assests/logo.svg";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({username: '', email: '', password: ''});
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/register/', form);
            if (res.status === 201) {
                navigate('/login');
            } else {
                setError('Unexpected response from server');
            }
        } catch (err) {
            setError('Registration failed. Try a different username or check your connection.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <img src={logoIcon} alt="Logo" width={40} height={40}/>
                    <span className="text-2xl font-bold text-black leading-none">DayStride</span>
                </div>
                <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">Create Account</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({...form, username: e.target.value})}
                        required
                    />
                    <input
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        required
                    />
                    <input
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-amber-700 text-white py-2.5 rounded font-semibold hover:bg-amber-800 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
