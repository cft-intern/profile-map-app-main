import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileList from './pages/ProfileList';
import MapComponent from './pages/MapComponent.jsx';
import LoadingIndicator from './components/LoadingIndicator';
import ProfileDetails from './pages/ProfileDetails.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import Navbar from './components/Navbar';
import ProfileEdit from './pages/ProfileEdit.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/userSlice';

function App() {
  const loading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading());
    }, 1000);
  }, []);

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProfileList />} />
        <Route path='/profile/:id' element={<ProfileDetails />} />
        <Route path='/edit/:id' element={<ProfileEdit />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/map' element={<MapComponent />} />
        <Route path='*' element={<h1>page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
