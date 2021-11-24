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
