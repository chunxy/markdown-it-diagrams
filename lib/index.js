import Mermaid from "mermaid";
import rr from "railroad-diagrams";
export default function diagramsPlugin(md, options) {
    let defaultFenceRule = md.renderer.rules.fence;
    const { Diagram, ComplexDiagram, Sequence, Choice, Optional, OneOrMore, ZeroOrMore, Terminal, NonTerminal, Comment, Skip } = rr;
    const railroadCSS = `
svg {
  background-color: hsl(30,20%,95%);
}
path {
  stroke-width: 3;
  stroke: black;
  fill: rgba(0,0,0,0);
}
text {
  font: bold 14px monospace;
  text-anchor: middle;
  white-space: pre;
}
text.diagram-text {
  font-size: 12px;
}
text.diagram-arrow {
  font-size: 16px;
}
text.label {
  text-anchor: start;
}
text.comment {
  font: italic 12px monospace;
}
g.non-terminal text {
  /*font-style: italic;*/
}
rect {
  stroke-width: 3;
  stroke: black;
  fill: hsl(120,100%,90%);
}
rect.group-box {
  stroke: gray;
  stroke-dasharray: 10 5;
  fill: none;
}
path.diagram-text {
  stroke-width: 3;
  stroke: black;
  fill: white;
  cursor: help;
}
g.diagram-text:hover path.diagram-text {
  fill: #eee;
}`;
    function customFenceRule(tokens, idx, options, env, self) {
        let token = tokens[idx];
        let info = token.info.trim();
        let langName = info ? info.split(/\s+/g)[0] : "";
        let imageHTML = "";
        let imageAttrs = [];
        // Only handle custom token
        switch (langName) {
            case "{mermaid}": {
                const element = document.createElement("div");
                document.body.appendChild(element);
                // Render with Mermaid
                try {
                    const container_id = "mermaid-container";
                    Mermaid.mermaidAPI.render(container_id, token.content, (html) => {
                        // We need to forcibly extract the max-width/height attributes to set on img tag
                        let svg = document.getElementById(container_id);
                        if (svg !== null) {
                            imageAttrs.push(["style", `max-width:${svg.style.maxWidth};max-height:${svg.style.maxHeight}`]);
                        }
                        imageHTML = html;
                    });
                }
                catch (e) {
                    console.log(`Error in running Mermaid.mermaidAPI.render: ${e}`);
                    return `<div class="alert alert-warning">${e.str}</div>`;
                }
                finally {
                    element.remove();
                }
                break;
            }
            case "{railroad}": {
                try {
                    let svg = eval(token.content).toSVG();
                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    let style = svg.appendChild(document.createElement("style"));
                    style.innerHTML = railroadCSS;
                    svg.appendChild(style);
                    imageHTML = svg.outerHTML;
                }
                catch (e) {
                    console.log(`Error in eval-ing railroad definition: ${e}`);
                    return `<div class="alert alert-warning">${e.str}</div>`;
                }
                break;
            }
            default: {
                return defaultFenceRule(tokens, idx, options, env, self);
            }
        }
        // If we have an image, render it, otherwise return blank img tag
        if (imageHTML.length) {
            imageAttrs.push(["src", `data:image/svg+xml,${encodeURIComponent(imageHTML)}`]);
            token.attrs = imageAttrs;
            return `<img ${self.renderAttrs(token)}>`;
        }
        else {
            return "<img>";
        }
    }
    md.renderer.rules.fence = customFenceRule;
}
//# sourceMappingURL=index.js.map