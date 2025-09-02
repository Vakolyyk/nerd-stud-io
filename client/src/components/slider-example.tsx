"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"], // які підмножини символів потрібні
  weight: ["400", "500", "700"], // варіанти товщини
  variable: "--font-montserrat", // якщо хочеш використовувати через CSS variable
});

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;

const ROTATE_DEG = 4;

const STAGGER = 35;
const CENTER_STAGGER = -65;

const SECTION_HEIGHT = 630;

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(CARD_SIZE_LG);

  const [testimonials, setTestimonials] = useState(TESTIMONIAL_DATA);

  const handleMove = (position: number) => {
    const copy = [...testimonials];

    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();

        if (!firstEl) return;

        copy.push({ ...firstEl, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();

        if (!lastEl) return;

        copy.unshift({ ...lastEl, tempId: Math.random() });
      }
    }

    setTestimonials(copy);
  };

  useEffect(() => {
    const { matches } = window.matchMedia("(min-width: 640px)");

    if (matches) {
      setCardSize(CARD_SIZE_LG);
    } else {
      setCardSize(CARD_SIZE_SM);
    }

    const handleSetCardSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");

      if (matches) {
        setCardSize(CARD_SIZE_LG);
      } else {
        setCardSize(CARD_SIZE_SM);
      }
    };

    window.addEventListener("resize", handleSetCardSize);

    return () => window.removeEventListener("resize", handleSetCardSize);
  }, []);

  return (
    <div
      className={`relative w-full flex-grow overflow-hidden bg-neutral-200 ${montserrat.className}`}
      style={{
        height: SECTION_HEIGHT,
      }}
    >
      {testimonials.map((t, idx) => {
        let position = 0;

        if (testimonials.length % 2) {
          position = idx - (testimonials.length + 1) / 2;
        } else {
          position = idx - testimonials.length / 2;
        }

        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
        <button
          onClick={() => handleMove(-1)}
          className="grid h-14 w-14 place-content-center text-[40px] text-black transition-colors hover:bg-black hover:text-white"
        >
          <GoArrowLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="grid h-14 w-14 place-content-center text-[40px] text-black transition-colors hover:bg-black hover:text-white"
        >
          <GoArrowRight />
        </button>
      </div>
    </div>
  );
};

interface TestimonialProps {
  position: number;
  testimonial: TestimonialType;
  handleMove: (position: number) => void;
  cardSize: number;
}

const TestimonialCard = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}: TestimonialProps) => {
  const isActive = position === 0;
  const [name, role] = testimonial.by.split(",");

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
        absolute left-1/2 top-1/2 rounded-[20px] cursor-pointer p-6 
        shadow-[0_0_10px_0_rgba(0,0,0,0.5)] transition-colors duration-500
        ${isActive ? "z-10 bg-[#192C3D] text-[#F5F8F9]" : `z-0 border-3 bg-[#F5F8F9] text-black`}
      `}
      style={{
        borderColor: isActive ? "" : testimonial.color,
      }}
      animate={{
        width: 320,
        height: 460,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-50% + ${
          isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
        }px)`,
        rotate: isActive ? 0 : position % 2 ? -ROTATE_DEG : ROTATE_DEG,
        boxShadow: isActive
          ? "0px 0px 10px 0px rgba(0,0,0,0.5)"
          : `0px 0px 10px 0px ${testimonial.color}`,
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <div className="mb-4 flex justify-between text-xs font-normal">
        <img
          src={testimonial.imgSrc}
          alt={`Testimonial image for ${testimonial.by}`}
          className="h-[120px] w-[120px] rounded-full object-cover object-top"
        />
        <p className="flex flex-col">
          <span className="flex gap-1 items-center">
            <span>@{name}</span>
            <img src="/linkedin.png" alt="linkedin" />
          </span>
          <span />
        </p>
      </div>
      <h3 className={`text-sm font-medium text-end`}>{name}</h3>
      <p className="text-xs text-end mb-[128px]">{name}@company.com</p>
      <p className="text-sm mb-7.5">{testimonial.testimonial}</p>
      <p className="text-xs text-end font-semibold mb-7.5">-- {role}</p>
    </motion.div>
  );
};

type TestimonialType = {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
  color: string;
};

const colors = ["#0077B6", "#F4A261", "#6930C3", "#5FAF4D", "#E63946"];
const TESTIMONIAL_DATA: TestimonialType[] = [
  {
    tempId: 0,
    testimonial:
      "My favorite solution in the market. We work 5x faster with COMPANY.",
    by: "Alex, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#0077B6",
  },
  {
    tempId: 1,
    testimonial:
      "I'm confident my data is safe with COMPANY. I can't say that about other providers.",
    by: "Dan, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#F4A261",
  },
  {
    tempId: 2,
    testimonial:
      "I know it's cliche, but we were lost before we found COMPANY. Can't thank you guys enough!",
    by: "Stephanie, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#6930C3",
  },
  {
    tempId: 3,
    testimonial:
      "COMPANY's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#5FAF4D",
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Andre, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#E63946",
  },
  {
    tempId: 5,
    testimonial:
      "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#0077B6",
  },
  {
    tempId: 6,
    testimonial:
      "Took some convincing, but now that we're on COMPANY, we're never going back.",
    by: "Pam, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#F4A261",
  },
  {
    tempId: 7,
    testimonial:
      "I would be lost without COMPANY's in depth analytics. The ROI is EASILY 100X for us.",
    by: "Daniel, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#6930C3",
  },
  {
    tempId: 8,
    testimonial: "It's just the best. Period.",
    by: "Fernando, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#5FAF4D",
  },
  {
    tempId: 9,
    testimonial: "I switched 5 years ago and never looked back.",
    by: "Andy, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#E63946",
  },
  {
    tempId: 10,
    testimonial:
      "I've been searching for a solution like COMPANY for YEARS. So glad I finally found one!",
    by: "Pete, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#0077B6",
  },
  {
    tempId: 11,
    testimonial:
      "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Marina, CEO at COMPANY",
    imgSrc: "/29916.jpg",
    color: "#F4A261",
  },
];
