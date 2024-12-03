import React from "react";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, label }) => {
  return (
    <div className="dropdown">
      <label>{label}</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
