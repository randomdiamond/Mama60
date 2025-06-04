import gifts from "../data/gifts.json";
import GiftCard, { type Gift } from "./GiftCard";

export default function GiftGrid() {
  const sorted = (gifts as Gift[]).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className="gift-grid">
      {sorted.map((g) => (
        <GiftCard key={g.date} {...g} />
      ))}
    </section>
  );
}
