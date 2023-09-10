import { ClassType } from "react";
import Algorithm from "../Algorithms/AlgorithmTemplate";
import BFS from "../Algorithms/BFS";
import DFS from "../Algorithms/DFS";
import Graph from "../Algorithms/Graph/Graph";
import { ALL_COLOR_MAPPINGS } from "../Utility/constants";
import { ALL_COLOR_MAPPINGS_TYPE } from "../Utility/types";

interface PlayBarProps {
  graph: Graph;
  setCanEdit: (value: boolean) => void;
  currentAlgorithm: Algorithm;
}

const PlayBar = ({ graph, setCanEdit, currentAlgorithm }: PlayBarProps) => {
  return (
    <div className="flex flex-col items-center mx-2">
      <div>
        <button
          className="p-2 mx-0.5 border border-solid "
          onClick={() => {
            setCanEdit(false);
            currentAlgorithm.setGraph(graph);
            currentAlgorithm.findPath();
            currentAlgorithm.animatePath();
            /*
            var dfs = new DFS(graph);
            dfs.setGraph(graph);
            dfs.findShortestPath();
            dfs.animateShortestPath();
            */

            //var bfs = new BFS(graph);
            //var bfs = new currentAlgorithm(graph)
            //bfs.findShortestPath();
            setCanEdit(true);
          }}
        >
          Start
        </button>
        <button
          className="p-2 mx-0.5 border border-solid "
          onClick={() => graph.clearGraph(Object.values(ALL_COLOR_MAPPINGS))}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PlayBar;
