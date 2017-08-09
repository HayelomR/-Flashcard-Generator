//get the basic card file
var BasicCard = require("./BasicCard.js");
//require fs to read and write files
var fs = require("fs");
//get the cloze card file
var ClozeCard = require("./ClozeCard.js");
 //get me inquirer
var inquirer = require("inquirer");
//===== Declare varilables first ======
// the question1 pulls questions for the basic card.
var questions1 = [];
// the question2 variable pulls questions for the cloze card.
var questions2 = [];
var count = 0;
var rightAnswer = 0;
var wrongAnswer = 0;

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
inquirer.prompt([ {
	type: "list",
	name: "choice",
	message: "Do you want to play with basic or cloze flashcards?",
	choices:["Basic", "Cloze"]
} ]).then(function(answer){
		//If the users choice is basic show them basic questions.
		if(answer.choice === "Basic"){
			console.log("\n================================\n");
			quizlet1();
		}
		// If users answer is cloze if(answer.choice === "Cloze")
		else {
			console.log("\n================================\n");
			log("\n============================================");
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
	log("\ncorrect");
	rightAnswer++
	count++
	result();
	quizlet1();	
	log("\n============================================");
} 
else {
//if the answer is not right show that it is incorrect and display the right answer
console.log("incorrect");
log("\nincorrect");
console.log("correct Answer:  " + questions1[count].back);
log("\ncorrect Answer:  " + questions1[count].back);
count ++
wrongAnswer++
result();
quizlet1();
log("\n============================================");
}

});

}


}
log("\n---------------result--------------");
///<======= quizlet for the cloze cards =======>
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
	log("\ncorrect");
	count ++
	rightAnswer++;
	result();
	//call the recursion function
	quizlet2();
	log("\n============================================");
}

else { 
	console.log("incorrect");
	log("\nincorrect");
	console.log("correct Answer:  " + questions2[count].cloze);
	log("\ncorrect Answer:  " + questions2[count].cloze);
	count ++;
	wrongAnswer++;
	result();
	log("\n============================================");
					//call the recursion function
					quizlet2();
				}

			});

	}


}

//this function was suppose to tell how much the user got scored
function result(){
	if(count >= 5) {
		console.log("\nHere is your result: " + "\nCorrectly Answered = " + 
			rightAnswer + "\nWrong Answer = " + wrongAnswer);
					//call the recursion function

				}
			}
			result();
// function study(){
// 	if(rightAnswer >= 4){
// 		console.log("excellent")
// 	} else{
// 		console.log("please study hard for your next exam.")
// 	}
// }
// study();
// collect the data and append it to log.txt
function log(data) {
	fs.appendFile("log.txt", data, function(error) {
		if (error) {
			console.log(error);
		}

	});
}

