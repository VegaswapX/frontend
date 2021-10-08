// @flow
import React from 'react';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
// import PageTitle from '../components/PageTitle';


const StakeForm = () => {
    const notify = () => toast("Custom style",{
        className: 'success',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
      });

    return (
        <Card>
            <Card.Body>
                <h4 className="mb-3 header-title">Stake</h4>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="exampleEmail2">Amount</Form.Label>
                        <Form.Control type="email" name="email" id="exampleEmail2" placeholder="... $" />
                        <Form.Text>Amount to stake</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="examplePassword2">Duration</Form.Label>
                        <Form.Control                            
                            name="duration"
                            id="duration"
                            placeholder="duration"
                            defaultValue="30"
                        />
                        <Form.Text>Days to stake</Form.Text>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}

                    <Button variant="primary" onClick={notify}>
                        Stake
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};


const Stake = (): React$Element<React$FragmentType> => {
    return (
        <React.Fragment>            

            <Row>
                <Col lg={8}>
                    <StakeForm />
                </Col>

                {/* <Col lg={6}>
                    <HorizontalForm />
                </Col> */}
            </Row>

           
        </React.Fragment>
    );
};
export default Stake;
