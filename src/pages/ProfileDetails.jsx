import { useParams, useNavigate } from 'react-router-dom';
import defaultPicture from '../assets/default-user-icon-3.jpg';
import { Link } from 'react-router-dom';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/slices/userSlice';
const ProfileDetails = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.user.profiles);
  const navigate = useNavigate();
  // getting id from dynamic route using useParams
  const { id } = useParams();
  //find a specific profile
  const profile = profiles.find((p) => p.id === Number(id));

  if (!profile)
    return (
      <div className='p-4 bg-gray-400 rounded-lg text-white'>
        Profile not found
      </div>
    );

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${profile.name}?`
    );
    if (confirmDelete) {
      try {
        dispatch(deleteUser({ id }));
        navigate('/'); // Redirect to the profile list after deletion
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  return (
    <div className='p-4 bg-gray-300 w-full h-screen flex justify-center  '>
      <div className='mt-8 bg-gray-400 p-4 h-fit rounded-md'>
        <img
          src={profile.photo || defaultPicture}
          alt={profile.name}
          className='w-32 h-32 object-cover rounded-full mx-auto mb-4'
        />
        <h2 className='text-2xl font-semibold text-center mb-4'>
          {profile.name}
        </h2>
        <p className='mb-2 text-center'>{profile.description}</p>
        <p className=' mb-2 text-center'>{profile.address}</p>
        <p className=' mb-2 text-center'>Contact: {profile.contactInfo}</p>
        <p className=' mb-4 text-center '>Interests: {profile.interests}</p>

        {/*<button
        onClick={() => window.location.href = `/map?lat=${encodeURIComponent(profile.location.lat)}&lng=${encodeURIComponent(profile.location.lng)}`}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark mr-2"
      >
        Show on Map
      </button>

      {/* Edit Button */}
        <div className='flex justify-between'>
          <Link
            to={`/map?lat=${encodeURIComponent(
              profile.location.lat
            )}&lng=${encodeURIComponent(profile.location.lng)}`}
            className='bg-primary text-white p-2  rounded  hover:bg-secondary-dark'
          >
            Show on Map
          </Link>
          <div className='space-x-2'>
            <button
              title='Edit'
              onClick={handleEdit}
              className='bg-blue-500 text-white p-2 rounded hover:bg-blue-700 '
            >
              <FaUserEdit className='text-xl font-extrabold' />
            </button>

            {/* Delete Button */}
            <button
              title='Delete'
              onClick={handleDelete}
              className='bg-red-500 text-white p-2 rounded hover:bg-red-700'
            >
              <MdOutlineDeleteForever className='text-xl font-extrabold' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
