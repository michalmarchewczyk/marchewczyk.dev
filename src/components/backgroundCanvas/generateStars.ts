import * as THREE from 'three';
import starJpg from './star.jpg';
import { clampPoint, getRandomVector } from './utils';

export const generateStars = (pointsBoxSize: THREE.Vector3) => {
  const starTexture = new THREE.TextureLoader().load(starJpg);
  const starPoints: THREE.Vector3[] = [];
  const starVelocities: THREE.Vector3[] = [];
  for (let i = 0; i < 1500; i++) {
    starPoints.push(getRandomVector(pointsBoxSize));
    starVelocities.push(getRandomVector(new THREE.Vector3(0.1, 0.1, 0.1)));
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setFromPoints(starPoints);
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.6,
    map: starTexture,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    opacity: 0.4,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);

  const animStars = (delta: number) => {
    for (let i = 0; i < starPoints.length; i++) {
      const point = starPoints[i];
      const velocity = starVelocities[i];
      point.add(velocity.clone().multiplyScalar(delta / 30));
      clampPoint(point, pointsBoxSize);
    }
    starGeometry.setFromPoints(starPoints);
  };

  const scrollStars = (delta: number) => {
    for (let i = 0; i < starPoints.length; i++) {
      const point = starPoints[i];
      point.y += delta;
      point.z += delta / 4;
      clampPoint(point, pointsBoxSize);
    }
  };

  return { stars, animStars, scrollStars };
};
