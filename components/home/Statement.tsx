import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Oversized editorial statement. Lines drift gently apart and firm up as
 * the section scrolls through the viewport (driven by MotionObserver via
 * data-drift attributes: "from,to" horizontal offsets in %, plus a fade start).
 */
export function Statement() {
  return (
    <section
      aria-labelledby="statement-title"
      data-theme="dark"
      data-drift-scope
      className="cv-auto relative overflow-hidden bg-ink py-[clamp(6rem,14vw,13rem)] text-white"
    >
      <div className="container-site">
        <SectionLabel index="02" tone="dark">
          Our approach
        </SectionLabel>

        <h2 id="statement-title" className="mt-12 display-xl lg:mt-16">
          <span data-drift="-5,3" data-drift-fade="0.14" className="block">
            A better
          </span>
          <span data-drift="5,-3" data-drift-fade="0.2" className="block pl-[9vw] md:pl-[16vw]">
            way to
          </span>
          <span data-drift="-3,3" data-drift-fade="0.26" className="block pl-[22vw] md:pl-[36vw]">
            build<span className="text-accent">.</span>
          </span>
        </h2>

        <div className="mt-16 grid-site lg:mt-24">
          <Reveal className="col-span-4 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8">
            <p className="body-lg text-concrete">
              Most construction problems begin long before the first board is cut. We plan deliberately, communicate
              plainly, and build in the right order — so the work holds up long after we leave.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
