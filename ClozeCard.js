function cloze(text,cloze){
	this.text = text;
	this.cloze = cloze;
	//this.parital = this.text.replace(this.cloze,"......");
}
//export this constructor
module.exports = cloze;
