## Usage

As a Node module:

```javascript
import MarkdownIt from "markdown-it"
import docutilsPlugin from "markdown-it-docutils"

const text = MarkdownIt().use(docutilsPlugin).render(`\`\`\`railroad
Diagram(
  Optional(Sequence(
     'var', 
     OneOrMore(Sequence(
       NonTerminal('name'),
       Optional(Sequence('=', NonTerminal('expression')), 'skip')
     ), ','), 
     ';'), 
  'skip')
)`)
```

```javascript
import MarkdownIt from "markdown-it"
import docutilsPlugin from "markdown-it-docutils"

const text = MarkdownIt().use(docutilsPlugin).render(`\`\`\`mermaid
graph TD
    A[While] --> B{Condition}
    B -->|True| C[Statement]
    C --> B
    B -->|False| D[End While]`)
```

`package.json`'s `dependecies` entry:

```
"markdown-it-diagrams": "git+https://github.com/chunxy/markdown-it-diagrams.git",
```

