function isTruthy(a) {
  if ("boolean" == typeof a) {
    return a;
    return "string" == typeof a ? 0 <= ["yes", "y", "true", "t", "1"].indexOf(a.toLowerCase()) : !!a;
  }
}

import { formatLabel } from '@superset-ui/legacy-preset-chart-nvd3/lib/utils';

export default function transformProps(chartProps) {
  const {
    width,
    height,
    annotationData,
    datasource,
    formData,
    onError,
    onAddFilter,
    payload,
  } = chartProps;

  const {
    annotationLayers,
    barStacked,
    bottomMargin,
    colorPicker,
    colorScheme,
    comparisonType,
    contribution,
    donut,
    entity,
    labelsOutside,
    leftMargin,
    lineInterpolation,
    maxBubbleSize,
    orderBars,
    pieLabelType,
    reduceXTicks,
    richTooltip,
    sendTimeRange,
    showBarValue,
    showBrush,
    showControls,
    showLabels,
    showLegend,
    showMarkers,
    size,
    stackedStyle,
    vizType,
    x,
    xAxisFormat,
    xAxisLabel,
    xAxisShowminmax,
    numberFormat,
    xLogScale,
    xTicksLayout,
    y,
    yAxisFormat,
    yAxis2Format,
    yAxisBounds,
    yAxisLabel,
    yAxisShowminmax,
    yLogScale,
  } = formData;

  const rawData = payload.data || [];

  const data = Array.isArray(rawData)
    ? rawData.map(row => ({
    ...row,
    key: formatLabel(row.key, datasource.verboseMap),
  }))
    : rawData;

  return {
    width,
    height,
    data,
    annotationData,
    annotationLayers,
    areaStackedStyle: stackedStyle,
    baseColor: colorPicker,
    bottomMargin,
    colorScheme,
    comparisonType,
    contribution,
    entity,
    isBarStacked: barStacked,
    isDonut: donut,
    isPieLabelOutside: labelsOutside,
    leftMargin,
    lineInterpolation,
    maxBubbleSize: parseInt(maxBubbleSize, 10),
    numberFormat,
    onBrushEnd: isTruthy(sendTimeRange)
      ? timeRange => {
      onAddFilter('__time_range', timeRange, false, true);
    }
      : undefined,
    onError,
    orderBars,
    pieLabelType,
    reduceXTicks,
    showBarValue,
    showBrush,
    showControls,
    showLabels,
    showLegend,
    showMarkers,
    sizeField: size,
    useRichTooltip: richTooltip,
    vizType,
    xAxisFormat,
    xAxisLabel,
    xAxisShowMinMax: xAxisShowminmax,
    xField: x,
    xIsLogScale: xLogScale,
    xTicksLayout,
    yAxisFormat,
    yAxis2Format,
    yAxisBounds,
    yAxisLabel,
    yAxisShowMinMax: yAxisShowminmax,
    yField: y,
    yIsLogScale: yLogScale,
  };
}
