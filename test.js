import {Heap} from "heap-js"

const h = new Heap();
console.log("reached")
h.add(1,10)
h.add(3,9)
h.add(5,8)
while(!h.isEmpty()) {
  console.log(h.top())
  h.pop()
}


