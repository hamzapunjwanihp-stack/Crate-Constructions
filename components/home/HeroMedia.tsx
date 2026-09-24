import Image from "next/image";
import type { SiteImage } from "@/data/images";

/**
 * Hero photograph: a slow CSS settle on load, plus a light downward
 * parallax as the page scrolls (desktop pointers only, via MotionObserver).
 */
export function HeroMedia({ image }: { image: SiteImage }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 origin-bottom"
        data-parallax="12"
        data-parallax-scale="1.12"
        style={{ "--parallax-scale": 1.12 } as React.CSSProperties}
      >
        <div className="absolute inset-0 animate-settle">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="100vw"
            quality={75}
            className="object-cover object-[50%_60%]"
          />
        </div>
      </div>
    </div>
  );
}
