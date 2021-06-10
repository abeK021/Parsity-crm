import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from 'react-redux';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { getConversionPercentageOverall } from '../../../actions';

const DashboardView1 = () => {
  const percentage = useSelector((state) => state.percentageOverall);

  const dealsView = [];
  const wonDeals = Object.create(percentage);
  wonDeals.name = 'Contracts Won';
  wonDeals.y = percentage.conversion.conversionPercentageOverall;
  dealsView.push(wonDeals);

  const lostDeals = Object.create(percentage);
  lostDeals.name = 'Contracts Lost';
  lostDeals.y = 1 - percentage.conversion.conversionPercentageOverall;
  dealsView.push(lostDeals);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversionPercentageOverall());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getConversionPercentageOverall]);

  NoDataToDisplay(Highcharts);
  Highcharts.setOptions({
    lang: {
      noData: 'Data is not available',
    },
  });

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Conversion Percentage Overall',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Contracts',
        colorByPoint: true,
        data: dealsView,
        innerSize: '50%',
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
export default DashboardView1;
