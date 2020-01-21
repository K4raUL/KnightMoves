// const
var minR = 3
var maxR = 13
var maxW = 21
var maxH = 13

//---------------------------------------------------
var N = minR
var M = minR

var start = [0, 0]
var finish = [N-1, M-1]
var field = new Array(N*M).fill(0)          // 0 - empty, 1 - start position, 2 - finish position, -1 - position visited by algo once
var state = 0
//---------------------------------------------------

document.addEventListener('contextmenu', event => event.preventDefault());

function NextSteps(x, y) 
{
    
}

function Init()
{
    var i0 = ~~((maxW - N) / 2)
    var j0 = ~~((maxH - M) / 2)
    
    obj = document.getElementsByClassName("board")
    for (var o = 0; o < obj.length; o++) obj[o].style.opacity = 0
    
    for (var i = i0; i < i0+N; i++) {
        for (var j = j0; j < j0+M; j++) {
            cellStyle = document.getElementById("board" + j + "_" + i).style
            cellStyle.opacity = 1
        }
    }
}

function Clear()
{
    N = minR
    M = minR
    start = [0, 0]
    finish = [N-1, M-1]
    field = new Array(N*M).fill(0)
    state = 0

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

function Calc(x, y, f)
{
    //f[x][y] = 1 
    //Calc(newX, newY, **f)
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

    // deleting all positions on right click
    if (e.which == 3) {
        field.fill(0)
        state = 0

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
        
        return
    }
    
    // else - left click
    if (state == 0) {
        // change image
        if ( (xi+yi)%2 ) e.target.src = "whiteK.png"
        else e.target.src = "blackK.png"
                
        state = 1
        // change array field
        field[xi-j0][yi-i0] = 1             // same as state
        start = [xi-j0, yi-i0]
    }   // !!! УЧЕСТЬ КОГДА СТАРТ И ФИНИШ НА ОДНОЙ КЛЕТКЕ !!!
    else if (state == 1) {
        // change image
        if ( (xi+yi)%2 ) e.target.src = "whiteF.png"
        else e.target.src = "blackF.png"
        
        state = 2
        // change array field
        field[xi-j0][yi-i0] = 2             // same as state  
        finish = [xi-j0, yi-i0]
    }
}

function setB()
{
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