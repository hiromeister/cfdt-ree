// DOM : Récupérer l'emplacement du nombre de mandat
let nbMandat = document.querySelector(".nbMandat");

// Sauvegarder le  nombre de mandats de début dans une constante afin de simplifier les manipulations
const nbMandatMax = nbMandat.value;

// DOM : Récupérer les emplacement des inputs pour la Réponse 1 et 2
let R1 = document.querySelector(".R1");
let R2 = document.querySelector(".R2");

// Input de gauche : Ajout d'un évènement à chaque changement de valeur 
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

// Input de droite : Ajout d'un évènement à chaque changement de valeur 
R2.addEventListener("change", (e) => {
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