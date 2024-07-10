//show every move a knight can make
function moveList(x, y) {
    let array = []
    array.push([x-2,y+1])
    array.push([x-1,y+2])
    array.push([x+1,y+2])
    array.push([x+2,y+1])
    array.push([x+2,y-1])
    array.push([x+1,y-2])
    array.push([x-1,y-2])
    array.push([x-2,y-1])
    return array
}

//remove illegal moves
function filterMoves(array) {
    const filtered = array.filter((set) => (set[0] >= 0 && set[0] <= 7 && set[1] >= 0 && set[1] <= 7))
    return filtered
}

//move handler returns only valid moves in situation
function getValidMoves(x,y) {
    let allMoves = moveList(x,y)
    let validMoves = filterMoves(allMoves)
    return validMoves
}

//each node tracks it's own progress 
function PathTracker(x, y, path = []) {
    this.x = x;
    this.y = y
    this.path = [...path, [this.x, this.y]]
    
    
}

//uses visited squares list to filter out visited squares from valid move list
function filterArrays(primary, path) {
    let filtered = [... primary]
    
    for(let i = 0; i < filtered.length; i++) {
        for(let j = 0; j < path.length; j++) {   
            if((filtered[i][0] === path[j][0]) && (filtered[i][1] === path[j][1])) {
                filtered.splice(i, 1)
                break 
            }
        }
    }
    return filtered
}

//Get shortest path and output to console
function KnightMoves(start, finish) {
    let movePath = moveProcessor(start, finish)
    if (movePath.length === 1) {
        console.log("You didn't have to move!")
    }

    else {
    console.log(`You made it in ${movePath.length - 1} moves! Here's your path`)
    console.log('start', `[${start[0]}, ${start[1]}]`)
    if (movePath.length >= 3) {
        for (let i = 1; i < movePath.length-1; i++) {
            console.log(i, `[${movePath[i][0]}, ${movePath[i][1]}]`)
        }}
    console.log('end', `[${finish[0]}, ${finish[1]}]`)
}
    console.log("Full Path: ", movePath)
    return movePath
}

//breadth first search used with a break condition to avoid infinite loops and find the shortest path to destination.
//logged visited squares to cut down on loops intersecting eachother so that progress is always being made without overlapping
function moveProcessor(start, finish) {
    let que = []
    let allVisited = []
    let current
    que.push(new PathTracker(start[0], start[1]))
    allVisited.push([que[0].x, que[0].y])
    while (que.length > 0) {
        current = que.shift()
        if (current.x === finish[0] && current.y === finish[1]) {
            break
        }
        else {
             
            let moves = getValidMoves(current.x, current.y)
            let alreadyVisited = current.path
            let toVisit = filterArrays(moves, allVisited)

            for (let i = 0; i < toVisit.length; i++) {
                que.push(new PathTracker(toVisit[i][0], toVisit[i][1], alreadyVisited))
                allVisited.push([toVisit[i][0], toVisit[i][1]])
                }
    }
}

return current.path
}


KnightMoves([0,0], [3,3])