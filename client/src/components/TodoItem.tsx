import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { Todo } from '../context/TodoContext';
import { joiTodoSchema } from '../validation/joiTodoSchema';
import { toast } from 'react-toastify';

interface TodoItemProps {
    todo: Todo;
    toggleComplete: (id: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    updateTodo: (id: string, description: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, toggleComplete, deleteTodo, updateTodo}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(todo.description);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const validate = () => {
        const {error} = joiTodoSchema.validate({
            description: newDescription,
            isCompleted: todo.isCompleted
        }, {abortEarly: false});
        if (!error) return null;

        const newErrors: { description?: string } = {};
        for (const item of error.details) {
            if (item.path[0] === 'description') newErrors.description = item.message;
        }
        return newErrors;
    };

    const handleSave = async () => {
        const errors = validate();
        if (errors) {
            if (errors.description) {
                toast.error(errors.description);
            }
            return;
        }

        await updateTodo(todo._id, newDescription);
        setIsEditing(false);
        toast.success('Todo updated successfully');
    };

    const handleCancel = () => {
        setNewDescription(todo.description);
        setIsEditing(false);
    };

    return (
        <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleComplete(todo._id)}
                    className="mr-2 form-checkbox h-5 w-5 text-blue-600"
                />
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="border p-1 rounded"
                        />
                    </div>
                ) : (
                    <span className={todo.isCompleted ? 'line-through' : ''}>{todo.description}</span>
                )}
            </div>
            <div className="flex items-center">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="text-green-500 mr-2">
                            <FaCheck/>
                        </button>
                        <button onClick={handleCancel} className="text-red-500 mr-2">
                            <FaTimes/>
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEdit} className="text-blue-500 mr-2">
                            <FaEdit/>
                        </button>
                        <button onClick={() => deleteTodo(todo._id)} className="text-red-500 mr-2">
                            <FaTrash/>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoItem;
