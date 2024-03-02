# Pathfinder - A visualisation of various pathfinding algorithms

Pathfinding algorithms are used to find the shortest path (or sometimes just any valid path) between 2 points (source and target).
In addition to this basic problem statement, there are 2 additional variables

- Weight: These points are more "costly" to traverse.
  - Only Weighted algorithms will take weights into account.
- Wall: These points are impassable.
  <br/>
  Try it out here: https://pianomyn.github.io/pathfinder/

## Unweighted Usage

![path_01_03](https://github.com/Pianomyn/pathfinder/assets/61450295/2f35a55d-aaad-4c3a-a309-b31ec5030bbe)

## Weighted Usage

## Algorithms

- BFS
  - Unweighted, shortest path algorithm
  - Explores the grid layer by layer
- DFS
  - Unweighted, does not guarantee shortest path
  - Move to unvisited nodes randomly
- Greedy Heuristic
  - Unweighted, does not guarantee shortest path
  - Makes locally optimal decisions based on a heuristic - in this case, Manhattan Distance abs(target.x - current.x) + abs(target.y - current.x). Generally good for highly connected graphs but can run into issues with walls/barriers.

```latex
Manhattan\ Distance=| \text{target.x} - \text{current.x} | + | \text{target.y} - \text{current.y} |
```

- Djikstra's
  - Weighted, shortest path algorithm
  - Also a "greedy" algorithm. Uses a priority queue (min heap) to ensure it is visiting
    the min weight edge currently bordering the frontier. Guarantees shortest path from a source to all connected nodes in the graph.
- A\*
  - Weighted, shortest path algorithm
  - Best weighted pathfinding algorithm. Makes use of a min heap as well but the priority is determined by weight + heuristic. Can think of it as an "informed Djikstra's" that can be expected to find the target faster than Djikstra's.

## Development

Run the webapp locally

```bash
npm i
npm run tailwind-watch &
npm run dev
```

Deploy to production

```bash
npm run deploy
```
