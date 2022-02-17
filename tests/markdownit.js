import MarkdownIt from "markdown-it";
import diagramsPlugin from '../lib/index.js'

let md = MarkdownIt().use(diagramsPlugin);

let rr = md.render(`
\`\`\`railroad
Diagram(
    Optional('+', 'skip'),
    Choice(0,
      NonTerminal('name-start char'),
      NonTerminal('escape')),
    ZeroOrMore(
      Choice(0,
        NonTerminal('name char'),
        NonTerminal('escape'))))
\`\`\`        
`);

console.log(rr);
