'use client';

import { useEffect } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";


export default function OptionsMenu({ setBoardSize })
{
    // Set default values when the component is first rendered
    useEffect(() => {
        setBoardSize(1);
    }, [setBoardSize]);

    return (
        <Container className="options-box">
            <h5>Game Options:</h5>
            <hr />
            <Row>
                <Col>
                    <InputGroup className="mb-2">
                        <InputGroup.Text id="boardSize-label">Choose board size</InputGroup.Text>
                        <Form.Select defaultValue="1" onChange={(e) => { setBoardSize(parseInt(e.target.value)) }} aria-label="Select box for board size">
                            <option value="0">Small</option>
                            <option value="1">Medium</option>
                            <option value="2">Large</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
}