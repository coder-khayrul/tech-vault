import React from 'react';

const SectionHeader = () => {
    return (
        <div className='flex items-center justify-center flex-col mb-18 gap-3'>
            <h2 className='font-semibold text-[30px] md:text-[42px] text-center text-white'>Featred Products<span className='text-indigo-400'> Of This Week</span> </h2>
            <p className='flex items-center gap-2  text-[15px] font-normal text-center w-[98%] lg:w-[65%] text-indigo-200'>
                Joining our mission is easy and impactful. Just explore current volunteer requests, sign up for an opportunity that matches your interests, and start making a difference.
            </p>
        </div>
    );
};

export default SectionHeader;