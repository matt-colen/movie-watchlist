import exploringIcon from "/src/assets/icons/exploring.svg";

export default function Welcome() {
  return (
    <div className="icon__container">
      <img src={exploringIcon} alt="Exploring icon" />
      <p>Start exploring</p>
    </div>
  );
}
