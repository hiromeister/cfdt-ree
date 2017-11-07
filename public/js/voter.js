let btnValiderChoix = document.querySelector(".valider-choix");

let nbMandat = document.querySelector(".nbMandat");
const nbMandatMax = nbMandat.value;

let confirmationR1 = document.querySelector(".confirmationR1");
let confirmationR2 = document.querySelector(".confirmationR2");

let R1 = document.querySelector(".R1");
let R2 = document.querySelector(".R2");

let R1tokeep = 0;
let R2tokeep = 0;

// console.log(confirmationR1);
// console.log(confirmationR2);
console.log(R1tokeep);
console.log(R2tokeep);
console.log(nbMandat.value);
console.log(nbMandatMax);

function AlwaysRight(e){
	if((R1.value + R2.value + nbMandat.value) > nbMandatMax){
		R1.value = 0;
		R2.value = 0;
		nbMandat.value = nbMandatMax;
	}
}

R1.addEventListener("change", (e) => {
	if(nbMandat.value > 0){
		nbMandat.value -= R1.value;
		AlwaysRight()
	}
 });

R2.addEventListener("change", (e) => {
	if(nbMandat.value > 0){
		nbMandat.value -= R2.value;
		AlwaysRight()
	}
 });


btnValiderChoix.addEventListener("click", (e) =>{
	confirmationR1.placeholder = R1tokeep;
	confirmationR2.placeholder = R2tokeep;
	alert("Ok");
});