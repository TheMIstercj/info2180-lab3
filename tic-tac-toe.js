document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");
    const status = document.getElementById("status");

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

    squares.forEach(function (square, index) {
        square.classList.add("square");

        square.addEventListener("click", function () {
            if (gameOver) {
                return;
            }

            board[index] = currentPlayer;
            square.textContent = currentPlayer;

            square.classList.remove("X", "O");
            square.classList.add(currentPlayer);

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

        square.addEventListener("mouseover", function () {
            square.classList.add("hover");
        });

        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });
    });

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
});