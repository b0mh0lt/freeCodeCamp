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
var projectName = "heat-map";
localStorage.setItem("example_project", "D3: Heat Map");
var HeatMap = (function(_React$Component) {
  _inherits(HeatMap, _React$Component);
  function HeatMap(props) {
    _classCallCheck(this, HeatMap);
    var _this = _possibleConstructorReturn(
      this,
      (HeatMap.__proto__ || Object.getPrototypeOf(HeatMap)).call(this, props)
    );

    _this.state = {
      containerWidth: null,
      baseTemperature: 0,
      monthlyVariance: [],
      isHovered: false,
      month: 0,
      year: 0,
      temperature: 0
    };

    _this.resizeContainer = _this.resizeContainer.bind(_this);
    return _this;
  }
  _createClass(HeatMap, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        fetch(
          "https://rawgit.com/bomholtm/fcc/master/data_visualization/heat_map/data.json"
        )
          .then(function(res) {
            return res.json();
          })
          .then(function(res) {
            _this2.setState({
              baseTemperature: res.baseTemperature,
              monthlyVariance: res.monthlyVariance
            });
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
      key: "render",
      value: function render() {
        var _this3 = this;
        var _state = this.state,
          containerWidth = _state.containerWidth,
          baseTemperature = _state.baseTemperature,
          monthlyVariance = _state.monthlyVariance,
          isHovered = _state.isHovered,
          month = _state.month,
          year = _state.year,
          temperature = _state.temperature;
        var dimensions = { width: Math.max(containerWidth, 359), height: 480 };
        var margins = { top: 24, right: 12, bottom: 60, left: 84 };
        var abbreviations = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ];

        var minYear = d3.min(monthlyVariance, function(d) {
          return d.year;
        });
        var maxYear = d3.max(monthlyVariance, function(d) {
          return d.year;
        });
        var minTemp = Math.round(
          baseTemperature +
            d3.min(monthlyVariance, function(d) {
              return d.variance - 1.5;
            })
        );
        var maxTemp = Math.round(
          baseTemperature +
            d3.max(monthlyVariance, function(d) {
              return d.variance + 1.5;
            })
        );
        var jan = d3.min(monthlyVariance, function(d) {
          return d.month - 1;
        });
        var dec = d3.max(monthlyVariance, function(d) {
          return d.month - 1;
        });

        var xScale = d3
          .scaleLinear()
          .range([margins.left, dimensions.width - margins.right])
          .domain([minYear, maxYear]);

        var yScale = d3
          .scaleLinear()
          .range([dimensions.height - margins.bottom, margins.top])
          .domain([dec + 0.5, jan - 0.5]);

        var tempScale = d3
          .scalePoint()
          .range([dimensions.width - 150, dimensions.width - margins.right])
          .domain([0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15]);

        return React.createElement(
          "div",
          { style: { padding: 8, textAlign: "center" } },

          React.createElement(
            "h1",
            {
              id: "title",
              style: { color: "#263238", fontSize: "1.5em", letterSpacing: 1 }
            },
            "Land Surface Temperature"
          ),

          React.createElement(
            "div",
            { id: "description" },
            React.createElement(
              "p",
              { style: { fontSize: 14, margin: 0 } },
              "Estimated monthly temperature change (January 1753 - September 2015)"
            )
          ),

          React.createElement(
            "div",
            {
              id: "graph",
              ref: function ref(el) {
                _this3.chartContainer = el;
              },
              style: { maxWidth: 1040, margin: "0 auto" }
            },

            React.createElement(
              "svg",
              { width: dimensions.width, height: dimensions.height },
              React.createElement(Cells, {
                scales: { xScale: xScale, yScale: yScale },
                dimensions: dimensions,
                margins: margins,
                baseTemperature: baseTemperature,
                monthlyVariance: monthlyVariance,
                abbreviations: abbreviations,
                onMouseOverCallback: function onMouseOverCallback(d) {
                  return _this3.setState({
                    isHovered: true,
                    month: d.month,
                    year: d.year,
                    temperature: d3.format(".2f")(baseTemperature + d.variance)
                  });
                },

                onMouseOutCallback: function onMouseOutCallback(d) {
                  return _this3.setState({
                    isHovered: false,
                    month: 0,
                    year: 0,
                    temperature: 0
                  });
                }
              }),

              React.createElement(Axes, {
                scales: { xScale: xScale, yScale: yScale },
                dimensions: dimensions,
                margins: margins
              }),

              React.createElement(Tooltip, {
                scales: { xScale: xScale, yScale: yScale },
                abbreviations: abbreviations,
                isHovered: isHovered,
                month: month,
                year: year,
                temperature: temperature
              })
            )
          ),

          React.createElement(
            "div",
            { id: "legend" },
            React.createElement(
              "svg",
              { width: dimensions.width, height: 120 },
              React.createElement(TempCells, {
                scale: tempScale,
                temp: [0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5]
              }),

              React.createElement(Axis, {
                axisFunction: d3.axisBottom,
                scale: tempScale,
                id: "temp-axis",
                translate: "translate(0, 21)",
                ticks: 11,
                tickSizeOuter: 0,
                tickSizeInner: 6,
                tickPadding: 4,
                tickFormat: d3.format("d")
              }),

              React.createElement(AxisLegend, {
                translate: "translate(" + (dimensions.width - 136) + ", 60)",
                text: "Temperature (°C)"
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
                color: "#607D8B",
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
  ]);
  return HeatMap;
})(React.Component);
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
            ticks: 26,
            tickSizeOuter: 0,
            tickSizeInner: 6,
            tickPadding: 0,
            tickFormat: d3.format("d")
          }),

          React.createElement(Axis, {
            axisFunction: d3.axisLeft,
            scale: yScale,
            id: "y-axis",
            translate: "translate(" + left + ", 0)",
            ticks: 12,
            tickSizeOuter: 0,
            tickSizeInner: 6,
            tickPadding: 4,
            tickFormat: function tickFormat(d) {
              var date = new Date(0);
              date.setMonth(d);
              return d3.timeFormat("%B")(date);
            }
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
        d3.selectAll("#x-axis text")
          .attr("dx", "-10px")
          .attr("dy", "-2px");
        d3.selectAll("#x-axis .tick").each(function(d, i) {
          d3.select(this).classed("minor", i % 2 !== 0);
        });
        d3.selectAll("#temp-axis .tick").each(function(d, i) {
          d3.select(this).classed("minor", i % 2 !== 0);
        });
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
          style: { fontSize: 12 }
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
          translate = _props3.translate,
          text = _props3.text;
        return React.createElement(
          "g",
          { transform: translate },
          React.createElement(
            "text",
            {
              style: {
                fontSize: 10,
                fontWeight: 700,
                fill: "#263238",
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
var Cells = (function(_React$Component5) {
  _inherits(Cells, _React$Component5);
  function Cells(props) {
    _classCallCheck(this, Cells);
    return _possibleConstructorReturn(
      this,
      (Cells.__proto__ || Object.getPrototypeOf(Cells)).call(this, props)
    );
  }
  _createClass(Cells, [
    {
      key: "render",
      value: function render() {
        var _this9 = this;
        var _props4 = this.props,
          scales = _props4.scales,
          dimensions = _props4.dimensions,
          margins = _props4.margins,
          baseTemperature = _props4.baseTemperature,
          monthlyVariance = _props4.monthlyVariance;
        var xScale = scales.xScale,
          yScale = scales.yScale;
        var height = dimensions.height,
          width = dimensions.width;
        var top = margins.top,
          right = margins.right,
          bottom = margins.bottom,
          left = margins.left;

        var getColor = function getColor(temp) {
          switch (true) {
            case temp >= 0 && temp < 1.5:
              return "#E0F2F1";
              break;
            case temp >= 1.5 && temp < 3:
              return "#B2DFDB";
              break;
            case temp >= 3 && temp < 4.5:
              return "#80CBC4";
              break;
            case temp >= 4.5 && temp < 6:
              return "#4DB6AC";
              break;
            case temp >= 6 && temp < 7.5:
              return "#26A69A";
              break;
            case temp >= 7.5 && temp < 9:
              return "#009688";
              break;
            case temp >= 9 && temp < 10.5:
              return "#00897B";
              break;
            case temp >= 10.5 && temp < 12:
              return "#00796B";
              break;
            case temp >= 12 && temp < 13.5:
              return "#00695C";
              break;
            case temp >= 13.5 && temp < 15:
              return "#004D40";
              break;
            default:
              return "#A7FFEB";
          }
        };

        var cell = monthlyVariance.map(function(d) {
          return React.createElement("rect", {
            className: "cell",
            "data-month": d.month - 1,
            "data-year": d.year,
            "data-temp": baseTemperature + d.variance,
            x: xScale(d.year + 0.25),
            y: yScale(d.month - 1.5),
            fill: getColor(baseTemperature + d.variance),
            width: Math.round(
              (width - right - left) / ((monthlyVariance.length + 3) / 12)
            ),
            height: (height - top - bottom) / 12,
            style: { cursor: "crosshair" },
            onMouseOver: function onMouseOver() {
              return _this9.props.onMouseOverCallback(d);
            },
            onMouseOut: function onMouseOut() {
              return _this9.props.onMouseOutCallback();
            }
          });
        });

        return React.createElement("g", null, cell);
      }
    }
  ]);
  return Cells;
})(React.Component);
var Tooltip = (function(_React$Component6) {
  _inherits(Tooltip, _React$Component6);
  function Tooltip(props) {
    _classCallCheck(this, Tooltip);
    return _possibleConstructorReturn(
      this,
      (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props)
    );
  }
  _createClass(Tooltip, [
    {
      key: "render",
      value: function render() {
        var _props5 = this.props,
          scales = _props5.scales,
          isHovered = _props5.isHovered,
          month = _props5.month,
          year = _props5.year,
          temperature = _props5.temperature,
          abbreviations = _props5.abbreviations;
        var xScale = scales.xScale,
          yScale = scales.yScale;

        // Not a fix but removes the error (xScale() and yScale() returning 'NaN' on initial load)
        var isNumber = function isNumber(d) {
          if (!isNaN(d)) {
            return d;
          }
        };

        return React.createElement(
          "g",
          {
            id: "tooltip",
            "data-year": year,
            style: {
              visibility: isHovered ? "visible" : "hidden",
              fontSize: 14
            }
          },
          React.createElement("rect", {
            x: isNumber(xScale(year) - 84),
            y: isNumber(yScale(month - 0.25)),
            rx: 4,
            ry: 4,
            width: "96px",
            height: "48px",
            fill: "#263238",
            opacity: ".75"
          }),

          React.createElement(
            "text",
            {
              y: isNumber(yScale(month - 0.25)),
              fill: "#FAFAFA"
            },

            React.createElement(
              "tspan",
              { x: isNumber(xScale(year) - 78), dy: 19 },
              abbreviations[month - 1],
              " ",
              year
            ),
            React.createElement(
              "tspan",
              { x: isNumber(xScale(year) - 78), dy: 19 },
              temperature,
              " \xB0C"
            )
          )
        );
      }
    }
  ]);
  return Tooltip;
})(React.Component);
var TempCells = (function(_React$Component7) {
  _inherits(TempCells, _React$Component7);
  function TempCells(props) {
    _classCallCheck(this, TempCells);
    return _possibleConstructorReturn(
      this,
      (TempCells.__proto__ || Object.getPrototypeOf(TempCells)).call(
        this,
        props
      )
    );
  }
  _createClass(TempCells, [
    {
      key: "render",
      value: function render() {
        var _props6 = this.props,
          scale = _props6.scale,
          temp = _props6.temp;

        var getColor = function getColor(temp) {
          switch (true) {
            case temp >= 0 && temp < 1.5:
              return "#E0F2F1";
              break;
            case temp >= 1.5 && temp < 3:
              return "#B2DFDB";
              break;
            case temp >= 3 && temp < 4.5:
              return "#80CBC4";
              break;
            case temp >= 4.5 && temp < 6:
              return "#4DB6AC";
              break;
            case temp >= 6 && temp < 7.5:
              return "#26A69A";
              break;
            case temp >= 7.5 && temp < 9:
              return "#009688";
              break;
            case temp >= 9 && temp < 10.5:
              return "#00897B";
              break;
            case temp >= 10.5 && temp < 12:
              return "#00796B";
              break;
            case temp >= 12 && temp < 13.5:
              return "#00695C";
              break;
            case temp >= 13.5 && temp < 15:
              return "#004D40";
              break;
            default:
              return "#A7FFEB";
          }
        };

        var cell = temp.map(function(d) {
          return React.createElement("rect", {
            x: scale(d),
            y: 6,
            fill: getColor(d),
            width: "15px",
            height: "15px"
          });
        });

        return React.createElement("g", null, cell);
      }
    }
  ]);
  return TempCells;
})(React.Component);

ReactDOM.render(
  React.createElement(HeatMap, null),
  document.getElementById("root")
);
