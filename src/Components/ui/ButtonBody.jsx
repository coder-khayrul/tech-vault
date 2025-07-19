import React from 'react';
import { GoArrowRight } from "react-icons/go";
import { Link } from 'react-router';

const ButtonBody = ({ children, to }) => {
    const baseClass =
        "flex justify-center gap-2 items-center text-[16px] bg-indigo-500 hover:bg-white text-white hover:text-indigo-500 border-gray-50 z-10 px-4 py-2 border-2 rounded-full group duration-700";
 
    const iconClass =
        "w-8 h-8 justify-end group-hover:rotate-0 group-hover:bg-indigo-500 text-white ease-linear duration-300 rounded-full border border-gray-50 group-hover:border-none p-1 -rotate-45";

    if (to) {
        return (
            <Link to={to} className={baseClass}>
                {children}
                <GoArrowRight className={iconClass} size={25} />
            </Link>
        );
    }

    return (
        <button type="submit" className={baseClass}>
            {children}
            <GoArrowRight className={iconClass} size={25} />
        </button>
    );
};

export default ButtonBody;
