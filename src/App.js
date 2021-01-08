import React, { Suspense, useRef, useMemo } from 'react'

import { Canvas, useLoader, useFrame, useThree, extend } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import styled from 'styled-components';

import MartirezRoomGltf from './resources/gltf/OweRagnarMartirezRoom.glb'

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const MartirezRoom = (props)=> {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, MartirezRoomGltf, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.decoderPath = '/draco-gltf/'
    loader.setDRACOLoader(dracoLoader)
  })
  //console.log(gltf);

  console.log(gltf)

  return (
    <div/>
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
        <Suspense fallback={null}>
        <MartirezRoom/>
        </Suspense>
        <Canvas
          style={{ background: 'radial-gradient(at 50% 70%, #200f20 40%, #090b1f 80%, #050523 100%)' }}
          camera={{ position: [0, 0, 15] }}
          shadowMap>
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
          
          {/*<fog attach="fog" args={['#090b1f', 0, 25]} />*/}
          {/*關掉看看*/}

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
        </Canvas>
      </Wrapper>
  );
}

export default App;
