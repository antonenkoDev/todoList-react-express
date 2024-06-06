import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { joiUserSchema } from '../validation/joiUserSchema';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const {register} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const validate = () => {
        const {error} = joiUserSchema.validate({email, password}, {abortEarly: false});
        if (!error) return null;

        const newErrors: { email?: string, password?: string } = {};
        for (const item of error.details) {
            if (item.path[0] === 'email') toast.error(item.message);
            if (item.path[0] === 'password') toast.error(item.message);
        }
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validate();
        if (errors) return;

        try {
            const result = await register(email, password);
            if (result.success) {
                navigate('/login', {state: {email}});
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
