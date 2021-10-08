// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {BNBBalance, Vgabalance, USDTBalance} from './Balance.js'

// components
import StatisticsChartWidget from '../../../components/StatisticsChartWidget';

const Balances = (): React$Element<React$FragmentType> => {
    return (
        <React.Fragment>
            <Row>
                <Col lg={6} xl={3}>
                    <BNBBalance />
                    
                </Col>

                <Col lg={6} xl={3}>                    
                    <Vgabalance />
                </Col>
                <Col lg={6} xl={3}>
                    <USDTBalance />
                </Col>

                <Col lg={6} xl={3}>
                    <StatisticsChartWidget
                        description="Staked"
                        title="LP tokens"
                        stats="10"
                        // trend={{ textClass: 'text-success', icon: 'mdi mdi-arrow-up-bold', value: '11.7%' }}
                        colors={['#0acf97']}
                        data={[47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]}></StatisticsChartWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Balances;
