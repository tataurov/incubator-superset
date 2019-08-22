import { t } from '@superset-ui/translation';
import { nonEmpty } from '../validators';

export default {
  requiresTime: false,
  controlPanelSections: [
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme', 'label_colors'],
        ['x_axis_format'],
      ],
    },
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['adhoc_filters'],
        ['row_limit'],
        ['groupby'],
      ],
    },

    {
      label: t('Bar chart'),
      expanded: true,
      controlSetRows: [
        ['metric', 'y_axis_format'],
      ],
    },
    {
      label: t('Line Chart'),
      expanded: true,
      controlSetRows: [
        ['metric_2'],
      ],
    },
  ],
  controlOverrides: {
    color_scheme: {
      renderTrigger: false,
    },
    metric_2: {
      label: t('Line Metric'),
    },
    metric: {
      label: t('Bar Metric'),
    },
  },
};
