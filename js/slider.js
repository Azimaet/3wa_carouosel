'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

// déclarer 8 variables pour les éléments du DOM qui nous intéressent
// (ceux sur lesquels on met des écouteurs, ceux dont on modifie les propriétés)
var btLienBarreDoutil;
var etatNav;
var btPrevious;
var btPlay;
var intervalId;
var btNext;
var btRandom;
var onKeyDown;
var photosCarousel;
var texteFigCaption;
/*var fonduImage;*/

// déclarer tous les contenus possibles des diapos
// (sous forme de tableau, dont chaque valeur est elle-même un Object contenant une propriété source et une propriété legende)

var tableauDesDiapos = [
    {
        source : "images/1.jpg",
        alt : "Asteetinaustralia",
        titre : "A street in Australia",
    },
    {
        source : "images/2.jpg",
        alt : "Bridge",
        titre : "Bridge on the Lake",
    },
    {
        source : "images/3.jpg",
        alt : "Colorful Building",
        titre : "Colorful Building",
    },
    {
        source : "images/4.jpg",
        alt : "Manhattan",
        titre : "View of Manhattan",
    },
    {
        source : "images/5.jpg",
        alt : "San Francisco",
        titre : "San Francisco downtown",
    },
    {
        source : "images/6.jpg",
        alt : "Paris",
        titre : "La tour Eiffel",
    }
];

// déclarer une variable contenant l'index de la diapo qu'on est en train d'afficher
var indexDuTableau =3;


/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/


// 5 fonctions à développer correspondant au clic des 5 boutons
/*
Par ordre de difficulté :
	 - montrer/cacher la barre d'outils */
     function onClick()
     {
         console.log("Bravo le lien Barre d'outil déroulable fonctionne");
         etatNav.classList.toggle("hidden");
     }

    //- aller à la diapo précédente ( /!\ quand on arrive à la dernière diapo on veut retourner à la première )
    function clickPrevious()
    {
        indexDuTableau--;
        if(indexDuTableau < 0)
        {
            indexDuTableau = tableauDesDiapos.length-1;
        }
            /*fonduImage.classList.toggle("fondu");
            fonduImage.classList.remove("fondu");
            console.log(fonduImage);*/

            majCarousel();
            console.log(indexDuTableau);
    }
    //- aller à la diapo suivante ( /!\ quand on arrive à la dernière diapo on veut retourner à la première )
    function clickNext()
    {
        indexDuTableau++;
        if(indexDuTableau > tableauDesDiapos.length-1)
        {
            indexDuTableau = 0;
        }
        majCarousel();
        console.log(indexDuTableau);
    }
    //- afficher une diapo aléatoire
    function clickRandom()
    {
        // garder en mémoire la veleur de l'index diapo au moment ou on arrive dans la fonction
        var memoireIndexDuTableau = indexDuTableau;
        do {
            indexDuTableau = getRandomInteger(0, indexDuTableau.length -1);
        }
        while ( indexDuTableau == memoireIndexDuTableau);

        console.log(indexDuTableau);
        majCarousel();
    }
    //- mode défilement automatique
    function togglePlay()
    {
        var switchButton = document.querySelector("#slider-toggle i")

        if (intervalId == null)
        {
            console.log(indexDuTableau);
            intervalId = window.setInterval(clickNext, 2000 );
        }
        else {
            clearInterval(intervalId);
            intervalId = null;
        }
        switchButton.classList.toggle("fa-pause");
        switchButton.classList.toggle("fa-play");


    }

    // + 1 fonction de mise à jour de l'affichage (remplit le figcaption, les attributs src et alt en se basant sur l'index de la diapo courante)
    function majCarousel()
    {
        texteFigCaption.innerHTML = tableauDesDiapos[indexDuTableau].titre;
        photosCarousel.src = tableauDesDiapos[indexDuTableau].source;

    }


/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/



document;addEventListener("DOMContentLoaded", function() {

    // un petit consolelog pour vérifier que le DOM est bien chargé
    console.log("le DOM vient d'être chargé");
    // fonduImage = document.querySelector("img");
    // initialiser les 8 variables représentant les éléments du DOM

    //1 et 2 - on vise le lien Barre d'outil et le ul (action afficher/hide le menu 4bt )
    btLienBarreDoutil = document.querySelector("a");
    etatNav = document.querySelector("#toolbar-toggle");
    //3 et 4 - on cible les petits boutons previous et next
    btPrevious = document.querySelector("#slider-previous");
    btNext = document.querySelector("#slider-next");
    //5 - on cible le bouton random
    btRandom = document.querySelector("#slider-random");
    //6 - on cible le bouton play
    btPlay = document.querySelector("#slider-toggle");

    //7 - On vise le texte figcaption pour changer le texte
    texteFigCaption = document.querySelector("figcaption");
    //8 - On vise la source img pour changer les images
    photosCarousel = document.querySelector("img");

    // mettre en place des écouteurs sur les 5 éléments nécessaires
    btLienBarreDoutil.addEventListener("click", onClick);
    btPrevious.addEventListener("click", clickPrevious);
    btNext.addEventListener("click", clickNext);
    btRandom.addEventListener("click", clickRandom);
    btPlay.addEventListener("click", togglePlay);

	// mise à jour de l'affichage, on appelle la fonction majCarousel (ici elle sert juste une premiere fois au début, à chaque changement, on la rappelle plutôt dans les fonctions)

    majCarousel();


});
