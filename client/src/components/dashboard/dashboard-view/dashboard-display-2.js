import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from 'react-redux';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { getCompaniesByRevenue } from '../../../actions';

const DashboardView2 = () => {
  const { companies } = useSelector((state) => state.revenueData);

  companies.forEach((a) => delete a._id);
  const newCompanies = companies.map((a) => ({ name: a.name, y: a.total }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompaniesByRevenue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompaniesByRevenue]);

  NoDataToDisplay(Highcharts);
  Highcharts.setOptions({
    lang: {
      noData: 'Data is not available',
    },
  });

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Sales by Company',
    },
    yAxis: {
      title: {
        text: 'Total percent market share',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: ${y:,.0f}',
        },
      },
    },
    tooltip: {
      formatter() {
        return '<b>'+ this.point.name +'</b>: $'+ this.y.toFixed(2);
      },
    },
    series: [
      {
        name: 'Sales by Company',
        colorByPoint: true,
        data: newCompanies,
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
export default DashboardView2;