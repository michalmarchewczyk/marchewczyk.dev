import * as THREE from 'three';
import starJpg from './star.jpg';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';

export const generateLine = (pointsBoxSize: THREE.Vector3) => {
  const pointTexture = new THREE.TextureLoader().load(starJpg);
  const lineGeometry = new THREE.BufferGeometry();
  const count = pointsBoxSize.y * 160;
  const positionAttribute = new THREE.BufferAttribute(new Float32Array(count * 3).fill(0), 3);
  const colorAttribute = new THREE.BufferAttribute(new Float32Array(count * 3).fill(0), 3);
  const sizeAttribute = new THREE.BufferAttribute(new Float32Array(count).fill(0), 1);
  lineGeometry.setAttribute('position', positionAttribute);
  lineGeometry.setAttribute('customColor', colorAttribute);
  lineGeometry.setAttribute('size', sizeAttribute);

  let rotationOffset = 0;
  let heightOffset = 0;
  const xOffset = window.innerWidth / 20;
  const randomSizesSeed = new Array(33 * 16).fill(0).map(() => THREE.MathUtils.randFloat(1.8, 5));
  const randomSizes = Array.from(
    { length: Math.ceil(count / (33 * 16)) },
    () => randomSizesSeed,
  ).flat();
  const randomColorsSeed = new Array(33 * 16)
    .fill(0)
    .map(
      () =>
        new THREE.Color(
          `hsl(${THREE.MathUtils.randFloat(180, 230)}, 100%,
           ${THREE.MathUtils.randFloat(40, 90)}%)`,
        ),
    )
    .map((color) => [color.r, color.g, color.b])
    .flat();
  const randomColors = Array.from(
    { length: Math.ceil(count / (33 * 16)) },
    () => randomColorsSeed,
  ).flat();

  const calculate = () => {
    const positions = [];
    const colors = [];
    const sizes = [];
    let index = 0;
    for (let y = -pointsBoxSize.y / 3; y < pointsBoxSize.y / 4; y += 5) {
      for (let i = -80; i <= 80; i += 5) {
        index += 1;
        const yOffset = heightOffset % (5 * 16);
        const x = Math.sin((y + yOffset + rotationOffset + Math.abs(i / 4)) / 120) * i + xOffset;
        const z = Math.cos((y + yOffset + rotationOffset + Math.abs(i / 4)) / 120) * i;
        positions.push(x, y + yOffset, z);
        colors.push(
          randomColors[index * 3] / 1.4,
          randomColors[index * 3 + 1] / 1.4,
          randomColors[index * 3 + 2] / 1.4,
        );
        sizes.push(randomSizes[index]);
      }
    }
    positionAttribute.set(positions);
    colorAttribute.set(colors);
    sizeAttribute.set(sizes);
    positionAttribute.needsUpdate = true;
  };

  const lineMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xffffff) },
      pointTexture: { value: pointTexture },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    blending: THREE.AdditiveBlending,
    depthTest: false,
  });
  const line = new THREE.Points(lineGeometry, lineMaterial);

  const animLine = (delta: number) => {
    rotationOffset += delta / -80;
    calculate();
  };

  const scrollLine = (delta: number) => {
    heightOffset += delta;
    rotationOffset += delta / -1;
  };

  return { line, animLine, scrollLine };
};
