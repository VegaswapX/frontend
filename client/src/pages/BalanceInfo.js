// @flow
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Chart from "react-apexcharts";
import classNames from "classnames";

const BalanceInfo = (props) => {
  //  default options
  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
      },
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    colors: props.colors || ["#008FFB"],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  // type - defaulted to bar
  const type = props.type || "bar";

  // chart data
  const series = [{ name: props.name || "Data", data: props.data || [] }];

  // textClass - defaulted to text-muted
  const textClass = props.textClass || "text-muted";

  return (
    <Card className={classNames("widget-flat", props.bgClass)}>
      <Card.Body>
        <Row className="align-items-center">
          <Col className="col-6">
            <h5
              // className={classNames('fw-normal', 'mt-0', 'text-truncate', textClass)}
              style={{ color: "white", fontSize: "16pt", marginTop: "0px" }}
              title={props.description}
            >
              {props.title}
            </h5>

            {/* <img src={props.bimg} /> */}

            <img src={`${props.bimg}`} alt="currency"></img>
            <h4 className="my-2 py-1" style={{ color: "white" }}>
              {props.stats}
            </h4>

            {props.trend && (
              <p className={`mb-0 ${textClass}`}>
                <span className={classNames(props.trend.textClass, "me-2")}>
                  <i className={`${props.trend.icon}`}></i> {props.trend.value}
                </span>
              </p>
            )}
          </Col>

          <Col className="col-6">
            <div className="text-end">
              <Chart
                className="apex-charts"
                options={options}
                series={series}
                type={type}
                height={60}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BalanceInfo;
