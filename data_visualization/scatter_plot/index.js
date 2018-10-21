var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();
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
var projectName = "scatter-plot";
localStorage.setItem("example_project", "D3: Scatter Plot");
var ScatterPlot = (function(_React$Component) {
  _inherits(ScatterPlot, _React$Component);
  function ScatterPlot(props) {
    _classCallCheck(this, ScatterPlot);
    var _this = _possibleConstructorReturn(
      this,
      (ScatterPlot.__proto__ || Object.getPrototypeOf(ScatterPlot)).call(
        this,
        props
      )
    );
    _this.state = {
      containerWidth: null,
      data: []
    };

    _this.resizeContainer = _this.resizeContainer.bind(_this);
    return _this;
  }
  _createClass(ScatterPlot, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        fetch(
          "https://rawgit.com/bomholtm/fcc/master/data_visualization/scatter_plot/data.json"
        )
          .then(function(res) {
            return res.json();
          })
          .then(function(res) {
            return _this2.setState({ data: res });
          });

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
          year = _ref.year,
          winner = _ref.winner,
          nationality = _ref.nationality,
          vehicle = _ref.vehicle,
          time = _ref.time;
        this.setState({
          isMove: isMove,
          year: year,
          winner: winner,
          nationality: nationality,
          vehicle: vehicle,
          time: time
        });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this3 = this;
        var _state = this.state,
          containerWidth = _state.containerWidth,
          data = _state.data,
          isMove = _state.isMove,
          year = _state.year,
          winner = _state.winner,
          nationality = _state.nationality,
          vehicle = _state.vehicle,
          time = _state.time;

        var getMinTime = function getMinTime(d) {
          var _d$Time$split$map = d.Time.split(/[:.]/).map(function(x) {
              return Number(x);
            }),
            _d$Time$split$map2 = _slicedToArray(_d$Time$split$map, 3),
            mm = _d$Time$split$map2[0],
            ss = _d$Time$split$map2[1],
            ll = _d$Time$split$map2[2];
          var date = new Date();
          date.setHours(0);
          date.setMinutes(mm - 1);
          date.setSeconds(30);
          date.setMilliseconds(0);
          return date;
        };

        var getMaxTime = function getMaxTime(d) {
          var _d$Time$split$map3 = d.Time.split(/[:.]/).map(function(x) {
              return Number(x);
            }),
            _d$Time$split$map4 = _slicedToArray(_d$Time$split$map3, 3),
            mm = _d$Time$split$map4[0],
            ss = _d$Time$split$map4[1],
            ll = _d$Time$split$map4[2];
          var date = new Date();
          date.setHours(0);
          date.setMinutes(mm + 1);
          date.setSeconds(30);
          date.setMilliseconds(0);
          return date;
        };

        var minYear =
          d3.min(data, function(d) {
            return d.Year;
          }) - 4;
        var maxYear =
          d3.max(data, function(d) {
            return d.Year;
          }) + 1;
        var minTime = d3.min(data, function(d) {
          return getMinTime(d);
        });
        var maxTime = d3.max(data, function(d) {
          return getMaxTime(d);
        });

        var dimensions = { width: Math.max(containerWidth, 359), height: 560 };
        var margins = { top: 24, right: 24, bottom: 24, left: 48 };

        var xScale = d3
          .scaleLinear()
          .domain([minYear, maxYear])
          .range([margins.left, dimensions.width - margins.right]);

        var yScale = d3
          .scaleTime()
          .domain([maxTime, minTime])
          .range([dimensions.height - margins.bottom, margins.top]);

        return React.createElement(
          "div",
          { style: { padding: 8, textAlign: "center" } },
          React.createElement(
            "h1",
            {
              id: "title",
              style: {
                margin: ".75em 0 0",
                fontSize: "1.75em",
                color: "#212121"
              }
            },
            "Pikes Peak"
          ),
          React.createElement(
            "h2",
            {
              style: {
                margin: 0,
                fontSize: "1.25em",
                color: "#9e9e9e",
                fontWeight: 400
              }
            },
            "International Hill Climb"
          ),

          React.createElement(
            "div",
            {
              id: "graph",
              ref: function ref(el) {
                _this3.chartContainer = el;
              },
              style: {
                maxWidth: 640,
                margin: ".5em auto 2em",
                position: "relative"
              }
            },

            React.createElement(Tooltip, {
              isMove: isMove,
              year: year,
              winner: winner,
              nationality: nationality,
              vehicle: vehicle,
              time: time,
              dimensions: dimensions
            }),

            React.createElement(
              "svg",
              { width: dimensions.width, height: dimensions.height },
              React.createElement(Axes, {
                scales: { xScale: xScale, yScale: yScale },
                dimensions: dimensions,
                margins: margins
              }),

              React.createElement(Dots, {
                scales: { xScale: xScale, yScale: yScale },
                dimensions: dimensions,
                margins: margins,
                data: data,
                isTooltip: this.isTooltip.bind(this)
              })
            )
          ),

          React.createElement(
            "div",
            { id: "legend" },
            React.createElement(
              "p",
              {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textAlign: "left",
                  margin: "0 auto",
                  color: "#424242"
                }
              },
              "Legend"
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 10,
                  padding: 6,
                  margin: "0 auto 3em",
                  border: "1px solid #424242",
                  textAlign: "left",
                  display: "flex",
                  flexWrap: "wrap"
                }
              },

              React.createElement(
                "div",
                { style: { flex: "1 210px", minWidth: 0 } },
                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#ff9100",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "no official competition")
                ),

                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#ff1744",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement(
                    "span",
                    null,
                    "was run on a shortened course"
                  )
                ),

                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#d500f9",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "the course was 0% paved")
                ),

                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#651fff",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "the course was 6% paved")
                ),

                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#3d5afe",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "the course was 21% paved")
                )
              ),

              React.createElement(
                "div",
                { style: { flex: "1 210px", minWidth: 0 } },
                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#2979ff",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "the course was 35% paved")
                ),

                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#00b0ff",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "the course was 46% paved")
                ),

                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#00e5ff",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "the course was 57% paved")
                ),

                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#1de9b6",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "the course was 76% paved")
                ),

                React.createElement(
                  "p",
                  { style: { margin: "0 auto", width: 210 } },
                  React.createElement("span", {
                    style: {
                      height: 8,
                      width: 8,
                      margin: "0 8px",
                      backgroundColor: "#00e676",
                      borderRadius: "50%",
                      display: "inline-block"
                    }
                  }),
                  React.createElement("span", null, "the course was 100% paved")
                )
              )
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
                fontSize: 15,
                paddingBottom: ".75em"
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
  ]);
  return ScatterPlot;
})(React.Component);

var Tooltip = function Tooltip(_ref2) {
  var isMove = _ref2.isMove,
    year = _ref2.year,
    winner = _ref2.winner,
    nationality = _ref2.nationality,
    vehicle = _ref2.vehicle,
    time = _ref2.time,
    dimensions = _ref2.dimensions;
  return React.createElement(
    "div",
    {
      id: "tooltip",
      "data-year": year,
      style: {
        visibility: isMove ? "visible" : "hidden",
        backgroundColor: "rgba(158, 158, 158, .5)",
        color: "#424242",
        padding: "0 12px",
        borderRadius: 4,
        textAlign: "left",
        fontSize: 13,
        position: "absolute",
        top: dimensions.height - 200,
        left: dimensions.width - 275,
        width: 221
      }
    },

    React.createElement(
      "div",
      { style: { margin: "6px 0" } },
      React.createElement(
        "span",
        { style: { letterSpacing: 1, fontWeight: 700 } },
        time
      )
    ),

    React.createElement(
      "div",
      { style: { margin: "6px 0" } },
      React.createElement("img", {
        src: nationality,
        style: { margin: "0 12px -1px 0" }
      }),
      React.createElement("span", null, winner, " (", year, ")")
    ),

    React.createElement(
      "div",
      { style: { margin: "6px 0" } },
      React.createElement("span", null, vehicle)
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
            ticks: 10,
            tickSizeOuter: 0,
            tickSizeInner: top + bottom - height,
            tickPadding: 8,
            tickFormat: d3.format("d")
          }),

          React.createElement(AxisLegend, {
            transform:
              "translate(" +
              (width - right - 128) +
              ", " +
              (height - bottom - 8) +
              ")",
            text: "Year (1916-2018)"
          }),

          React.createElement(Axis, {
            axisFunction: d3.axisLeft,
            scale: yScale,
            id: "y-axis",
            translate: "translate(" + left + ", 0)",
            ticks: d3.timeMinute.every(2),
            tickSizeOuter: 0,
            tickSizeInner: right + left - width,
            tickPadding: 8,
            tickFormat: d3.timeFormat("%M:%S")
          }),

          React.createElement(AxisLegend, {
            transform:
              "translate(" +
              (left + 16) +
              ", " +
              (top + 116) +
              "), rotate(-90)",
            text: "Time (minutes)"
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
          transform: this.props.translate,
          style: { fontSize: 9 }
        });
      }
    }
  ]);
  return Axis;
})(React.Component);
var AxisLegend = (function(_React$Component4) {
  _inherits(AxisLegend, _React$Component4);
  function AxisLegend(props) {
    _classCallCheck(this, AxisLegend);
    return _possibleConstructorReturn(
      this,
      (AxisLegend.__proto__ || Object.getPrototypeOf(AxisLegend)).call(
        this,
        props
      )
    );
  }
  _createClass(AxisLegend, [
    {
      key: "render",
      value: function render() {
        var _props3 = this.props,
          transform = _props3.transform,
          text = _props3.text;
        return React.createElement(
          "g",
          { transform: transform },
          React.createElement(
            "text",
            {
              style: {
                fontSize: 11,
                fontWeight: 700,
                fill: "#424242",
                letterSpacing: 1
              }
            },
            text
          )
        );
      }
    }
  ]);
  return AxisLegend;
})(React.Component);
var Dots = (function(_React$Component5) {
  _inherits(Dots, _React$Component5);
  function Dots(props) {
    _classCallCheck(this, Dots);
    return _possibleConstructorReturn(
      this,
      (Dots.__proto__ || Object.getPrototypeOf(Dots)).call(this, props)
    );
  }
  _createClass(Dots, [
    {
      key: "isMouseOver",
      value: function isMouseOver(data) {
        this.props.isTooltip({
          isMove: true,
          year: data.Year,
          winner: data.Winner,
          nationality: "img/" + data.Nationality + ".png",
          vehicle: data.Vehicle,
          time: data.Time
        });
      }
    },
    {
      key: "isMouseOut",
      value: function isMouseOut() {
        this.props.isTooltip({
          isMove: false,
          year: null,
          winner: null,
          nationality: null,
          vehicle: null,
          time: null
        });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this9 = this;
        var _props4 = this.props,
          scales = _props4.scales,
          dimensions = _props4.dimensions,
          margins = _props4.margins,
          data = _props4.data;
        var xScale = scales.xScale,
          yScale = scales.yScale;

        var unofficial = { cursor: "pointer", fill: "#ff9100" };
        var short = { cursor: "pointer", fill: "#ff1744" };
        var p0 = { cursor: "pointer", fill: "#d500f9" };
        var p6 = { cursor: "pointer", fill: "#651fff" };
        var p21 = { cursor: "pointer", fill: "#3d5afe" };
        // p35 #2979ff
        var p46 = { cursor: "pointer", fill: "#00b0ff" };
        var p57 = { cursor: "pointer", fill: "#00e5ff" };
        var p76 = { cursor: "pointer", fill: "#1de9b6" };
        var p100 = { cursor: "pointer", fill: "#00e676" };

        var getTime = function getTime(d) {
          var _d$Time$split$map5 = d.Time.split(/[:.]/).map(function(x) {
              return Number(x);
            }),
            _d$Time$split$map6 = _slicedToArray(_d$Time$split$map5, 3),
            mm = _d$Time$split$map6[0],
            ss = _d$Time$split$map6[1],
            ll = _d$Time$split$map6[2];
          var date = new Date();
          date.setHours(0);
          date.setMinutes(mm);
          date.setSeconds(ss);
          date.setMilliseconds(ll);
          return date;
        };

        var dot = data.map(function(d) {
          return React.createElement("circle", {
            className: "dot",
            "data-xvalue": d.Year,
            "data-yvalue": getTime(d),
            cx: xScale(d.Year),
            cy: yScale(getTime(d)),
            r: 4,
            style: eval(d.Legend),
            onMouseOver: function onMouseOver() {
              return _this9.isMouseOver(d);
            },
            onMouseOut: function onMouseOut() {
              return _this9.isMouseOut();
            }
          });
        });

        return React.createElement("g", null, dot);
      }
    }
  ]);
  return Dots;
})(React.Component);

ReactDOM.render(
  React.createElement(ScatterPlot, null),
  document.getElementById("root")
);
