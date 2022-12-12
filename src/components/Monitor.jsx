import { useEffect, useRef, useState } from "react";
import { useGLTF, Center, Text3D, Html } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

function Monitor(props) {
  const { zoomToView } = props;
  const [focused, setFocused] = useState(false);
  const model = useGLTF("./models/monitor/scene.gltf");
  const screenRef = useRef();

  useEffect(() => {
    console.log(focused);
  }, [focused]);

  return (
    <>
      {focused ? <Description /> : null}
      <group position={[0, 0, -2]} rotation={[0, 0.75, 0]}>
        <RigidBody colliders={false} position={[0, 12, 0]}>
          <CuboidCollider args={[4, 3, 1]} />
          <mesh
            onClick={(e) => {
              console.log(e.object.position);
              zoomToView(new THREE.Vector3(3, 11, 4));
              setFocused(!focused);
            }}
          >
            <primitive
              ref={screenRef}
              object={model.scene}
              scale={0.8}
              rotation={[0, 0, 0]}
            />
          </mesh>
        </RigidBody>
        <Html
          transform
          distanceFactor={2.8}
          occlude={true}
          position={[0, 10, 0.15]}
        >
          <iframe
            width="1190"
            height="520"
            src="https://susccrua.github.io/ip-address-tracker"
          />
        </Html>
      </group>
    </>
  );
}

function Description(focused) {
  return focused ? (
    <Center top right position={[8, 13, -6]} rotation={[0, -0.25, 0]}>
      <Text3D font="./fonts/Roboto Mono_Regular.json" scale={0.3}>
        {`The project in the displays\nthe location associated with the\nIP address the user puts in.\n\nGive it a try!`}
      </Text3D>
    </Center>
  ) : null;
}
export default Monitor;
