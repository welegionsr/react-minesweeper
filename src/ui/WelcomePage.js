'use client';

import { Button, Card, Container, Row } from "react-bootstrap";
import OptionsMenu from "./OptionsMenu";


export default function WelcomePage({onStart, setBoardSize})
{
    return (
        <Container className="mt-2">
            <Row className="justify-content-center">
                <Card className="text-center" style={{ width: '26rem', padding: 0 }}>
                    <Card.Img variant='top' src='logo.webp' />
                    <Card.Header><h4>Minesweeper</h4></Card.Header>
                    <Card.Body>
                        <p className="mb-4">
                            This is a simple minesweeper game!
                        </p>


                        <OptionsMenu setBoardSize={setBoardSize} />


                    </Card.Body>
                    <Card.Footer>
                        <Button className='w-100 start-btn' onClick={onStart} style={{ fontSize: "1.2rem", fontWeight: "600" }}>New Game!</Button>
                    </Card.Footer>
                </Card>
            </Row>
        </Container>
    );
}