



function createGrid(gridSize){
    const actualGridWidth = 600;

    const gridContainer = document.querySelector(".gridContainer");
    const numOfGapsInARow = gridSize + 1;
    const remainingGridContainerWidthToFitCells = actualGridWidth - numOfGapsInARow;

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
            p.classList.add("gridCellDefaultChangeColor");
        });

        gridContainer.appendChild(p);
    }
}
createGrid(16);