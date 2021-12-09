/*
Our nodes are essentially class/style/content nodes. that's it.

LaTeX isn't even a thing at this stage.. just managing the structure of the document.
Manager has a render function that will call "latex" .. so we could potentially swap out for another manager

document, node, image, etc.  node is kinda like <div> in html

before/after are also mimicing how environments work in laTex, so we can copy an node, and just change the "nodes" property to have the before/after apply to our data

let's say I create a quote box with header and footer (like environments in latex)

So, for HTML equivalency:

boldText = Manager.class("bold-text");
boldText.before("<b>");
boldText.after("</b>");

someText = Manager.node();
someText.classes.push("bold-text"); <-- note the classname
or
someText = Manager.node({class:"bold-text"});

someText.write("Here's some text that's bolded");

when it renders, we get the <b>, then someText.text .. then </b>

Instead of having "styles" applied last like css has, you just add a class to the list

So, if we want to do styles, we just  create a #[id] class and style.

Render "before" from all objects in .classes[];
Render content from classes
Render content from self
Do "after" in reverse order as above

Classes are held by the DOM Manager, so we add them there and then just add the
class names that map to the DOM's class lists.

So the "skin" of style can be changed with a different DOM.

cool. I think that makes me happy.
*/

function node(Manager){
   var node = {
       Manager:Manager, /*the manager that tracks styles and context and junk.*/
       _id:
       id:null,
       type:"node" /*used to build a DOM path.. so "page table.myclass" table is a DOMtype myclass would be in classes[]*/,
       classes:[], /*like css classes  ...  monster-block */
       _before: null, /*an array of nodes rendered before nodes*/
       content: [], /*each command just keeps adding*/
       _after: null,/*an array of nodes rendered after nodes*/
       onRender:null,
       render:()=>{
         return [].concat(
            this.Manager.render(this.Manager.beforeClasses(this)), /*reads before and applies*/
            this.Manager.render(this.Manager.applyClasses(this)), /*processes all classes "body" segments then content, and on render*/
            this.Manager.render(this.Manager.afterClasses(this)) /*reads after and applies*/
          );
       },
       before:(data)=>{
         if(data){
           this._before.push(data); //push to end
         }
         return this._before;
       },
       write:(data)=>{
         if(data) this.content.push(data);
         return this.content;
       },
       add:(class=null,renderCallback=null)=>{
         data = node(Manager);
         if(class) data.class.concat(class);
         data.onRender = renderCallback;
         this.content.push(data);
         return data;
       },
       after:(data)=>{
         if(data){
           this._after.unshift(data); //push to top; so we process in order.
         }
         return this._after;
       },
       destroy:(){
         Manager.delete(node);
       }
   };
   manager.add(node);
   return node;
}

/*

So, I'd like to take a JSON object and make a template for it.

doc.write( {monster:{ stats: {  INT:18, WIS:7 },  abilities: [   {'Blah':'explodes for 1d6!'}] }}, templates.monster)

so when we call Manager.render.. we'll end up with all the styles and junk and this {monster:} object... when
we see that, we check for special renderers registered, and call.. if not, we just dump as the "simple command"


*/
