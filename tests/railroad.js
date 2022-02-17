// let rr = await import('railroad-diagrams');
import rr from 'railroad-diagrams';

const {Diagram, Choice, Optional, NonTerminal, ZeroOrMore} = rr

let dg = Diagram(
    Optional('+', 'skip'),
    Choice(0,
      NonTerminal('name-start char'),
      NonTerminal('escape')),
    ZeroOrMore(
      Choice(0,
        NonTerminal('name char'),
        NonTerminal('escape'))));

console.log(dg.format().toString());
