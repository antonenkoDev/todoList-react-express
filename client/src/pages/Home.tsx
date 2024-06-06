// src/pages/Home.tsx
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoList from '../components/TodoList'
import { useAuth } from '../context/AuthContext'

const Home: React.FC = () => {
    const { token } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    if (!token) {
        return null
    }

    return (
        <div className="p-4">
            <TodoList />
        </div>
    )
}

export default Home
