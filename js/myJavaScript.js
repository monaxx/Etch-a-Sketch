

const GRID_WIDTH = 600;
let cellColor = "black";

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
    gridCell.setAttribute("style", `height: ${gridCellHeight}px; width: ${gridCellWidth}px;`);
    for(let i = 1; i <= numberOfGridCells; i++){
        let p = gridCell.cloneNode(true);
        p.addEventListener("mouseover", (e) => {
            if(cellColor !== "black"){
                p.style.backgroundColor = gridCellRandomRGBChangeColor();
            }else{
                p.style.backgroundColor = cellColor;
            }
            // p.classList.add("gridCellDefaultChangeColor");
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

function setButtonEvents(){
    let button = document.querySelector(".gridDensity");
    button.addEventListener("click", changeGridDensity);

    button = document.querySelector(".blackCellColor");
    button.addEventListener("click", (e) => {cellColor="black"});

    button = document.querySelector(".rgbCellColor");
    button.addEventListener("click", (e) => {cellColor=gridCellRandomRGBChangeColor()});
    
}

function runProgram(){
    
    setButtonEvents();

    createGrid(16);
}

runProgram();