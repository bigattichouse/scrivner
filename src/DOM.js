/*
Our nodes are essentially class/style/content nodes. that's it.

LaTeX isn't even a thing at this stage.. just managing the structure of the document.
Manager has a render function that will call "latex" .. so we could potentially swap out for another manager

document, node, image, etc.  node is kinda like <div> in html

Pre/post are also mimicing how environments work in laTex, so we can copy an node, and just change the "nodes" property to have the pre/post apply to our data

let's say I create a quote box with header and footer (like environments in latex)

quotebox = new(Manager);
quotebox.write("<hr/>","html","pre")
quotebox.write("<hr/>","html","post");

so later, I create a class called "quotebox"

and I have an node
somequote.class.push ("quotebox");
somequote.write("'Blah blah, said Mike'");

So, when render is called, it applies classes/styles to pre, .. it goes and finds all the PRE content
renders:
1. somequote style PRE
2. somequote classes pre > quotebox style pre
3. somequote style applied to nodes
4. somequote classes nodes > quotebox nodes
5. somequote nodes
then... POST... I guess those have to be in APPLIED reverse order, but individual content of the POST section left in the same order

cool. I think that makes me happy.
*/


function new(Manager){
   var node = {
       Manager:Manager, /*the manager that tracks styles and context and junk.*/
       id:null,
       type:"node" /*used to build a DOM path.. so "page table.myclass" table is a DOMtype myclass would be in classes[]*/,
       styles:[],  /*like css styles.. font-weight:bold */
       classes:[], /*like css classes  ...  monster-block */
       pre: null, /*an array of nodes rendered before nodes*/
       content: [], /*each command just keeps adding*/
       post: null,/*an array of nodes rendered after nodes*/
       render:()=>{
         Manager.render(this.preStyles(this.preClasses(this.pre)));
         Manager.render(this.applyStyles(this.applyClasses(this.content)));
         Manager.render(this.postStyles(this.postClasses(this.post)));
       },
       before:(data, type="text")=>{

       },
       write:(data, type="text")=>{

       },
       after:(data, type="text")=>{

       }, /*write nodes directly.. not just strings*/
       /*TODO: async:()=>{}, /*uses lambas to write */
       search:(selector)=>{
         return search(this,selector);
       },
       applyStyles:(nodes)=>{
           return Manager.applyStyles(this,nodes);
       },
       applyClasses:(nodes)=>{
           return Manager.applyClasses(this,nodes);
       },
       destroy:(){
         Manager.delete(node);
       }
   };
   manager.add(node);
   return node;
}

function search(node,selector){
  /*search node as if it were a DOM   #=an id,  [DOM].[class] or .[class] for classes, psuedo selectors later*/
  var foundNodes = [];
  searchStack(node,node.type,selector.split(" "),function(found,foundPath){
    foundNodes[foundPath]=found;
  });
  return foundNodes;
}

function searchStack(node,currentPath, selectorStack,callbackFound){
   //recurse the stack and through child nodes (pop / apply) callback any and all that apply.
}

/*

So, I'd like to take a JSON object and make a template for it.

doc.write( {monster:{ stats: {  INT:18, WIS:7 },  abilities: [   {'Blah':'explodes for 1d6!'}] }}, templates.monster)

so when we call Manager.render.. we'll end up with all the styles and junk and this {monster:} object... when
we see that, we check for special renderers registered, and call.. if not, we just dump as the "simple command"


*/
