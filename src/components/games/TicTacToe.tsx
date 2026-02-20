"use client";
import React, { useState, useEffect } from 'react';

type Player = 'X' | 'O' | null;

export default function TicTacToe({ onClose, onComplete }: { onClose: () => void, onComplete: (winner: string) => void }) {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<Player | 'Draw'>(null);

    const checkWinner = (squares: Player[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        if (squares.every(s => s !== null)) return 'Draw';
        return null;
    };

    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const gameResult = checkWinner(newBoard);
        if (gameResult) {
            setWinner(gameResult);
            if (gameResult !== 'Draw') {
                onComplete(gameResult === 'X' ? 'You won!' : 'Match won!');
            } else {
                onComplete("It's a draw!");
            }
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-sm glass-panel p-8 shadow-2xl relative border border-white/10">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Tic-Tac-Toe</h3>
                    <p className={`text-sm font-medium ${winner ? 'text-violet-400 animate-pulse' : 'text-slate-400'}`}>
                        {winner
                            ? (winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`)
                            : `Next Player: ${isXNext ? 'X' : 'O'}`
                        }
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                    {board.map((square, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(i)}
                            className={`w-full aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl font-black transition-all active:scale-90
                                ${!square && !winner ? 'hover:bg-white/10 hover:border-violet-500/30' : ''}
                                ${square === 'X' ? 'text-violet-400' : 'text-pink-400'}
                            `}
                        >
                            {square}
                        </button>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={resetGame}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all"
                    >
                        Restart
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 btn-primary py-3 text-sm font-bold"
                    >
                        {winner ? 'Close' : 'Exit'}
                    </button>
                </div>
            </div>
        </div>
    );
}
