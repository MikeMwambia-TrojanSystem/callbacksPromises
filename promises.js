//Promises are Javascript Objects
let promise = new Promise(function(resolve,reject){
    //executor (the producing code)
})

/*
The function passed to new promise is called executor
It runs automatically

It's arguments resolve and reject are callback provided by the language
If promise is finished and t has results it should call any of the  callback arguments
resolve(value) --- if the job is finished successfully,with result value
reject(error) --- if an error has occured, error is the error object

So to summarize: the executor runs automatically and attempts to perform a job. 
When it is finished with the attempt, it calls resolve if it was successful or reject if there was an error.

The promise object returned by the new Promise constructor has these internal properties:

state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
result — initially undefined, then changes to value when resolve(value) called or error when reject(error) is called.

*/

let promise = new Promise(function(resolve,reject){
    //After 1 sec signal the job is finished with an error
    setTimeout(()=>reject(new Error("whoops")),1000);
});

/*
To summarize, the executor should perform a job (usually something that takes time) and then call resolve or reject to 
change the state of the corresponding promise object.
A promise that is either resolved or rejected is called “settled”, as opposed to an initially “pending” promise.

A Promise object serves as a link between the executor (the “producing code” or “singer”) and the consuming functions (the “fans”), 
which will receive the result or error. 
Consuming functions can be registered (subscribed) using methods .then, .catch and .finally.
*/

promise.then(
    function(result){/*handle a successful result*/},
    function(error){/*handle an error*/}
)

/*
The first argument of .then is a function that runs when the promise is resolved, and receives the result.

The second argument of .then is a function that runs when the promise is rejected, and receives the error.
*/


let promise = new Promise(function(resolve,reject){
    setTimeout(()=>resolve("done!"),1000);
});

//resolves runs the first function in .then
promise.then(
    result=>alert(result),//shows "done!" after 1 second
    error=>alert(error)//doesn't run
)

/*
The first function was executed.
And in the case of a rejection,the second one
*/

let promise = new Promise(function(resolve,reject){
    setTimeout(()=>reject(new Error("Whoops")),1000);
})

//reject runs the second function in .then
promise.then(
    result => alert(result), //doesn't run
    error =>alert(error) //shows "Error : Whoops!" after 1 second
)

/*
catch
If we're interested in error we can use null as the first argument .then(null,errorHandlingFunction)
Or we can use .catch(errorHandlingFunction) which is exactly the same
*/
let promise = new Promise(function(resolve,reject){
    setTimeout(()=>reject(new Error("whoops")),1000);
});

promise.then(null,f)//Same as .catch where f is the error handling function
promise.catch(alert);//This handles the error

/*
finally

The call .finally(f) is similar to .then(f,f) in the sense that f always runs when the promise is settled
:be it resolved or rejected
finally handles the clean up since it executes regardless of outcome
like this:
*/

new Promise((resolve,reject)=>{
    /*do something that takes time , and then call resolve/reject */
})

//run when the promise is settled doesn't matter succesful or not
.finally(()=>'stop loading indicator')
//so the loading indicator is always stoppoed before we process the result
.then(result=>'Handle result',err=>'Handle error');

/*
NB: - 

A finally handler has no arguments.In finally we don’t know whether the promise is successful or not. 
That’s all right, as our task is usually to perform “general” finalizing procedures.

A finally handler passes through results and errors to the next handler.

See examples below
*/

new Promise((resolve,reject)=>{
    setTimeout(()=>resolve('I am executor function'),1000);
})
//NB:- Finally takes no arguments and does not process result
.finally(()=>{
    alert('Will execute regardles of promise result')
})
then((result)=>{
    console.log('This will be the result of the promise'+result);
})

//In above example finally pases the result to .then for processing
//In below code the error in the promise , passed through finally to catch

new Promise((resolve,reject)=>{
    setTimeout(()=>reject(new Error("Error to go to catch")),2000)
})

.finally(()=>console.log('Will execute no matter what'))

.catch(err=>alert(err)); //.catch handles the error object

//That’s very convenient, because finally is not meant to process a promise result. So it passes it through.
//Load script example rewrite

function loadScript(src){
    return new Promise((resolve,reject)=>{
        let script = document.createElement('script');
        script.src = src;

        script.onload = ()=> resolve(script);

        script.onerror = () => reject(new Error('Error loading script'));

        document.head.append(script);

    });
}

//Usage 

loadScript('my/script.js').then(
    script => alert(`${script.src} is loaded !`),
    error => alert(`Error: ${error.message}`)
)

.then((script)=>console.log('This is a 2nd handler'))

.then((script)=>console.log('Third handler'))

.catch((err)=>console.log('This will execute incase promise resolve with a reject'))

//We can call .then on a Promise as many times as we want. 
