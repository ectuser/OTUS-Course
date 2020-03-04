const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
let counter = 0;
let ready = false;
const delay = 100;

const server = http.createServer((req, res) => {
	// console.log("request");
	if (ready){
		// console.log("go");
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		// res.write(`Hello World ${counter}`);
		res.end(`Hello World ${counter}`);
		counter++;
	}
	else{
		res.statusCode = 404;
		res.end();
	}
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

run();


function run(){
	ready = true;
	setTimeout(() => {
        stop();
	}, delay);
}
function stop(){
	ready = false;
	setTimeout(() => {
		run();
	}, delay);
}