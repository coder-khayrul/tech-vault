import React from 'react';

const ButtonBody = ({btnText}) => {
    return (
        <button
            type="submit"
            class="flex justify-center gap-2 items-center mx-auto  text-[16px] bg-indigo-500 hover:bg-white text-white hover:text-indigo-500 border-gray-50 z-10 px-4 py-2 border-2 rounded-full group duration-700"
        >
            {btnText}
            <GoArrowRight className="w-8 h-8 justify-end group-hover:rotate-0 group-hover:bg-indigo-500  text-white ease-linear duration-300 rounded-full border border-gray-50 group-hover:border-none p-1 -rotate-45"
                size={25} />
        </button>
    );
};

export default ButtonBody;