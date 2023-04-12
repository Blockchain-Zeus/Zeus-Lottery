import React from 'react';

function TextField({ label, type, onInputChange, value }) {
  const handleChange = (event) => {
    onInputChange(event);
  }

  return (
    <div className="">
		<label className="mb-1 block text-sm font-bold text-white" htmlFor={label}>
			{ label }
		</label>
		<input
			autoComplete="off"
			className="focus:shadow-outline w-full appearance-none rounded border bg-gray-600 border-black py-2 px-3 leading-tight text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
			id={label}
			type={type}
			placeholder={label}
			onChange={handleChange}
			value={value}
		/>
	</div>
  );
}

export default TextField;
