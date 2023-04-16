import React from 'react';

function Stat({ value, description }) {
  return (
    <div className='flex flex-col rounded-lg bg-gray-700 break-all text-center p-3 px-4 py-2'>
        <p className='text-2xl'>{value}</p>
        <p className='font-bold text-1xl'>{description}</p>

    </div>
  );
}

export default Stat;