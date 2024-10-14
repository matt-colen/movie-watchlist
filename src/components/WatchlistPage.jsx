import { useContext } from "react";
import { AppContext } from "../App";
import WatchlistWelcome from "./WatchlistWelcome";
import WatchlistGrid from "./WatchlistGrid";
import "./WatchlistPage.css";

export default function WatchlistPage() {
  const { watchlist } = useContext(AppContext);

  return (
    <section id="results" className="results grid">
      {!watchlist?.length > 0 ? <WatchlistWelcome /> : <WatchlistGrid />}
    </section>
  );
}
