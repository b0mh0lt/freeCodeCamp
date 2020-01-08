const projectName = 'scatter-plot';
localStorage.setItem('example_project', 'D3: Scatter Plot');

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: null,
      data: []
    };
    this.resizeContainer = this.resizeContainer.bind(this);
  }
  componentDidMount() {
    fetch('./data.json')
      .then(res => res.json())
      .then(res => this.setState({ data: res }));
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
  isTooltip({ isMove, year, winner, nationality, vehicle, time }) {
    this.setState({
      isMove: isMove,
      year: year,
      winner: winner,
      nationality: nationality,
      vehicle: vehicle,
      time: time
    });
  }
  render() {
    const { containerWidth, data, isMove, year, winner, nationality, vehicle, time } = this.state;
    const getMinTime = d => {
      let [mm, ss, ll] = d.Time.split(/[:.]/).map(x => Number(x));
      let date = new Date();
      date.setHours(0);
      date.setMinutes(mm - 1);
      date.setSeconds(30);
      date.setMilliseconds(0);
      return date;
    };
    const getMaxTime = d => {
      let [mm, ss, ll] = d.Time.split(/[:.]/).map(x => Number(x));
      let date = new Date();
      date.setHours(0);
      date.setMinutes(mm + 1);
      date.setSeconds(30);
      date.setMilliseconds(0);
      return date;
    };
    let minYear = d3.min(data, d => d.Year) - 4;
    let maxYear = d3.max(data, d => d.Year) + 1;
    let minTime = d3.min(data, d => getMinTime(d));
    let maxTime = d3.max(data, d => getMaxTime(d));
    const dimensions = { width: Math.max(containerWidth, 359), height: 560 };
    const margins = { top: 24, right: 24, bottom: 24, left: 48 };
    const xScale = d3
      .scaleLinear()
      .domain([minYear, maxYear])
      .range([margins.left, dimensions.width - margins.right]);
    const yScale = d3
      .scaleTime()
      .domain([maxTime, minTime])
      .range([dimensions.height - margins.bottom, margins.top]);
    return React.createElement(
      'div',
      { style: { padding: '0.5rem', textAlign: 'center' } },
      React.createElement(
        'h1',
        { id: 'title', style: { margin: '.75rem 0 0', fontSize: '1.75rem', color: '#212121' } },
        'Pikes Peak'
      ),
      React.createElement(
        'h2',
        { style: { margin: 0, fontSize: '1.25rem', color: '#9e9e9e', fontWeight: 400 } },
        'International Hill Climb'
      ),
      React.createElement(
        'div',
        {
          id: 'graph',
          ref: el => {
            this.chartContainer = el;
          },
          style: { maxWidth: 640, margin: '.5rem auto 2rem', position: 'relative' }
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
          'svg',
          { width: dimensions.width, height: dimensions.height, style: { cursor: 'crosshair' } },
          React.createElement(Axes, {
            scales: { xScale, yScale },
            dimensions: dimensions,
            margins: margins
          }),
          React.createElement(Dots, {
            scales: { xScale, yScale },
            dimensions: dimensions,
            margins: margins,
            data: data,
            isTooltip: this.isTooltip.bind(this)
          })
        )
      ),
      React.createElement(
        'div',
        { id: 'legend' },
        React.createElement(
          'p',
          {
            style: {
              fontSize: '.6875rem',
              fontWeight: 700,
              letterSpacing: 1,
              textAlign: 'left',
              margin: '0 auto',
              color: '#424242'
            }
          },
          React.createElement('span', { style: { margin: '0 .5rem' } }, 'Legend:')
        ),
        React.createElement(
          'div',
          {
            style: {
              fontSize: '.625rem',
              padding: '.375rem',
              margin: '0 auto 3em',
              textAlign: 'left',
              display: 'flex',
              flexWrap: 'wrap'
            }
          },
          React.createElement(
            'div',
            { style: { flex: '1 210px', minWidth: 0 } },
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#ff9100',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'no official competition')
            ),
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#ff1744',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'was run on a shortened course')
            ),
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#d500f9',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'the course was 0% paved')
            ),
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#651fff',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'the course was 6% paved')
            ),
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#3d5afe',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'the course was 21% paved')
            )
          ),
          React.createElement(
            'div',
            { style: { flex: '1 210px', minWidth: 0 } },
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#2979ff',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'the course was 35% paved')
            ),
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#00b0ff',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'the course was 46% paved')
            ),
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#00e5ff',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'the course was 57% paved')
            ),
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#1de9b6',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'the course was 76% paved')
            ),
            React.createElement(
              'p',
              { style: { margin: '0 auto', width: 210 } },
              React.createElement('span', {
                style: {
                  height: '.5rem',
                  width: '.5rem',
                  margin: '0 .5rem',
                  backgroundColor: '#00e676',
                  borderRadius: '50%',
                  display: 'inline-block'
                }
              }),
              React.createElement('span', null, 'the course was 100% paved')
            )
          )
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
            style: { color: '#757575', textDecoration: 'none', fontSize: '.875rem' }
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
const Tooltip = ({ isMove, year, winner, nationality, vehicle, time, dimensions }) => {
  return React.createElement(
    'div',
    {
      id: 'tooltip',
      'data-year': year,
      style: {
        visibility: isMove ? 'visible' : 'hidden',
        backgroundColor: 'rgba(158, 158, 158, .5)',
        color: '#424242',
        padding: '0 .75rem',
        borderRadius: 4,
        textAlign: 'left',
        fontSize: '.8125rem',
        position: 'absolute',
        top: dimensions.height - 200,
        left: dimensions.width - 275,
        width: 221
      }
    },
    React.createElement(
      'div',
      { style: { margin: '.375rem 0' } },
      React.createElement('span', { style: { letterSpacing: 1, fontWeight: 700 } }, time)
    ),
    React.createElement(
      'div',
      { style: { margin: '.375rem 0' } },
      React.createElement('img', { src: nationality, style: { margin: '0 .75rem -.0625rem 0' } }),
      React.createElement('span', null, winner, ' (', year, ')')
    ),
    React.createElement('div', { style: { margin: '.375rem 0' } }, React.createElement('span', null, vehicle))
  );
};
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
        ticks: 10,
        tickSizeOuter: 0,
        tickSizeInner: top + bottom - height,
        tickPadding: 8,
        tickFormat: d3.format('d')
      }),
      React.createElement(AxisLegend, {
        transform: `translate(${width - right - 128}, ${height - bottom - 8})`,
        text: 'Year (1916-2018)'
      }),
      React.createElement(Axis, {
        axisFunction: d3.axisLeft,
        scale: yScale,
        id: 'y-axis',
        translate: `translate(${left}, 0)`,
        ticks: d3.timeMinute.every(2),
        tickSizeOuter: 0,
        tickSizeInner: right + left - width,
        tickPadding: 8,
        tickFormat: d3.timeFormat('%M:%S')
      }),
      React.createElement(AxisLegend, {
        transform: `translate(${left + 16}, ${top + 116}), rotate(-90)`,
        text: 'Time (minutes)'
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
  }
  render() {
    return React.createElement('g', {
      id: this.props.id,
      ref: el => {
        this.axisElement = el;
      },
      transform: this.props.translate,
      style: { fontSize: '.625rem' }
    });
  }
}
class AxisLegend extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { transform, text } = this.props;
    return React.createElement(
      'g',
      { transform: transform },
      React.createElement(
        'text',
        { style: { fontSize: '.6875rem', fontWeight: 700, fill: '#424242', letterSpacing: 1 } },
        text
      )
    );
  }
}
class Dots extends React.Component {
  constructor(props) {
    super(props);
  }
  isMouseOver(data) {
    this.props.isTooltip({
      isMove: true,
      year: data.Year,
      winner: data.Winner,
      nationality: './img/' + data.Nationality + '.png',
      vehicle: data.Vehicle,
      time: data.Time
    });
  }
  isMouseOut() {
    this.props.isTooltip({
      isMove: false,
      year: null,
      winner: null,
      nationality: null,
      vehicle: null,
      time: null
    });
  }
  render() {
    const { scales, dimensions, margins, data } = this.props;
    const { xScale, yScale } = scales;
    let unofficial = { fill: '#ff9100' };
    let short = { fill: '#ff1744' };
    let p0 = { fill: '#d500f9' };
    let p6 = { fill: '#651fff' };
    let p21 = { fill: '#3d5afe' };
    let p35 = { fill: '#2979ff' };
    let p46 = { fill: '#00b0ff' };
    let p57 = { fill: '#00e5ff' };
    let p76 = { fill: '#1de9b6' };
    let p100 = { fill: '#00e676' };
    const getTime = d => {
      let [mm, ss, ll] = d.Time.split(/[:.]/).map(x => Number(x));
      let date = new Date();
      date.setHours(0);
      date.setMinutes(mm);
      date.setSeconds(ss);
      date.setMilliseconds(ll);
      return date;
    };
    const dot = data.map(d =>
      React.createElement('circle', {
        className: 'dot',
        'data-xvalue': d.Year,
        'data-yvalue': getTime(d),
        cx: xScale(d.Year),
        cy: yScale(getTime(d)),
        r: 4,
        style: eval(d.Legend),
        onMouseOver: () => this.isMouseOver(d),
        onMouseOut: () => this.isMouseOut()
      })
    );
    return React.createElement('g', null, dot);
  }
}
ReactDOM.render(React.createElement(ScatterPlot, null), document.getElementById('root'));
