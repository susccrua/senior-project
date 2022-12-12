import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

function Macbook() {
  const model = useGLTF("./models/macbook/scene.gltf");
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const openClose = animations.actions["Animation"];
    openClose.play();
  }, []);

  return (
    <>
      <RigidBody
        colliders={false}
        position={[1, 12, 3]}
        rotation={[0, 1.75, 0]}
      >
        <CuboidCollider args={[1.6, 0.01, 1.4]} />
        <primitive object={model.scene} scale={10} />
      </RigidBody>
    </>
  );
}
export default Macbook;
