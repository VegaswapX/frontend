// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';

type BreadcrumbItems = {
    label: string,
    path: string,
    active?: boolean,
};

type PageTitleProps = {
    breadCrumbItems: Array<BreadcrumbItems>,
    title: string,
};

/**
 * PageTitle
 */
 const PageTitle = (props: PageTitleProps): React$Element<any> => {
    return (
        <Row>
            <Col>
                <div className="page-title-box">                    
                    <h4 className="page-title">{props.title}</h4>
                </div>
            </Col>
        </Row>
    );
};


export default PageTitle;
