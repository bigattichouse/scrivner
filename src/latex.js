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
function _lenvEnd(name){
   return latexCommand("end",_lreq(name))
}

function latexSimpleCommand(name,value){
  return {name:name,arguments:_lreq(value)};
}
function _lcmd(name,value){ return  latexSimpleCommand(name,value); }

exports.utf8 = utf8;
exports.escape = latexEscape;
exports.backslash = backslash;
exports.latexCommand = latexCommand;
exports.latextSimpleCommand = latextSimpleCommand;
exports.latexEnvironment = latexEnvironment;
exports.begin = _lenvBegin;
exports.end = _lenvEnd;
exports.renderLatex = render;
