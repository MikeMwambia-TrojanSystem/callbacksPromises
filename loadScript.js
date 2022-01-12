//This example demostrates callback in JS
function loadScript(src){
   // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

//You can use the above function like
loadScript('/my/script/js');

//The script is excecuted "asynchronously",as it starts loading now but runs later
// the code below loadScript
// doesn't wait for the script loading to finish
// ...
/*
In the above example when the script loads you do not have a way of knowing it has completed 
loading so you start using the function.
To solve this dillema you use a callback function.
*/
function loadScript(src,callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = ()=>{
        callback(script);//THe callback to know when the script has completed loading
    }

    document.head.append(script);
}

//To consume the above script you use
loadScript('my/script.js',function(){
    //the callback runs after the script is loaded
    newFunction();//so now it works
})

//The above callback approach lacks the aspect of getting an error when it occurs
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    //This is implementing the error first approach in callback where 
    //if the error occurs call the callback with the error object as first argument else null
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
}

//To consume the above you use
loadScript('my/script.js',(error,script)=>{
    if(error){
        //handle error
    }else{
        //script loaded successfully
    }
});


//How can we load 2 scrips sequentially : the first one the second one after it ?
//Pyramid of doom

loadScript('1.js', function(error, script) {

    if (error) {
      handleError(error);
    } else {
      // ...
      loadScript('2.js', function(error, script) {
        if (error) {
          handleError(error);
        } else {
          // ...
          loadScript('3.js', function(error, script) {
            if (error) {
              handleError(error);
            } else {
              // ...continue after all scripts are loaded (*)
            }
          });
  
        }
      });
    }
  });