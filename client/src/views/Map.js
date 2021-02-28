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

// reactstrap components
import { Card, CardHeader, Input, Row, Col, Button, Alert, CardTitle, CardBody } from "reactstrap";

function Map() {
  const [searchText, setSearchText] = React.useState("");
  const [siteStatus, setSiteStatus] = React.useState("");

  function onClickSearchButton() {
    if (searchText.trim() === "") {
      return;
    }
    setSiteStatus(undefined);
    fetch(`/api/green-check?testUrl=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('green check api: ', data)
        setSiteStatus(data)
      });
  }

  return (
    <>
      <div className="content">
        <Alert color="success">
          <span>Search for any website here to get to know whether it is "green" or not using the green web foundation API.</span>
        </Alert>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">☘️{" "}The Green Web Foundation</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{height: '50vh', marginLeft: 8}}>
                  <Row style={{display: 'flex', alignItems: 'center'}}>
                    <Col sm="8">
                      <Input placeholder="Type the URL without http://" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    </Col>
                    <Col sm="2">
                      <Button onClick={onClickSearchButton} >Search</Button>
                    </Col>
                  </Row>
                  <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    {siteStatus === undefined && <p>Loading...</p>}
                    {siteStatus === "" && <p>Please search for a site to check status...</p>}
                    {typeof siteStatus == "object" && <h1>{siteStatus.green && '☘️ This site is green ☘️'}</h1>}
                    {typeof siteStatus == "object" && <h1>{!siteStatus.green && '🍂 This site is grey 🍂'}</h1>}
                  </Row>
                </div>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
