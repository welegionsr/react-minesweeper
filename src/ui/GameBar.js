'use client';

import '../ui/styles/GameBar.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";


export default function GameBar() {
    return (
        <Navbar className="gamebar mb-4">
            <Container>
                <Navbar.Brand href="#home" className='brand-logo'>
                    <span className='brand-title'>Minesweeper!</span>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}