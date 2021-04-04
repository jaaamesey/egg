import React from 'react';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { PBRMetallicRoughnessMaterial } from '@babylonjs/core/Materials/PBR/pbrMetallicRoughnessMaterial';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import type { Scene } from '@babylonjs/core/scene';
import '@babylonjs/core/Helpers/sceneHelpers';
import '@babylonjs/loaders/glTF/2.0/Extensions/KHR_draco_mesh_compression';
import SceneComponent from 'babylonjs-hook';

import ForestEnv from '../../envs/forest.env?url';
import EggOBJ from '../../models/egg/egg.glb?url';
import EggNormals from '../../models/egg/normal.jpg';
import EggRoughness from '../../models/egg/roughness.jpg';
import EggAlbedo from '../../models/egg/albedo.jpg';
import './egg_canvas.css';

SceneLoader.ShowLoadingScreen = false;

const onSceneReady = (scene: Scene) => {
  const hdr = new CubeTexture(ForestEnv, scene);

  scene.createDefaultSkybox(hdr, true, 1000, 0.088, true);

  const camera = new ArcRotateCamera('camera', 0, 1.5, 10, Vector3.Zero(), scene);
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  const mat = new PBRMetallicRoughnessMaterial('eggMat', scene);
  mat.normalTexture = new Texture(EggNormals, scene);
  mat.metallicRoughnessTexture = new Texture(EggRoughness, scene);
  mat.baseTexture = new Texture(EggAlbedo, scene);
  mat.metallic = 0;
  mat.roughness = 0.3;

  const scale = 0.3;
  SceneLoader.ImportMeshAsync('', EggOBJ).then(({ meshes }) => {
    const egg = meshes[1];
    egg.position.y = -1.25;
    egg.scaling = new Vector3(scale, scale, scale);
    egg.material = mat;
    console.log(meshes);
    if (!canvas) {
      const message = 'Canvas is missing. This should never happen.';
      alert(message);
      throw Error(message);
    }
    canvas.classList.add('loaded');
  });
};

const onRender = (scene: Scene) => {
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
