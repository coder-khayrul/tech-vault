import React from 'react';
import { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const OverView = () => {
const {userInfo} = use(AuthContext)

    return (
        <div>
            <h1 className='text-2xl'>{userInfo.role === "admin" ?"Welcome to Admin dashboard": "Welcome to user dashboard"}</h1>
        </div>
    );
};

export default OverView;