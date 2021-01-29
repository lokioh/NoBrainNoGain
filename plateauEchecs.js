function initEchequier(divId){
	console.log(divId);
	var nombre=1;
	var echecs = "";
	echecs += '<table id="plateau">';
	for(var l=1; l<9; l++) // CREER 8 LIGNES
		{
		echecs += '<tr>';
		for(var c=1; c<9; c++) // CREER 8 CASES PAR LIGNE
			{
    
			if (nombre/2 == Math.round(nombre/2)) // classe CHANGE UNE CASE SUR DEUX (SI NOMBRE EST PAIR OU PAS)
				{var classe="caseBrun"}
			else
				{var classe="caseBlanc"}
    
			echecs +='<td><a onMouseOver="position('+l+','+c+')"><div id="'+l+'|'+c+'" class="'+classe+'"></div></a></td>'; // CREATION DES CASES (position('+l+','+c+') EST COMPLETE PAR UNE FONCTION DE LOCALISATION DES CASES DANS UN AUTRE SCRIPT)
			nombre++;
		}
		nombre++;
		echecs += '</tr>';
	}
	echecs += '\n</table>';
	
	document.getElementById(divId).innerHTML = echecs
	console.log(document.getElementById(divId));
}