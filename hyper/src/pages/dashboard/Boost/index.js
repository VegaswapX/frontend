// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Statistics from './Statistics';
import CampaignsChart from './CampaignsChart';
import Performers from './Performers';
// components
import PageTitle from '../../../components/PageTitle';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import styled from 'styled-components';


const BoostPage = (): React$Element<React$FragmentType> => {
    
    const notify = () => toast("Custom style",{
        className: 'success',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
      });


    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    // { label: 'Dashboard', path: '/dashboard/crm' },
                    // { label: 'CRM', path: '/dashboard/crm', active: true },
                ]}
                title={'Boost Pool'}
            />

<div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer
  progressClassName="toastProgress"
  bodyClassName="toastBody"
/>
      </div>

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
