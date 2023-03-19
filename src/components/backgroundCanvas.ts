import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import cloudJpg from '../assets/cloud.jpg';
import starJpg from '../assets/star.jpg';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const dev = import.meta.env.MODE === 'development';

const clampPoint = (point: THREE.Vector3, box: THREE.Vector3) => {
  point.z = (((Math.abs(point.z) + box.z / 2) % box.z) - box.z / 2) * Math.sign(point.z);
  point.x = (((Math.abs(point.x) + box.x / 2) % box.x) - box.x / 2) * Math.sign(point.x);
  point.y = (((Math.abs(point.y) + box.y / 2) % box.y) - box.y / 2) * Math.sign(point.y);
};

const getRandomVector = (spread: THREE.Vector3) => {
  const x = THREE.MathUtils.randFloatSpread(spread.x);
  const y = THREE.MathUtils.randFloatSpread(spread.y);
  const z = THREE.MathUtils.randFloatSpread(spread.z);
  return new THREE.Vector3(x, y, z);
};

const generateCloudPoints = (pointsBoxSize: THREE.Vector3) => {
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
    size: 400,
    map: cloudTexture,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    opacity: 0.04,
  });
  const cloud = new THREE.Points(cloudGeometry, cloudMaterial);
  return { cloudPoints, cloudVelocities, cloudGeometry, cloud };
};

const generateStarPoints = (pointsBoxSize: THREE.Vector3) => {
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
  return { starPoints, starVelocities, starGeometry, stars };
};

export const load = (canvas: HTMLCanvasElement) => {
  let stats: Stats | undefined;
  const cameraSetting = { orbit: false };
  if (dev) {
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    const gui = new dat.GUI();
    cameraSetting.orbit = true;
    gui.add(cameraSetting, 'orbit');
    document.body.appendChild(gui.domElement);
    gui.domElement.style.position = 'fixed';
    gui.domElement.style.top = '0';
    gui.domElement.style.right = '0';
    gui.domElement.style.zIndex = '100';
  }

  const scene = new THREE.Scene();

  const devCamera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10000,
  );
  devCamera.position.set(500, 500, 500);
  devCamera.lookAt(0, 0, 0);

  if (dev) {
    const gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);
  }

  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.01,
    2000,
  );
  camera.position.z = 160;
  camera.lookAt(0, 0, 0);
  if (dev) {
    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);
  }

  const pointsBoxSize = new THREE.Vector3(1000, 1000, 300);
  const { cloudPoints, cloudVelocities, cloudGeometry, cloud } = generateCloudPoints(pointsBoxSize);
  scene.add(cloud);
  const { starPoints, starVelocities, starGeometry, stars } = generateStarPoints(pointsBoxSize);
  scene.add(stars);

  // scene.fog = new THREE.Fog(0x000000, 250, 310);

  const controls = new OrbitControls(devCamera, canvas);

  const animate = () => {
    stats?.begin();
    controls.update();
    const points = [...cloudPoints, ...starPoints];
    const velocities = [...cloudVelocities, ...starVelocities];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const velocity = velocities[i];
      point.add(velocity);
      clampPoint(point, pointsBoxSize);
    }
    cloudGeometry.setFromPoints(cloudPoints);
    starGeometry.setFromPoints(starPoints);
    if (dev && cameraSetting.orbit) {
      renderer.render(scene, devCamera);
    } else {
      composer.render();
    }
    stats?.end();
  };

  let lastScroll = window.scrollY;

  const scroll = () => {
    const newScroll = window.scrollY;
    const delta = (newScroll - lastScroll) / 6;
    const points = [...cloudPoints, ...starPoints];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      point.y += delta;
      point.z += delta / 1.5;
      clampPoint(point, pointsBoxSize);
    }
    lastScroll = newScroll;
  };

  const mouseMove = (e: MouseEvent) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    camera.position.x = (20 * x) / window.innerWidth;
    camera.position.y = (-20 * y) / window.innerHeight;
  };

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio / 1.5);
  renderer.setAnimationLoop(animate);
  renderer.setClearColor(new THREE.Color('hsl(200,25%,75%)'), 1);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  const afterimagePass = new AfterimagePass(0.97);
  composer.addPass(afterimagePass);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.2,
    0.1,
    0.96,
  );
  composer.addPass(bloomPass);

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    devCamera.aspect = window.innerWidth / window.innerHeight;
    devCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', resize);
  window.addEventListener('scroll', scroll);
  window.addEventListener('mousemove', mouseMove);
};
