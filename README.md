# scrivner
LaTeX generation from node.js

# What Scrivner Isn't
Scrivner is not designed to be a 1:1 mapping of LaTeX to Javascript.  It will likely be necessary to implement many of the capabilities of LaTeX, including some of the "programming-like" capabilities, but those aren't the goal. 

# What Scrivner Is
Scrivner is designed to render LaTeX documents using Node.js.  LaTeX is the *output* from scrivner, meant to be immediately compiled into a PDF.   The current implementation goal is to be able to generate documents, not necessarily use the programmatic aspects of latex itself. The goal is to create a "JS Way" to create documents more like to DOM/CSS that are rendered to LaTeX for final conversion. In a way, this is a like a precompiler or cross-compiled sort of version.

# An example
In LaTeX, you might have a repeated block of information (imagine a character "stat" block in a game book) that calls a series of nested environments and packages to shape the display of that information. A LaTeX Command is called with some options set, and the called command then calls other commands to create the output. This can take some considerable skill to know how the commands work.

In Scrivner, you'd create a class or function that takes the character data in javascript, possibly having the data be a JSON object or database row, and your scrivner function does the same job as that latex code. You, the javascript developer, only need a basic understanding of LaTeX. Additionally, I'd like to have scrivner know how to convert basic HTML to LaTeX.

An additional goal is to be able to create wrappers for LaTeX packages and classes that can be called from scrivner - so you could import your preferred layouts.

Another goal is to have CSS styles applied, and use a more programmatic class/inheritence structure.

