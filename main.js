//get the basic card file
var BasicCard = require("./BasicCard.js");
//get the cloze card file
var ClozeCard = require("./ClozeCard.js");
 //get me inquirer
 var inquirer = require("inquirer");
//===== Declare varilables first ======
// the variable questions where the basic questions will be pulled.
var questions1 = [];
// the variable questions where the cloze questions will be pulled.
var questions2 = [];
var count = 0;
var correctlyAnswerd = 0;

// ===== questions for the basic card
var basic1 = new BasicCard("anything that occupies space and has mass is called?", "matter");
var basic2 = new BasicCard("what is the smallest particle of an element that retains the properties of the element?", "atom"); 
var basic3 = new BasicCard("what subatomic particle have a positive charge and found inside nucleus?", "proton");
var basic4 = new BasicCard("what subatomic particle  have a negative charge and found outside nucleus but surrounds it?", "electron");
var basic5 = new BasicCard("what subatomic particle without a charge and found in nucleus?", "neutron");

//========push this questions
questions1.push(basic1);
questions1.push(basic2);
questions1.push(basic3);
questions1.push(basic4);
questions1.push(basic5);

// ===== questions for parital 
var cloze1 = new ClozeCard("protons are subatomic particles having ... charge?", "postive");
var cloze2 = new ClozeCard("... anything that occupies space and has mass is called?","matter");
var cloze3 = new ClozeCard("the subatomic particle without a charge and found in nucleus is called...?", "neutron");
var cloze4 = new ClozeCard("electron is  subatomic particle  have a ... charge and found outside nucleus but surrounds it?", "negative");
var cloze5 = new ClozeCard("an atom is the smallest particle of an ... that retains the properties of the element?", "element"); 
//========push this questions
questions2.push(cloze1);
questions2.push(cloze2);
questions2.push(cloze3);
questions2.push(cloze4);
questions2.push(cloze5);
//Use prompt to ask the user which quizlet to play
inquirer.prompt([
{
	type: "list",
	name: "choice",
	message: "Do you want to play with basic or cloze flashcards ?",
	choices:["Basic", "Cloze"]
}
])
.then(function(answer){
		//If the users choice is basic show them basic questions.
		if(answer.choice === "Basic"){
			quizlet1();
		}
		// If users answer is cloze 
		else if(answer.choice === "Cloze"){
			quizlet2();
		}
	});
// <========quizlet function for the basic card ======>
function quizlet1() {
//recursion loop to prompt each question individually w/inquirer
if(count < questions1.length) {
	inquirer.prompt([
	{
		name: "question",
		message:questions1[count].front
	}
	]).then(function(answer) {
//if the answer is right increase the correct count and move
if((answer.question).toLowerCase() === questions1[count].back) {
	console.log("correct");
	correctlyAnswerd ++
	count++
	quizlet1();
} 
else {
//if the answer is not right show that it is incorrect and display the right answer
console.log("incorrect");
console.log("correct Answer:  " + questions1[count].back);
count ++
quizlet1();
}

});

}


}
///<======= function to pull the cloze questions =======>
function quizlet2() {
	if(count < questions2.length) {

		inquirer.prompt([
		{
			name: "partial",
			message: questions2[count].text
		}
		]).then(function(answer) {
// if the person get the right answer show tell they got the right answer and increse the count
				if((answer.partial).toLowerCase() === questions2[count].cloze) {
					console.log("correct");
					correctlyAnswerd;
					count ++
					//call the recursion function
					quizlet2();
				} 
				else { 
					console.log("incorrect");
					console.log("correct Answer:  " + questions2[count].cloze);
					count ++
					//call the recursion function
					quizlet2();
				}

			});

	}


}

