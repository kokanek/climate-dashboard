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
import { Alert, Button, ButtonGroup, Card, CardHeader, CardBody, CardTitle, Row, Col} from "reactstrap";

const countries = ['usa', 'china', 'india', 'japan', 'germany', 'iran', 'saudi', 'korea', 'canada'];
const lineChartOptions = {
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
          min: 310,
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

const barChartOptions = {
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
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            min: 0,
            max: 3.5,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
};

const renderChart = (canvas, data, chartType) => {
  let ctx = canvas.getContext("2d");

  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
  gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
  gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

  console.log('chartType: ', data, chartType);
  data = data[chartType] || [];
  const labels = data.map(d => d["Year"]);
  const values = data.map(d => d["Total"]);

  return {
    labels: labels,
    datasets: [
      {
        label: "co2 emission",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: "#d048b6",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#d048b6",
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

function generateButtons(country, setCountry) {
  return countries.map(c =>
    <Button
      tag="label"
      className={classNames("btn-simple", {
        active: country === c,
      })}
      color="info"
      id="0"
      size="sm"
      onClick={() => {setCountry(c)}}
    >
      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
        {c.toUpperCase()}
      </span>
      <span className="d-block d-sm-none">
        <i className="tim-icons icon-single-02" />
      </span>
    </Button>
  )
}

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState({});
  // const [barChartData, setBarChartData] = React.useState({});
  const [country, setCountry] = React.useState('india');
  // const [barChartType, setBarChartType] = React.useState('mauna-loa');
  
  getLocation();
  React.useEffect(() => {
    fetch("/api/fossil")
      .then((res) => res.json())
      .then((data) => setbigChartData(data));
  }, []);
  // React.useEffect(() => {
  //   fetch("/api/co2/growth")
  //     .then((res) => res.json())
  //     .then((data) => setBarChartData(data));
  // }, []);


  return (
    <>
      <div className="content">
        <Alert color="danger">
          <span>This page shows the carbon emission (in metric tonnes) for some of the major countries in the world.</span>
        </Alert>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Historical data</h5>
                    <CardTitle tag="h2">Carbon emission (metric tonnes)</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      {generateButtons(country, setCountry)}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={(canvas) => renderChart(canvas, bigChartData, country)}
                    options={lineChartOptions}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Historical data</h5>
                    <CardTitle tag="h2">Annual co2 increase</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: barChartType === "mauna-loa",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => {setBarChartType('mauna-loa')}}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Mauna Loa study
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: barChartType === "global-average",
                        })}
                        onClick={() => {setBarChartType('global-average')}}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Global Average study
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={(canvas) => renderBarChart(canvas, barChartData, barChartType)}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Dashboard;
