const projectName = 'markdown-previewer';
localStorage.setItem('example_project', 'Markdown Previewer');

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};
renderer.listitem = function(text) {
  if (text.includes('type="checkbox"')) {
    return `<li style="list-style: none; margin-left: -10px;">${text}</li>`;
  }
  return `<li>${text}</li>`;
};
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});
class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: init
    };
  }
  componentDidMount() {
    let editor = ace.edit('editor');
    editor.setTheme('ace/theme/dracula');
    editor.session.setMode('ace/mode/markdown');
    editor.session.setUseWrapMode(true);
    editor.container.style.lineHeight = 1.15;
    editor.renderer.setOptions({
      showPrintMargin: false,
      fontSize: '.875rem',
      fontFamily: '"PT Mono", monospace'
    });
    editor.setValue(this.state.markdown);
    editor.clearSelection();
    editor.session.on('change', () => {
      this.setState({ markdown: editor.getValue() });
    });
  }
  render() {
    return React.createElement(
      'div',
      { className: 'wrapper' },
      React.createElement('div', { id: 'editor' }),
      React.createElement('div', {
        id: 'preview',
        dangerouslySetInnerHTML: { __html: marked(this.state.markdown, { renderer: renderer }) }
      })
    );
  }
}
const init = `
# Structured documents

Sometimes it's useful to have different levels of headings to structure your documents. Start lines with a \`#\` to create headings. You can use one \`#\` all the way up to \`######\` six for different heading sizes.

It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link my GitHub profile!](https://github.com/b0mh0lt) 😉

Tasks lists are my absolute favorite:

- [x] This is a complete item
- [ ] This is an incomplete item

## This is a second-tier heading

There are many different ways to style code with GitHub's markdown. If you have inline code blocks, wrap them in backticks: \`var example = true\`.
GitHub also supports something called code fencing, which allows for multiple lines without indentation and if you'd like to use syntax highlighting, include the language:

\`\`\`javascript
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

If you want to embed images, this is how you do it:

![Image of Hubot](https://octodex.github.com/images/hubot.jpg)

If you'd like to quote someone, use the > character before the line:
> Coffee. The finest organic suspension ever devised... I beat the Borg with it.
> - Captain Janeway

Sometimes you want bullet points:

* Start a line with a star
* Profit!
- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this

Sometimes you want numbered lists:

1. One
2. Two
3. Three

`;

ReactDOM.render(React.createElement(MarkdownPreviewer, null), document.getElementById('root'));
