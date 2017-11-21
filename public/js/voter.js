let btnValiderChoix = document.querySelector(".valider-choix");

let nbMandat = document.querySelector(".nbMandat");
const nbMandatMax = nbMandat.value;

let R1 = document.querySelector(".R1");
let R2 = document.querySelector(".R2");

R1.addEventListener("change", (e) => {
	if(R1.value <= nbMandatMax){
		nbMandat.value = nbMandatMax;
		R2.value = nbMandat.value - R1.value;
		nbMandat.value = 0;		
	} else {
		R1.value = null;
		R2.value = null;
		nbMandat.value = nbMandatMax;
	}

});

R2.addEventListener("change", (e) => {
	console.log("MAX " + nbMandatMax);
	console.log("Mandat " + nbMandatMax);

	if(R2.value <= nbMandatMax){
		nbMandat.value = nbMandatMax;
		R1.value = nbMandat.value - R2.value;
		nbMandat.value = 0;		
	} else {
		R1.value = null;
		R2.value = null;
		nbMandat.value = nbMandatMax;
	}
});


btnValiderChoix.addEventListener("click", (e) =>{
	// return R1.value R2.value nbMandat.value
});