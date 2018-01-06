function Site(siteURL){
//Doesn't seem to be any explicit way of declaring a private field in JS. Heard that setting values to vars rather than using this. has the same effect.
	var url = siteURL;
	var html;
	var lastUpdate;
	var localCopyExists;

	this.getURL = function(){
		return siteURL;
	};
	this.getHTML = function(){
		return html;
	};
	this.getLastUpdate = function(){
		return lastUpdate;
	};
	this.getLocalCopyExists = function(){
		return localCopyExists;
	};
	
	this.setHTML = function(contents){
		html = contents;
	};
	this.setLastUpdate = function(date){
		lastUpdate = date;
	};
	this.setLocalCopyExists = function(bool){
		localCopyExists = bool;
	};
}

//Unsure of security implications of having client-side code reading and writing files to server. Will come back to this later. As readFromLocalFile() should give the same outputs as readFromExternalSite() anyway, it shouldn't matter if readFromLocalFile() is not yet implemented.

/* Site.prototype.writeToLocalFile = function() {

} */

/* Site.prototype.readFromLocalFile = function() {
	let domainName = getHostName(this.getURL());
	let siteContents = $.Deferred();

	$.getJSON(domainName + ".html").done(function(data) {
		siteContents.resolve({
			siteContents: data
		});
	});
	
	return siteContents;
} */

Site.prototype.readFromExternalSite = function() {
//Encountered issue with CORS blocking http request to external sites.
//Looked into changing request headers and using something called "Google Puppeter", which would trick the site into thinking that the request was coming from the browser.
//Decided in the end that using a proxy to make the request was a much simpler solution -- requires almost no code changes.
	let url = this.getURL();
	let siteContents = $.Deferred();
	
 	$.getJSON('http://allorigins.me/get?url=' + encodeURIComponent(url) + '&callback=?').done(function(data) {
		siteContents.resolve({
			siteContents: data
		});
	}); 

	return siteContents;
};


/*Post the extracted HTML to an invisible div -- gives us access to DOM functions. Had originally planned to simply use regex to obtain any information needed from a given site's HTML, but that is proving extremely cumbersome to work with. Worried that this method will be slower, but it should be a lot more robust.*/
Site.prototype.injectToBlankDiv = function() {
	/*removeLinkAndScriptTags() was originally seperate to avoid adding a dependency, but I felt that the security implications were serious enough that automatically stripping the script tags should be done before any code is injected into our site.*/
	this.removeLinkAndScriptTags();
	let siteContents = this.getHTML();
	let body = document.querySelector("body");
	
	console.log(siteContents);
	let hiddenDiv = document.createElement("p");
	hiddenDiv.setAttribute("style", "display: none");
	hiddenDiv.setAttribute("id", "hiddenDiv");//Make it easier to find and delete later
	hiddenDiv.innerHTML = siteContents;
	
	body.appendChild(hiddenDiv);
}

//Need to remove any script tags for security reasons
Site.prototype.removeLinkAndScriptTags = function() {
	let html = this.getHTML();
	
	let scriptRe = /<script[\s\S]*?>[\s\S]*?<\/script>/g;
	let linkRe = /<link[\s\S]*?>/g;
	let inlineScriptRe = /script="[\s\S]*?"/g;
	
	html = html.replace(scriptRe,"");
	html = html.replace(linkRe,"");
	html = html.replace(inlineScriptRe,"");
	
	this.setHTML(html);
}
//Intended to be used with Opportunity class. Information for each job will be extracted and stored in its own Opportunity object. 
Site.prototype.extractRelevantInfo;

Site.prototype.setExtractRelevantInfo = function(filterFunction) {
	this.extractRelevantInfo = filterFunction;
}

function getHostName(url){
	let urlPattern = /\.([a-z]*)(?=\.)/;
	let domainPattern = urlPattern.exec(url);

	return domainPattern[1];
}