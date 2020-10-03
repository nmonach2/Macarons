
var saveurs = ["MOJITO", "NAZCA", "SUMMER", "WINTER"];

// Creating a dropdown list to select service type
// (Inspired from a tutorial by Pierre Schwartz on developpez.com : https://khayyam.developpez.com/articles/web/javascript/jquery/plugin/)

(function($) {
//Création d'un nouveau plugin
    $.fn.liste_deroulante_illustree = function(options) {   
       
        // Définition des 2 propriétés du plugin (par défaut vides) : 
        // 1. Message à faire apparaître
        // 2. Evnènement lorsqu'un élément est sélectionné
        var defaut = {
            message: "",
            evenement: null
        };   
        // Combination of provided and default settings
        var opts = $.extend(defaut, options);       
               
        // Creating a list of service types
        function creerListe(f){
            // Creating the first zone (always visible), displaying the selected option
            var partieVisible = $('<div class="dropdownCell" id ="dropdownCell">' + opts.message + '</div>');
           
            // Creating the second zone, displaying all other options
            var partieDeroulante = $('<div class="dropdownPanel"></div>');               
                       
            $(this).find("li").each(function(){
            partieDeroulante.append($('<div class="dropdownOpt"></div>')
                    .click(onSelect)
                    .attr("value", $(this).attr("value"))
                    .append($(this).html())       
                    .hover(function(){$(this).addClass("dropdownOptSelected");},
                           function(){$(this).removeClass("dropdownOptSelected");})
                );
            });

            // Hiding the drop-down box
            partieDeroulante.hide();
            $.data(partieVisible, "visible", false);
           
            // Replacing the <ul> tag by our personalized list
            $(this).after(partieDeroulante);
            $(this).after(partieVisible);
            $(this).remove();
       
            // Setting the drop-down event of the list
            partieVisible.click(function(){       
                // If the list is dropped down
                if ($.data(partieVisible, "visible")){
                    partieDeroulante.slideUp("fast");
                    $.data(partieVisible, "visible", false);
                }else{
                    partieDeroulante.slideDown("slow");
                    $.data(partieVisible, "visible", true);
                }
            });
           
            // Function called each time an element is selected
            function onSelect(){           
                partieVisible.html($(this).html());
                partieVisible.attr("value", $(this).attr("value"));
                partieDeroulante.slideUp("fast");
               
                $.data(partieVisible, "visible", false);
               
                // Calling a custom function
                if (opts.evenement)
                    opts.evenement($(this));
            }               
        }
           
        // Creating a customized drop-down list for all elements of the jQuery object
        $(this).each(creerListe);   

        // Fluid interface
        return $(this);
    };   
 })(jQuery);

 
function f(){

};

$("ul").liste_deroulante_illustree({message:"&nbsp;Sélectionnez une saveur :", evenement:f}); // Dropdown list default message and select event 


function radioClicked() {
    if (document.getElementById("quantite24").checked){
        document.getElementById("nombre").value = 24
    }
    else if (document.getElementById("quantite48").checked){
        document.getElementById("nombre").value = 48
    }
}

function inputNumber() {
    document.getElementById("quantite24").checked = false
    document.getElementById("quantite48").checked = false
}

var img = []
var nom = [];
var qte = [];
var bouton = [];
var regex = /\d+/;

function ajouterCommande() { //Lorsqu'on appuie sur le bouton "ajouter à la commande"
    for (i=0;i<saveurs.length;i++){//pour chaque saveur
        if (document.getElementById("dropdownCell").innerHTML.indexOf(saveurs[i]) !== -1) {//si c'est la saveur ... qui est dans la liste déroulante
            if(document.getElementById("nom1")!=null){//s'il y a déjà un macaron à la première place
                if (document.getElementById("dropdownCell").innerHTML.indexOf(document.getElementById("nom1").innerHTML)!==-1){//si le macaron de la 1ère place est le même que celui de la liste déroulante
                    qte = document.createElement ("div"); qte.innerHTML = document.getElementById("nombre").value + " pces"; qte.id = "qte1"
                    document.getElementById("qte1").innerHTML = parseInt(document.getElementById("qte1").innerHTML.match(regex),10) + parseInt(qte.innerHTML.match(regex),10)+ " pces"
                }else if(document.getElementById("nom2")!=null){//s'il y a déjà un macaron à la deuxième place
                    if (document.getElementById("dropdownCell").innerHTML.indexOf(document.getElementById("nom2").innerHTML)!==-1){//si le macaron de la 2ème place est le même que celui de la liste déroulante
                        qte = document.createElement ("div"); qte.innerHTML = document.getElementById("nombre").value + " pces"; qte.id = "qte2"
                        document.getElementById("qte2").innerHTML = parseInt(document.getElementById("qte2").innerHTML.match(regex),10) + parseInt(qte.innerHTML.match(regex),10)+ " pces"
                    }else if(document.getElementById("nom3")!=null){//s'il y a déjà un macaron à la troisième place
                        if (document.getElementById("dropdownCell").innerHTML.indexOf(document.getElementById("nom3").innerHTML)!==-1){//si le macaron de la 3ème place est le même que celui de la liste déroulante
                            qte = document.createElement ("div"); qte.innerHTML = document.getElementById("nombre").value + " pces"; qte.id = "qte3"
                            document.getElementById("qte3").innerHTML = parseInt(document.getElementById("qte3").innerHTML.match(regex),10) + parseInt(qte.innerHTML.match(regex),10)+ " pces"
                        }else if(document.getElementById("nom4")!=null){//s'il y a déjà un macaron à la quatrième place
                            if (document.getElementById("dropdownCell").innerHTML.indexOf(document.getElementById("nom4").innerHTML)!==-1){//si le macaron de la 4ème place est le même que celui de la liste déroulante
                                qte = document.createElement ("div"); qte.innerHTML = document.getElementById("nombre").value + " pces"; qte.id = "qte4"
                                document.getElementById("qte4").innerHTML = parseInt(document.getElementById("qte4").innerHTML.match(regex),10) + parseInt(qte.innerHTML.match(regex),10)+ " pces"
                            }else{
                                alert ("Vous ne pouvez pas établir une commande avec plus de 4 saveurs différentes !")
                            }
                       }else{//si la 4ème place n'est pas encore occupée
                           img = document.createElement("img"); img.src = "images/macaron_"+saveurs[i].toLowerCase()+"_small.png"; img.id = "img4"
                           nom = document.createElement("div"); nom.innerHTML = saveurs[i]; nom.id = "nom4"
                           qte = document.createElement ("div"); qte.innerHTML = document.getElementById("nombre").value + " pces"; qte.id = "qte4"
                           bouton = document.createElement("button"); bouton.innerHTML ="&#8864"; bouton.style.fontSize = "xx-small"; bouton.style.width = "10px"; bouton.style.background = "none"; bouton.style.border = "none"; bouton.style.cursor = "pointer"; bouton.id = "bouton4"
                           document.getElementById("commande4").appendChild(img);
                           document.getElementById("commande4n").appendChild(nom);
                           document.getElementById("commande4q").appendChild(qte);
                           document.getElementById("commande4b").appendChild(bouton)
                           document.getElementById("bouton4").onclick = function(){
                               document.getElementById("img4").remove()
                               document.getElementById("nom4").remove()
                               document.getElementById("qte4").remove ()
                               document.getElementById("bouton4").remove()
                           }
                        }
                    }else{//si la 3ème place n'est pas encore occupée
                        img = document.createElement("img"); img.src = "images/macaron_"+saveurs[i].toLowerCase()+"_small.png"; img.id = "img3"
                        nom = document.createElement("div"); nom.innerHTML = saveurs[i]; nom.id = "nom3"
                        qte = document.createElement ("div"); qte.innerHTML = document.getElementById("nombre").value + " pces"; qte.id = "qte3"
                        bouton = document.createElement("button"); bouton.innerHTML ="&#8864"; bouton.style.fontSize = "xx-small"; bouton.style.width = "10px"; bouton.style.background = "none"; bouton.style.border = "none"; bouton.style.cursor = "pointer"; bouton.id = "bouton3"
                        document.getElementById("commande3").appendChild(img);
                        document.getElementById("commande3n").appendChild(nom);
                        document.getElementById("commande3q").appendChild(qte);
                        document.getElementById("commande3b").appendChild(bouton)
                        document.getElementById("bouton3").onclick = function(){
                            document.getElementById("img3").remove()
                            document.getElementById("nom3").remove()
                            document.getElementById("qte3").remove ()
                            document.getElementById("bouton3").remove()
                        }
                    }
                }else{//si la 2ème place n'est pas encore occupée
                    img = document.createElement("img"); img.src = "images/macaron_"+saveurs[i].toLowerCase()+"_small.png"; img.id = "img2"
                    nom = document.createElement("div"); nom.innerHTML = saveurs[i]; nom.id = "nom2"
                    qte = document.createElement ("div"); qte.innerHTML = document.getElementById("nombre").value + " pces"; qte.id = "qte2"
                    bouton = document.createElement("button"); bouton.innerHTML ="&#8864"; bouton.style.fontSize = "xx-small"; bouton.style.width = "10px"; bouton.style.background = "none"; bouton.style.border = "none"; bouton.style.cursor = "pointer"; bouton.id = "bouton2"
                    document.getElementById("commande2").appendChild(img);
                    document.getElementById("commande2n").appendChild(nom);
                    document.getElementById("commande2q").appendChild(qte);
                    document.getElementById("commande2b").appendChild(bouton)
                    document.getElementById("bouton2").onclick = function(){
                        document.getElementById("img2").remove()
                        document.getElementById("nom2").remove()
                        document.getElementById("qte2").remove ()
                        document.getElementById("bouton2").remove()
                    }
                }
            }else{//si aucune place n'est encore occupée
                img = document.createElement("img"); img.src = "images/macaron_"+saveurs[i].toLowerCase()+"_small.png"; img.id = "img1"
                nom = document.createElement("div"); nom.innerHTML = saveurs[i]; nom.id = "nom1"
                qte = document.createElement ("div"); qte.innerHTML = document.getElementById("nombre").value + " pces"; qte.id = "qte1"
                bouton = document.createElement("button"); bouton.innerHTML ="&#8864"; bouton.style.fontSize = "xx-small"; bouton.style.width = "10px"; bouton.style.background = "none"; bouton.style.border = "none"; bouton.style.cursor = "pointer"; bouton.id = "bouton1"
                document.getElementById("commande1").appendChild(img);
                document.getElementById("commande1n").appendChild(nom);
                document.getElementById("commande1q").appendChild(qte);
                document.getElementById("commande1b").appendChild(bouton)
                document.getElementById("bouton1").onclick = function(){
                    document.getElementById("img1").remove()
                    document.getElementById("nom1").remove()
                    document.getElementById("qte1").remove ()
                    document.getElementById("bouton1").remove()
                }
            }
        }
    }
}

    
function actualiserAchats(){
    
    var poudreAmandes = 0
    var sucreGlace = 0
    var sucreFin = 0
    var oeufs = 0

    var chocolatBlanc = 0
    var cremeEntiere = 0

    var citronsVerts = 0
    var feuillesMenthe = 0
    var rhumBlanc = 0

    var vanille = 0
    var tonka = 0
    var poivre = 0

    var siropPasteque = 0
    var feuillesBasilic = 0

    var epicesPainDEpices = 0
    var cannelle = 0
    
    for (i=1;i<5;i++){
        if (document.getElementById("nom"+i)!=null){
            poudreAmandes = parseInt(poudreAmandes,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 85
            sucreGlace = parseInt(sucreGlace,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 85
            sucreFin = parseInt(sucreFin,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 70
            oeufs = parseInt(oeufs,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 2
            if (document.getElementById("nom"+i).innerHTML.indexOf(saveurs[0])!==-1){// si c'est MOJITO
                chocolatBlanc = parseInt(chocolatBlanc,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 100
                cremeEntiere = parseInt(cremeEntiere,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 50
                citronsVerts = parseInt(citronsVerts,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 1
                feuillesMenthe = parseInt(feuillesMenthe,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 15
                rhumBlanc = parseInt(rhumBlanc,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 10
            }else if (document.getElementById("nom"+i).innerHTML.indexOf(saveurs[1])!==-1){ // si c'est NAZCA
                chocolatBlanc = parseInt(chocolatBlanc,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 100
                cremeEntiere = parseInt(cremeEntiere,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 50
                vanille = parseInt(vanille,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 1
                tonka = parseInt(tonka,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 0.3
                poivre = parseInt(poivre,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 2
            }else if (document.getElementById("nom"+i).innerHTML.indexOf(saveurs[2])!==-1){ // si c'est SUMMER
                chocolatBlanc = parseInt(chocolatBlanc,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 120
                cremeEntiere = parseInt(cremeEntiere,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 40
                siropPasteque = parseInt(siropPasteque,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 25
                feuillesBasilic = parseInt(feuillesBasilic,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 15
            }else if (document.getElementById("nom"+i).innerHTML.indexOf(saveurs[2])!==-1){ // si c'est WINTER
                chocolatBlanc = parseInt(chocolatBlanc,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 160
                cremeEntiere = parseInt(cremeEntiere,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 80
                epicesPainDEpices = parseInt(epicesPainDEpices,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 0.5
                cannelle = parseInt(cannelle,10) + Math.ceil(parseInt(document.getElementById("qte"+i).innerHTML.slice(0,-4),10)/24) * 1
            }
        }
    }
    
    $('#container').children().remove(); //efface l'ancienne liste
    $('#container').append('<p><small><b>&nbsp;&nbsp;Pour les ganaches :</b></p>') //laisse le titre
    $('#container2').children().remove(); //efface l'ancienne liste
    $('#container2').append('<p><small><b>&nbsp;&nbsp;Pour les coques :</b></p>') //laisse le titre      
    
    if (poudreAmandes != 0){
       $('#container2')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+poudreAmandes+" g.  "+'</b>'+"Poudre d'amandes"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (sucreGlace != 0){
       $('#container2')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+sucreGlace+" g.  "+'</b>'+"Sucre-glace"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (sucreFin != 0){
       $('#container2')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+sucreFin+" g.  "+'</b>'+"Sucre fin"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (oeufs != 0){
       $('#container2')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+oeufs+" pce.  "+'</b>'+"Oeufs"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (chocolatBlanc != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+chocolatBlanc+" g.  "+'</b>'+"Chocolat blanc"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (cremeEntiere != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+cremeEntiere+" g.  "+'</b>'+"Crème entière 35%"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (citronsVerts != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+citronsVerts+" pce.  "+'</b>'+"Citrons verts"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (feuillesMenthe != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+feuillesMenthe+" pce.  "+'</b>'+"Feuilles de menthe"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (vanille != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+vanille+" pce.  "+'</b>'+"Gousse de vanille"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (tonka != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+tonka+" pce.  "+'</b>'+"Fève de tonka"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (poivre != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+poivre+" g.  "+'</b>'+"Poivre"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (siropPasteque != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+siropPasteque+" g.  "+'</b>'+"Sirop de pastèque"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (feuillesBasilic != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+feuillesBasilic+" pce.  "+'</b>'+"Feuilles de basilic"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (epicesPainDEpices != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+epicesPainDEpices+" sachet  "+'</b>'+"Epices à pain d'épices"+'</small></label></div>')
          .append(`<br>`); 
    }
    if (cannelle != 0){
       $('#container')
          .append('<input type="checkbox" id="car" name="interest" value="car">')
          .append('<label for="car"><small><b>'+cannelle+" pce.  "+'</b>'+"Bâton de cannelle"+'</small></label></div>')
          .append(`<br>`); 
    }
                                
}


