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

function renderArgs(args: any[], template: string): string {
  let renderedString = template
  args.map(a => {
    renderedString = renderedString.replace(`{{args.${a.name}}}`, a.value);
  })
  return renderedString
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
      Variables: {props.resource.spec.args?.map((arg: { name: string, value: string }) => <span style={{ borderRadius: 5, backgroundColor: "#CCD6DD", padding: 4, margin: 2, display: "inline-block" }}>{arg.name}:{arg.value}</span>)}
      {props.resource.status.metricResults.map((metric: { name: string, phase: string, count: number, measurements: any }) => <div>
        <h4>Measurements of {metric.name}</h4>
        <div>Phase: {metric.phase}. Count: {metric.count}</div>
        <div>
          <TimeSeriesChart data={fetchChartData(metric.measurements)} series={["value"]} />
        </div>
        {props.resource.spec.metrics?.filter((m: { name: string; }) => m.name == metric.name).map((metricSpec: { provider: { job: any; datadog: { query: string; interval: string; }; }; successCondition: string; }) =>
          <details>
            <summary>Details</summary>
            {metricSpec.provider.datadog?.query &&
              <>
                <b>Interval</b>
                <pre>{renderArgs(props.resource.spec.args || [], metricSpec.provider.datadog.interval)}</pre>
                <b>Query</b>
                <pre>{renderArgs(props.resource.spec.args || [], metricSpec.provider.datadog.query)}</pre>
                <b>Success Condition</b>
                <pre>{renderArgs(props.resource.spec.args || [], metricSpec.successCondition)}</pre>
              </>}

            {metricSpec.provider.job &&
              <>
                <b>Job Name</b>
                <pre>{metric.measurements[0].metadata["job-name"]}</pre></>}
          </details>)}
      </div>)}
    </div>
  );
}

export const component = Extension;