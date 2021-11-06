for (let i = 0; i < 7; i++) {
	document.querySelector(`.btn${i}`).addEventListener("click", () => {
		addOrder(i);
	});
}
const elevator = document.querySelector(".elevator");
const display = document.querySelector(".display p");
let prevfloor = 0;
let prevMove;
let order = [];
let switchLet = true;

elevator.addEventListener("transitionend", () => {
	console.log("Transitionend...");
	switchLet = true;
	console.log('switchLet at transitionend ::: ' + switchLet);
});

function addOrder(x) {
	if (order[order.length - 1] != x) {
		order.push(x);
		console.log(order);
		document.querySelector(`.btn${x}`).setAttribute("disabled", "");
	}
}

setInterval(controller, 1000);

function controller() {
	if (order.length != 0 && switchLet == true) {
		console.log("Controller() statements TRUE...")
		switchLet = false;
		console.log('switchLet in controller ::: ' + switchLet);
		let floor = order.shift();
		console.log('FLOOR in controller() ::: ' + floor)
		move(floor);
	}
}

function move(floor) {
	console.log('Move(Floor)... ::: ' + floor);
	let floorMove = prevfloor - floor;
	floorMove = Math.abs(floorMove);

	elevator.classList.remove(`move${prevMove}`);
	elevator.classList.add(`move${floorMove}`);

	prevMove = floorMove;

	elevator.classList.add(`floor${floor}`);
	elevator.classList.remove(`floor${prevfloor}`);

	document.querySelector(`.btn${prevfloor}`).removeAttribute("disabled");

	prevfloor = floor;
	if (floor == 0) {
		floor = "T";
	}
	display.innerHTML = floor;
	controller();
}
