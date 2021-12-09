const scrivner = require("scrivner.js");
//example Scrivner document
//Generate a game-book monster stat block LaTeX output
var document = new scrivner.Document({size:"US Letter"});
var page = new document.Page();
page.class.push("two-column");
page.write("Some text");
var monsterBlock = page.add();
monsterBlock.class.push("monster-block");
monsterBlock.data = {monster:{stats:{STR:18,INT:7,DEX:5}}};
statBlock = monsterBlock.add("stat-block");
 //* Can have default body content that's just a render function instead or including of children */
statBlock.add("stat",(node)=>{ node.write(monsterBlock.data.monster.stats.STR);  });
statBlock.add("stat",(node)=>{ node.write(monsterBlock.data.monster.stats.INT);  });
statBlock.add("stat",(node)=>{ node.write(monsterBlock.data.monster.stats.DEX);  });
/*
so, we can make a function addMonsterBlock(document, monster){  }
that then adds all the children and stuff needed
*/

/*actual rendering happens last*/
document.renderPDF("output/monster.pdf");
