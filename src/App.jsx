import { Suspense, useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";
import { Environment, Reflector, Center, Text3D } from "@react-three/drei";
import CameraControls from "camera-controls";

import "./App.css";
import Tables from "./components/Tables";
import Macbook from "./components/Macbook";
import Monitor from "./components/Monitor";
import Printers from "./components/Printers";

import * as THREE from "three";

function Light() {
  const ref = useRef();
  useFrame((_) => (ref.current.rotation.x = _.clock.elapsedTime));
  return (
    <group ref={ref}>
      <rectAreaLight
        width={20}
        height={100}
        position={[60, 70, -10]}
        intensity={5}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
    </group>
  );
}

CameraControls.install({ THREE });

function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 4) : pos.set(20, 10, 5);
    zoom ? look.set(focus.x, focus.y, focus.z - 6) : look.set(-5, 9, -15);

    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true
    );
    return controls.update(delta);
  });
}

function App() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});

  const zoomToView = (focusRef) => (setZoom(!zoom), setFocus(focusRef));
  return (
    <>
      {/* <OrbitControls /> */}
      <Light />
      <fog args={["#728c9c", 20, 100]} attach="fog" />
      <color args={["#728c9c"]} attach={"background"} />
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <Environment preset="warehouse" />

        {/* Title */}
        <Center top left position={[-2, 13, -2]} rotation={[0, 2, 0]}>
          <Text3D
            font="./public/fonts/Platinum Sign Over_Regular.json"
            scale={1}
            lineHeight={2}
          >
            {"susana's".toUpperCase()}
            <meshBasicMaterial height={2} color="white" />
          </Text3D>
          <Text3D
            position-z={-2}
            font="./fonts/Platinum Sign Over_Regular.json"
            scale={0.5}
            lineHeight={2}
          >
            {"senior project".toUpperCase()}
            <meshBasicMaterial height={2} color="white" />
          </Text3D>
        </Center>

        {/* Objects */}
        <Physics>
          <Debug />
          <Macbook />
          <Monitor zoomToView={zoomToView} />

          <Tables />
          <Printers zoomToView={zoomToView} />
          <Controls zoom={zoom} focus={focus} />
          {/* Floor Collider */}
          <RigidBody type="fixed">
            <CuboidCollider args={[70, 0.1, 70]} position={[0, 0, 8]} />
          </RigidBody>
          {/* Sphere */}

          <mesh
            position={[-3, 1, 0 - 3]}
            onClick={(e) => {
              console.log("clicked sphere");
              setZoom(!zoom), setFocus(e.object.position);
            }}
          >
            <sphereGeometry />
          </mesh>
        </Physics>

        {/* Floor */}
        <Reflector
          resolution={1024}
          receiveShadow
          mirror={0}
          mixBlur={1}
          mixStrength={0.3}
          depthScale={1}
          minDepthThreshold={0.8}
          maxDepthThreshold={1}
          position={[0, 0, 8]}
          scale={[2, 2, 1]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          args={[70, 70]}
        >
          {(Material, props) => (
            <Material
              metalness={0.25}
              color="#1b2c36"
              roughness={1}
              {...props}
            />
          )}
        </Reflector>
      </Suspense>
    </>
  );
}

export default App;
