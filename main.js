/*/<strong>(.)*</strong>(.*)</
Works to extract salary, location and degrees accepted on gradcracker*/

$(document).ready(function(){
//Having to use .done() to deal with asynchronous $.getJSON call is a bit of a pain. Forces us to use this construct anytime we work with readFromExternalSite.
//If I can package it away so all of this is handled within the function, that'd be a good deal cleaner.
	let gradCrack1 = new Site("https://www.gradcracker.com/search/engineering-graduate-jobs?page=1");
	
	gradCrack1.readFromExternalSite().done(function(returnData) {
		
		let siteContents = returnData.siteContents.contents;
		gradCrack1.setHTML(siteContents);
		gradCrack1.injectToBlankDiv();
		gradCrack1.setExtractRelevantInfo(function() {
			gradcrackerSearch()
		});
		
		gradCrack1.extractRelevantInfo();
	});
});

function gradcrackerSearch() {
	let jobTitles = document.querySelectorAll(".opportunity-title a");
	let companyNames;
	let opportunityArray = [];
	
	for(let i=0;i<jobTitles.length;i++) {
		console.log(new Opportunity({jobTitle: jobTitles[i].innerHTML}));
		opportunityArray.push(new Opportunity({jobTitle: jobTitles[i].innerHTML}));
	}
	
	console.log(jobTitles[0].outerHTML);
	
	return opportunityArray;
}