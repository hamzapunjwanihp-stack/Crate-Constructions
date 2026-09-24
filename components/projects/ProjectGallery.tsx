import type { SiteImage } from "@/data/images";
import { ImageReveal } from "@/components/ui/ImageReveal";

type Block =
  | { kind: "full"; image: SiteImage }
  | { kind: "pair"; images: [SiteImage, SiteImage] }
  | { kind: "offset"; image: SiteImage };

/** Turns a flat image list into an alternating editorial sequence. */
function compose(list: SiteImage[]): Block[] {
  const blocks: Block[] = [];
  const pattern: Block["kind"][] = ["full", "pair", "offset", "pair"];
  let i = 0;
  let step = 0;
  while (i < list.length) {
    const kind = pattern[step % pattern.length];
    if (kind === "pair" && i + 1 < list.length) {
      blocks.push({ kind, images: [list[i], list[i + 1]] });
      i += 2;
    } else {
      blocks.push({ kind: kind === "pair" ? "offset" : kind, image: list[i] });
      i += 1;
    }
    step += 1;
  }
  return blocks;
}

export function ProjectGallery({ images }: { images: SiteImage[] }) {
  const blocks = compose(images);

  return (
    <section aria-label="Project gallery" className="cv-auto bg-bone pb-24 lg:pb-36">
      <div className="container-site space-y-6 md:space-y-10">
        {blocks.map((block, i) => {
          if (block.kind === "full") {
            return (
              <ImageReveal
                key={i}
                image={block.image}
                sizes="100vw"
                className="aspect-[4/3] md:aspect-[16/9]"
                parallax={6}
              />
            );
          }
          if (block.kind === "pair") {
            const flip = i % 2 === 1;
            return (
              <div key={i} className="grid-site gap-y-6">
                <ImageReveal
                  image={block.images[0]}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className={`col-span-4 aspect-[4/3] ${flip ? "md:col-span-5 md:aspect-[4/5]" : "md:col-span-7"}`}
                />
                <ImageReveal
                  image={block.images[1]}
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className={`col-span-4 aspect-[4/5] ${flip ? "md:col-span-7 md:mt-24 md:aspect-[4/3]" : "md:col-span-5 md:mt-24"}`}
                />
              </div>
            );
          }
          return (
            <div key={i} className="grid-site">
              <ImageReveal
                image={block.image}
                sizes="(min-width: 768px) 66vw, 100vw"
                className="col-span-4 aspect-[3/2] md:col-span-8 md:col-start-3"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
