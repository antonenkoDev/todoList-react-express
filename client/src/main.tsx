import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './components/TodoList';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <TodoProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<App/>}>
                            <Route index element={<Home/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="todos" element={<TodoList/>}/>
                        </Route>
                    </Routes>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </Router>
            </TodoProvider>
        </AuthProvider>
    </React.StrictMode>,
);
