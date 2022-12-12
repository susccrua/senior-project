import { useEffect, useRef } from "react";
import { useGLTF, Clone, Html } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

function Monitor(props) {
  const model = useGLTF("./models/monitor/scene.gltf");
  const screenRef = useRef();
  console.log(model);

  return (
    <>
      <Html position={[-3, 20, 0]}>
        <select name="projects" id="projects">
          <option value="lvat">Living Atlas</option>
          <option value="pcap">Picture App</option>
          <option value="iptk">IP Address Tracker</option>
        </select>
      </Html>
      <group position={[0, 0, -2]} rotation={[0, 0.75, 0]}>
        <RigidBody colliders={false} position={[0, 12, 0]}>
          <CuboidCollider args={[4, 3, 1]} />
          <primitive
            ref={screenRef}
            object={model.scene}
            scale={0.8}
            rotation={[0, 0, 0]}
          />
        </RigidBody>
        <Html
          transform
          distanceFactor={2.8}
          occlude={true}
          position={[0, 10, 0.15]}
          // position={[0, 0, 0.15]}
        >
          <iframe
            // width={332}
            width="1190"
            height="520"
            src="https://refactoring.guru/"
          />
        </Html>
      </group>
    </>
  );
}
export default Monitor;
