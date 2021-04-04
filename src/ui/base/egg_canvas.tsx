import React from 'react';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Scene } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import './egg_canvas.css';

let box: Mesh;

const onSceneReady = (scene: Scene) => {
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  if (!canvas) {
    const message = 'Canvas is missing. This should never happen.';
    alert(message);
    throw Error(message);
  }
  canvas.classList.add('loaded');

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox('box', { size: 2 }, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
  scene.getEngine().resize();
};

const EggCanvas = () => {
  return (
    <SceneComponent
      antialias
      adaptToDeviceRatio
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="egg-canvas"
    />
  );
};

export default EggCanvas;
