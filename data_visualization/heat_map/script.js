const projectName = 'heat-map';
localStorage.setItem('example_project', 'D3: Heat Map');

class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: null,
      baseTemperature: 0,
      monthlyVariance: [],
      isHovered: false,
      month: 0,
      year: 0,
      temperature: 0
    };
    this.resizeContainer = this.resizeContainer.bind(this);
  }
  componentDidMount() {
    fetch('./data.json')
      .then(res => res.json())
      .then(res => {
        this.setState({
          baseTemperature: res.baseTemperature,
          monthlyVariance: res.monthlyVariance
        });
      });
    this.resizeContainer();
    window.addEventListener('resize', this.resizeContainer);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeContainer);
  }
  resizeContainer() {
    const { containerWidth } = this.state;
    const currentContainerWidth = this.chartContainer.getBoundingClientRect().width;
    const shouldResize = containerWidth !== currentContainerWidth;
    if (shouldResize) {
      this.setState({
        containerWidth: currentContainerWidth
      });
    }
  }
  render() {
    const { containerWidth, baseTemperature, monthlyVariance, isHovered, month, year, temperature } = this.state;
    const dimensions = { width: Math.max(containerWidth, 359), height: 480 };
    const margins = { top: 24, right: 12, bottom: 60, left: 84 };
    const abbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let minYear = d3.min(monthlyVariance, d => d.year);
    let maxYear = d3.max(monthlyVariance, d => d.year);
    let minTemp = Math.round(baseTemperature + d3.min(monthlyVariance, d => d.variance - 1.5));
    let maxTemp = Math.round(baseTemperature + d3.max(monthlyVariance, d => d.variance + 1.5));
    let jan = d3.min(monthlyVariance, d => d.month - 1);
    let dec = d3.max(monthlyVariance, d => d.month - 1);
    const xScale = d3
      .scaleLinear()
      .range([margins.left, dimensions.width - margins.right])
      .domain([minYear, maxYear]);
    const yScale = d3
      .scaleLinear()
      .range([dimensions.height - margins.bottom, margins.top])
      .domain([dec + 0.5, jan - 0.5]);
    const tempScale = d3
      .scalePoint()
      .range([dimensions.width - 150, dimensions.width - margins.right])
      .domain([0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15]);
    return React.createElement(
      'div',
      { style: { padding: '.5rem', textAlign: 'center' } },
      React.createElement(
        'h1',
        { id: 'title', style: { color: '#263238', fontSize: '1.5rem', letterSpacing: 1 } },
        'Land Surface Temperature'
      ),
      React.createElement(
        'div',
        { id: 'description' },
        React.createElement(
          'p',
          { style: { fontSize: '.875rem', margin: 0 } },
          'Estimated monthly temperature change (January 1753 - September 2015)'
        )
      ),
      React.createElement(
        'div',
        {
          id: 'graph',
          ref: el => {
            this.chartContainer = el;
          },
          style: { maxWidth: 1040, margin: '0 auto' }
        },
        React.createElement(
          'svg',
          { width: dimensions.width, height: dimensions.height },
          React.createElement(Cells, {
            scales: { xScale, yScale },
            dimensions: dimensions,
            margins: margins,
            baseTemperature: baseTemperature,
            monthlyVariance: monthlyVariance,
            abbreviations: abbreviations,
            onMouseOverCallback: d =>
              this.setState({
                isHovered: true,
                month: d.month,
                year: d.year,
                temperature: d3.format('.2f')(baseTemperature + d.variance)
              }),
            onMouseOutCallback: d =>
              this.setState({
                isHovered: false,
                month: 0,
                year: 0,
                temperature: 0
              })
          }),
          React.createElement(Axes, {
            scales: { xScale, yScale },
            dimensions: dimensions,
            margins: margins
          }),
          React.createElement(Tooltip, {
            scales: { xScale, yScale },
            abbreviations: abbreviations,
            isHovered: isHovered,
            month: month,
            year: year,
            temperature: temperature
          })
        )
      ),
      React.createElement(
        'div',
        { id: 'legend' },
        React.createElement(
          'svg',
          { width: dimensions.width, height: 120 },
          React.createElement(TempCells, {
            scale: tempScale,
            temp: [0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5]
          }),
          React.createElement(Axis, {
            axisFunction: d3.axisBottom,
            scale: tempScale,
            id: 'temp-axis',
            translate: `translate(0, 21)`,
            ticks: 11,
            tickSizeOuter: 0,
            tickSizeInner: 6,
            tickPadding: 4,
            tickFormat: d3.format('d')
          }),
          React.createElement(AxisLegend, {
            translate: `translate(${dimensions.width - 136}, 60)`,
            text: 'Temperature (°C)'
          })
        )
      ),
      React.createElement(
        'footer',
        null,
        React.createElement(
          'a',
          {
            href: 'https://github.com/b0mh0lt',
            target: '_blank',
            rel: 'noopener noreferrer',
            style: { color: '#607d8b', textDecoration: 'none', fontSize: '.875rem' }
          },
          React.createElement('i', {
            className: 'fab fa-github-alt fa-lg',
            style: { marginRight: '.3125rem', verticalAlign: 'text-bottom' }
          }),
          ' M. Bomholt'
        )
      )
    );
  }
}
class Axes extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { scales, dimensions, margins } = this.props;
    const { xScale, yScale } = scales;
    const { height, width } = dimensions;
    const { top, right, bottom, left } = margins;
    return React.createElement(
      'g',
      null,
      React.createElement(Axis, {
        axisFunction: d3.axisBottom,
        scale: xScale,
        id: 'x-axis',
        translate: `translate(0, ${height - bottom})`,
        ticks: 26,
        tickSizeOuter: 0,
        tickSizeInner: 6,
        tickPadding: 0,
        tickFormat: d3.format('d')
      }),
      React.createElement(Axis, {
        axisFunction: d3.axisLeft,
        scale: yScale,
        id: 'y-axis',
        translate: `translate(${left}, 0)`,
        ticks: 12,
        tickSizeOuter: 0,
        tickSizeInner: 6,
        tickPadding: 4,
        tickFormat: function(d) {
          var date = new Date(0);
          date.setMonth(d);
          return d3.timeFormat('%B')(date);
        }
      })
    );
  }
}
class Axis extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.renderAxis();
  }
  renderAxis() {
    const { axisFunction, scale, ticks, tickSizeOuter, tickSizeInner, tickPadding, tickFormat } = this.props;
    let axis = axisFunction()
      .scale(scale)
      .ticks(ticks)
      .tickSizeOuter(tickSizeOuter)
      .tickSizeInner(tickSizeInner)
      .tickPadding(tickPadding)
      .tickFormat(tickFormat);
    d3.select(this.axisElement).call(axis);
    d3.selectAll('#x-axis text')
      .attr('dx', '-10px')
      .attr('dy', '-2px');
    d3.selectAll('#x-axis .tick').each(function(d, i) {
      d3.select(this).classed('minor', i % 2 !== 0);
    });
    d3.selectAll('#temp-axis .tick').each(function(d, i) {
      d3.select(this).classed('minor', i % 2 !== 0);
    });
  }
  render() {
    return React.createElement('g', {
      id: this.props.id,
      ref: el => {
        this.axisElement = el;
      },
      transform: this.props.translate,
      style: { fontSize: 12 }
    });
  }
}
class AxisLegend extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { translate, text } = this.props;
    return React.createElement(
      'g',
      { transform: translate },
      React.createElement(
        'text',
        { style: { fontSize: '.625rem', fontWeight: 700, fill: '#263238', letterSpacing: 1 } },
        text
      )
    );
  }
}
class Cells extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { scales, dimensions, margins, baseTemperature, monthlyVariance } = this.props;
    const { xScale, yScale } = scales;
    const { height, width } = dimensions;
    const { top, right, bottom, left } = margins;
    const getColor = temp => {
      switch (true) {
        case temp >= 0 && temp < 1.5:
          return '#512da8';
          break;
        case temp >= 1.5 && temp < 3:
          return '#8e24aa';
          break;
        case temp >= 3 && temp < 4.5:
          return '#2196f3';
          break;
        case temp >= 4.5 && temp < 6:
          return '#29b6f6';
          break;
        case temp >= 6 && temp < 7.5:
          return '#4dd0e1';
          break;
        case temp >= 7.5 && temp < 9:
          return '#fff176';
          break;
        case temp >= 9 && temp < 10.5:
          return '#ffca28';
          break;
        case temp >= 10.5 && temp < 12:
          return '#ff9800';
          break;
        case temp >= 12 && temp < 13.5:
          return '#f4511e';
          break;
        case temp >= 13.5 && temp < 15:
          return '#d32f2f';
          break;
      }
    };
    const cell = monthlyVariance.map(d =>
      React.createElement('rect', {
        className: 'cell',
        'data-month': d.month - 1,
        'data-year': d.year,
        'data-temp': baseTemperature + d.variance,
        x: xScale(d.year + 0.25),
        y: yScale(d.month - 1.5),
        fill: getColor(baseTemperature + d.variance),
        width: Math.round((width - right - left) / ((monthlyVariance.length + 3) / 12)),
        height: (height - top - bottom) / 12,
        style: { cursor: 'crosshair' },
        onMouseOver: () => this.props.onMouseOverCallback(d),
        onMouseOut: () => this.props.onMouseOutCallback()
      })
    );
    return React.createElement('g', null, cell);
  }
}
class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { scales, isHovered, month, year, temperature, abbreviations } = this.props;
    const { xScale, yScale } = scales;
    const isNumber = d => {
      if (!isNaN(d)) {
        return d;
      }
    };
    return React.createElement(
      'g',
      { id: 'tooltip', 'data-year': year, style: { visibility: isHovered ? 'visible' : 'hidden', fontSize: 14 } },
      React.createElement('rect', {
        x: isNumber(xScale(year) - 84),
        y: isNumber(yScale(month - 0.25)),
        rx: 4,
        ry: 4,
        width: '96px',
        height: '48px',
        fill: '#263238',
        opacity: '.75'
      }),
      React.createElement(
        'text',
        {
          y: isNumber(yScale(month - 0.25)),
          fill: '#fafafa'
        },
        React.createElement('tspan', { x: isNumber(xScale(year) - 78), dy: 19 }, abbreviations[month - 1], ' ', year),
        React.createElement('tspan', { x: isNumber(xScale(year) - 78), dy: 19 }, temperature, ' \xB0C')
      )
    );
  }
}
class TempCells extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { scale, temp } = this.props;
    const getColor = temp => {
      switch (true) {
        case temp >= 0 && temp < 1.5:
          return '#512da8';
          break;
        case temp >= 1.5 && temp < 3:
          return '#8e24aa';
          break;
        case temp >= 3 && temp < 4.5:
          return '#2196f3';
          break;
        case temp >= 4.5 && temp < 6:
          return '#29b6f6';
          break;
        case temp >= 6 && temp < 7.5:
          return '#4dd0e1';
          break;
        case temp >= 7.5 && temp < 9:
          return '#fff176';
          break;
        case temp >= 9 && temp < 10.5:
          return '#ffca28';
          break;
        case temp >= 10.5 && temp < 12:
          return '#ff9800';
          break;
        case temp >= 12 && temp < 13.5:
          return '#f4511e';
          break;
        case temp >= 13.5 && temp < 15:
          return '#d32f2f';
          break;
      }
    };
    const cell = temp.map(d =>
      React.createElement('rect', {
        x: scale(d),
        y: 6,
        fill: getColor(d),
        width: '15px',
        height: '15px'
      })
    );
    return React.createElement('g', null, cell);
  }
}
ReactDOM.render(React.createElement(HeatMap, null), document.getElementById('root'));
