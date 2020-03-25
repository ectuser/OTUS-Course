const http = require('http');
const stoppable = require('stoppable')

const hostname = '127.0.0.1';
const port = 3000;
let counter = 0;
const delay = 100;


let server;

function initServer(){
	server = stoppable(http.createServer((req, res) => {
		// console.log("go");
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		// res.write(`Hello World ${counter}`);
		res.end(`Hello World ${counter}`);
		counter++;
	}).listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	}));
}
initServer();
run();

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });



function run(){
	// console.log("run");
	server.stop()
	setTimeout(() => {
		try {
			stop();
		} catch (error) {
		}
	}, delay);
}
function stop(){
	// console.log("stop")
	initServer();
	setTimeout(() => {
		run();
	}, delay);
}