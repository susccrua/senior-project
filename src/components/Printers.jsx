import { useGLTF, Html, Center, Text3D } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useState } from "react";

function Printers(props) {
  const { zoomToView } = props;
  const model = useGLTF("./models/printers/scene.gltf");
  const [visiblePopup, setVisiblePopup] = useState(false);

  setTimeout(() => {
    setVisiblePopup(false);
  }, 8000);

  return (
    <>
      <Html transform position={[15, 12, -9]}>
        <div
          className={`flex items-center bg-white w-400 h-10 animate-bounce hover:bg-slate-200 hover rounded-md p-2 ${
            !visiblePopup ? "hidden" : "block"
          }`}
        >
          <img src="./click.svg" className="w-[30px]" />
          <a
            className="text-lg w-200"
            download
            href={"./documents/Resume_Susana_Cruz.pdf"}
          >
            Grab yourself a copy!
          </a>
        </div>
      </Html>
      <mesh>
        <Resumes />
      </mesh>
      <RigidBody
        colliders={false}
        position={[10, 12, -9]}
        rotation={[0, -1.75, 0]}
        onClick={(e) => zoomToView(e.object.position)}
      >
        <CuboidCollider args={[3, 1.4, 5]} />
        <mesh
          onPointerOver={() => {
            setVisiblePopup(true);
          }}
        >
          <primitive object={model.scene} scale={0.008} />
        </mesh>
      </RigidBody>
    </>
  );
}

function Resumes() {
  return (
    <Center top right position={[12.5, 7.2, -6]} rotation={[0, 1.5, 0]}>
      <Text3D font="./fonts/Roboto Mono_Regular.json" scale={0.3}>
        {`FREE RESUMES`}
        <meshBasicMaterial height={2} color="#f76402" />
      </Text3D>
    </Center>
  );
}
export default Printers;
