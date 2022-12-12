import { useGLTF, useAnimations } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

function Printers(props) {
  const { zoomToView } = props;
  const model = useGLTF("./models/printers/scene.gltf");

  return (
    <RigidBody
      colliders={false}
      position={[10, 12, -9]}
      rotation={[0, -1.75, 0]}
    >
      <CuboidCollider args={[3, 1.4, 5]} />
      <primitive
        object={model.scene}
        scale={0.008}
        onClick={(e) => zoomToView(e.object.position)}
      />
    </RigidBody>
  );
}
export default Printers;
