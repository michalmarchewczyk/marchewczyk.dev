import * as THREE from 'three';

export const clampPoint = (point: THREE.Vector3, box: THREE.Vector3) => {
  point.z = (((Math.abs(point.z) + box.z / 2) % box.z) - box.z / 2) * Math.sign(point.z);
  point.x = (((Math.abs(point.x) + box.x / 2) % box.x) - box.x / 2) * Math.sign(point.x);
  point.y = (((Math.abs(point.y) + box.y / 2) % box.y) - box.y / 2) * Math.sign(point.y);
};

export const getRandomVector = (spread: THREE.Vector3) => {
  const x = THREE.MathUtils.randFloatSpread(spread.x);
  const y = THREE.MathUtils.randFloatSpread(spread.y);
  const z = THREE.MathUtils.randFloatSpread(spread.z);
  return new THREE.Vector3(x, y, z);
};
