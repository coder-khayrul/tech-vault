import React from 'react';

const Container = ({children}) => {
    return (
         <div className='w-[98%] xl:w-11/12 2xl:w-[1400px] mx-auto'>
            {children}
        </div>
    );
};

export default Container;