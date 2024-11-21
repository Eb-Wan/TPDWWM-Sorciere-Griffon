let witchPosition = 0;
let griffinPosition = 50;
const grimoirePosition = 51;
let nextPlayer = 0;                     //(0=Witch 1=Griffin)
let hasFought = false;
let inGame = true;
function MoveCaracter(ammount, player) {
    if (player == 0) {
        witchPosition += ammount;
        console.log ("La sorcière a avancé de", ammount, "cases et est à la case", witchPosition+".");
        if (witchPosition >= griffinPosition && hasFought == false) {
            console.log ("Le griffon et la sorcière, sont en train de se marraver!");
            hasFought = true;
            witchPosition = griffinPosition;
            PullCard();
        }    //Si la sorcière dépasse le griffon
    } else {
        griffinPosition -= ammount;
        console.log ("Le griffon a avancé de", ammount, "cases et est à la case", griffinPosition+".");
        if (witchPosition >= griffinPosition && hasFought==false) {
            console.log ("Le griffon attaque la sorcière!");
            hasFought = true;
            griffinPosition = witchPosition;
            if (RandomRange(1,2) == 2) PullCard();
            else MoveCaracter (-2, 0), console.log ("Put1, il est fort ce con!");
        }    //Si le griffon dépasse sorcière
    }
    console.log("");
}
function PullCard () {
    console.log ("La sorcière tire une carte!");
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
let NextCaracter = () => (nextPlayer === 0) ? nextPlayer = 1 : nextPlayer = 0;
let RandomRange = (min, max) => Math.round((Math.random() * (max - min)) + min);
while (inGame) {
    MoveCaracter (RandomRange(1,6), nextPlayer);          //Deplacer le personne
    NextCaracter ();                                //Changer de personnage pour le prochain tour
    if (witchPosition >= 51) WinGame();
    else if (griffinPosition < 0) LooseGame();
}

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