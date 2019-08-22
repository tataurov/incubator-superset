import React from 'react';
import PropTypes from 'prop-types';

import { kebabCase, throttle } from 'lodash';
import d3 from 'd3';
import nv from 'nvd3';

import { isDefined } from '@superset-ui/core';

import { CategoricalColorNamespace } from '@superset-ui/color';
import { getNumberFormatter, NumberFormats } from '@superset-ui/number-format';
import { getTimeFormatter, smartDateVerboseFormatter } from '@superset-ui/time-format';
import 'nvd3/build/nv.d3.min.css';


import { Creatable } from 'react-select';
import { Button } from 'react-bootstrap';
import { t } from '@superset-ui/translation';
import './LineBarCustom.css';

export const DEFAULT_COLORS = [
  '#313695',
  '#4575b4',
  '#74add1',
  '#abd9e9',
  '#fee090',
  '#fdae61',
  '#f46d43',
  '#d73027',
];

export function getTimeOrNumberFormatter(format) {
  return format === 'smart_date' ? smartDateFormatter : getNumberFormatter(format);
}

const propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      y: PropTypes.number,
    }),
  ).isRequired,
  bands: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  colorScale: PropTypes.string,
  mode: PropTypes.string,
  offsetX: PropTypes.number,
  title: PropTypes.string,
  yDomain: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
  className: '',
  width: 800,
  height: 20,
  bands: DEFAULT_COLORS.length >> 1,
  colors: DEFAULT_COLORS,
  colorScale: 'series',
  mode: 'offset',
  offsetX: 0,
  title: '',
  yDomain: undefined,
};

class LineBarCustom extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  componentWillUnmount() {
    this.canvas = null;
  }

  drawChart() {
    if (!this.canvas) { return false; }

    const {
      data,
      width: maxWidth,
      height: maxHeight,
      baseColor,
      bottomMargin,
      colorScheme,
      comparisonType,
      contribution,
      entity,
      leftMargin,
      lineInterpolation = 'linear',
      maxBubbleSize,
      orderBars,
      pieLabelType,
      reduceXTicks = false,
      showBarValue,
      showBrush,
      showControls,
      showLabels,
      showLegend,
      showMarkers,
      sizeField,
      useRichTooltip,
      vizType,
      xAxisFormat,
      numberFormat,
      xAxisLabel,
      xAxisShowMinMax = false,
      xField,
      xIsLogScale,
      xTicksLayout,
      yAxisFormat,
      yAxis2Format,
      yAxisBounds,
      yAxisLabel,
      yAxisShowMinMax = false,
      yField,
      yIsLogScale,
    } = this.props;

    const colorFn = CategoricalColorNamespace.getScale(colorScheme);

    const d3Element = d3.select(this.canvas);

    d3Element.classed('superset-legacy-chart-nvd3', true);
    d3Element.classed(`superset-legacy-chart-nvd3-${kebabCase(vizType)}`, true);

    let svg = d3Element.select('svg');

    if (svg.empty()) {
      svg = d3Element.append('svg');
    }
    let _this = this;

    nv.addGraph(function() {
      var
        data = _this.props.data,
        chart = nv.models.multiChart()
          .margin({top: 30, right: 60, bottom: 100, left: 70})
          //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
        ;

      if (colorScheme) {
        chart.color(data.map((serie, i) => colorFn(i)));
      } else {
        chart.color(DEFAULT_COLORS);
      }


      if (xAxisFormat) {
        chart.xAxis.tickFormat(getTimeOrNumberFormatter(xAxisFormat));
      }

      console.log(chart.xAxis);
      if (yAxisFormat) {
        chart.yAxis1
          .tickFormat(getTimeOrNumberFormatter(yAxisFormat));
      } else {
        chart.yAxis1
          .tickFormat(function(d) { return '$' + d3.format(',f')(d) });
      }

      svg
        .datum(data)
        .transition()
        .duration(500)
        .call(chart);

      return chart;
    });

  }

  render() {
    const { className, title, width, height } = this.props;

    return (
      <div className={`horizon-row ${className}`}>
        <span className="title">{title}</span>
        <div
          width={width}
          height={height}
          ref={c => {
            this.canvas = c;
          }}
        />
      </div>
    );
  }
}

LineBarCustom.propTypes = propTypes;
LineBarCustom.defaultProps = defaultProps;

export default LineBarCustom;
