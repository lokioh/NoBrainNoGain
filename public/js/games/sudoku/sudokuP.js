var puzzle;
			var selectedTile;
			var r, c;

			$(document).ready(function() {
				init();
				$("#grid").fadeIn(500);
				$(".emptyCell").click(function(e) {
					r = selectedTile.getAttribute('id').charAt(1);
					c = selectedTile.getAttribute('id').charAt(3);
				    $("#numPad").fadeIn(100);
				    $("#numPad").offset({left: e.pageX - 78,top: e.pageY - 40});
				});
				$("#np1").click(function() { numberPad(1); });
				$("#np2").click(function() { numberPad(2); });
				$("#np3").click(function() { numberPad(3); });
				$("#np4").click(function() { numberPad(4); });
				$("#np5").click(function() { numberPad(5); });
				$("#np6").click(function() { numberPad(6); });
				$("#np7").click(function() { numberPad(7); });
				$("#np8").click(function() { numberPad(8); });
				$("#np9").click(function() { numberPad(9); });
				$("#npx").click(function() { numberPad(""); });
				$(".mistakeScreen").click(function() {
					$(".mistakeScreen").fadeOut(100);
				});
				$("#newGame").click(function() { newGame(); });
				$("#solve").click(function() {
					$("#numPad").fadeOut(100);
				    solve();
				});
				
			});

			
			function init() {
				puzzle = new generateSudoku();
				for(var i = 0; i < 9; i++) {
					for(var j = 0; j < 9; j++) {
						var tile = document.getElementById("t" + i + "x" + j);
						if(puzzle.getTileNumber(i, j) === 0) {
							tile.className = "emptyCell";
							tile.innerHTML = "";
							tile.onclick = tOnClick;
						}
						else {
							tile.style.backgroundColor = "#ecf4f3";
							tile.className = "cell";
							tile.innerHTML = puzzle.getTileNumber(i, j);
						}
					}
				}
			}

			function tOnClick() {
				if(selectedTile == null) {
					selectedTile = this;
					selectedTile.className = "emptyCell selected";
				}
				else {
					deselect();
					$("#numPad").fadeOut(100);
				}
			}

			function numberPad(value) {
				selectedTile.innerHTML = value;
				deselect();
				$("#numPad").fadeOut(100);
				if(checkForEmptyCells() === true) {
					var fGrid = getFinishedGrid();
					for(var i = 0; i < 9; i++) {
						for(var j = 0; j < 9; j++) {
							var t = document.getElementById("t" + i + "x" + j);
							if(t.classList.contains("emptyCell")) {
								if(puzzle.isValid(fGrid, i, j, t.innerHTML)) {
									continue;
								}
								else {
									$(".mistakeScreen").fadeIn(100);
									return;
								}
							}
						}
					}
					$(".winScreen").fadeIn(100);
					return;
				}
			}

			function getFinishedGrid() {
				var fGrid = new Array(9);
				for(var i = 0; i < 9; i++) {
					fGrid[i] = new Array(9);
					for(var j = 0; j < 9; j++) {
						fGrid[i][j] = document.getElementById("t" + i + "x" + j).innerHTML;
					}
				}
				return fGrid;
			}

			function checkForEmptyCells() {
				for(var l = 0; l < 9; l++) {
					for(var k = 0; k < 9; k++) {
						var tile = document.getElementById("t" + l + "x" + k);
						if(tile.innerHTML == "") return false;
					}
				}
				return true;
			}

			function deselect() {
				selectedTile.className = "emptyCell";
				selectedTile = null;
			}

			function newGame() {
				location.reload();
			}

			function solve() {
				for(var i = 0; i < 9; i++) {
					for(var j = 0; j < 9; j++) {
						var tile = document.getElementById("t" + i + "x" + j);
						tile.innerHTML = puzzle.getSolution(i, j);
					}
				}
			}