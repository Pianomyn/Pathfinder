import { ClassType } from "react";
import Algorithm from "../Algorithms/AlgorithmTemplate";
import BFS from "../Algorithms/BFS";
import DFS from "../Algorithms/DFS";
import Graph from "../Algorithms/Graph/Graph";
import { ALL_COLOR_MAPPINGS, EXPLORED_COLOR_MAPPINGS, VISITABLE_COLOR_MAPPINGS } from "../Utility/constants";
import { ALL_COLOR_MAPPINGS_TYPE } from "../Utility/types";

function promiseState(p: Promise<any>) {
  const t = {};
  return Promise.race([p, t])
    .then(v => (v === t)? "pending" : "fulfilled", () => "rejected");
}

interface PlayBarProps {
  graph: Graph;
  canEdit: boolean;
  setCanEdit: (value: boolean) => void;
  currentAlgorithm: Algorithm;
}

const PlayBar = ({ graph, canEdit, setCanEdit, currentAlgorithm }: PlayBarProps) => {
  return (
    <div className="flex flex-col items-center mx-2">
      <div>
        <button
          className="p-2 mx-0.5 border border-solid "
          onClick={() => {
            if(canEdit) {
              currentAlgorithm.setGraph(graph);
              currentAlgorithm.findPath();
              currentAlgorithm.animatePath([setCanEdit]);
            }
          }}
        >
          Start
        </button>
        <button
          className="p-2 mx-0.5 border border-solid "
          onClick={() => {
          if(canEdit) {
            graph.resetGraph(true, true, true);
          }
          }}
        >
          Reset all
        </button>
        <button
          className="p-2 mx-0.5 border border-solid "
          onClick={() => {
          if(canEdit) {
            graph.resetGraph(false, true, false)
          }
          }}
        >
          Reset path
        </button>
      </div>
    </div>
  );
};

export default PlayBar;
