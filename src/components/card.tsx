import { motion } from "framer-motion";


interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverDisabled?: boolean;
    onMouseDown?: () => void;
}

export default function Card(props: CardProps) {
    return (
        <motion.div className={props.className + " border rounded-md min-w-40 min-h-40 flex flex-col justify-center align-middle text-center shadow-lg"}
            initial={{
                opacity: 0.0,
                backgroundColor: "#f0f0f0f0",
                y: 100,
                scaleY: 0.95
            }}

            layout

            animate={{
                opacity: 1,
                backgroundColor: "#ffffff",
                x: 0,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0
                }
            }}

            exit={{
                opacity: 0,
                y: -200,
                x: 0,
                scaleY: 0.5,
                transition: {
                    duration: 0.5,
                    ease: "easeIn"
                }
            }}

            whileHover={{
                scale: props.hoverDisabled ? 1 : 1.05,
                transition: {
                    duration: 0.2,
                    ease: "easeOut"

                }
            }}

            onMouseDown={props.onMouseDown}
        >
            {props.children}
        </motion.div>
    )
}