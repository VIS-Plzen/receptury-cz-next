import { useState } from "react";
import RadioButton from "./RadioButton";

const radioData = [
  {
    id: "option1",
    label: "Option 1",
  },
  {
    id: "option2",
    label: "Option 2",
  },
  {
    id: "option3",
    label: "Option 3",
  },
];

const RadioButtonsGroup: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(radioData[0].id);

  const handleChange = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col space-y-2">
      {radioData.map((radio) => (
        <RadioButton
          key={radio.id}
          id={radio.id}
          label={radio.label}
          checked={selectedId === radio.id}
          onChange={handleChange}
          animateDot={
            selectedId === "option1" ? "animate-grow" : "animate-shrink"
          }
        />
      ))}
    </div>
  );
};

export default RadioButtonsGroup;
