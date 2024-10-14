import { FaSpinner } from "react-icons/fa";
import "./SearchLoading.css";

export default function SearchLoading() {
  return (
    <h2 className="loading-header flex">
      <FaSpinner className="spinner"/>
      Loading
    </h2>
  );
}
