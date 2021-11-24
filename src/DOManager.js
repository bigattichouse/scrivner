/*
keeps list of all styles in sequential order.. so when applied, searches
and applies the FINAL matching (if exact). If more than one apply, stacks
a unique object of matching values in order.

Styles will be like commands

so:

 {
  bold: (elements)=>{
      return {textbf:[elements]};
  }
}

so.. when we hit the latex Render stage, it calls the element's render() function,
but this func would be called first which would make a simple \textbf{whatever}

*/
