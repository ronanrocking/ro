document.addEventListener("DOMContentLoaded", function() {
    console.log("JS active");

    let cells = [0,0,0,0,0,0,0,0,0];
    let active_player = 1;
    let game_state = "standby";

    const winConditions = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
      ];

    function toggleMove(){
        if (active_player === 1){
            document.querySelector('#current_player').textContent = "player O's move";
            active_player = -1;
        }
        else if (active_player === -1){
            document.querySelector('#current_player').textContent = "player X's move";
            active_player = 1;
        }
        if (game_state === "standby"){
            game_state = "active";
        }
        return;

    }

    function checkWin(){
      for(let counter1 of winConditions){
        //checking for if x matches w current setting
        let x_matches = true;

        for(let counter2 of counter1){
            if (cells[counter2] !== 1){
                x_matches = false;
                break;
            }
        }
        if(x_matches){
            game_state = "over";
            
            document.querySelector('#current_player').innerHTML = "player X wins! <br> <u>reload</u>";


            const prompt = document.querySelector("#current_player");
            const cells = document.querySelectorAll(".cell");
            cells.forEach(cell => {
                cell.classList.add("disabled");
              });
            prompt.style.color = "#c94949";

            const currentPlayerElement = document.querySelector("#current_player");
            currentPlayerElement.style.cursor = "pointer";

        // Add click event listener to reload
        currentPlayerElement.addEventListener("click", function reloadPage() {
            location.reload();
        }, { once: true });


            return;
          }


        //checking for o
        let o_matches = true;

        for(let counter2 of counter1){
            if (cells[counter2] !== -1){
                
                o_matches = false;
                break;
            }
        }
        if(o_matches){
            game_state = "over"
            
            document.querySelector('#current_player').innerHTML = "player O wins! <br> <u>reload</u>";
            
            
            const prompt = document.querySelector("#current_player");
            const cells = document.querySelectorAll(".cell");
            cells.forEach(cell => {
                cell.classList.add("disabled");
              });
            prompt.style.color = "#c94949";

            const currentPlayerElement = document.querySelector("#current_player");
            currentPlayerElement.style.cursor = "pointer";

        // Add click event listener to reload
        currentPlayerElement.addEventListener("click", function reloadPage() {
            location.reload();
        }, { once: true });


            return;
          }
         
      }
      
    }

   


    if(game_state !== "over"){
        for(let i = 0; i <= 8; i++){





            const current_cell = document.querySelector(`#c${i}`)
            if(current_cell){
                current_cell.addEventListener("click", function(){

                    if (game_state === "over"){return;}
                    
                    if(cells[i]===0){
                        cells[i] = active_player;
                        
                        current_cell.textContent = active_player===1?"X":"O";
                        toggleMove();
                        checkWin();
                        

                        console.log(cells);
                    }



                })
            }
            
        }
    }
    



});