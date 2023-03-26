import React from 'react';
import { Navigate, useLocation, useParams, Location } from 'react-router-dom';

function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const newLocation = {
    ...location,
    pathname: '/projects',
  } as Location;

  return (
    <div>
      <Navigate to={'/projects/' + id} state={{ backgroundLocation: newLocation }} />
    </div>
  );
}

export default ProjectPage;
