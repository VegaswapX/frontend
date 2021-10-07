// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import PageTitle from '../../../components/PageTitle';

import Statistics from './Statistics';
import CampaignsChart from './CampaignsChart';
import Performers from './Performers';

const BoostPage = (): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    // { label: 'Dashboard', path: '/dashboard/crm' },
                    // { label: 'CRM', path: '/dashboard/crm', active: true },
                ]}
                title={'Boost Pool'}
            />

            <Statistics />

            <Row>
                <Col lg={5}>
                    <CampaignsChart />
                </Col>
                <Col lg={7}>
                <Performers />
                </Col>
            </Row>
            
        </>
    );
};

export default BoostPage;
