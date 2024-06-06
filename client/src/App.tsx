import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import ThemeToggle from './components/ThemeToggle';

const Navigation: React.FC = () => {
    const {token, logout} = useAuth();

    return (
        <nav className="bg-white dark:bg-gray-800 shadow p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">My To-Do App</Link>
                <div className="flex items-center">
                    <ThemeToggle/>
                    {token ? (
                        <button onClick={logout} className="ml-4 text-gray-900 dark:text-white">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="ml-4 text-gray-900 dark:text-white">Login</Link>
                            <Link to="/register" className="ml-4 text-gray-900 dark:text-white">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                <Navigation/>
                <div className="max-w-7xl mx-auto p-4">
                    <Outlet/>
                </div>
            </div>
        </AuthProvider>
    );
};

export default App;
