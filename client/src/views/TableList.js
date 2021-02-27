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
import React, {useEffect, useState} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  Button
} from "reactstrap";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

const markers = [
  {
    markerOffset: -30,
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037]
  }
];

function Tables() {
  const [data, setData] = useState([]);
  const [modalMap, setModalMap] = useState(false);
  const [mapData, setMapData] = useState({title: 'test', markers: []});

  useEffect(() => {
    fetch("/api/nasa-events")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const toggleModalMap = (row) => {
    console.log('toggling modal map', row);

    if (row && row.geometries && row.geometries[0]) {
      const date = new Date(row.geometries[0].date);
      const location = {
        markerOffset: -30,
        name: date.toDateString(),
        coordinates: row.geometries[0].coordinates
      }
      setMapData({title: row.title, markers: [location]});
    }

    setModalMap(!modalMap);
  };

  function getTableRows(data) {
    console.log('get table rows for data: ', data);
    if (!data || !data.events) {
      return <></>;
    }
    return data.events.map(row => 
      <tr key={row.id} onClick={() => toggleModalMap(row)} style={{cursor: 'pointer'}}>
        <td>🌧</td>
        <td>{row.title}</td>
        <td>{row.categories[0].title}</td>
        <td className="table-icon">
          <a href={row.sources[0].url} target="_blank"><i className="tim-icons icon-double-right" /></a>
        </td>
      </tr>
    ) 
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h1">Natural events from EONET</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th></th>
                      <th>Event</th>
                      <th>Category</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTableRows(data)}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        modalClassName="modal-search"
        isOpen={modalMap}
        toggle={toggleModalMap}
      >
        <ModalHeader>
          <strong>{mapData.title}</strong>
          <Button onClick={() => setModalMap(false)}>X</Button>
        </ModalHeader>
        <div>
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({geographies}) => geographies.map(geo =>
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              )}
            </Geographies>
            {mapData.markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <g
                  fill="none"
                  stroke="#FF5533"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(-12, -24)"
                >
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g>
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontWeight: 600 }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </Modal>
    </>
  );
}

export default Tables;
