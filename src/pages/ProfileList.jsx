import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from '../components/SearchFilter';
import defaultPicture from '../assets/default-user-icon-3.jpg';
import { useSelector } from 'react-redux';

// {profiles} as a props
const ProfileList = () => {
  const profiles = useSelector((state) => state.user.profiles);
  // console.log('profile', state);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    name: '',
    address: '',
  });

  // Handler for search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  // Handler for filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value.toLowerCase(),
    }));
  };

  // Filter profiles based on search and filter values
  const filteredProfiles = profiles.filter(
    (profile) =>
      (search
        ? profile.name.toLowerCase().includes(search) ||
          profile.address.toLowerCase().includes(search) ||
          profile.id.toString().includes(search)
        : true) &&
      (filter.name ? profile.name.toLowerCase().includes(filter.name) : true) &&
      (filter.address
        ? profile.address.toLowerCase().includes(filter.address)
        : true)
  );

  return (
    <div className='p-4 bg-gray-200  w-full min-h-screen   mx-auto'>
      <div className='flex justify-center flex-col'>
        <h2 className='text-2xl font-semibold text-primary text-center mb-4'>
          PROFILE LIST
        </h2>

        <SearchFilter
          search={search}
          filter={filter}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className='space-y-4 '>
        {filteredProfiles.length === 0 ? (
          <p className='text-white'>No profiles found</p>
        ) : (
          filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className=' p-4 rounded-lg bg-gray-300 flex flex-col md:flex-row items-center'
            >
              <img
                src={profile.photo || defaultPicture}
                alt={profile.name}
                className='w-16 h-16 object-cover rounded-full mr-4'
              />
              <div className='flex-1'>
                <h4 className='text-lg text-center md:text-left font-semibold'>
                  {profile.name}
                </h4>
                <p className='text-center md:text-left'>
                  {profile.description}
                </p>
                <p className='text-gray-400 text-center md:text-left'>
                  {profile.address}
                </p>
              </div>
              <div className='mt-2 flex space-x-2'>
                <Link
                  to={`/profile/${profile.id}`}
                  className='bg-gray-700 text-white px-4 py-2 rounded'
                >
                  View Details
                </Link>
                <Link
                  to={`/map?lat=${encodeURIComponent(
                    profile.location.lat
                  )}&lng=${encodeURIComponent(profile.location.lng)}`}
                  className='bg-primary text-white px-4 py-2 rounded'
                >
                  Show on Map
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileList;
