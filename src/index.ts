import type MarkdownIt from "markdown-it/lib"
import type Token from "markdown-it/lib/token"
import type Renderer from "markdown-it/lib/renderer"

import Mermaid from "mermaid"
import rr from "railroad-diagrams"

export default function diagramsPlugin(md: MarkdownIt, options?: any): void {

  let defaultFenceRule = md.renderer.rules.fence;

  const { Diagram, ComplexDiagram, Sequence, Choice, Optional,
    OneOrMore, ZeroOrMore, Terminal, NonTerminal, Comment, Skip } = rr

  function customFenceRenderer(tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: Renderer) {
    let token = tokens[idx];
    let info = token.info.trim();
    let langName = info ? info.split(/\s+/g)[0] : "";
    let imageHTML: string = "";
    let imageAttrs: [string, string][] = [];

    // Only handle custom token
    switch (langName) {
      case "mermaid": {
        const element = document.createElement("div");
        document.body.appendChild(element);

        // Render with Mermaid
        try {
          const container_id = "mermaid-container";
          Mermaid.mermaidAPI.render(container_id, token.content, (html: string) => {
            // We need to forcibly extract the max-width/height attributes to set on img tag
            let svg = document.getElementById(container_id);
            if (svg !== null) {
              imageAttrs.push(["style", `max-width:${svg.style.maxWidth};max-height:${svg.style.maxHeight}`]);
            }
            // Store HTML
            imageHTML = html;
          });
          // If we have an image, let's render it, otherwise return blank img tag
          if (imageHTML.length) {
            // Store encoded image data
            imageAttrs.push(["src", `data:image/svg+xml,${encodeURIComponent(imageHTML)}`]);
            token.attrs = imageAttrs;
            return `<img ${self.renderAttrs(token)}>`;
          }
          return "<img>"
        } catch (e: any) {
          console.log(`Error in running Mermaid.mermaidAPI.render: ${e}`);
          return `<div class="alert alert-warning">${e.str}</div>`;
        } finally {
          element.remove();
        }
        break;
      }
      case "railroad": {
        try {
          imageHTML = eval(token.content).toString()
        } catch (e: any) {
          console.log(`Error in eval-ing railroad definition: ${e}`);
          return `<div class="alert alert-warning">${e.str}</div>`;
        }
        return imageHTML
      }
      default: {
        return defaultFenceRule!(tokens, idx, options, env, self);
      }

    }
  }

  md.renderer.rules.fence = customFenceRenderer;
}