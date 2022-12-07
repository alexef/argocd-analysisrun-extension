import * as React from 'react';
import { TimeSeriesChart } from './component/TimeSeriesChart';

function fetchChartData(measurements: any): Array<{date: string}> {
  var data: Array<{date: string}> = [];

  data = measurements.map((m: {phase: string, value: string, finishedAt: string}) => ({
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
    <div>
      {props.resource.status.metricResults.map((metric: {name: string, phase: string, count: number, measurements: any}) => <div>
        <h1>Measurements of {metric.name}</h1>
        <p>Count: {metric.count}. Phase: {metric.phase}</p>
        <TimeSeriesChart data={fetchChartData(metric.measurements)} series={["value"]}/>
      </div>)}
    </div>
  );
}

export const component = Extension;