import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from 'react-redux';

import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { getRevenueByMonth } from '../../../actions';

const DashboardView4 = () => {
  const { revenueByMonth } = useSelector((state) => state.monthlyRevenue);

  // renamed the revenue key, sorted the array by month/year, reversed the array and sliced it to only show the last 6 months of data
  const totalRevenue = revenueByMonth.map((a) => ({
    month: a.month,
    y: a.total,
  }));
  totalRevenue.reverse().sort((a, b) => a.month - b.month);

  const lastSixMonths = totalRevenue.slice(
    totalRevenue.length - 6,
    totalRevenue.length
  );

  // created an array for the months, which is rendered on the X-axis in the graph
  const months = lastSixMonths.map((value) => value.month);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRevenueByMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRevenueByMonth]);

  NoDataToDisplay(Highcharts);
  Highcharts.setOptions({
    lang: {
      thousandsSep: ',',
      noData: 'Data is not available',
    }
  });

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Sales By Month (US$)',
    },
    xAxis: {
      categories: months,
      title: {
        text: 'Months',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Sales',
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      formatter() {
        return `<b>$${this.y.toFixed(2)}</b>`;
      },
    },
    series: [
      {
        name: 'Sales',
        colorByPoint: true,
        data: lastSixMonths,
        showInLegend: false,
      },
    ],
  };

  const App = () => (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );

  return (
    <div className="text">
      <App />
    </div>
  );
};
export default DashboardView4;
