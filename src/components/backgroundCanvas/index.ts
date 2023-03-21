import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { generateClouds } from './generateClouds';
import { generateStars } from './generateStars';
import { generateLine } from './generateLine';

const dev = import.meta.env.MODE === 'development';

export const load = (canvas: HTMLCanvasElement) => {
  let stats: Stats | undefined;
  const cameraSetting = { orbit: false };
  if (dev) {
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    const gui = new dat.GUI();
    cameraSetting.orbit = false;
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

  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 500);
  camera.position.z = 160;
  camera.lookAt(0, 0, 0);
  if (dev) {
    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);
  }

  const pointsBoxSize = new THREE.Vector3(1000, 1000, 300);
  const { cloud, animCloud, scrollCloud } = generateClouds(pointsBoxSize);
  scene.add(cloud);
  const { stars, animStars, scrollStars } = generateStars(pointsBoxSize);
  scene.add(stars);
  const { line, animLine, scrollLine } = generateLine(pointsBoxSize);
  scene.add(line);

  scene.fog = new THREE.Fog(0x000000, 250, 310);

  const controls = new OrbitControls(devCamera, canvas);

  let lastTime = 0;
  const animate = (time: number) => {
    stats?.begin();
    controls.update();
    const delta = time - lastTime;
    lastTime = time;
    animCloud(delta);
    animStars(delta);
    animLine(delta);
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
    scrollCloud(delta);
    scrollStars(delta);
    scrollLine(delta);
    lastScroll = newScroll;
  };
  scroll();

  const mouseMove = (e: MouseEvent) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    camera.position.x = (20 * x) / window.innerWidth;
    camera.position.y = (-20 * y) / window.innerHeight;
  };

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    powerPreference: 'high-performance',
    depth: false,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  renderer.setClearColor(new THREE.Color('hsl(200,25%,80%)'), 1);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  const afterimagePass = new AfterimagePass(0.97);
  composer.addPass(afterimagePass);

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
