"use client"

import Image from "next/image"
import { ArrowRight, Zap, Sparkles, TrendingUp, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import type { CarouselApi } from "@/types/carrocel"

const slides = [
  {
    icon: Sparkles,
    id: 0,
    text: "Inovação Digital",
    description: "Soluções tecnológicas de ponta",
    bg: "blue",
     image: "/banner/banner04.jpg",
  },
  {
    icon: TrendingUp,
    id: 1,
    text: "Crescimento Garantido",
    description: "Resultados mensuráveis e escaláveis",
    bg: "red",
    image:  "/banner/banner05.jpg",
  },
  {
    icon: Users,
    id: 2,
    text: "Engajamento Total",
    description: "Conecte-se com seu público",
    bg: "green",
    image:  "/banner/banner06.jpg",
  },
  {
    icon: Zap,
    id: 3,
    text: "Performance Máxima",
    description: "Otimização em tempo real",
    bg: "orange",
    image:  "/banner/banner 07.jpg",
  },
    {
    icon: Zap,
    id: 3,
    text: "Performance Máxima",
    description: "Otimização em tempo real",
    bg: "orange",
    image:  "/banner/banner08.jpg",
  },
]

export default function HeroSection() {

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const pluginRef = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const navigation = useRouter()

  const navegarPara = (secao: string) => {
    const elemento = document.getElementById(secao)
    elemento?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="w-screen bg-[#001d49] flex items-center justify-center overflow-hidden border-gray-200">

      <Carousel
        setApi={setApi}
        className="w-full h-[30vh] lg:h-[55vh] border-gray-200"
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[pluginRef.current]}
      >

     <CarouselContent className="w-full md:h-[30vh]  lg:h-[55vh] border-gray-200">
  {slides.map((slide) => {
    const Icon = slide.icon
    return (
      <CarouselItem
        key={slide.id}
        className="w-full md:h-[30vh]"
      >
          <img
            src={slide.image}
            alt={slide.text}
            className="object-cover object-center w-screen"
          />
      </CarouselItem>
    )
  })}
</CarouselContent>


        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 backdrop-blur-md text-black rounded-full p-3 transition-all"
          aria-label="Previous Slide"
        >
          &#10094;
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 backdrop-blur-md text-black rounded-full p-3 transition-all"
          aria-label="Next Slide"
        >
          &#10095;
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-3 rounded-full transition-all ${
                index === current ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

    </main>
  )
}
