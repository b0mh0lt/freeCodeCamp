var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}
var projectName = "markdown-previewer";
localStorage.setItem("example_project", "Markdown Previewer");

var renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return '<a target="_blank" href="' + href + '">' + text + "</a>";
};
renderer.listitem = function(text) {
  if (text.includes('type="checkbox"')) {
    return (
      '<li style="list-style: none; margin-left: -10px;">' + text + "</li>"
    );
  }
  return "<li>" + text + "</li>";
};

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function highlight(code) {
    return hljs.highlightAuto(code).value;
  }
});
var MarkdownPreviewer = (function(_React$Component) {
  _inherits(MarkdownPreviewer, _React$Component);
  function MarkdownPreviewer(props) {
    _classCallCheck(this, MarkdownPreviewer);
    var _this = _possibleConstructorReturn(
      this,
      (
        MarkdownPreviewer.__proto__ || Object.getPrototypeOf(MarkdownPreviewer)
      ).call(this, props)
    );
    _this.state = {
      markdown: init
    };
    return _this;
  }
  _createClass(MarkdownPreviewer, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        var editor = ace.edit("editor");

        editor.setTheme("ace/theme/dracula");
        editor.session.setMode("ace/mode/markdown");
        editor.session.setUseWrapMode(true);
        editor.container.style.lineHeight = 1.15;

        editor.renderer.setOptions({
          showPrintMargin: false,
          fontSize: "14px",
          fontFamily: '"PT Mono", monospace'
        });

        editor.setValue(this.state.markdown);
        editor.clearSelection();

        editor.session.on("change", function() {
          _this2.setState({ markdown: editor.getValue() });
        });
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "wrapper" },
          React.createElement("div", { id: "editor" }),
          React.createElement("div", {
            id: "preview",
            dangerouslySetInnerHTML: {
              __html: marked(this.state.markdown, { renderer: renderer })
            }
          })
        );
      }
    }
  ]);
  return MarkdownPreviewer;
})(React.Component);
var init =
  "\n# Structured documents\n\nSometimes it's useful to have different levels of headings to structure your documents. Start lines with a `#` to create headings. You can use one `#` all the way up to `######` six for different heading sizes.\n\nIt's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to GitHub!](https://github.com/bomholtm/fcc) \uD83D\uDE09\n\nTasks lists are my absolute favorite:\n\n- [x] This is a complete item\n- [ ] This is an incomplete item\n\n## This is a second-tier heading\n\nThere are many different ways to style code with GitHub's markdown. If you have inline code blocks, wrap them in backticks: `var example = true`.\nGitHub also supports something called code fencing, which allows for multiple lines without indentation and if you'd like to use syntax highlighting, include the language:\n\n```javascript\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nIf you want to embed images, this is how you do it:\n\n![Image of Hubot](https://octodex.github.com/images/hubot.jpg)\n\nIf you'd like to quote someone, use the > character before the line:\n> Coffee. The finest organic suspension ever devised... I beat the Borg with it.\n> - Captain Janeway\n\nSometimes you want bullet points:\n\n* Start a line with a star\n* Profit!\n- Dashes work just as well\n- And if you have sub points, put two spaces before the dash or star:\n  - Like this\n  - And this\n\nSometimes you want numbered lists:\n\n1. One\n2. Two\n3. Three\n\n";

ReactDOM.render(
  React.createElement(MarkdownPreviewer, null),
  document.getElementById("root")
);
