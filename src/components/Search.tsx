import React, { useState } from "react";

type Props = {
  setCity: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search(props: Props): JSX.Element {
  const [inputValue, setinputValue] = useState("");

  function submitCity() {
    props.setCity(inputValue);
    setinputValue("");
  }

  return (
    <section className="search-section">
      <input
        type="text"
        id="search"
        value={inputValue}
        placeholder="Search city"
        onChange={(e) => setinputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitCity();
          }
        }}
      />
      <button
        type="button"
        id="search-btn"
        onClick={() => {
          submitCity();
        }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </section>
  );
}
