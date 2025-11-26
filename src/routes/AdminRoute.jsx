import React from 'react';
import useAuth from '../hooks/useAuth';
import MyLoading from '../components/my-components/MyLoading';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <MyLoading></MyLoading>;
  }

  if (role !== 'admin') {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoute;
