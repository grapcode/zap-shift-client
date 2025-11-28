import React from 'react';
import useAuth from '../hooks/useAuth';
import MyLoading from '../components/my-components/MyLoading';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';

const RiderRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || !user || roleLoading) {
    return <MyLoading></MyLoading>;
  }

  if (role !== 'rider') {
    return <Forbidden />;
  }
  return children;
};

export default RiderRoute;
