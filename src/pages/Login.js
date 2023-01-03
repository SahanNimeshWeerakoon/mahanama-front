import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../features/auth/authSlice';

const Login = () => {
    const [ credentials, setCredentials ] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);

    const handleChange = e => {
        setCredentials(prevCred => {
            return {
                ...prevCred,
                [e.target.name]: e.target.value
            }
        });
    }

    useEffect(()=> {
        if (userInfo) {
            navigate('/addVehicle');
        }
    }, [navigate, userInfo]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(userLogin(credentials));
        navigate('/');
    }

    return (
        <div className='login flex justify-center items-center' style={{ marginTop: '100px' }}>
            <form onSubmit={handleSubmit} className="md:w-1/3 w-full rounded-lg md:shadow-md h-auto p-5">
                <h1 className='text-4xl text-center mb-10'>Login</h1>
                <div className='mt-5'>
                    <label className='block w-full text-l ml-2'>Username</label>
                    <input className='block w-full bg-white p-3 border-b mb-2 outline-none focus:border-blue-500' type="text" value={credentials.username} placeholder="Your Username Here..." name="username" onChange={handleChange} />
                </div>
                <div className='mt-5'>
                    <label className='block w-full text-l ml-2'>Password</label>
                    <input className='block w-full bg-white p-3 border-b mb-2 outline-none focus:border-blue-500' type="password" value={credentials.password} placeholder="Your Passowrd Here..." name="password" onChange={handleChange} />
                </div>
                <button type='submit' className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right'>Login</button>
            </form>
        </div>
    );
}

export default Login