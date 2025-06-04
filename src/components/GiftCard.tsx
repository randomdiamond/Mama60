// src/components/GiftCard.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ---------- Datentyp ---------- */
export interface Gift {
  date: string; // ISO-Datum, z. B. "2025-06-05"
  person: "Tim" | "Marie" | "Joe";
  title: string;
  description: string;
}

/* ---------- Badge-Klassen je Person ---------- */
const personToBadge = {
  Tim: "badge badge--tim",
  Marie: "badge badge--marie",
  Joe: "badge badge--joe",
} as const;

/* ---------- Komponente ---------- */
export default function GiftCard({ date, person, title, description }: Gift) {
  /* 1 | Darf geöffnet werden? */
  const dateReached = new Date() >= new Date(date);

  /* 2 | Persistenter "geöffnet"-Status */
  const storageKey = `opened-${date}`;
  const [opened, setOpened] = useState<boolean>(() => {
    try {
      return localStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });

  /* 3 | Systemdatum zurückgestellt → wieder schließen */
  useEffect(() => {
    if (!dateReached && opened) {
      setOpened(false);
      localStorage.removeItem(storageKey);
    }
  }, [dateReached, opened]);

  /* 4 | Klick-Handler */
  const handleClick = () => {
    if (!dateReached || opened) return;
    setOpened(true);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* Storage-Probleme ignorieren */
    }
  };

  /* 5 | Flip-Status */
  const flipped = dateReached && opened;

  /* 6 | JSX */
  return (
    <motion.article
      className={`gift-card ${flipped ? "is-unlocked" : ""}`}
      onClick={handleClick}
      whileHover={dateReached && !opened ? { scale: 1.03 } : undefined}
      transition={{ duration: 0.15 }}
    >
      <div className="gift-card__inner">
        {/* ---------- Vorderseite ---------- */}
        <div className="gift-card__side gift-card__front">
          <p className="gift-card__date">
            {new Date(date).toLocaleDateString("de-DE")}
          </p>

          <span className={personToBadge[person]}>{person}</span>

          {!dateReached && <p className="locked-hint">🎁 geheim …</p>}
          {dateReached && !opened && (
            <p className="locked-hint">👉 klicken zum Öffnen</p>
          )}
        </div>

        {/* ---------- Rückseite ---------- */}
        <div className="gift-card__side gift-card__back">
          {/* Badge oben beibehalten */}
          <span className={personToBadge[person]}>{person}</span>

          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              marginTop: "0.5rem",
            }}
          >
            {title}
          </h3>

          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#555" }}>
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
