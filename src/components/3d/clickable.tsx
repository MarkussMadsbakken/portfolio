"use client"
import { useEffect, useState } from "react";

interface ClickableProps {
    onClick: () => void;
    args: [number, number, number];
    position?: [number, number, number];
}

export default function Clickable(props: ClickableProps) {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered])

    return (
        <mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={props.onClick}
            position={props.position}
        >
            <boxGeometry args={props.args} />
            <meshStandardMaterial opacity={0.2} transparent />
        </mesh>
    )
}