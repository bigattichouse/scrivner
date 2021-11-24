/*
Our elements are essentially class/style/content elements. that's it.

LaTeX isn't even a thing at this stage.. just managing the structure of the document.

document, element, image, etc.

Pre/post are also mimicing how environments work in laTex, so we can copy an element, and just change the "elements" property to have the pre/post apply to our data*/
function new(DOM){
   return {
       DOM:DOM, /*the manager that tracks styles and context and junk.*/
       id:null,
       type:"element" /*used to build a DOM path.. so "page table.myclass" table is a DOMtype myclass would be in classes[]*/,
       styles:[],  /*like css styles.. font-weight:bold */
       classes:[], /*like css classes  ...  monster-block */
       pre: null, /*an array of elements rendered before elements*/
       elements: [], /*each command just keeps adding*/
       post: null,/*an array of elements rendered after elements*/
       render:()=>{
         latex.render(this.applyClasses(this.applyStyles(this.pre)));
         latex.render(this.applyClasses(this.applyStyles(this.elements)));
         latex.render(this.applyClasses(this.applyStyles(this.post)));
       },
       begin:()=>{ },
       end:()=>{ },
       write:(data, elementType="text")=>{

       }, /*write elements directly.. not just strings*/
       /*TODO: async:()=>{}, /*uses lambas to write */
       search:(selector)=>{
         return search(this,selector);
       },
       applyStyles:(elements)=>{
           return DOM.applyStyles(this,elements);
       },
       applyClasses:(elements)=>{
           return DOM.applyClasses(this,elements);
       }
   };
}

function search(element,selector){
  /*search element as if it were a DOM   #=an id,  [DOM].[class] or .[class] for classes, psuedo selectors later*/
  var foundElements = [];
  searchStack(element,element.DOM,selector.split(" "),function(found,foundPath){
    foundElements[foundPath]=found;
  });
  return foundElements;
}

function searchStack(element,currentPath, selectorStack,callbackFound){
   //recurse the stack and through child elements (pop / apply) callback any and all that apply.
}
