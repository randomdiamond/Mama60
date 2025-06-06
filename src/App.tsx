import GiftGrid from "./components/GiftGrid";
import "./App.css";

export default function App() {
  return (
    <>
      <header className="hero">
        <h1 className="hero__title">Mission 60 Geschenke</h1>
        <p className="hero__subtitle">
          Jeden Tag eine neue Überraschung – freigeschaltet um 0 Uhr.
        </p>
      </header>

      <GiftGrid />
    </>
  );
}
