const projectName = 'bar-chart';
localStorage.setItem('example_project', 'D3: Bar Chart');

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: null,
      error: null,
      name: '',
      data: [],
      currentGDP: 0,
      constantGDP: 0,
      date: '----'
    };
    this.resizeContainer = this.resizeContainer.bind(this);
  }
  componentDidMount() {
    fetch('./data.json')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            name: result.name,
            data: result.data
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
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
  isTooltip({ isMove, currentGDP, constantGDP, date }) {
    this.setState({
      isMove: isMove,
      currentGDP: currentGDP,
      constantGDP: constantGDP,
      date: date
    });
  }
  render() {
    const { containerWidth, error, name, data, isMove, currentGDP, constantGDP, date } = this.state;
    let currentLCU = data.map(data => data[1]);
    let constantLCU = data.map(data => data[2]);
    let maxLCU = d3.max([d3.max(currentLCU), d3.max(constantLCU)]);
    let years = data.map(data => data[0]);
    const dimensions = { width: Math.max(containerWidth, 304), height: 480 };
    const margins = { top: 48, right: 4, bottom: 48, left: 24 };
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(years) - 1, d3.max(years) + 1])
      .range([margins.left, dimensions.width - margins.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, maxLCU])
      .range([dimensions.height - margins.bottom, margins.top]);
    if (error) {
      return React.createElement(
        'div',
        { style: { display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' } },
        error.message
      );
    } else {
      return React.createElement(
        'div',
        { style: { padding: '.5rem', textAlign: 'center' } },
        React.createElement(
          'div',
          {
            id: 'chart',
            ref: el => {
              this.chartContainer = el;
            },
            style: { maxWidth: 640, margin: '2em auto' }
          },

          React.createElement(TitleLegendTooltip, {
            name: name,
            isMove: isMove,
            currentGDP: currentGDP,
            constantGDP: constantGDP,
            date: date
          }),
          React.createElement(
            'svg',
            { width: dimensions.width, height: dimensions.height, style: { cursor: 'crosshair' } },
            React.createElement(Axes, {
              scales: { xScale, yScale },
              dimensions: dimensions,
              margins: margins
            }),
            React.createElement(Bars, {
              scales: { xScale, yScale },
              dimensions: dimensions,
              margins: margins,
              data: data,
              isTooltip: this.isTooltip.bind(this)
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
              style: { color: '#424242', textDecoration: 'none', fontWeight: 700, fontSize: '.875rem' }
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
}
const TitleLegendTooltip = ({ name, isMove, currentGDP, constantGDP, date }) => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      { id: 'title', style: { color: '#eee', fontSize: '1.5rem', margin: 0, letterSpacing: 2 } },
      name
    ),
    React.createElement(
      'div',
      { id: 'legend' },
      React.createElement(
        'div',
        { style: { padding: '.5rem .75rem', display: 'inline-block' } },
        React.createElement('span', {
          style: {
            height: '.5rem',
            width: '.5rem',
            borderRadius: '50%',
            backgroundColor: '#ec407a',
            display: 'inline-block'
          }
        }),
        React.createElement('span', { style: { fontSize: '.875rem' } }, ' Current LCU')
      ),
      React.createElement(
        'div',
        { style: { padding: '.5rem .75rem', display: 'inline-block' } },
        React.createElement('span', {
          style: {
            height: '.5rem',
            width: '.5rem',
            borderRadius: '50%',
            backgroundColor: '#26c6da',
            display: 'inline-block'
          }
        }),
        React.createElement('span', { style: { fontSize: '.875rem' } }, ' Constant LCU')
      )
    ),
    React.createElement(
      'h2',
      {
        style: {
          visibility: isMove ? 'visible' : 'hidden',
          fontSize: '1.25rem',
          fontWeight: 400,
          letterSpacing: 2,
          marginTop: '1em',
          marginBottom: '.5em'
        }
      },
      '(',
      date,
      ')'
    ),
    React.createElement(
      'div',
      { id: 'tooltip', style: { visibility: isMove ? 'visible' : 'hidden', fontSize: '.75rem' }, 'data-date': date },
      React.createElement(
        'p',
        { style: { color: '#ec407a', margin: '.5em' } },
        '\u20AC ',
        d3.format(',.2f')(currentGDP * 1000000000000)
      ),
      React.createElement(
        'p',
        { style: { color: '#26c6da', margin: '.5em' } },
        '\u20AC ',
        d3.format(',.2f')(constantGDP * 1000000000000)
      )
    )
  );
};
class Axes extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { scales, dimensions, margins } = this.props;
    let { xScale, yScale } = scales;
    let { height, width } = dimensions;
    let { top, right, bottom, left } = margins;
    return React.createElement(
      'g',
      null,
      React.createElement(Axis, {
        axisFunction: d3.axisBottom,
        scale: xScale,
        id: 'x-axis',
        translate: `translate(0, ${height - bottom})`,
        ticks: [10],
        tickSizeOuter: [0],
        tickSizeInner: [0],
        tickPadding: [12],
        tickFormat: d3.format('')
      }),
      React.createElement(Axis, {
        axisFunction: d3.axisLeft,
        scale: yScale,
        id: 'y-axis',
        translate: `translate(${left}, 0)`,
        ticks: [6],
        tickSizeOuter: [0],
        tickSizeInner: -width + right + left,
        tickPadding: [4],
        tickFormat: d3.format('.1f')
      }),
      React.createElement(AxisLegend, {
        top: top,
        left: left
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
    const { axisFunction, scale, id, ticks, tickSizeOuter, tickSizeInner, tickPadding, tickFormat } = this.props;
    let axis = axisFunction()
      .scale(scale)
      .ticks(ticks)
      .tickSizeOuter(tickSizeOuter)
      .tickSizeInner(tickSizeInner)
      .tickPadding(tickPadding)
      .tickFormat(tickFormat);
    d3.select(this.axisElement).call(axis);
    d3.select('#y-axis .tick').remove();
  }
  render() {
    return React.createElement('g', {
      id: this.props.id,
      ref: el => {
        this.axisElement = el;
      },
      transform: this.props.translate
    });
  }
}
const AxisLegend = ({ top, left }) => {
  return React.createElement(
    'g',
    null,
    React.createElement(
      'text',
      {
        y: top - 16,
        x: left - 24,
        style: { fontSize: '.625rem', fill: '#bdbdbd' }
      },
      'Trillion'
    )
  );
};
class Bars extends React.Component {
  constructor(props) {
    super(props);
  }
  isMouseOver(data) {
    let currentGDP = data.data[1];
    let constantGDP = data.data[2];
    let date = data.data[0];
    this.props.isTooltip({
      isMove: true,
      currentGDP: currentGDP,
      constantGDP: constantGDP,
      date: date
    });
  }
  isMouseOut() {
    this.props.isTooltip({
      isMove: false,
      currentGDP: 0,
      constantGDP: 0,
      date: '----'
    });
  }
  render() {
    const { scales, dimensions, margins, data } = this.props;
    let { xScale, yScale } = scales;
    let { height } = dimensions;
    let { bottom } = margins;
    const currentLCU = data.map(data =>
      React.createElement('rect', {
        className: 'bar',
        'data-date': data[0],
        'data-gdp': data[1],
        x: xScale(data[0]) - 3,
        y: yScale(data[1]),
        width: 3,
        height: height - bottom - yScale(data[1]),
        style: { fill: '#ec407a' },
        onMouseOver: () => this.isMouseOver({ data }),
        onMouseOut: () => this.isMouseOut()
      })
    );
    const constantLCU = data.map(data =>
      React.createElement('rect', {
        className: 'bar',
        'data-date': data[0],
        'data-gdp': data[2],
        x: xScale(data[0]),
        y: yScale(data[2]),
        width: 3,
        height: height - bottom - yScale(data[2]),
        style: { fill: '#26c6da' },
        onMouseOver: () => this.isMouseOver({ data }),
        onMouseOut: () => this.isMouseOut()
      })
    );
    return React.createElement('g', null, currentLCU, constantLCU);
  }
}
ReactDOM.render(React.createElement(BarChart, null), document.getElementById('root'));
