import React from 'react';

const SectionHeader = ({title,description,type}) => {
    
    const sectionTitle = title.split("|");
    return (
        <div className='flex items-center justify-center flex-col mb-18 gap-3'> 
            <h2 className={`font-semibold text-[30px] md:text-[42px] text-center ${type=== "dark"?"text-white": "text-indigo-950"}`}>{sectionTitle[0]}<span className='text-indigo-400'> {sectionTitle[1]}</span> </h2>
            <p className={`flex items-center gap-2  text-[15px] font-normal text-center w-[98%] lg:w-[65%] ${type=== "dark"?"text-indigo-200":"text-indigo-800" } `}>
                {description}
            </p>
        </div>
    );
};

export default SectionHeader;