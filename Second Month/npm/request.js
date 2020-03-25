const request = require('request');
// const http = require('http');
const parallelRequest = require('parallel-http-request');

let N = 0;
let reqType = "";

const reqTypes = ["sequential", "parallel"]

async function read() {
    process.argv.forEach(function (val, index, array) {
        if (index === 2){
            N = val;
        }    
        else if (index === 3){
            reqType = val;
        }
    });
    // N = 10;
    // reqType = "sequential";
}
async function main(){
    await read();
    let i = { counter : 0 };
    if (reqType === "sequential"){
        // console.log(i);
        await sequential(i);
        
    }
    else if (reqType === "parallel"){
        await parallel();
    }
    else{
        console.log("Can't read request type");
        return;
    }
}

async function sequential(i){
    if (i.counter >= N)
        return;
    await getRequest();
    i.counter++;
    return await sequential(i);
}

async function parallel(){
    let config = {
        response: "simple"
    };
    let request = new parallelRequest(config);
    await collectRequests(request);
    request.send((response) => {
        for (res of response){
            if (res.status === 200)
                console.log(res.body);
            else
                console.log("error");
        }
    })
}

async function collectRequests(request){
    for (let i = 0; i < N; i++){
        request.add('http://127.0.0.1:3000');
    }
}

async function getRequest(){
    request('http://127.0.0.1:3000', function (error, response, body) {
        // console.log(response.statusCode);
        if (error || response.statusCode !== 200)
            console.log("error");
        else{
            console.log(body);
        }
    })
}



main();
