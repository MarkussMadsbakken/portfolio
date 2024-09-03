import { AnimatePresence, easeIn, easeOut, motion, MotionValue, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { easeInOut } from "framer-motion/dom";
import { useEffect, useRef, useState } from "react";


export interface SectionProps {
    children: React.ReactNode;
    background?: React.ReactNode;
}

export default function Section(props: SectionProps) {

    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef, offset:
            ["start center", "end start"]
    });

    const [sectionIsInView, setSectionIsInView] = useState<boolean>(true);

    scrollYProgress.on("change", (v) => {
        if (v >= 0.85 || v <= 0) {
            setSectionIsInView(false);
        } else {
            setSectionIsInView(true);
        }
    })

    return (
        <div className="relative flex w-full h-[180vh] min-h-[180vh] max-h-[180vh]"
            ref={sectionRef}
        >
            <motion.div
                className="h-full w-full"
                animate={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    transition: {
                        duration: 0.5,
                        ease: "easeOut"
                    },
                }}
            >

                <div
                    className="flex sticky top-0 w-full h-[80vh] z-50"
                >
                    <AnimatePresence>
                        {sectionIsInView && props.children}
                    </AnimatePresence>
                </div>

                <div className="h-full w-full absolute top-0">
                    {props.background}

                </div>
            </motion.div>
        </div>
    )

}