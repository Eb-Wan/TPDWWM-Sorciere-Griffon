/*
    "Pseudo code"

    witchPosition=0
    griffinPosition=50
    grimoirePosition=51

    nextPlayer = 0 (0=Witch 1=Griffin)
    fight = false;

    GameLoop:
        diceResult = RandomRange(1,6)
        MoveCaracter (diceResult)

        if (fight = true) then
            if (nextPlayer = 0) then PullCard()
            else
                diceResult = RandomRange(1,2):
                if (diceResult = 2) then PullCard()
                else MoveCaracter (-2, 0)
        if (witchPosition >= 50) then Win() else Loose()
        goto GameLoop
        
    MoveCaracter(ammount, player=nextPlayer):
        fight=false
        if (player = 0) then 
            witchPosition += ammount:
            if (witchPostition >= griffinPosition) then fight=true: witchPosition=griffinPosition
        else
            griffinPosition -= ammount:
            if (witchPostition <= griffinPosition) then fight=true: griffinPosition=witchPosition
        return

    PullCard:
        if  (RandomRange(1,2) = 1) then else MoveCaracter (1, 0)
        else MoveCaracter (-3, 1)
        return

    Win():
        print "La sorcière a gagné"
    Loose():
        print "Le griffon a gagné"
*/

let visualizerArrayEmpty = Array(50);   //J'ai ajouté une fonctinalitée pour voir le jeu
let visualizerArray = Array(50);        //Il y deux array, un qui va rester vide pour garder un template, et l'autre pour y mettre la position des personnages
let witchPosition = 0;
let griffinPosition = 50;
let grimoirePosition = 51;
let diceResult;

let nextPlayer = 0;                     //(0=Witch 1=Griffin)
let inFight = false;
let inGame = true;


for (let i = 0; i < 50; i++) {          //Initialisation de l'array (50 cases avec un espace et un dollar à la fin)
    visualizerArrayEmpty[i] = " ";
}
visualizerArrayEmpty.push("$");
visualizerArray = [...visualizerArrayEmpty];        //Copie du template dans l'array principal

while (inGame) {
    diceResult = RandomRange(1,6);
    MoveCaracter (diceResult, nextPlayer);          //Deplacer le personne
    NextCaracter ();                                //Changer de personnage pour le prochain tour

    PrintVisualArray();

    if (inFight == true) {                          //Si le griffon et la sorcière son sur la même case
        console.log ("Le griffon et la sorcière, sont en train de se marraver!");
        if (nextPlayer == 0) {
            PullCard();
            console.log ("La sorcière tire une carte!");
        }
        else {
            console.log ("Le griffon attaque la sorcière!");
            diceResult = RandomRange(1,2);
            if (diceResult == 2) {
                console.log ("La sorcière tire une carte!");
                PullCard();
            }
            else MoveCaracter (-2, 0), console.log ("Putain, il est fort ce con!");
        }
    }
    if (witchPosition >= 51) {
        WinGame();
    } else if (griffinPosition <= 0) {
        LooseGame();
    }
}


function NextCaracter () {
    (nextPlayer === 0) ? nextPlayer = 1 : nextPlayer = 0;
    return;
}

function MoveCaracter(ammount, player) {
    inFight = false;
    if (player == 0) {
        witchPosition += ammount;
        console.log ("La sorcière a avancé de", ammount, "cases.");
        if (witchPosition >= griffinPosition) {inFight = true; witchPosition = griffinPosition;}    //Si la sorcière dépasse le griffon
    } else {
        griffinPosition -= ammount;
        console.log ("Le griffon a avancé de", ammount, "cases.");
        if (witchPosition >= griffinPosition) {inFight = true; griffinPosition = witchPosition;}    //Si le griffon dépasse sorcière
        return;
    }
}

function PullCard () {
    if (RandomRange(1,2) == 1) {MoveCaracter (1, 0); console.log ("La sorcière est passé par dessus le griffon!");}
    else {MoveCaracter (-3, 1); console.log ("La sorcière a tabassé le griffon!");}
    return;
}

function WinGame() {
    inGame = false;
    console.log ("La sorcière a gagné");
}
function LooseGame() {
    inGame = false;
    console.log ("Le griffon a gagné");
}

function RandomRange(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

function PrintVisualArray() {
    if (inFight == true) visualizerArray[witchPosition] = "F";      //Si le griffon et la sorcière son sur la même case afficher F sur la case
    else {
        visualizerArray[witchPosition] = "W";                       //Position de la sorcière dans l'array de visualisation
        visualizerArray[griffinPosition] = "G";                     //Position du griffon dans l'array de visualisation
    }
    console.log (visualizerArray.toString());                       //Afficher l'array en tant que string
    visualizerArray = [...visualizerArrayEmpty];                    //Copie template dans l'array principal
}