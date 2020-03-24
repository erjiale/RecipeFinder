import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <div className="popularlink">
                <Link to='/popular'>Popular Recipes</Link>
            </div>
            <div className="loginregisterlink">
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        </nav>
    );
};

export default Nav;