document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");
    const status = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");
    const originalMessage = status.textContent;

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;

    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Exercise 1: Set up the board
    squares.forEach(function (square, index) {
        square.classList.add("square");

        // Exercise 2: Add X or O when clicked
        square.addEventListener("click", function () {

            // Exercise 6: Prevent changing occupied squares
            if (board[index] !== "" || gameOver) {
                return;
            }

            board[index] = currentPlayer;
            square.textContent = currentPlayer;

            square.classList.remove("X", "O");
            square.classList.add(currentPlayer);

            // Exercise 4: Check for a winner
            if (checkWinner()) {
                status.textContent =
                    "Congratulations! " + currentPlayer + " is the Winner!";
                status.classList.add("you-won");
                gameOver = true;
            } else if (currentPlayer === "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }
        });

        // Exercise 3: Mouse hover effect
        square.addEventListener("mouseover", function () {
            square.classList.add("hover");
        });

        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });
    });

    // Exercise 4: Check winning combinations
    function checkWinner() {
        for (let line of winningLines) {
            let a = line[0];
            let b = line[1];
            let c = line[2];

            if (board[a] !== "" &&
                board[a] === board[b] &&
                board[b] === board[c]) {
                return true;
            }
        }

        return false;
    }

    // Exercise 5: Restart the game
    newGameButton.addEventListener("click", function () {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameOver = false;

        squares.forEach(function (square) {
            square.textContent = "";
            square.classList.remove("X", "O", "hover");
        });

        status.textContent = originalMessage;
        status.classList.remove("you-won");
    });
});