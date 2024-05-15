import React, {  useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/common/Login';
import Signup from './pages/common/Signup';
import StudentList from './pages/admin/StudentList';
import MarksPage from './pages/admin/MarksPage';
import StreamPage from './pages/admin/StreamPage';
import SubjectPage from './pages/admin/SubjectPage';
import { AuthContext } from './components/AuthContext';


// eslint-disable-next-line react/prop-types, no-unused-vars
const PrivateRoute = ({Component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn.isAuth ? <Component/> : <Navigate to="/login" />;
};

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
          <Route path="/" element={<PrivateRoute Component={StudentList} />} />
          <Route path="/studentList" element={<PrivateRoute Component={StudentList} />} />
          <Route path="/marks" element={<PrivateRoute Component={MarksPage} />} />
          <Route path="/stream" element={<PrivateRoute Component={StreamPage} />} />
          <Route path="/subject" element={<PrivateRoute Component={SubjectPage} />} />
       
      </Routes>
    </div>
  );
};

export default AllRoutes;
