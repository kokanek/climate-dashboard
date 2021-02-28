/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import { Alert, Card, CardHeader, CardBody, CardTitle, Row, Col} from "reactstrap";

const seaLevelChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

const glacierChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          min: -30,
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

const renderChart = (canvas, data, key) => {
  let ctx = canvas.getContext("2d");

  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
  gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
  gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

  data = data || [];
  let labels;
  let label;
  
  if (key === 'CSIRO Adjusted Sea Level') {
    labels = data.map(d => d["Year"].split('-')[0]);
    label = 'sea level';
  } else {
    labels = data.map(d => d["Year"].toString());
    label = 'glacier mass'
  }

  const values = data.map(d => d[key]);

  return {
    labels: labels,
    datasets: [
      {
        label: label,
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: "#d048b6",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#d048b6",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 0.5,
        data: values,
      },
    ],
  };
};

const renderBarChart = (canvas, data, chartType) => {
  let ctx = canvas.getContext("2d");

  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
  gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
  gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

  data = data[chartType] || [];
  const labels = data.map(d => d["Year"].split('-')[0]);
  const values = data.map(d => d["Annual Increase"]);

  return {
    labels: labels,
    datasets: [
      {
        label: "co2 increase",
        fill: true,
        backgroundColor: gradientStroke,
        hoverBackgroundColor: gradientStroke,
        borderColor: "#d048b6",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: values,
      },
    ],
  };
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(console.log);
  } else {
    alert('geolocation not supported')
  }
}

function Dashboard(props) {
  const [seaLevelData, setSeaLevelData] = React.useState([]);
  // const [barChartData, setBarChartData] = React.useState({});
  const [glacierMassData, setGlacierMassData] = React.useState([]);
  // const [barChartType, setBarChartType] = React.useState('mauna-loa');
  
  getLocation();
  React.useEffect(() => {
    fetch("/api/sea-level")
      .then((res) => res.json())
      .then((data) => setSeaLevelData(data));
  }, []);
  React.useEffect(() => {
    fetch("/api/glacier-mass")
      .then((res) => res.json())
      .then((data) => setGlacierMassData(data));
  }, []);


  return (
    <>
      <div className="content">
        <Alert color="danger">
          <span>This page highlights the correlation between the rising sea level and declining glacier mass by using data from a CSIRO study and the WGMS (World Glacier Monitoring Service).</span>
        </Alert>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Historical data</h5>
                    <CardTitle tag="h2">Sea Level (inches)</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={(canvas) => renderChart(canvas, seaLevelData, 'CSIRO Adjusted Sea Level')}
                    options={seaLevelChartOptions}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Historical data</h5>
                    <CardTitle tag="h2">Glacier mass</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={(canvas) => renderChart(canvas, glacierMassData, 'Mean cumulative mass balance')}
                    options={glacierChartOptions}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
