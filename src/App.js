import React, { Suspense, useRef, useMemo } from 'react'

import { Canvas, useLoader, useFrame, useThree, extend } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import styled from 'styled-components';

import MartirezRoomGltf from './resources/gltf/Owe Ragnar Martirez Room.glb'

const Wrapper = styled.div`
  position: relative;
  height:100vh;
  width: 100vw;
  background: linear-gradient(180deg, rgba(28,45,75,1) 70%, rgba(170,170,170,1) 100%);
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
          camera={{ position: [0, 0, 6] , fov:50}}
          shadowMap
          colorManagement
        >
        
          
          <pointLight intensity={1} position={[4, 0, 4]} color={'#e8cdcc'} decay={2}/>
          <pointLight intensity={1} position={[-4,0, 4]} color={'#e8cdcc'} decay={2}/>
          <pointLight intensity={1} position={[4, 0, -4]} color={'#e8cdcc'} decay={2}/>
          <pointLight intensity={1} position={[-4, 0, -4]} color={'#e8cdcc'} decay={2}/>
          
          <pointLight intensity={2} position={[0, -3, 0]} color={'#f2ca66'} decay={2}/>
          
          <Controls
            autoRotate
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.5}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          
        <Suspense fallback={null}>
          <MartirezRoom/>
        </Suspense>

        </Canvas>
      </Wrapper>
  );
}

export default App;
