import React, { useState, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { joiTodoSchema } from '../validation/joiTodoSchema';
import { toast } from 'react-toastify';

const TodoList: React.FC = () => {
    const {todos, fetchTodos, addTodo, toggleComplete, deleteTodo, updateTodo} = useTodos();
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const validate = () => {
        const {error} = joiTodoSchema.validate({description: newTodo, isCompleted: false}, {abortEarly: false});
        if (!error) return null;

        const newErrors: { description?: string } = {};
        for (const item of error.details) {
            if (item.path[0] === 'description') newErrors.description = item.message;
        }
        return newErrors;
    };

    const handleAddTodo = async () => {
        const errors = validate();
        if (errors) {
            if (errors.description) {
                toast.error(errors.description);
            }
            return;
        }

        if (newTodo.trim()) {
            await addTodo(newTodo);
            setNewTodo('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    className="flex-1 border p-2 rounded"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>
            <div className="bg-white rounded shadow">
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
