import * as THREE from 'three';
import cloudJpg from './cloud.jpg';
import { clampPoint, getRandomVector } from './utils';

export const generateClouds = (pointsBoxSize: THREE.Vector3) => {
  const cloudTexture = new THREE.TextureLoader().load(cloudJpg);
  const cloudPoints: THREE.Vector3[] = [];
  const cloudVelocities: THREE.Vector3[] = [];
  for (let i = 0; i < 300; i++) {
    cloudPoints.push(getRandomVector(pointsBoxSize));
    cloudVelocities.push(getRandomVector(new THREE.Vector3(0.1, 0.1, 0.1)));
  }

  const cloudGeometry = new THREE.BufferGeometry();
  cloudGeometry.setFromPoints(cloudPoints);
  const cloudMaterial = new THREE.PointsMaterial({
    color: new THREE.Color('hsl(200,20%,100%)'),
    size: 500,
    map: cloudTexture,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    opacity: 0.025,
  });
  const cloud = new THREE.Points(cloudGeometry, cloudMaterial);

  const animCloud = (delta: number) => {
    for (let i = 0; i < cloudPoints.length; i++) {
      const point = cloudPoints[i];
      const velocity = cloudVelocities[i];
      point.add(velocity.clone().multiplyScalar(delta / 30));
      clampPoint(point, pointsBoxSize);
    }
    cloudGeometry.setFromPoints(cloudPoints);
  };

  const scrollCloud = (delta: number) => {
    for (let i = 0; i < cloudPoints.length; i++) {
      const point = cloudPoints[i];
      point.y += delta;
      point.z += delta / 4;
      clampPoint(point, pointsBoxSize);
    }
  };

  return { cloud, animCloud, scrollCloud };
};
