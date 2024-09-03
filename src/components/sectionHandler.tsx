import { AnimatePresence, useScroll, useSpring, motion } from "framer-motion";
import { SectionProps } from "./section";
import { useRef } from "react";

interface SectionHandlerProps {
    children: React.ReactElement<SectionProps>[];
}

export default function SectionHandler(props: SectionHandlerProps) {
    const { scrollYProgress } = useScroll();


    return (
        <div
            className="">
            {props.children}
        </div>

    )
}