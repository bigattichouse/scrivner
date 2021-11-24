/*
uses elements.js  and latex to define a document
*/
function new(DOM=null){
  var doc = element.new();
  if(!DOM) doc.DOM = require("DOM.js"); /*if not explicit, each document keeps its own DOM list*/
  doc.type = "document";
  return doc;
}
