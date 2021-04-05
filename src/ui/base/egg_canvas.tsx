import React from 'react';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture';
import { PBRMetallicRoughnessMaterial } from '@babylonjs/core/Materials/PBR/pbrMetallicRoughnessMaterial';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Layer } from '@babylonjs/core/Layers/layer';
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

let videoStream: MediaStream | null = null;

const clearVideoStream = () => {
  videoStream?.getVideoTracks().forEach((track) => {
    track.stop();
    track.enabled = false;
  });
};

const onSceneReady = (scene: Scene) => {
  scene.clearColor = new Color4(1, 1, 1, 1);

  const hdr = new CubeTexture(ForestEnv, scene);
  const skyboxMesh = scene.createDefaultSkybox(hdr, true, 1000, 0.088, true);
  if (!skyboxMesh) throw new Error('Could not get skybox mesh');

  const bgLayer = new Layer('bg', null, scene);

  const camera = new ArcRotateCamera('camera', 0, 1.5, 10, Vector3.Zero(), scene);
  camera.panningDistanceLimit = 2;
  camera.lowerRadiusLimit = 5;
  camera.upperRadiusLimit = 40;
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
    if (!canvas) {
      const message = 'Canvas is missing. This should never happen.';
      alert(message);
      throw Error(message);
    }
    canvas.classList.add('loaded');
  });

  return {
    scene,
    skyboxMesh,
    bgLayer,
  };
};

type SceneData = ReturnType<typeof onSceneReady>;

const onAREnabled = ({ scene, skyboxMesh, bgLayer }: SceneData) => {
  clearVideoStream();
  skyboxMesh.visibility = 0;
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
      clearVideoStream(); // In case the previous stream never closed properly (not sure if this is still possible)
      videoStream = stream;
      // If AR was disabled in this time (detected by checking skybox visibility), close the stream and exit.
      if (skyboxMesh.visibility === 1) {
        clearVideoStream();
        return;
      }
      VideoTexture.CreateFromStreamAsync(scene, stream)
        .then((videoTexture) => {
          bgLayer.texture = videoTexture;
          bgLayer.texture.vScale = -1;
        })
        .catch((e) => alert('Failed to create video texture: ' + e));
    })
    .catch((e) => alert('Unable to access camera: ' + e));
};

const onARDisabled = ({ skyboxMesh, bgLayer }: SceneData) => {
  skyboxMesh.visibility = 1;
  bgLayer.texture = null;
  clearVideoStream();
};

const onRender = (scene: Scene) => {
  scene.getEngine().resize();
};

const EggCanvas = ({ ar }: { ar?: boolean }) => {
  const [sceneData, setSceneData] = React.useState<SceneData>();
  React.useEffect(() => {
    if (sceneData) {
      if (ar) {
        onAREnabled(sceneData);
      } else {
        onARDisabled(sceneData);
      }
    }
  }, [ar, sceneData]);
  return (
    <SceneComponent
      id="egg-canvas"
      antialias
      adaptToDeviceRatio
      onSceneReady={(scene) => {
        const sceneData = onSceneReady(scene);
        setSceneData(sceneData);
      }}
      onRender={onRender}
    />
  );
};

export default EggCanvas;
