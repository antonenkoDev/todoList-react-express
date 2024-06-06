import React, { createContext, useState, useContext, useEffect, FC, ReactNode, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

export interface Todo {
    _id: string;
    description: string;
    isCompleted: boolean;
}

interface TodoContextType {
    todos: Todo[];
    fetchTodos: () => Promise<void>;
    addTodo: (description: string) => Promise<void>;
    updateTodo: (id: string, description: string) => Promise<void>;
    toggleComplete: (id: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: FC<TodoProviderProps> = ({children}) => {
    const {user} = useAuth();
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/todo');
            setTodos(response.data);
        } catch (error) {
            toast.error('Error fetching todos. Please try again later.');
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchTodos();
        }
    }, [user, fetchTodos]);

    const addTodo = async (description: string) => {
        try {
            const response = await axiosInstance.post('/todo', {
                description,
                isCompleted: false,
            });
            setTodos([...todos, response.data]);
            toast.success('Todo added successfully');
        } catch (error) {
            toast.error('Error adding todo. Please try again later.');
        }
    };

    const updateTodo = async (id: string, description: string) => {
        const todo = todos.find(todo => todo._id === id);
        try {
            if (todo) {
                const response = await axiosInstance.put(`/todo/${id}`, {description, isCompleted: todo.isCompleted});
                setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
                toast.success('Todo updated successfully');
            }
        } catch (error) {
            toast.error('Error updating todo. Please try again later.');
        }
    };

    const toggleComplete = async (id: string) => {
        const todo = todos.find(todo => todo._id === id);
        if (todo) {
            try {
                const response = await axiosInstance.put(`/todo/${id}`, {
                    description: todo.description,
                    isCompleted: !todo.isCompleted,
                });
                setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
                toast.success('Todo status updated successfully');
            } catch (error) {
                toast.error('Error toggling todo status. Please try again later.');
            }
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await axiosInstance.delete(`/todo/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
            toast.success('Todo deleted successfully');
        } catch (error) {
            toast.error('Error deleting todo. Please try again later.');
        }
    };

    return (
        <TodoContext.Provider value={{todos, fetchTodos, addTodo, updateTodo, toggleComplete, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
};
