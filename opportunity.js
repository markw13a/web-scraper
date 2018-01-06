//Defines the Opportunity object: used to store information and methods relating to each job posting.
//Hope is that using a seperate object will help to provide some consistency to our code as we begin to gather data from multiple sources.
function Opportunity(obj) {
	this.extractedInfo = obj;
}

//Will need to interface with the Excel database of companies able to sponsor tier 2 visas that we have access to.
Opportunity.prototype.canSponsorVisa = function() {
	return false;
}

Opportunity.prototype.generateDivContents = function() {
	let div;
	let info = this.extractedInfo;
	
	for (let key in info){
		//add HTML
	}
	
	return div;
}