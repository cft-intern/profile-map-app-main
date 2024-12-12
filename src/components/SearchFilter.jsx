import React from 'react';
import { IoIosSearch } from 'react-icons/io';

const SearchFilter = ({ search, onSearchChange }) => {
  return (
    <div className='mb-4 flex justify-center '>
      <label className='relative'>
        <input
          type='text'
          placeholder='Search by name, state, or ID...'
          value={search}
          onChange={onSearchChange}
          className='block w-60 md:w-96 px-8 py-2 border border-gray-600 bg-gray-700 rounded-md text-white mb-2'
        />
        <IoIosSearch className='top-3 left-2 absolute text-xl font-bold text-white' />
      </label>
    </div>
  );
};

export default SearchFilter;
