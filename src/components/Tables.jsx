import { useGLTF, Clone } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

function Tables() {
  const { nodes } = useGLTF("./models/tables.glb");

  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#6e808a").convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
  });

  return (
    <group>
      <RigidBody type="dynamic">
        <CuboidCollider
          args={[5, 3.45, 5]}
          rotation={[0, 1, 0]}
          position={[0, 3.6, 0]}
        />
      </RigidBody>
      <Clone
        object={nodes["Object_2"]}
        material={material}
        rotation={[-1.57, 0, 0.2]}
        scale={0.1}
      />
      <group position={[15, 0, -8]} rotation={[0, 1.25, 0]}>
        <RigidBody type="dynamic">
          <CuboidCollider
            args={[5, 3.45, 5]}
            rotation={[0, 1, 0]}
            position={[0, 3.6, 0]}
          />
        </RigidBody>
        <Clone
          object={nodes["Object_2"]}
          material={material}
          rotation={[-1.57, 0, 0.2]}
          scale={[0.1, 0.2, 0.1]}
          // position={[10, 0, 9]}
        />
      </group>
    </group>
  );
}
export default Tables;
