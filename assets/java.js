
var maGrille = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var compteur = [0,0,0,0,0,0,0,0,0,0];
var nb_clics = 0;
var carte = [0,0];
var case1 = "";
var case2 = "";
var okplay = true;
var win = 0;
var mode = 0;

function generation(){
  for (let x = 0; x < 4; x++){
    for (let y = 0; y < 5; y++){
      let nb = Math.floor(Math.random()*10)+1;
      while (compteur[nb-1]==2) {
        nb = Math.floor(Math.random()*10)+1;
      }
      console.log(compteur[nb], nb);

      maGrille[x][y] = nb;
      compteur[nb-1]++;
    }
  }
  console.log(compteur);
}

function easy(){
  alert("t'as tous les clics du monde, gl");
  nb_clics=0;
  document.getElementById("nbclics").innerHTML=nb_clics;
  reset();
  mode=1;
}

function medium(){
  alert("t'as 45 clics pour finir, gl");
  nb_clics=0;
  document.getElementById("nbclics").innerHTML=nb_clics;
  reset();
  mode=2;
}

function hard(){
  alert("t'as 30 clics pour finir, gl");
  nb_clics=0;
  document.getElementById("nbclics").innerHTML=nb_clics;
  reset();
  mode=3;
}

function reset(){
  maGrille = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  compteur = [0,0,0,0,0,0,0,0,0,0];
  for (let x = 0; x < 4; x++){
    for (let y = 0; y < 5; y++){
      let nb = Math.floor(Math.random()*10)+1;
      while (compteur[nb-1]==2) {
        nb = Math.floor(Math.random()*10)+1;
      }
      maGrille[x][y] = nb;
      compteur[nb-1]++;
    }
  }
  for (k=0;k<20;k++){
    document.getElementsByTagName("img")[k].src="assets/img/fond-modified.png";
  }
}

function retourner(elementImg) {
  console.log(elementImg);
  if (mode==0){
    alert("Veuillez choisir un mode de jeu");
  }else{
    document.getElementById("tableau").style['pointer-events'] = 'none';

    if (okplay){
      ligne=elementImg.alt.split("-")[0] -1;
      col=elementImg.alt.split("-")[1] -1;
      elementImg.src="assets/img/carte"+maGrille[ligne][col]+".png";

      if (carte[0] == 0){
        carte[0]=maGrille[ligne][col];
        case1=elementImg;
        case1.removeAttribute("onclick");
      }else{
        carte[1]=maGrille[ligne][col];
        case2=elementImg;
        case2.removeAttribute("onclick");
      }
      nb_clics ++;
    }
    document.getElementById("nbclics").innerHTML=nb_clics;
    if (carte[0]!=0 && carte[1]!=0){
      okplay=false;
      tour2jeu();
    }

    if (carte[0]!=0 && carte[1]==0){
      setTimeout(function(){
        document.getElementById("tableau").style['pointer-events'] = 'all';
      },0);
    }else{
      setTimeout(function(){
        document.getElementById("tableau").style['pointer-events'] = 'all';
      },700);
    }
    console.log(win);

    //affichage win ou loose selon le mode de jeu

    if (win==10 && mode==1){
      document.getElementById("sous-tableau").remove();
      document.getElementById("menu").remove();
      document.getElementById("tableau").style.height="90vh";
      document.getElementById("Statut").innerHTML="t'as gagné mais t'es nul c'est le niveau facile";
    }else if (win==10 && mode==2 && nb_clics<=45){
      document.getElementById("menu").remove();
      document.getElementById("sous-tableau").remove();
      document.getElementById("tableau").style.height="100vh";
      document.getElementById("Statut").innerHTML="t'es ok tier, peux mieux faire";
    }else if (win ==10 && mode==3 && nb_clics<=30){
      document.getElementById("menu").remove();
      document.getElementById("sous-tableau").remove();
      document.getElementById("tableau").style.height="100vh";
      document.getElementById("Statut").innerHTML="T'es le goat de cette génération, gg";
    }

    if (win!=10 && mode==2 && nb_clics>=45){
      document.getElementById("menu").remove();
      document.getElementById("sous-tableau").remove();
      document.getElementById("tableau").style.height="30vh";
      document.getElementById("Statut").innerHTML="looser";
    }
    if (win!=10 && mode==3 && nb_clics>=30){
      document.getElementById("menu").remove();
      document.getElementById("sous-tableau").remove();
      document.getElementById("tableau").style.height="30vh";
      document.getElementById("Statut").innerHTML="looser";
    }

  }
}


function tour2jeu (){
  if (carte[0]==carte[1]){
    win++;
    setTimeout(function(){
      case1.src="assets/img/fond.png";
      case2.src="assets/img/fond.png";
    },700);
  }else{
    setTimeout(function(){
      case1.src="assets/img/fond-modified.png";
      case2.src="assets/img/fond-modified.png";
      case1.setAttribute("onclick","retourner(this);");
      case2.setAttribute("onclick","retourner(this);");

    },700);
  }

  carte[0]=0;
  carte[1]=0;
  okplay=true;

}
