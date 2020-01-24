// const
var minR = 3
var maxR = 10
// (for squared board)
var maxW = maxR
var maxH = maxR

//---------------------------------------------------
var N = minR
var M = minR

var start = [0, 0]
var finish = [N-1, M-1]

// 0 - empty, 1 - start position, 2 - finish position, -1 - position visited by algo once
var field = new Array(N*M).fill(0)
var way = []

var minWay = []   
var maxWay = []
//var sosedi = new Array(N*M).fill(0)
var state = 0
var res = 0

var minD = M*N+1
var maxD = 0
var wayState = 0
//---------------------------------------------------

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', function (e) {
    var code = e.keyCode;
    if (code == 46) {           // "delete" key
        Clear();
    }
}, false);

function Init()
{
    var i0 = ~~((maxW - N) / 2)
    var j0 = ~~((maxH - M) / 2)
    
    field = new Array(N*M).fill(0)
    minD = M*N+1
    //sosedi = new Array(N*M).fill(0)    
    
    obj = document.getElementsByClassName("board")
    for (var o = 0; o < obj.length; o++) obj[o].style.opacity = 0
    
    for (var i = i0; i < i0+N; i++) {
        for (var j = j0; j < j0+M; j++) {
            cellStyle = document.getElementById("board" + j + "_" + i).style
            cellStyle.opacity = 1
        }
    }
    document.getElementById("res").innerHTML = ''
    document.getElementById("minW").innerHTML = ''
    document.getElementById("maxW").innerHTML = ''   
}

function Show(mod)
{
    var i0 = ~~((maxW - N) / 2)
    var j0 = ~~((maxH - M) / 2)
    
    // showing SHORTEST or LONGEST way
    if (mod == 1) {
        trace = maxWay.slice()
        lim = maxD
        document.getElementById("showmin").disabled = true
    }
    else {
        trace = minWay.slice()
        lim = minD
        document.getElementById("showmax").disabled = true        
    }
    trace.push(finish[0]*N + finish[1])    
    
    // clicked on "clear way" button
    if (wayState == lim+1) {
        // clearing board
         for (var i = 0; i < maxW; i++) {
            for (var j = 0; j < maxH; j++) {
                if ( (i+j)%2 ) document.getElementById("board" + j + "_" + i).src = "white.png"
                else document.getElementById("board" + j + "_" + i).src = "black.png"
            }
        }   

        // placing start and finish
        var xs = start[0] + j0
        var ys = start[1] + i0
        
        if ( (xs+ys)%2 ) document.getElementById("board" + xs + "_" + ys).src = "whiteK.png"
        else document.getElementById("board" + xs + "_" + ys).src = "blackK.png"
        
        var xf = finish[0] + j0
        var yf = finish[1] + i0
        
        if ( (xf+yf)%2 ) document.getElementById("board" + xf + "_" + yf).src = "whiteF.png"
        else document.getElementById("board" + xf + "_" + yf).src = "blackF.png"        
        
        // restore way buttons
        document.getElementById("showmin").innerHTML = "Show MIN"
        document.getElementById("showmax").innerHTML = "Show MAX"   
        document.getElementById("showmin").disabled = false
        document.getElementById("showmax").disabled = false
        
        wayState = 0
        return
    }
    
    var yn = trace[wayState]%N
    var xn = ~~(trace[wayState]/N)    
    
    var prev = wayState == 0 ? start[0]*N + start[1] : trace[wayState-1]
    var yp = prev%N
    var xp = ~~(prev/N)
    
    // replace knight by prev
    document.getElementById("board" + (xp+j0) + "_" + (yp+i0)).src = ( (xp+j0+yp+i0)%2 ) ? "whiteP.png" : "blackP.png";
    
    // draw knight on next position    
    document.getElementById("board" + (xn+j0) + "_" + (yn+i0)).src = ( (xn+j0+yn+i0)%2 ) ? "whiteK.png" : "blackK.png";

    // reaching final point 
    if (wayState == lim) {
        document.getElementById("showmin").innerHTML = "Clear Way"
        document.getElementById("showmax").innerHTML = "Clear Way"
    }
    
    wayState++
}

function Clear()
{
    N = minR
    M = minR
    start = [0, 0]
    finish = [N-1, M-1]
    field = new Array(N*M).fill(0)
    //sosedi = new Array(N*M).fill(0)
    state = 0
    res = 0
    
    way = []
    minWay = []   
    maxWay = []
    
    minD = M*N+1
    maxD = 0
    wayState = 0

    obj = document.getElementsByClassName("board")
    for (var o = 0; o < obj.length; o++) obj[o].style.opacity = 0
    
    document.getElementById("Nval").value = minR
    document.getElementById("Mval").value = minR
    
    for (var i = 0; i < maxW; i++) {
        for (var j = 0; j < maxH; j++) {
            if ( (i+j)%2 ) document.getElementById("board" + j + "_" + i).src = "white.png"
            else document.getElementById("board" + j + "_" + i).src = "black.png"
        }
    }

    Init()
}

function NextSteps(x, y) 
{
    var neigh = []
    var curP = x*N + y
    
    //if (sosedi[curP] != 0) return sosedi[curP];

    // 8 possible knight steps
    var stX = [1, -1, 2, -2]
    var stY = [-2, 2, -1, 1]
    
    for (var i = 0; i < 4; i++) {
        if ( x+stX[i] < 0 || x+stX[i] >= M ) continue
        for (var j = 2*~~(i/2); j <= 2*~~(i/2)+1; j++) {
            if ( y+stY[j] < 0 || y+stY[j] >= N) continue
            neigh.push(curP + stX[i]*N + stY[j])
        }
    }
    //sosedi[curP] = new Array
    //sosedi[curP] = neigh

    return(neigh)
}

function Calc()
{
    //alert("N = " + N + ", M = " + M + "\n" + field + "\nstart: " + start + "\nfinish: " + finish)
    recWay(start[0], start[1], 0)
        
    // show number of ways
    document.getElementById("res").innerHTML = res
    document.getElementById("minW").innerHTML = minD+1
    document.getElementById("maxW").innerHTML = maxD+1
}

function recWay(x, y, d)
{
    var i0 = ~~((maxW - N) / 2)
    var j0 = ~~((maxH - M) / 2)
    
    var res0 = NextSteps(x, y)                                  // receiving all neighbours of current point
    //alert(res0)
    // tupik
    if (res0.length == 0) return
    
    for (var i = 0; i < res0.length; i++) {
        // do not visit same points
        if (field[res0[i]] == 1 || field[res0[i]] == -1) continue
        
        // recover board coords from 1-dimensional array
        var yn = res0[i]%N
        var xn = ~~(res0[i]/N)
        
        // check for reaching the target       
        if (xn == finish[0] && yn == finish[1]) {
            res++
            if (d < minD) {
                minD = d    
                minWay = way.slice()
            }
            if (d > maxD) {
                maxD = d
                maxWay = way.slice()
            }
            continue
        }
        
        if (field[res0[i]] == 0) field[res0[i]] = -1            // setting point as "visited"
        way.push(res0[i])
        //document.getElementById("board" + (xn+j0) + "_" + (yn+i0)).src = ( (xn+j0+yn+i0)%2 ) ? "whiteP.png" : "blackP.png";
        recWay(xn, yn, d+1)                                          // repeat for each remaining neighbour
        //document.getElementById("board" + (xn+j0) + "_" + (yn+i0)).src = ( (xn+j0+yn+i0)%2 ) ? "white.png" : "black.png";
        if (field[res0[i]] == -1) field[res0[i]] = 0            // leaving branch, marking point as "unvisited"
        way.pop()
    }
}

function setCell(e)
{
    // array starting position in field !! 
    var i0 = ~~((maxW - N) / 2)
    var j0 = ~~((maxH - M) / 2)
    
    var cid = e.target.id
    var idstr = cid.replace(/[^0-9.]/g, ' ')
    
    // field coords
    var xi = Number(parseInt(idstr))
    var yi = Number(idstr[idstr.length-2] + idstr[idstr.length-1])

    // dont click outside field!
    if ( xi<j0 || xi>=j0+M ) return
    if ( yi<i0 || yi>=i0+N ) return
    
    
    // deleting all positions on right click
    if (e.which == 3) {
        // clear START
        var xs = start[0] + j0
        var ys = start[1] + i0
        
        if ( (xs+ys)%2 ) document.getElementById("board" + xs + "_" + ys).src = "white.png"
        else document.getElementById("board" + xs + "_" + ys).src = "black.png"
        
        // clear FINISH
        var xf = finish[0] + j0
        var yf = finish[1] + i0
        
        if ( (xf+yf)%2 ) document.getElementById("board" + xf + "_" + yf).src = "white.png"
        else document.getElementById("board" + xf + "_" + yf).src = "black.png"
        
        start = [0, 0]
        finish = [N-1, M-1]
        field = new Array(N*M).fill(0)
        //sosedi = new Array(N*M).fill(0)
        state = 0
        res = 0
        
        way = []
        minWay = []   
        maxWay = []
        
        minD = M*N+1
        maxD = 0
        wayState = 0           
        
        document.getElementById("res").innerHTML = ''
        document.getElementById("minW").innerHTML = minD+1
        document.getElementById("maxW").innerHTML = maxD+1
        
        return
    }
    
    // else - left click
    if (state == 0) {
        // change image
        if ( (xi+yi)%2 ) e.target.src = "whiteK.png"
        else e.target.src = "blackK.png"
                
        state = 1
        // change array field
        field[(xi-j0)*N + (yi-i0)] = 1             // same as state
        start = [xi-j0, yi-i0]
    }   // !!! УЧЕСТЬ КОГДА СТАРТ И ФИНИШ НА ОДНОЙ КЛЕТКЕ !!!
    else if (state == 1) {
        // change image
        if ( (xi+yi)%2 ) e.target.src = "whiteF.png"
        else e.target.src = "blackF.png"
        
        state = 2
        // change array field
        field[(xi-j0)*N + (yi-i0)] = 2             // same as state  
        finish = [xi-j0, yi-i0]
    }
}

function setB()
{
    // ------------------------ clearing previous arrays and data ------------------------
    var i0 = ~~((maxW - N) / 2)
    var j0 = ~~((maxH - M) / 2)

    // clear START
    var xs = start[0] + j0
    var ys = start[1] + i0
    
    if ( (xs+ys)%2 ) document.getElementById("board" + xs + "_" + ys).src = "white.png"
    else document.getElementById("board" + xs + "_" + ys).src = "black.png"
    
    // clear FINISH
    var xf = finish[0] + j0
    var yf = finish[1] + i0
    
    if ( (xf+yf)%2 ) document.getElementById("board" + xf + "_" + yf).src = "white.png"
    else document.getElementById("board" + xf + "_" + yf).src = "black.png"
    
    start = [0, 0]
    finish = [N-1, M-1]
    field = new Array(N*M).fill(0)
    //sosedi = new Array(N*M).fill(0)
    state = 0
    res = 0
    
    way = []
    minWay = []   
    maxWay = []
    
    minD = M*N+1
    maxD = 0
    wayState = 0    
    
    document.getElementById("res").innerHTML = ''
    // -----------------------------------------------------------------------------------
    
    // setting new board 
    N = document.getElementById("Nval").value
    M = document.getElementById("Mval").value
    N = Number(N)
    M = Number(M)
    
    if (N > maxR) {
        N = maxR
        document.getElementById("Nval").value = maxR
    }
    else if (N < minR) {
        N = minR
        document.getElementById("Nval").value = minR
    }
    
    if (M > maxR) {
        M = maxR
        document.getElementById("Mval").value = maxR
    }
    else if (M < minR) {
        M = minR
        document.getElementById("Mval").value = minR
    }    
    
    Init()
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
