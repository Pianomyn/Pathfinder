import { CellColorMapping } from "../types";

const ColorKey = ({ name, color }: { name: string; color: string }) => {
  return (
    <div id="color-key" className="border border-solid rounded flex mx-0.5 p-2">
      <div className={`border border-solid rounded w-6 h-6 ${color}`}></div>
      <p>&nbsp;{name}</p>
    </div>
  );
};

const ColorKeyBar = () => {
  return (
    <div id="color-key-bar" className="flex items-center">
      {Object.entries(CellColorMapping).map(([key, val]) => {
        return <ColorKey name={key} color={val} />;
      })}
    </div>
  );
};

export default ColorKeyBar;
