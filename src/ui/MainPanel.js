'use client';

import '@/ui/styles/MainPanel.css';
import GameBoard from './GameBoard';

export default function MainPanel() {

    return (
        <>
            <GameBoard rows={7} cols={7} numMines={10} />
        </>
    );
}


