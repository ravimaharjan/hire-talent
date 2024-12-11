import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/Login/loginSlice';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <header style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <nav>
                    <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
                    <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
                    <Link to="/profile" style={{ margin: '0 10px' }}>Profile</Link>
                </nav>

                <div >
                    <button onClick={handleLogout}>Logout </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
