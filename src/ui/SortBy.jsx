import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [params, setParams] = useSearchParams();
  const sortBy = params.get("sortBy") || "";

  function handleChange(e) {
    params.set("sortBy", e.target.value);
    setParams(params);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
