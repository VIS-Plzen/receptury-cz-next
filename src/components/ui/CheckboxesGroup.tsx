import React, { useState } from "react";
import Checkbox from "./Checkbox";

// Define the structure for your checkbox data
type CheckboxData = {
  id: string;
  label: string;
};

const checkboxData: CheckboxData[] = [
  {
    id: "checkbox1",
    label: "Checkbox 1",
  },
  {
    id: "checkbox2",
    label: "Checkbox 2",
  },
  {
    id: "checkbox3",
    label: "Checkbox 3",
  },
  // Add more checkbox items as needed
];

const CheckboxesGroup: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleChange = (id: string) => {
    // Toggle the checked state for the checkbox
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="flex flex-col space-y-2">
      {checkboxData.map((item) => (
        <Checkbox
          key={item.id}
          id={item.id}
          label={item.label}
          checked={checkedItems[item.id] || false}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default CheckboxesGroup;
