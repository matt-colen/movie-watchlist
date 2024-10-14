import "./SearchWelcome.css";
import exploringIcon from "src/assets/exploring.svg";

export default function SearchWelcome() {
  return (
    <div className="icon__container welcome grid">
      <img src={exploringIcon} alt="Movie icon" />
      <p>Start exploring</p>
    </div>
  );
}
