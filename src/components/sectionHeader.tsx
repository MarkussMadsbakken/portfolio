import { useRandomColor } from "@/hooks/motion/hooks";
import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export default function SectionHeader(props: SectionHeaderProps) {

    const CHARACTER_ANIMATION_OFFSET = 0.1
    // TODO: change to framer/motion stagger

    let leftChars: string[];
    let rightChars: string[];
    let middleChar: string | undefined;

    if (props.title.length % 2 !== 0) {
        middleChar = props.title.charAt(props.title.length / 2);
    }

    leftChars = props.title.slice(0, props.title.length / 2).split("");
    rightChars = props.title.slice(props.title.length / 2 + (middleChar === undefined ? 0 : 1)).split("");

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row h-fit">
                {
                    leftChars.map((char, index) => {
                        return (
                            <motion.h1 key={index} className="text-6xl font-bold whitespace-pre"
                                initial={{
                                    x: -100,
                                    opacity: 0,
                                    color: useRandomColor()
                                }}

                                animate={{
                                    x: [-100, 0, 0],
                                    opacity: [0, 1, 1],
                                    transition: {
                                        delay: 0.2 + (((leftChars.length - 1) - index) * CHARACTER_ANIMATION_OFFSET),
                                        duration: 1,
                                        ease: "easeOut",
                                    },
                                    color: "#000000"
                                }}
                            >{char}</motion.h1>
                        )
                    })
                }

                {
                    middleChar !== undefined ? <motion.h1 className="text-6xl font-bold whitespace-pre-wrap"
                        initial={{
                            y: 20,
                            opacity: 0.2,
                            color: "#ffffff",
                            scale: 0.8
                        }}

                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: {
                                delay: 0.8,
                                duration: 0.5,
                                ease: "easeOut"
                            },
                            color: "#000000",
                            scale: 1
                        }}
                    >{middleChar}</motion.h1> : null
                }

                {
                    rightChars.map((char, index) => {
                        return (
                            <motion.h1 key={index + char + "r"} className="text-6xl font-bold wrap whitespace-pre"
                                initial={{
                                    x: 100,
                                    opacity: 0,
                                    color: useRandomColor()
                                }}

                                animate={{
                                    x: [100, 0, 0],
                                    opacity: [0, 1, 1],
                                    transition: {
                                        delay: 0.2 + index * CHARACTER_ANIMATION_OFFSET,
                                        duration: 1,
                                        ease: "easeOut"
                                    },
                                    color: "#000000"
                                }}
                            >{char}</motion.h1>
                        )
                    })
                }
            </div>
            <h2 className="text-xl">{props.subtitle}</h2>
        </div >
    )
}
