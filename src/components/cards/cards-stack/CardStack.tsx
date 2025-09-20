"use client";
import { useState, useRef } from "react";
import { motion } from "motion/react";

type Card = {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
};

export const CardStack = ({
    items,
    offset,
    scaleFactor,
}: {
    items: Card[];
    offset?: number;
    scaleFactor?: number;
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState<Card[]>(items);
    const startY = useRef<number | null>(null);

    // Touch event handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (startY.current === null) return;
        const endY = e.changedTouches[0].clientY;
        const deltaY = endY - startY.current;
        if (deltaY < -50) {
            // Swiped up: show next card
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards];
                newArray.unshift(newArray.pop()!);
                return newArray;
            });
        } else if (deltaY > 50) {
            // Swiped down: show previous card
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards];
                newArray.push(newArray.shift()!);
                return newArray;
            });
        }
        startY.current = null;
    };

    // Mouse event handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        startY.current = e.clientY;
    };
    const handleMouseUp = (e: React.MouseEvent) => {
        if (startY.current === null) return;
        const endY = e.clientY;
        const deltaY = endY - startY.current;
        if (deltaY < -50) {
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards];
                newArray.unshift(newArray.pop()!);
                return newArray;
            });
        } else if (deltaY > 50) {
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards];
                newArray.push(newArray.shift()!);
                return newArray;
            });
        }
        startY.current = null;
    };

    return (
        <div className="relative h-60 w-full mx-auto md:h-60 md:w-96">
            {cards.map((card, index) => {
                return (
                    <motion.div
                        key={card.id}
                        className="absolute dark:bg-[#000] bg-white h-56 lg:h-60 w-full md:h-60 md:w-96 rounded-3xl shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-[#000]/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
                        style={{
                            transformOrigin: "bottom center",
                        }}
                        animate={{
                            top: index * CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR,
                            zIndex: cards.length - index,
                        }}
                        onTouchStart={index === 0 ? handleTouchStart : undefined}
                        onTouchEnd={index === 0 ? handleTouchEnd : undefined}
                        onMouseDown={index === 0 ? handleMouseDown : undefined}
                        onMouseUp={index === 0 ? handleMouseUp : undefined}
                        whileTap={{ scale: 0.97 }}
                    >
                        <div className="font-normal text-neutral-700 dark:text-neutral-200">
                            {card.content}
                        </div>
                        <div>
                            <p className="text-neutral-500 font-medium dark:text-white">
                                {card.name}
                            </p>
                            <p className="text-neutral-400 font-normal dark:text-neutral-200">
                                {card.designation}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};