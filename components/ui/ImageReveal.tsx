import Image from "next/image";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  image: SiteImage;
  sizes: string;
  /** Size the frame with aspect-ratio / height utilities. */
  className?: string;
  imgClassName?: string;
  /** Scroll parallax travel in percent of the frame height (0 = off). Desktop pointers only. */
  parallax?: number;
  /** Wipe the image in the first time it enters the viewport. */
  reveal?: boolean;
  preload?: boolean;
  quality?: 60 | 75 | 85;
  children?: React.ReactNode;
};

/**
 * Full-bleed photography frame: a vertical wipe + settle on first view,
 * with optional, very light scroll parallax. Animated in CSS and driven by
 * MotionObserver, so frames cost no per-image JavaScript.
 */
export function ImageReveal({
  image,
  sizes,
  className,
  imgClassName,
  parallax = 0,
  reveal = true,
  preload,
  quality = 75,
  children,
}: ImageRevealProps) {
  return (
    <div
      data-reveal={reveal ? "image" : undefined}
      className={cn(
        "overflow-hidden bg-stone",
        /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "") ? "" : "relative",
        className,
      )}
    >
      <div className="img-wipe absolute inset-0">
        <div
          className="absolute inset-0"
          data-parallax={parallax || undefined}
          style={parallax ? ({ "--parallax-scale": 1 + (parallax * 2) / 100 } as React.CSSProperties) : undefined}
        >
          <div className="img-settle absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              quality={quality}
              preload={preload}
              className={cn("object-cover", imgClassName)}
              style={image.position ? { objectPosition: image.position } : undefined}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
