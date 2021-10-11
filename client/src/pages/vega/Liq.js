// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import PageTitle from '../../components/PageTitle';



const LiqPage = (): React$Element<React$FragmentType> => {
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Tables', path: '/ui/tables/basic' },
                    { label: 'Basic Tables', path: '/ui/tables/basic', active: true },
                ]}
                title={'Liquidity'}
            />

            <Row>
                <Col xl={6}>
                    <p>Teaser for providing liquidity for the Vega DEX...</p>
                </Col>

                <Col xl={6}>
                </Col>
            </Row>

            
        </React.Fragment>
    );
};

export default LiqPage;
