# Pathfinder - A visualisation of various pathfinding algorithms
I initially built this webapp using Javascript, HTML and CSS when I was at university to help me visualize various pathfinding algorithms.
I wanted to keep working on this project after university but I didn't like raw Javascript and also wanted to learn some more frontend technologies so I started again using React, Typescript and Tailwind CSS.
<br/>
Try it out here: https://pianomyn.github.io/pathfinder/

## Basic Usage
![path_01_03](https://github.com/Pianomyn/pathfinder/assets/61450295/2f35a55d-aaad-4c3a-a309-b31ec5030bbe)

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
- Djikstra's
    - Weighted, shortest path algorithm
    - Also a "greedy" algorithm. Uses a priority queue (min heap) to ensure it is visiting
    the min weight edge currently bordering the frontier. Guarantees shortest path from a source to all connected nodes in the graph.
- A*
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

