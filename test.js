var http = require('http');
var fs = require('fs');

function send404Response(response) {
	response.writeHead(404, {"Context-Type":"text/plain"});
	response.write("404: Page not found");
	response.end();
}


function onRequest(request, response) {
	if(request.url === '/'){
		response.writeHead(200, {"Content-Type":"text/html"});
		fs.createReadStream("./index.html").pipe(response);
	}
	else if(request.url === '/combinedScript.js'){
		response.writeHead(200, {"Content-Type" : "text/javascript"});
		fs.createReadStream("./combinedScript.js").pipe(response);
	}
	else if(request.url === '/jquery-3.2.1.min.js'){
		response.writeHead(200, {"Content-Type" : "text/javascript"});
		fs.createReadStream("./jquery-3.2.1.min.js").pipe(response);
	}
	else{
		send404Response(response);
	}
}

http.createServer(onRequest).listen(8888);
console.log("server now operational");