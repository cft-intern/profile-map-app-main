import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LocationPickerModal from '../components/LocationPickerModal';
import { updateUser } from '../../redux/slices/userSlice';
const ProfileEdit = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.user.profiles);
  const navigate = useNavigate();
  // getting id from dynamic route using useParams
  const { id } = useParams();
  //find a specific profile
  const userProfile = profiles.find((p) => p.id === Number(id));
  const [profile, setProfile] = useState(userProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleLocationSelect = (location) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      location,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUser(profile));
      setProfile({
        name: '',
        photo: '',
        description: '',
        address: '',
        contactInfo: '',
        interests: '',
        location: {
          lat: 37.7749,
          lng: -122.4194,
        },
      });
      alert('Profile Updated Successfully');
      navigate('/');
    } catch (error) {
      console.error('Error Updating profile:', error);
    }
  };

  return (
    <div className='p-4 bg-gray-800 min-h-screen'>
      <h2 className='text-2xl font-semibold mb-4 text-primary text-center'>
        UPDATE EXISTING PROFILE
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={profile.name}
          onChange={handleChange}
          className='block w-full p-2 border border-gray-600 bg-gray-700 rounded-md text-white'
        />
        <input
          type='text'
          name='photo'
          placeholder='Photo URL'
          value={profile.photo}
          onChange={handleChange}
          className='block w-full p-2 border border-gray-600 bg-gray-700 rounded-md text-white'
        />
        <textarea
          name='description'
          placeholder='Description'
          value={profile.description}
          onChange={handleChange}
          className='block w-full p-2 border border-gray-600 bg-gray-700 rounded-md text-white'
        />
        <input
          type='text'
          name='address'
          placeholder='Address'
          value={profile.address}
          onChange={handleChange}
          className='block w-full p-2 border border-gray-600 bg-gray-700 rounded-md text-white'
        />
        <input
          type='text'
          name='contactInfo'
          placeholder='Contact Information'
          value={profile.contactInfo}
          onChange={handleChange}
          className='block w-full p-2 border border-gray-600 bg-gray-700 rounded-md text-white'
        />
        <input
          type='text'
          name='interests'
          placeholder='Interests'
          value={profile.interests}
          onChange={handleChange}
          className='block w-full p-2 border border-gray-600 bg-gray-700 rounded-md text-white'
        />

        {/* Map Location Picker */}
        <button
          type='button'
          onClick={() => setIsModalOpen(true)}
          className='bg-primary text-white px-4 py-2 mr-4 rounded'
        >
          Choose on Map
        </button>
        <div className='mt-2 inline text-white'>
          Chosen Location: Latitude {profile.location.lat}, Longitude{' '}
          {profile.location.lng}
        </div>
        <br></br>
        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-primary text-white px-6 py-3 hover:text-gray-800 text-xl rounded'
          >
            Update Profile
          </button>
        </div>
      </form>

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />
    </div>
  );
};

export default ProfileEdit;
