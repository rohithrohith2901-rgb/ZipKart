"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface MarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
    pauseOnHover?: boolean;
}

export default function Marquee({
    children,
    direction = "left",
    speed = 20,
    className,
    pauseOnHover = false,
}: MarqueeProps) {
    return (
        <div className={cn("overflow-hidden flex w-full select-none", className)}>
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
                className={cn("flex flex-shrink-0 gap-4 py-2 min-w-full", pauseOnHover && "hover:[animation-play-state:paused]")}
            >
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}
