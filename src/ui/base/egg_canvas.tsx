import type * as THREE from 'three';

import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

export const Egg = () => {
  // This reference will give us direct access to the mesh
  const mesh = React.useRef<THREE.Mesh>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => mesh?.current && (mesh.current.rotation.x += 0.01));
  // Return view, these are regular threejs elements expressed in JSX
  return (
    <mesh
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export const EggCanvas = () => {
  return (
    <div style={{ height: '100%' }}>
      <Canvas>
        <ambientLight />
        <Egg />
      </Canvas>
    </div>
  );
};
