import { createContext, useState, useContext, useEffect, FC, ReactNode } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../api/axiosInstance';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean, message?: string }>;
    register: (email: string, password: string) => Promise<{ success: boolean, message?: string }>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Optionally, you can fetch the user data here to validate the token
            const fetchUserData = async () => {
                try {
                    const response = await apiClient.get('/auth/me');
                    setUser(response.data.user);
                } catch (error) {
                    // Handle error, e.g., token is invalid
                    logout();
                }
            };
            fetchUserData();
        }
    }, [token]);

    const login = async (email: string, password: string): Promise<{ success: boolean, message?: string }> => {
        try {
            const response = await apiClient.post('/auth/login', {
                email,
                password,
            });

            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            toast.success('Logged in successfully!');
            return {success: true};
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred');
            return {success: false, message: error.response?.data?.message};
        }
    };

    const register = async (email: string, password: string): Promise<{ success: boolean, message?: string }> => {
        try {
            const response = await apiClient.post('/auth/register', {
                email,
                password,
            });

            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            toast.success('Registered successfully!');
            return {success: true};
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred');
            return {success: false, message: error.response?.data?.message};
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete apiClient.defaults.headers.common['Authorization'];
        toast.success('Logged out successfully!');
    };

    return (
        <AuthContext.Provider value={{user, token, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
