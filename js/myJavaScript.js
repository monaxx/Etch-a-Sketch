
// GRID_WITH should be the same value with .div.gridContainer width/height value
const GRID_WIDTH = 600;
let cellColor = "rgb(0,0,0)"; //black

function createGrid(gridSize){
    const gridContainer = document.querySelector(".gridContainer");
    const numOfGapsInARow = gridSize + 1;
    const remainingGridContainerWidthToFitCells = GRID_WIDTH - numOfGapsInARow;
    const numberOfGridCells = Math.pow(gridSize, 2);
    
    const gridCell = document.createElement("div");
    /* Computing the actual size of each grid cell
    - (gridContainerWidth / gridSize) is the size of each grid cell, however will make each row 
        of the grid not have the correct number of grid cells
    */
    let gridCellHeight = remainingGridContainerWidthToFitCells / gridSize;
    let gridCellWidth = remainingGridContainerWidthToFitCells / gridSize;

    gridCell.classList.add("gridCell");
    gridCell.setAttribute("style", `height: ${gridCellHeight}px; width: ${gridCellWidth}px; background-color: rgb(255,255,255);`);
    gridCell.dataset.origColor = "rgb(255,255,255)";
    for(let i = 1; i <= numberOfGridCells; i++){
        let p = gridCell.cloneNode(true);
        p.addEventListener("mouseover", (e) => {
            if(cellColor === "randomRGB"){
                p.style.backgroundColor = gridCellRandomRGBChangeColor();
                p.dataset.origColor = p.style.backgroundColor;
            }else if(cellColor === "darken"){
                p.style.backgroundColor = gridCellDarken(p);
            }else{
                p.style.backgroundColor = cellColor;
                p.dataset.origColor = cellColor;
            }
        });

        gridContainer.appendChild(p);
    }
}

function changeGridDensity(event){
    let gridDensity = +(prompt("Please enter grid density (1-100 only):"));
    if(Number.isInteger(gridDensity) && gridDensity >= 1 && gridDensity <= 100){
        // Clear grid container
        document.querySelector(".gridContainer").textContent = "";
        // Create new grid
        createGrid(gridDensity);
    }else{
        alert("Invalid grid density!");
    }
}

function gridCellRandomRGBChangeColor(){
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let rgbString = `rgb(${x},${y},${z})`;
    return rgbString;
}

function gridCellDarken(divCell){
    // get original color value before "darken" option was chosen
    /**
     * The orig value was stored in a dataset attribute. This was done
     * in order to retrieve and subtract 10% of the orig color value and darken
     * the color after 10 interactions.
     */
    let origColor = divCell.dataset.origColor;
    let rgbOrigValue= origColor.slice(4, origColor.length -1).split(',');
    let rOrig = +rgbOrigValue[0];
    let gOrig= +rgbOrigValue[1];
    let bOrig = +rgbOrigValue[2];

    let backgroundColor = divCell.style.backgroundColor;
    let rgbValue = backgroundColor.slice(4, backgroundColor.length -1).split(',');
    let r = +rgbValue[0];
    let g = +rgbValue[1];
    let b = +rgbValue[2];

    if((r - (rOrig * 0.10)) >= 0){
        r = (r - (rOrig * 0.10));
    }else{
        r = 0;
    }
    if((g - (gOrig * 0.10)) >= 0){
        g = (g - (gOrig* 0.10));
    }else{
        g = 0;
    }
    if((b - (bOrig * 0.10)) >= 0){
        b = (b - (bOrig * 0.10));
    }else{
        b = 0;
    }
    return `rgb(${r},${g},${b})`
}

function clearAllCellColor(){
    let gridContainer = document.querySelector(".gridContainer");
    let children = gridContainer.children;
    for(let i = 0; i < children.length; i++){
        children[i].style.backgroundColor = "rgb(255,255,255)";
    }
}

function setButtonEvents(){
    let button = document.querySelector(".gridDensity");
    button.addEventListener("click", changeGridDensity);

    button = document.querySelector(".blackCellColor");
    button.addEventListener("click", (e) => {cellColor="rgb(0,0,0)"});

    button = document.querySelector(".rgbCellColor");
    button.addEventListener("click", (e) => {cellColor="randomRGB"});

    button = document.querySelector(".darken");
    button.addEventListener("click", (e) => {cellColor="darken"});

    button = document.querySelector(".clearAllCells");
    button.addEventListener("click", clearAllCellColor);
}

function runProgram(){
    setButtonEvents();
    createGrid(16);
}

runProgram();