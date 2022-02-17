declare module "railroad-diagrams" {
  function anyfunction(...items: any[]): any
  namespace rr {
    const Diagram: typeof anyfunction;
    const Choice: typeof anyfunction;
    const Optional: typeof anyfunction;
    const NonTerminal: typeof anyfunction;
    const ZeroOrMore: typeof anyfunction;
    const ComplexDiagram: typeof anyfunction
    const Sequence: typeof anyfunction
    const OneOrMore: typeof anyfunction
    const Terminal: typeof anyfunction
    const Comment: typeof anyfunction
    const Skip: typeof anyfunction
  }

  export = rr
}