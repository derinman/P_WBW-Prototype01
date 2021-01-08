import React, { Suspense, useRef, useMemo } from 'react'

import { Canvas, useLoader, useFrame, useThree, extend } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import styled from 'styled-components';

import MartirezRoomGltf from './resources/gltf/OweRagnarMartirezRoom.glb'

const Wrapper = styled.div`
  position: relative;
  height:100vh;
  width: 100vw;
  background-color:#1c2d4b;
  overflow: hidden;
`;

const MartirezRoom = ()=> {

  const {nodes} = useLoader(GLTFLoader, MartirezRoomGltf, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.decoderPath = '/draco-gltf/'
    loader.setDRACOLoader(dracoLoader)
  })
  const group = useRef();

  console.log(nodes)

  return (
    <group
      ref={group}
    >
      <mesh
        geometry={nodes.room.geometry}
        material={nodes.room.material}
      />
      <mesh
          geometry={nodes.room.children[0].geometry}
          material={nodes.room.children[0].material}
      />
      <mesh
          geometry={nodes.room.children[1].geometry}
          material={nodes.room.children[1].material}
      />
      <mesh
          geometry={nodes.room.children[2].geometry}
          material={nodes.room.children[2].material}
      />

      <mesh
          geometry={nodes.Hand.geometry}
          material={nodes.Hand.material}
      />
      <mesh
          geometry={nodes.Cone.geometry}
          material={nodes.Cone.material}
      />
      <mesh
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
      />
      <mesh
          geometry={nodes.Icosphere.geometry}
          material={nodes.Icosphere.material}
      />
      <mesh
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
      />
      <mesh
          geometry={nodes.Sphere001.geometry}
          material={nodes.Sphere001.material}
      />
      <mesh
          geometry={nodes.Sphere002.geometry}
          material={nodes.Sphere002.material}
      />

    </group>
  )
}

extend({ OrbitControls })
const Controls = (props) => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}


function App() {
  return (
      <Wrapper>
        <Canvas
          camera={{ position: [0, 0, 5] }}
          shadowMap
          colorManagement
        >
          <ambientLight intensity={0.4} />
          <pointLight intensity={20} position={[-10, -25, -10]} color="#200f20" />
          <spotLight
            castShadow
            intensity={4}
            angle={Math.PI / 8}
            position={[15, 25, 5]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          <Controls
            //autoRotate
            enablePan={true}
            enableZoom={true}
            enableDamping
            dampingFactor={0.5}
            rotateSpeed={1}
            //maxPolarAngle={Math.PI / 2}
            //minPolarAngle={Math.PI / 2}
          />
          
        <Suspense fallback={null}>
          <MartirezRoom/>
        </Suspense>

        </Canvas>
      </Wrapper>
  );
}

export default App;
