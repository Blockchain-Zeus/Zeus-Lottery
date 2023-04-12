import React from 'react';

function Stat({ value, description }) {
  return (
    <div className='flex flex-col rounded-lg bg-gray-700 break-all text-center p-3'>
        <p className='text-4xl'>{value}</p>
        <p className='font-bold text-xl'>{description}</p>

    </div>
  );
}

export default Stat;