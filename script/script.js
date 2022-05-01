;(function(loader) {
	document.addEventListener("DOMContentLoaded", loader[0], false);
})([function (eventLoadedPage) {
	"use strict";

	function rand (min, max) {
		 return Math.floor(Math.random() * (max - min)) + min;
	}

	// colors = ["red"]
	const pallete = ["g0", "r32", "b15", "r19", "b4", "r21", "b2", "r25", "b17", "r34", "b6", "r27", "b13", "r36", "b11", "r30", "b8", "r23", "b10", "r5", "b24", "r16", "b33", "r1", "b20", "r14", "b31", "r9", "b22", "r18", "b29", "r7", "b28", "r12", "b35", "r3", "b26"];

	const bets = {
		 "green": [0],
		 "red": [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3],
		 "black": [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26]
		}

	const width = 80;

	const wrap = document.querySelector('.roulette-container .wrap');

	function spin_promise (color, number) {
		 return new Promise((resolve, reject) => {
			 console.log("spin_promise", color, number)
			  if (
					(color === "green" || color === "g") && (number === 0) ||
					(color === "black" || color === "b") && (number === bets.black.find(element => element === number)) ||
					(color === "red" || color === "r") && (number === bets.red.find(element => element === number)) 
			  ) 
			  {
					let index, pixels, rotations, pixelsStart;
					console.log("spin__promise afer if")
					color = color[0];
					index = pallete.indexOf(color + "" + number);
					pixels = width * (index + 1);
					let rotationRnd = rand(5, 40)
					rotations = 2960 * rotationRnd; // Rotations
					console.log(rotationRnd, "rotations")

					pixels -= 80;
					pixels = rand(pixels + 2, pixels + 79);
					pixelsStart = pixels;
					pixels += rotations;
					pixels *= -1;
					const slowDownTime = 12 /* (rotationRnd) */
					console.log(slowDownTime, "slowDownTime")

					wrap.style.backgroundPosition = ((pixels + (wrap.offsetWidth / 2)) + "") + "px";

					

					setTimeout(() => {
						 wrap.style.transition = "none";
						 let pos = (((pixels * -1) - rotations) * -1) + (wrap.offsetWidth / 2);
						 wrap.style.backgroundPosition = String(pos) + "px";
						 setTimeout(() => {
							 
							  wrap.style.transition = `background-position ${slowDownTime}s`;
							  resolve();
						 }, 510);

					}, slowDownTime * 1000 + 2000);
			  } else {
				  console.log("Number does not match")
			  }
		 });
	}

	const i = 0;

	function play () {

		 let color;
		 let r = rand(1, 3700);
		 console.log(r, "number")
		 if (1 <= r && r < 100) color = "green";
		 else if (100 <= r && r < 1800) color = "red";
		 else if (1800 <= r && r < 3700) color = "black";
		 let bet = bets[color][rand(0, bets[color].length)];
		 console.log(bet, "bet")
		 spin_promise(color, bet).then(()  => {
			  console.log("[Ended]");
			  const rouletteResults = document.querySelector(".roulette-result")
			  let colorBeted = document.createElement("div");
			  colorBeted.setAttribute("class", "color-beted " + color[0]);
			  colorBeted.innerHTML = bet;
			  rouletteResults.appendChild(colorBeted);

			  setTimeout(function () {
					console.log("[Start game]");
					play();
			  }, 1000);
		 });
	}

	play();
}]);