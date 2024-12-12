import { useState } from 'react';
import LocationPickerModal from '../components/LocationPickerModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/slices/userSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    contactInfo: '',
    interests: '',
    location: {
      lat: 37.7749, // Default to San Francisco
      lng: -122.4194,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

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
      dispatch(addUser(profile));
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
      alert('Profile Added Successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  return (
    <div className='p-4 bg-gray-300 min-h-screen'>
      <h2 className='text-2xl font-semibold mb-4 text-primary text-center'>
        ADD NEW PROFILE
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={profile.name}
          onChange={handleChange}
          className='block w-full placeholder-black p-2 border border-gray-600 bg-gray-400 rounded-md '
        />
        <input
          type='text'
          name='photo'
          placeholder='Photo URL'
          value={profile.photo}
          onChange={handleChange}
          className='block w-full p-2 placeholder-black border text-black border-gray-600 bg-gray-400 rounded-md '
        />
        <textarea
          name='description'
          placeholder='Description'
          value={profile.description}
          onChange={handleChange}
          className='block w-full p-2 placeholder-black border border-gray-600 bg-gray-400 rounded-md '
        />
        <input
          type='text'
          name='address'
          placeholder='Address'
          value={profile.address}
          onChange={handleChange}
          className='block w-full p-2 placeholder-black border border-gray-600 bg-gray-400 rounded-md '
        />
        <input
          type='text'
          name='contactInfo'
          placeholder='Contact Information'
          value={profile.contactInfo}
          onChange={handleChange}
          className='block w-full p-2 placeholder-black border border-gray-600 bg-gray-400 rounded-md '
        />
        <input
          type='text'
          name='interests'
          placeholder='Interests'
          value={profile.interests}
          onChange={handleChange}
          className='block w-full p-2 placeholder-black border border-gray-600 bg-gray-400 rounded-md '
        />

        {/* Map Location Picker */}
        <button
          type='button'
          onClick={() => setIsModalOpen(true)}
          className='bg-primary  px-4 py-2 mr-4 rounded'
        >
          Choose on Map
        </button>
        <div className='mt-2 inline '>
          Default Chosen Location: Latitude {profile.location.lat}, Longitude{' '}
          {profile.location.lng}
        </div>
        <br></br>
        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-primary  px-6 py-3 hover:text-gray-800 text-xl rounded'
          >
            Add Profile
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

export default AdminPanel;
