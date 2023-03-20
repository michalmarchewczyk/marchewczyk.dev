import React, { Suspense } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const Project = React.lazy(() => import('./Project'));

function ProjectModal() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Modal
      opened={true}
      onClose={() => {
        navigate(location.state?.backgroundLocation?.pathname ?? '/projects', {
          state: { backgroundLocation: undefined },
        });
      }}
      centered
      zIndex={100000}
      size={960}
      styles={{
        body: {
          padding: 0,
        },
        content: {
          '> div': {
            maxHeight: isMobile ? '100vh' : '90vh',
          },
        },
      }}
      overlayProps={{
        color: '#cccccc',
        opacity: 0.5,
        blur: 8,
      }}
      radius={10}
      fullScreen={isMobile}
      withCloseButton={false}
    >
      <Suspense>
        <Project id={id ?? ''} />
      </Suspense>
    </Modal>
  );
}

export default ProjectModal;
