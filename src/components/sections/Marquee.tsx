import { experience } from "@/data/portfolio";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {experience.offers.map((offer) => (
        <span
          key={offer}
          className="flex items-center whitespace-nowrap font-display text-2xl font-semibold uppercase tracking-tight md:text-4xl"
        >
          <span className="px-6">{offer}</span>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-line py-5">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
