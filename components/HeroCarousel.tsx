import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/images/hero-urban-original.webp",
    alt: "Homeowners planning their house at a building site",
  },
  {
    src: "/images/hero-rural-original.webp",
    alt: "A family building a home in a rural setting",
  },
  {
    src: "/images/hero-villa-original.webp",
    alt: "A spacious villa taking shape",
  },
];
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  useEffect(() => {
    if (reducedMotion || hovered) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % photos.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion, hovered]);

  return (
    <section
      className="hero-carousel"
      aria-label="Homes built with care"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="commerce-hero-photo" aria-live="off">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={`hero-slide${index === active ? " is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Photo ${index + 1} of ${photos.length}`}
            aria-hidden={index !== active}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width:900px) 100vw, 50vw"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
