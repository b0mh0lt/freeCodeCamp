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
var projectName = "bar-chart";
localStorage.setItem("example_project", "D3: Bar Chart");
var BarChart = (function(_React$Component) {
  _inherits(BarChart, _React$Component);
  function BarChart(props) {
    _classCallCheck(this, BarChart);
    var _this = _possibleConstructorReturn(
      this,
      (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props)
    );

    _this.state = {
      containerWidth: null,
      error: null,
      name: "",
      data: [],
      currentGDP: 0,
      constantGDP: 0,
      date: "----"
    };

    _this.resizeContainer = _this.resizeContainer.bind(_this);
    return _this;
  }
  _createClass(BarChart, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        fetch(
          "https://rawgit.com/bomholtm/fcc/master/data_visualization/bar_chart/data.json"
        )
          .then(function(res) {
            return res.json();
          })
          .then(
            function(result) {
              _this2.setState({
                name: result.name,
                data: result.data
              });
            },
            function(error) {
              _this2.setState({
                error: error
              });
            }
          );

        this.resizeContainer();
        window.addEventListener("resize", this.resizeContainer);
      }
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener("resize", this.resizeContainer);
      }
    },
    {
      key: "resizeContainer",
      value: function resizeContainer() {
        var containerWidth = this.state.containerWidth;
        var currentContainerWidth = this.chartContainer.getBoundingClientRect()
          .width;
        var shouldResize = containerWidth !== currentContainerWidth;

        if (shouldResize) {
          this.setState({
            containerWidth: currentContainerWidth
          });
        }
      }
    },
    {
      key: "isTooltip",
      value: function isTooltip(_ref) {
        var isMove = _ref.isMove,
          currentGDP = _ref.currentGDP,
          constantGDP = _ref.constantGDP,
          date = _ref.date;
        this.setState({
          isMove: isMove,
          currentGDP: currentGDP,
          constantGDP: constantGDP,
          date: date
        });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this3 = this;
        var _state = this.state,
          containerWidth = _state.containerWidth,
          error = _state.error,
          name = _state.name,
          data = _state.data,
          isMove = _state.isMove,
          currentGDP = _state.currentGDP,
          constantGDP = _state.constantGDP,
          date = _state.date;

        var currentLCU = data.map(function(data) {
          return data[1];
        });
        var constantLCU = data.map(function(data) {
          return data[2];
        });
        var maxLCU = d3.max([d3.max(currentLCU), d3.max(constantLCU)]);
        var years = data.map(function(data) {
          return data[0];
        });

        var dimensions = { width: Math.max(containerWidth, 304), height: 480 };
        var margins = { top: 48, right: 4, bottom: 48, left: 24 };

        var xScale = d3
          .scaleLinear()
          .domain([d3.min(years) - 1, d3.max(years) + 1])
          .range([margins.left, dimensions.width - margins.right]);

        var yScale = d3
          .scaleLinear()
          .domain([0, maxLCU])
          .range([dimensions.height - margins.bottom, margins.top]);

        if (error) {
          return React.createElement(
            "div",
            {
              style: {
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center"
              }
            },
            error.message
          );
        } else {
          return React.createElement(
            "div",
            { style: { padding: 8, textAlign: "center" } },
            React.createElement(
              "div",
              {
                id: "chart",
                ref: function ref(el) {
                  _this3.chartContainer = el;
                },
                style: { maxWidth: 640, margin: "2em auto 3em" }
              },

              React.createElement(TitleLegendTooltip, {
                name: name,
                isMove: isMove,
                currentGDP: currentGDP,
                constantGDP: constantGDP,
                date: date
              }),

              React.createElement(
                "svg",
                {
                  width: dimensions.width,
                  height: dimensions.height,
                  style: { marginTop: "-3.5em" }
                },
                React.createElement(Axes, {
                  scales: { xScale: xScale, yScale: yScale },
                  dimensions: dimensions,
                  margins: margins
                }),

                React.createElement(Bars, {
                  scales: { xScale: xScale, yScale: yScale },
                  dimensions: dimensions,
                  margins: margins,
                  data: data,
                  isTooltip: this.isTooltip.bind(this)
                })
              )
            ),

            React.createElement(
              "a",
              {
                href: "https://github.com/bomholtm/fcc",
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  color: "#424242",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 15
                }
              },
              React.createElement("i", {
                className: "fab fa-github-alt fa-lg",
                style: { marginRight: ".5em" }
              }),
              "bomholtm/fcc"
            )
          );
        }
      }
    }
  ]);
  return BarChart;
})(React.Component);

var TitleLegendTooltip = function TitleLegendTooltip(_ref2) {
  var name = _ref2.name,
    isMove = _ref2.isMove,
    currentGDP = _ref2.currentGDP,
    constantGDP = _ref2.constantGDP,
    date = _ref2.date;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      {
        id: "title",
        style: { color: "#eee", fontSize: "1.5em", margin: 0, letterSpacing: 2 }
      },
      name
    ),

    React.createElement(
      "div",
      { id: "legend" },
      React.createElement(
        "div",
        { style: { padding: 8, display: "inline-block" } },
        React.createElement("span", {
          style: {
            height: 9,
            width: 9,
            borderRadius: "50%",
            backgroundColor: "#ec407a",
            display: "inline-block"
          }
        }),
        React.createElement("span", { style: { fontSize: 14 } }, " Current LCU")
      ),

      React.createElement(
        "div",
        { style: { padding: 8, display: "inline-block" } },
        React.createElement("span", {
          style: {
            height: 9,
            width: 9,
            borderRadius: "50%",
            backgroundColor: "#26c6da",
            display: "inline-block"
          }
        }),
        React.createElement(
          "span",
          { style: { fontSize: 14 } },
          " Constant LCU"
        )
      )
    ),

    React.createElement(
      "h2",
      {
        style: {
          visibility: isMove ? "visible" : "hidden",
          fontSize: "1.25em",
          fontWeight: 400,
          letterSpacing: 2,
          marginTop: "0.5em"
        }
      },
      "(",
      date,
      ")"
    ),

    React.createElement(
      "div",
      {
        id: "tooltip",
        style: {
          visibility: isMove ? "visible" : "hidden",
          fontSize: 12,
          marginTop: "4em"
        },
        "data-date": date
      },
      React.createElement(
        "p",
        {
          style: {
            color: "#ec407a",
            margin: "0.5em 0",
            textDecoration: "underline"
          }
        },
        "\u20AC ",
        d3.format(",.2f")(currentGDP * 1000000000000)
      ),
      React.createElement(
        "p",
        {
          style: {
            color: "#26c6da",
            margin: "0.5em 0",
            textDecoration: "underline"
          }
        },
        "\u20AC ",
        d3.format(",.2f")(constantGDP * 1000000000000)
      )
    )
  );
};
var Axes = (function(_React$Component2) {
  _inherits(Axes, _React$Component2);
  function Axes(props) {
    _classCallCheck(this, Axes);
    return _possibleConstructorReturn(
      this,
      (Axes.__proto__ || Object.getPrototypeOf(Axes)).call(this, props)
    );
  }
  _createClass(Axes, [
    {
      key: "render",
      value: function render() {
        var _props = this.props,
          scales = _props.scales,
          dimensions = _props.dimensions,
          margins = _props.margins;
        var xScale = scales.xScale,
          yScale = scales.yScale;
        var height = dimensions.height,
          width = dimensions.width;
        var top = margins.top,
          right = margins.right,
          bottom = margins.bottom,
          left = margins.left;

        return React.createElement(
          "g",
          null,
          React.createElement(Axis, {
            axisFunction: d3.axisBottom,
            scale: xScale,
            id: "x-axis",
            translate: "translate(0, " + (height - bottom) + ")",
            ticks: [10],
            tickSizeOuter: [0],
            tickSizeInner: [0],
            tickPadding: [12],
            tickFormat: d3.format("")
          }),

          React.createElement(Axis, {
            axisFunction: d3.axisLeft,
            scale: yScale,
            id: "y-axis",
            translate: "translate(" + left + ", 0)",
            ticks: [6],
            tickSizeOuter: [0],
            tickSizeInner: -width + right + left,
            tickPadding: [4],
            tickFormat: d3.format(".1f")
          }),

          React.createElement(AxisLegend, {
            top: top,
            left: left
          })
        );
      }
    }
  ]);
  return Axes;
})(React.Component);
var Axis = (function(_React$Component3) {
  _inherits(Axis, _React$Component3);
  function Axis(props) {
    _classCallCheck(this, Axis);
    return _possibleConstructorReturn(
      this,
      (Axis.__proto__ || Object.getPrototypeOf(Axis)).call(this, props)
    );
  }
  _createClass(Axis, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.renderAxis();
      }
    },
    {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.renderAxis();
      }
    },
    {
      key: "renderAxis",
      value: function renderAxis() {
        var _props2 = this.props,
          axisFunction = _props2.axisFunction,
          scale = _props2.scale,
          id = _props2.id,
          ticks = _props2.ticks,
          tickSizeOuter = _props2.tickSizeOuter,
          tickSizeInner = _props2.tickSizeInner,
          tickPadding = _props2.tickPadding,
          tickFormat = _props2.tickFormat;
        var axis = axisFunction()
          .scale(scale)
          .ticks(ticks)
          .tickSizeOuter(tickSizeOuter)
          .tickSizeInner(tickSizeInner)
          .tickPadding(tickPadding)
          .tickFormat(tickFormat);

        d3.select(this.axisElement).call(axis);
        d3.select("#y-axis .tick").remove();
      }
    },
    {
      key: "render",
      value: function render() {
        var _this6 = this;
        return React.createElement("g", {
          id: this.props.id,
          ref: function ref(el) {
            _this6.axisElement = el;
          },
          transform: this.props.translate
        });
      }
    }
  ]);
  return Axis;
})(React.Component);

var AxisLegend = function AxisLegend(_ref3) {
  var top = _ref3.top,
    left = _ref3.left;
  return React.createElement(
    "g",
    null,
    React.createElement(
      "text",
      {
        y: top - 16,
        x: left - 24,
        style: { fontSize: 10, fill: "#bdbdbd" }
      },
      "Trillion"
    )
  );
};
var Bars = (function(_React$Component4) {
  _inherits(Bars, _React$Component4);
  function Bars(props) {
    _classCallCheck(this, Bars);
    return _possibleConstructorReturn(
      this,
      (Bars.__proto__ || Object.getPrototypeOf(Bars)).call(this, props)
    );
  }
  _createClass(Bars, [
    {
      key: "isMouseOver",
      value: function isMouseOver(data) {
        var currentGDP = data.data[1];
        var constantGDP = data.data[2];
        var date = data.data[0];

        this.props.isTooltip({
          isMove: true,
          currentGDP: currentGDP,
          constantGDP: constantGDP,
          date: date
        });
      }
    },
    {
      key: "isMouseOut",
      value: function isMouseOut() {
        this.props.isTooltip({
          isMove: false,
          currentGDP: 0,
          constantGDP: 0,
          date: "----"
        });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this8 = this;
        var _props3 = this.props,
          scales = _props3.scales,
          dimensions = _props3.dimensions,
          margins = _props3.margins,
          data = _props3.data;
        var xScale = scales.xScale,
          yScale = scales.yScale;
        var height = dimensions.height;
        var bottom = margins.bottom;

        var currentLCU = data.map(function(data) {
          return React.createElement("rect", {
            // className='bar' (freeCodeCamp Test Suite)
            "data-date": data[0],
            "data-gdp": data[1],
            x: xScale(data[0]) - 3,
            y: yScale(data[1]),
            width: 3,
            height: height - bottom - yScale(data[1]),
            style: { fill: "#ec407a" },
            onMouseOver: function onMouseOver() {
              return _this8.isMouseOver({ data: data });
            },
            onMouseOut: function onMouseOut() {
              return _this8.isMouseOut();
            }
          });
        });

        var constantLCU = data.map(function(data) {
          return React.createElement("rect", {
            className: "bar",
            "data-date": data[0],
            "data-gdp": data[2],
            x: xScale(data[0]),
            y: yScale(data[2]),
            width: 3,
            height: height - bottom - yScale(data[2]),
            style: { fill: "#26c6da" },
            onMouseOver: function onMouseOver() {
              return _this8.isMouseOver({ data: data });
            },
            onMouseOut: function onMouseOut() {
              return _this8.isMouseOut();
            }
          });
        });

        return React.createElement("g", null, currentLCU, constantLCU);
      }
    }
  ]);
  return Bars;
})(React.Component);

ReactDOM.render(
  React.createElement(BarChart, null),
  document.getElementById("root")
);
