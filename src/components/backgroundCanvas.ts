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

export const load = (canvas: HTMLCanvasElement) => {
  console.log('load background');
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

  const camera2 = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10000,
  );
  camera2.position.z = 500;
  camera2.position.y = 500;
  camera2.position.x = 500;
  camera2.lookAt(0, 0, 0);

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

  const cloudTexture = new THREE.TextureLoader().load(cloudJpg);
  const starTexture = new THREE.TextureLoader().load(starJpg);

  const pointsBoxSize = new THREE.Vector3(1000, 1000, 300);
  const cloudPoints: THREE.Vector3[] = [];
  const cloudVelocities: THREE.Vector3[] = [];
  for (let i = 0; i < 300; i++) {
    const x = THREE.MathUtils.randFloatSpread(pointsBoxSize.x);
    const y = THREE.MathUtils.randFloatSpread(pointsBoxSize.y);
    const z = THREE.MathUtils.randFloatSpread(pointsBoxSize.z);
    cloudPoints.push(new THREE.Vector3(x, y, z));
    const vx = THREE.MathUtils.randFloatSpread(0.1);
    const vy = THREE.MathUtils.randFloatSpread(0.1);
    const vz = THREE.MathUtils.randFloatSpread(0.1);
    cloudVelocities.push(new THREE.Vector3(vx, vy, vz));
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
  scene.add(cloud);
  const starPoints: THREE.Vector3[] = [];
  const starVelocities: THREE.Vector3[] = [];
  for (let i = 0; i < 1500; i++) {
    const x = THREE.MathUtils.randFloatSpread(pointsBoxSize.x);
    const y = THREE.MathUtils.randFloatSpread(pointsBoxSize.y);
    const z = THREE.MathUtils.randFloatSpread(pointsBoxSize.z);
    starPoints.push(new THREE.Vector3(x, y, z));
    const vx = THREE.MathUtils.randFloatSpread(0.1);
    const vy = THREE.MathUtils.randFloatSpread(0.1);
    const vz = THREE.MathUtils.randFloatSpread(0.1);
    starVelocities.push(new THREE.Vector3(vx, vy, vz));
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
  scene.add(stars);

  scene.fog = new THREE.Fog(0x000000, 250, 310);

  const controls = new OrbitControls(camera2, canvas);

  const animate = () => {
    stats?.begin();
    controls.update();
    for (let i = 0; i < cloudPoints.length; i++) {
      const point = cloudPoints[i];
      const velocity = cloudVelocities[i];
      point.add(velocity);
      if (
        (point.x > pointsBoxSize.x / 2 && velocity.x > 0) ||
        (point.x < -pointsBoxSize.x / 2 && velocity.x < 0)
      ) {
        point.x = -point.x;
      }
      if (
        (point.y > pointsBoxSize.y / 2 && velocity.y > 0) ||
        (point.y < -pointsBoxSize.y / 2 && velocity.y < 0)
      ) {
        point.y = -point.y;
      }
      if (point.z > pointsBoxSize.z / 2 || point.z < -pointsBoxSize.z / 2) {
        velocity.z = -velocity.z;
      }
    }
    for (let i = 0; i < starPoints.length; i++) {
      const point = starPoints[i];
      const velocity = starVelocities[i];
      point.add(velocity);
      if (
        (point.x > pointsBoxSize.x / 2 && velocity.x > 0) ||
        (point.x < -pointsBoxSize.x / 2 && velocity.x < 0)
      ) {
        point.x = -point.x;
      }
      if (
        (point.y > pointsBoxSize.y / 2 && velocity.y > 0) ||
        (point.y < -pointsBoxSize.y / 2 && velocity.y < 0)
      ) {
        point.y = -point.y;
      }
      if (point.z > pointsBoxSize.z / 2 || point.z < -pointsBoxSize.z / 2) {
        velocity.z = -velocity.z;
      }
    }
    cloudGeometry.setFromPoints(cloudPoints);
    starGeometry.setFromPoints(starPoints);
    if (dev && cameraSetting.orbit) {
      renderer.render(scene, camera2);
    } else {
      composer.render();
    }
    stats?.end();
  };

  let lastScroll = window.scrollY;

  const scroll = () => {
    const newScroll = window.scrollY;
    const delta = (newScroll - lastScroll) / 6;
    for (let i = 0; i < cloudPoints.length; i++) {
      const point = cloudPoints[i];
      point.y += delta;
      if (point.y > pointsBoxSize.y / 2) {
        point.y = point.y - pointsBoxSize.y;
      }
      if (point.y < -pointsBoxSize.y / 2) {
        point.y = point.y + pointsBoxSize.y;
      }
      point.z += delta / 1.5;
      if (point.z > pointsBoxSize.z / 2) {
        point.z = point.z - pointsBoxSize.z;
      }
      if (point.z < -pointsBoxSize.z / 2) {
        point.z = point.z + pointsBoxSize.z;
      }
    }
    for (let i = 0; i < starPoints.length; i++) {
      const point = starPoints[i];
      point.y += delta;
      if (point.y > pointsBoxSize.y / 2) {
        point.y = point.y - pointsBoxSize.y;
      }
      if (point.y < -pointsBoxSize.y / 2) {
        point.y = point.y + pointsBoxSize.y;
      }
      point.z += delta / 1.5;
      if (point.z > pointsBoxSize.z / 2) {
        point.z = point.z - pointsBoxSize.z;
      }
      if (point.z < -pointsBoxSize.z / 2) {
        point.z = point.z + pointsBoxSize.z;
      }
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
    0.3,
    0.1,
    0.96,
  );
  composer.addPass(bloomPass);

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', resize);
  window.addEventListener('scroll', scroll);
  window.addEventListener('mousemove', mouseMove);
};
