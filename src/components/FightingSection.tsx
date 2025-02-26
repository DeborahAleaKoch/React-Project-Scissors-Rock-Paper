import { useState } from "react";
import RestartButton from "./RestartButton";
import ChoseButton from "./ChoseButton";

type OptionType = "Schere" | "Stein" | "Papier";
//Funktion, die eine zufällige Auswahl für den Computer berechnet
function computerChose(): OptionType {
	const randomNumber = Math.round(Math.random() * 2);
	// console.log(randomNumber);

	switch (randomNumber) {
		case 0:
			return "Schere";
		case 1:
			return "Stein";
		case 2:
			return "Papier";
		default:
			throw new Error("hier ist was schief gelaufen. ");
	}
}

//Berechnung des Ergebnisses zwischen Spieler:in und Computer, sowie deren Ausgabe Text.
function calculateResult(
	ownSelection: OptionType | undefined,
	computerSelection: OptionType | undefined
): string {
	//funktion bekommt selection und computerSelection
	//if-Abfrage
	//Rückgabe soll ein string sein
	if (ownSelection === undefined || computerSelection === undefined) {
		return "....";
	}
	if (
		(ownSelection === "Schere" && computerSelection === "Papier") ||
		(ownSelection === "Stein" && computerSelection === "Schere") ||
		(ownSelection === "Papier" && computerSelection === "Stein")
	) {
		return "Du hast gewonnen! 🎉";
	} else if (ownSelection === computerSelection) {
		return "Unentschieden";
	} else {
		return "Du hast verloren! 😵";
	}
}

//hier wird die prozentuale Verteilung der vom Computer gewählten 'Waffe' berechnet und ins Console.log() geschrieben.
function testComputerChose(testRounds: number) {
	const resultArray = [];
	for (let i = 0; i < testRounds; i++) {
		resultArray.push(computerChose());
	}
	const scheres = resultArray.filter((entry) => entry === "Schere").length;
	const steins = resultArray.filter((entry) => entry === "Stein").length;
	const papiers = resultArray.filter((entry) => entry === "Papier").length;

	console.log("Schere:", (scheres / testRounds) * 100 + "%");
	console.log("Stein", (steins / testRounds) * 100 + "%");
	console.log("Papier", (papiers / testRounds) * 100 + "%");
}

//Funktion die die gesamte Spiellogik beinhaltet.
const FightingSection = () => {
	//Hooks immer an den Anfang einer Komponente
	//Hooks dürfen/müssen immer gleich oft angezeigt werden in einer Komponente
	const [selection, setSelection] = useState<OptionType>();
	const [computerSelection, setComputerSelection] = useState<OptionType>();

	function handleSelection(chosenOption: OptionType) {
		//auswahl soll angezeigt werden im 1.p-Tag
		//ergebnis soll agezeigt werden -> die nachfolgenden Funktionen werden sehr schnell durchlaufen, sodass das Ergebnis Zeitgleich angezeigt wird.
		setSelection(chosenOption);
		//Aufrufen der Testfunktion (Bonus) mit einem Schleifen durchlauf in den Parametern
		testComputerChose(1000);

		//Computer soll was auswählen
		setComputerSelection(computerChose());
	}

	//Funktion um das Spiel neu zu starten, dabei werden die schon oben definierten useState auf undefined gesetzt. Also alles zum Ursprung zurück.
	function resetGame() {
		setSelection(undefined);
		setComputerSelection(undefined);
	}
	//Ausgabe im DOM, durch aufrufen und einsetzten der Funktionen und Parametern.
	//Der RestartButton wird in einer separatern Komponente geschrieben. Hier werden die Props weitergegeben.
	return (
		<section className='m-3 text-xl'>
			<p>Deine Wahl: {selection}</p>
			<p className='py-4'>Die Computer Wahl: {computerSelection}</p>
			<p className='mb-12'>
				Ergebnis: {calculateResult(selection, computerSelection)}
			</p>
			<div className='text-8xl flex gap-16 justify-center my-28'>
				<ChoseButton
					handleSelection={() => handleSelection("Schere")}
					buttonContent={"✂️"}
				/>
				<ChoseButton
					handleSelection={() => handleSelection("Stein")}
					buttonContent={"🪨"}
				/>

				<ChoseButton
					handleSelection={() => handleSelection("Papier")}
					buttonContent={"📄"}
				/>
				{/* <button onClick={() => handleSelection("Schere")} className=''>
					✂️
				</button>
				<button onClick={() => handleSelection("Stein")}>🪨</button> */}

				{/* <button onClick={() => handleSelection("Papier")}>📄</button> */}
			</div>

			<RestartButton resetGame={resetGame} />
		</section>
	);
};

export default FightingSection;
