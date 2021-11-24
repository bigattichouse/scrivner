/*
Scrivner.js - a single file way to generate latex from nodejs
c. 2021 bigattichouse

This will be the workhorse module to actually render the doc when all is said and done.

I think I want a json-like doc "jtex" or something something more like javascript object notation
not JSON, but actual objects, since JSON has a lot of overhead.

so you actually create a js file that builds the document. in a way, that's what I'm doing here.

so to use from php, output the JS, have it require this, then it renders when you exec node

Honestly, I'd like to see something like the DOM and page elements with a more programmatic class structure
sort blend latex class/package with trad class inheritence and DOM "decoration"

*/

const utf8 = "utf8";
const latexEscape = "\\";
const backslash = "\\";


function is_string(str){
  return (typeof str === 'string');
}
function is_array(arr){
  return Array.isArray(arr);
}
function is_object(o){
  return (typeof o === 'object') && (!Array.isArray(o));
}


function renderLatex(latexObject, debug=false){
 if(debug){
  console.log(">");
  console.log(typeof latexObject); console.log(latexObject);
  console.log("<");
}
  if(!latexObject) return "";
  if(is_string(latexObject)){
      return ""+latexObject;
  }
  if(is_array(latexObject)){
    children = "";
    latexObject.forEach((child, i) => {
     children += renderLatex(child,debug);
   });
    return children;
  }
  if(is_object(latexObject)){
   if(latexObject.render){
       return latexObject.render(debug);
    } else {
      if(Object.keys(latexObject).length==1){
          var key = Object.keys(latexObject)[0];
          return latexEscape +  key + renderLatex(latexRequired(latexObject[key],debug));
      } else {
        return latexEscape + latexObject.name +  renderLatex(latexObject.arguments,debug);
     }
   }
  }
}


function latexArguments(elements, argumentType="REQUIRED",render){
  if(["REQUIRED","OPTIONAL"].indexOf(argumentType.toUpperCase())==-1){ throw 'argumentType '+argumentType+' not recognized'; }
   return {
       argumentType: argumentType.toUpperCase(),  //or optional
       elements:elements,
       render:render
   };
}

function latexRequired(elements=[]){
  if(is_string(elements)) elements = [elements];
   return latexArguments(elements,"REQUIRED",(debug)=>{
        return "{" + renderLatex(elements,debug) + "}";
    });
}

function latexOptional(elements=[]){
  if(is_string(elements)) elements = [elements];
   return latexArguments(elements,"OPTIONAL",(debug)=>{
        return "[" + renderLatex(elements,debug) + "]";
    });
}

function _lreq(elements=[]){ return latexRequired(elements); }
function _lopt(elements=[]){ return latexOptional(elements); }

/*
Command:  (https://latexref.xyz/LaTeX-command-syntax.html)
1. backslash
2. case sensitive name (string of letters or single non letter)
3. 0,1, or more arguments
4. Required are in {}, optional in [] (generally/stylistically optional comes first)
5. to use ] in optional, use {]} - also if text starts with [, then use {[}
6. \command*  related form
*/
function latexCommand(name, arguments=[]){
   return {
        name:name,
        arguments:arguments, /*arguments for a command include all the children*/
   };
}


function latexEnvironment(name, arguments=[], children=null){
    if(!is_array(arguments))
        arguments=[_lreq(name),arguments]
     else arguments.unshift(_lreq(name));
  return [
    latexCommand("begin",arguments),
    children,
    latexCommand("end",_lreq(name))
  ];
}
function _lenv(name,arguments=[],children=null){
  return latexEnvironment(name, arguments, children);
}
function _lenvBegin(name,arguments=[]){
  return latexCommand("begin",arguments);
}
function _envEnd(name){
   return latexCommand("end",_lreq(name))
}

function latexSimpleCommand(name,value){
  return {name:name,arguments:_lreq(value)};
}
function _lcmd(name,value){ return  latexSimpleCommand(name,value); }


//so the idea is that you can keep pushing the commands onto a stack, even if you're async, just hand the stack through...
//then render the stack.

//console.log(renderLatex({author:"Michael E. Johnson"})); //simple objects can render as \author:{Michael E. Johnson}
//console.log(renderLatex({begin:"document"})); //simple objects can render as \author:{Michael E. Johnson}
//console.log(renderLatex(latexEnvironment("document","test")));
//console.log(renderLatex(latexCommand("documentclass",[_lopt("12pt, letterpaper"),_lreq("book")])));
//console.log(renderLatex(latexCommand("usepackage",[ _lopt("utf8"),_lreq("inputenc")])));
