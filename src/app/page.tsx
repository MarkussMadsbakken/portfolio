"use client"
import { Box, Environment, OrbitControls, RoundedBox, SpotLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useScroll, motion } from "framer-motion";
import BoxButton from "@/components/3d/boxButton";
import Section from "@/components/section";
import SectionHandler from "@/components/sectionHandler";
import Card from "@/components/card";
import Image from "next/image";
import SectionHeader from "@/components/sectionHeader";
import React, { useState } from "react";

export default function Home() {
    return (
        <div className="w-screen h-fit">
            <div className="flex flex-col w-full h-screen justify-center items-center">
                <h2 className="h-fit text-3xl pb-2">
                    Oops, du var her for tidlig!
                </h2>
                <div className="h-fit font-light text-sm">
                    Skal fullføre nettsiden de kommene dagene. De som venter på noe godt...
                </div>
            </div>
        </div >
    );
}

function TechSection() {
    const [openElement, setOpenElement] = useState<number | null>(null);

    const handleLanguageClick = (index: number) => {
        if (openElement === index) {
            setOpenElement(null)
        } else {
            setOpenElement(index)
        }
    }

    return (
        <Section background={
            <div className="w-full h-full bg-gradient-to-b from-slate-200 to-blue-400">

            </div>
        }>
            <div className="max-w-full h-screen grid grid-cols-3 grid-flow-row-dense mr-12 ml-12 pb-36 content-center gap-8 " >
                <motion.div className="pt-20 col-span-3" layout>
                    <SectionHeader title="Språk" />
                </motion.div>
                <LanguageCard src="/JS.svg" lang="Javascript"
                    onClick={() => handleLanguageClick(0)}
                    isOpen={openElement === 0}
                    comment={
                        <li>
                            2
                        </li>
                    }
                />
                <LanguageCard src="/TypeScript.svg" lang="Typescript"
                    onClick={() => handleLanguageClick(1)}
                    isOpen={openElement === 1}
                    comment={
                        <li>
                            denne nettsiden :)
                        </li>
                    }
                />

                <LanguageCard src="/Java.svg" lang="Java"
                    onClick={() => handleLanguageClick(2)}
                    isOpen={openElement === 2}
                    last
                    comment={
                        <li>
                            Hovedsakelig brukt i skolesammenheng
                        </li>
                    }
                />

                <LanguageCard src="/CPlusPlus.svg" lang="C++"
                    onClick={() => handleLanguageClick(3)}
                    isOpen={openElement === 3}
                />
                <LanguageCard src="/Elixir.png" lang="Elixir"
                    onClick={() => handleLanguageClick(4)}
                    isOpen={openElement === 4}
                    comment={
                        <li>
                            Nettsider med Phoenix
                        </li>
                    }
                />
                <LanguageCard src="/Python.svg" lang="Python"
                    onClick={() => handleLanguageClick(5)}
                    isOpen={openElement === 5}
                    last
                    row={2}
                />
            </div>
        </Section >
    )
}


function LanguageSection() {
    const [openElement, setOpenElement] = useState<number | null>(null);

    const handleLanguageClick = (index: number) => {
        if (openElement === index) {
            setOpenElement(null)
        } else {
            setOpenElement(index)
        }
    }

    return (
        <Section background={
            <div className="w-full h-full bg-gradient-to-b from-slate-200 to-blue-400">

            </div>
        }>
            <div className="max-w-full h-screen grid grid-cols-3 grid-flow-row-dense mr-12 ml-12 pb-36 content-center gap-8 " >
                <motion.div className="pt-20 col-span-3" layout>
                    <SectionHeader title="Språk" />
                </motion.div>
                <LanguageCard src="/JS.svg" lang="Javascript"
                    onClick={() => handleLanguageClick(0)}
                    isOpen={openElement === 0}
                    comment={
                        <li>
                            2
                        </li>
                    }
                />
                <LanguageCard src="/TypeScript.svg" lang="Typescript"
                    onClick={() => handleLanguageClick(1)}
                    isOpen={openElement === 1}
                    comment={
                        <li>
                            denne nettsiden :)
                        </li>
                    }
                />

                <LanguageCard src="/Java.svg" lang="Java"
                    onClick={() => handleLanguageClick(2)}
                    isOpen={openElement === 2}
                    last
                    comment={
                        <li>
                            Hovedsakelig brukt i skolesammenheng
                        </li>
                    }
                />

                <LanguageCard src="/CPlusPlus.svg" lang="C++"
                    onClick={() => handleLanguageClick(3)}
                    isOpen={openElement === 3}
                />
                <LanguageCard src="/Elixir.png" lang="Elixir"
                    onClick={() => handleLanguageClick(4)}
                    isOpen={openElement === 4}
                    comment={
                        <li>
                            Nettsider med Phoenix
                        </li>
                    }
                />
                <LanguageCard src="/Python.svg" lang="Python"
                    onClick={() => handleLanguageClick(5)}
                    isOpen={openElement === 5}
                    last
                    row={2}
                />
            </div>
        </Section >
    )

}

function LanguageCard({ src, lang, onClick, isOpen, last, row, comment }: { src: string, lang: string, onClick?: () => void, isOpen?: boolean, last?: boolean, row?: number, comment?: React.ReactNode }) {
    const span = isOpen ? 2 : 1;
    const rownum = row ? row : 1;
    const lastClass = last && isOpen ? `row-start-${rownum + 1} col-start-2` : "";
    const innergridClass = isOpen ? "grid-rows-2" : "grid-rows-1";
    const languageHeaderClass = isOpen ? "flex-row " : "flex-col justify-between";
    const imageClass = isOpen ? "w-1/3 h-4/5 p-2 justify-start" : " h-4/5 p-4 justify-center";
    return (
        <Card className={"col-span-" + span + " row-span-" + span + " cursor-pointer " + lastClass} hoverDisabled={isOpen} onMouseDown={onClick}>
            <div className={"grid w-full h-full " + innergridClass}
            >
                <motion.div layout className={"h-full select-none flex max-h-40 " + languageHeaderClass}>
                    <motion.div layout={"preserve-aspect"} className={"flex w-full " + imageClass}>
                        <Image src={src} alt={lang} width={80} height={80} fetchPriority="auto" className="h-auto w-auto" />
                    </motion.div>
                    <motion.div layout={!isOpen} className="font-medium text-center mb-2" hidden={isOpen}>
                        {lang}
                    </motion.div>
                    <div className="absolute w-full mt-4 font-medium" hidden={!isOpen}>
                        {lang}
                    </div>
                </motion.div>

                <motion.div
                    hidden={!isOpen}
                    initial={{
                        opacity: 0,
                        height: 0,
                        y: -10
                    }}
                    animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                        transition: {
                            duration: 1,
                            ease: "easeOut"
                        }
                    }}
                >
                    {comment}
                </motion.div>
            </div>
        </Card>
    )
}

/*
<Canvas>
                        <Environment preset="studio" environmentIntensity={0.3} />
                        <ambientLight intensity={1} />
                        <spotLight position={[10, 15, 10]} angle={0.3} />
                        <pointLight position={[-10, -10, -10]} />
                        <BoxButton text="click" />
                    </Canvas> */
