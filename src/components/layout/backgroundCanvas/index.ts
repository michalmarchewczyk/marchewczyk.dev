import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { generateClouds } from './generateClouds';
import { generateStars } from './generateStars';
import { generateLine } from './generateLine';

export const load = (canvas: HTMLCanvasElement) => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 500);
  camera.position.z = 160;
  camera.lookAt(0, 0, 0);

  const pointsBoxSize = new THREE.Vector3(1000, 1000, 300);
  const { cloud, animCloud, scrollCloud } = generateClouds(pointsBoxSize);
  scene.add(cloud);
  const { stars, animStars, scrollStars } = generateStars(pointsBoxSize);
  scene.add(stars);
  const { line, animLine, scrollLine } = generateLine(pointsBoxSize);
  scene.add(line);

  scene.fog = new THREE.Fog(0x000000, 250, 310);

  const cameraTarget = camera.position.clone();

  let lastTime = 0;
  const animate = (time: number) => {
    const delta = time - lastTime;
    lastTime = time;
    animCloud(delta);
    animStars(delta);
    animLine(delta);
    camera.position.lerp(cameraTarget, 0.03);
    composer.render();
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
    cameraTarget.x = (30 * x) / window.innerWidth;
    cameraTarget.y = (-30 * y) / window.innerHeight;
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', resize);
  window.addEventListener('scroll', scroll);
  window.addEventListener('mousemove', mouseMove);
};
