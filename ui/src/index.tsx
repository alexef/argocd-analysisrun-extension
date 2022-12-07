import * as React from 'react';
import { TimeSeriesChart } from './component/TimeSeriesChart';

function fetchChartData(measurements: any): Array<{ date: string }> {
  var data: Array<{ date: string }> = [];

  data = measurements.map((m: { phase: string, value: string, finishedAt: string }) => ({
    date: m.finishedAt,
    phase: m.phase,
    value: parseFloat(m.value),
  })
  );
  return data;
}

export const Extension = (props: {
  tree: any;
  resource: any;
}) => {
  if (!props.resource.status.metricResults) {
    return <div>No metric results recorded</div>;
  }

  return (
    <div className='white-box'>
      {props.resource.status.metricResults.map((metric: { name: string, phase: string, count: number, measurements: any }) => <div>
        <h4>Measurements of {metric.name}</h4>
        <div>Phase: {metric.phase}. Count: {metric.count}</div>
        <div>
          <TimeSeriesChart data={fetchChartData(metric.measurements)} series={["value"]} />
        </div>
      </div>)}
    </div>
  );
}

export const component = Extension;