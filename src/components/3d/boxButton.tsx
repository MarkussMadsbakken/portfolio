import { Box, Center, RoundedBox, Text, Text3D } from "@react-three/drei";
import { Color } from "three";
import Clickable from "./clickable";

export interface BoxButtonProps {
    text: string,
    variant?: "default"
    onClick?: () => void;
}

export default function BoxButton(props: BoxButtonProps) {

    return (
        <group>
            <RoundedBox args={[1.01, 0.45, 0.5]} position={[0, 0, -0.26]} >
                <meshStandardMaterial color="white" metalness={0.2} />
            </RoundedBox>
            <Center >
                <Text3D font={"/Inter_Regular.json"}
                    height={0.02}
                    size={0.2}
                    letterSpacing={-0.01}
                    lineHeight={5}
                >
                    <meshStandardMaterial color={new Color("#121212")} />
                    {props.text}
                </Text3D>
            </Center>

            <Clickable
                onClick={() => props.onClick?.()}
                args={[1.01, 0.45, 0.1]}
                position={[0, 0, -0.1]}
            />
        </group>
    )
}