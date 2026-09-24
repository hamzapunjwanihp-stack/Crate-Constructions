import Image from "next/image";
import { team } from "@/data/team";
import { site } from "@/data/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";

/**
 * Renders team members from /data/team.ts. While that list is empty,
 * the section stays honest: no invented people, just a direct invitation.
 */
export function TeamSection() {
  const hasTeam = team.length > 0;

  return (
    <section aria-labelledby="team-title" className="cv-auto section-y bg-bone">
      <div className="container-site">
        <div className="grid-site gap-y-8">
          <div className="col-span-4 md:col-span-4">
            <SectionLabel index="07">Team</SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-8">
            <AnimatedHeading id="team-title" lines={["The people", "behind the work."]} className="heading-xl" />
            {!hasTeam && (
              <Reveal>
                <p className="mt-8 max-w-[46ch] body-lg text-charcoal">
                  Every Crate project is led by the people you meet in the first conversation. Team profiles are being
                  added — in the meantime, the best introduction is a call.
                </p>
                <TextLink href={site.phone.href} className="mt-8">
                  Call {site.phone.display}
                </TextLink>
              </Reveal>
            )}
          </div>
        </div>

        {hasTeam && (
          <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {team.map((member, i) => (
              <li key={member.name}>
                <Reveal delay={i * 0.06}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                    {member.photo && (
                      <Image
                        src={member.photo.src}
                        alt={member.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                      />
                    )}
                  </div>
                  <h3 className="mt-5 heading-sm">{member.name}</h3>
                  <p className="mt-1 label-mono text-muted">{member.role}</p>
                  {member.bio && <p className="mt-3 text-[0.9375rem] text-charcoal">{member.bio}</p>}
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
