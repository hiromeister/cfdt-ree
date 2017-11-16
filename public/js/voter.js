let btnValiderChoix = document.querySelector(".valider-choix");

let nbMandat = document.querySelector(".nbMandat");
const nbMandatMax = nbMandat.value;

// let confirmationR1 = document.querySelector(".confirmationR1");
// let confirmationR2 = document.querySelector(".confirmationR2");

let R1 = document.querySelector(".R1");
let R2 = document.querySelector(".R2");

let R1tokeep = 0;
let R2tokeep = 0;

// console.log(confirmationR1);
// console.log(confirmationR2);
// console.log(R1tokeep);
// console.log(R2tokeep);
// console.log(nbMandat.value);
// console.log(nbMandatMax);

function AlwaysRight(e){
	if((R1.value + R2.value + nbMandat.value) >= nbMandatMax){
		R1.value = "";
		R2.value = "";
		nbMandat.value = nbMandatMax;
	}
}

	// document.onkeydown = function (event) {
	//     event = event || window.event;
	//     if (event.keyCode === 38 ) {
	//     	console.log("OK HAUT");
	//     } else if (event.keyCode === 40) {
	//     	console.log("OK BAS");
	//     }
	// }

// R1.addEventListener("focus", (e) => {

// });

R1.addEventListener("change", (e) => {
	if(nbMandat.value > 0){
		nbMandat.value -= R1.value;
		AlwaysRight()
	}
	console.log(R1.value);
	console.log(R2.value);
	console.log(nbMandat.value);
});

R2.addEventListener("change", (e) => {
	if(nbMandat.value > 0){
		nbMandat.value -= R2.value;
		AlwaysRight()
	}
	console.log(R1.value);
	console.log(R2.value);
	console.log(nbMandat.value);
});


btnValiderChoix.addEventListener("click", (e) =>{
	// return R1.value R2.value nbMandat.value
});