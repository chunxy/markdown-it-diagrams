import MarkdownIt from "markdown-it";
import diagramsPlugin from "markdown-it-diagrams"

var md = new MarkdownIt().use(diagramsPlugin);

var markdown_mm = document.getElementById("markdown-mermaid");
var markdown_rr = document.getElementById("markdown-railroad");

var dest_mm = document.getElementById('dest-mermaid')
var dest_rr = document.getElementById('dest-railroad')

dest_mm.innerHTML = md.render(markdown_mm.innerHTML);
dest_rr.innerHTML = md.render(markdown_rr.innerHTML);
