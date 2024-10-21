'use client';

import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { arimo } from "./fonts/fonts";
import GameBar from "@/ui/GameBar";
import { Navbar } from "react-bootstrap";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${arimo.className} antialiased`}
      >
        <GameBar />
        {children}

        <Navbar bg="dark" data-bs-theme="dark" fixed="bottom">
        </Navbar>
      </body>
    </html>
  );
}
