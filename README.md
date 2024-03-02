# Pathfinder - A visualisation of various pathfinding algorithms

Pathfinding algorithms are used to find the shortest path (or sometimes just any valid path) between 2 points (source and target).
In addition to this basic problem statement, there are 2 additional variables

- Weight: These points are more "costly" to traverse.
  - Only Weighted algorithms will take weights into account.
- Wall: These points are impassable.
<br/>
Try it out here: https://pianomyn.github.io/pathfinder/

## Usage
UI Usage from left to right (Please see Gifs below if unclear)
- Algorithm drop down: Select the algorithm you want to visualise
- Height: Input the height of the grid (20 by default)
- Width: Input the width of the grid (20 by default)
- Weight: Input the value of a Weight (10 by default). Only affects weighted algorithms
- Animation Speed: Select the speed at which the visualization plays back
- Start: Visualise the currently selected algorithm
- Reset all: Clear the grid
- Reset path: Resets the currently explored path (blue and yellow cells)
- Placeable Cells: Click to place, click again to remove. Weights and Walls can also be placed by holding mouse 1 and dragging

## Configuration example
![config](https://github.com/Pianomyn/pathfinder/assets/61450295/fe4a43e2-a1b7-4e7f-b175-963048e2a7f1)

## Unweighted algorithm example
![unweighted](https://github.com/Pianomyn/pathfinder/assets/61450295/b5cdf9b6-267d-48a6-a858-8ed9fa60f1df)

## Weighted algorithm example
![weighted](https://github.com/Pianomyn/pathfinder/assets/61450295/2c76ae98-d0dc-4747-8fc6-87233f0636a8)

## Algorithms

- BFS
  - Unweighted, shortest path algorithm
  - Explores the grid layer by layer
- DFS
  - Unweighted, does not guarantee shortest path
  - Move to unvisited nodes randomly
- Greedy
  - Unweighted, does not guarantee shortest path
  - Makes locally optimal decisions based on a heuristic - for this project, I am using Manhattan Distance.
  - $Manhattan\ Distance=| \text{target.x} - \text{current.x} | + | \text{target.y} - \text{current.y} |$
  - Generally good for highly connected graphs but can run into issues with walls/barriers.
- Djikstra's
  - Weighted, shortest path algorithm
  - Uses a priority queue (min heap) to ensure it is visiting the min weight edge currently bordering the frontier. Guarantees shortest path from a source to all connected nodes in the graph.
- A\*
  - Weighted, shortest path algorithm
  - Best weighted pathfinding algorithm. Makes use of a min heap as well but the priority is determined by weight + heuristic (combination of Greedy and Djikstra's). Can think of it as an "informed Djikstra's" that can be expected to find the target faster than Djikstra's.

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
