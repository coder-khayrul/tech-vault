import React from 'react';
import { Link } from 'react-router';

const ButtonTwo = ({ children,targetLink, onClickHandler }) => {
    return (
        <button onClick={() => onClickHandler()}
            className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
        > 
            <Link to={targetLink}>
                <span
                    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                ></span>
                <span
                    className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                >{children}</span>
            </Link>
        </button>
    );
};

export default ButtonTwo;