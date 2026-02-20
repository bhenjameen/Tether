"use client";
import React, { useState } from 'react';

const TRIVIA_QUESTIONS = [
    {
        question: "What's your ideal first date?",
        options: ["Dinner & Drinks", "Outdoor Adventure", "Coffee & Walk", "Live Music/Event"],
    },
    {
        question: "What's your secret superpower?",
        options: ["Picking the best snacks", "Finding the perfect movie", "Making anyone laugh", "Navigating without a map"],
    },
    {
        question: "Pineapple on pizza?",
        options: ["Heck yes!", "Absolutely not", "I can tolerate it", "Why is this a debate?"],
    },
    {
        question: "Morning person or night owl?",
        options: ["Early Bird", "Night Owl", "Permanently Tired", "Depends on coffee"],
    },
    {
        question: "If you could travel anywhere right now...",
        options: ["Tropical Beach", "Mountain Cabin", "Bustling City", "Countryside Escape"],
    }
];

interface TriviaGameProps {
    onClose: () => void;
    onComplete: (answers: string[]) => void;
}

export default function TriviaGame({ onClose, onComplete }: TriviaGameProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const handleOptionSelect = (option: string) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);

        if (currentStep < TRIVIA_QUESTIONS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);
            onComplete(newAnswers);
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-sm glass-panel p-6 shadow-2xl relative border border-white/10 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-600/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-600/20 blur-3xl rounded-full" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {!isFinished ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs text-slate-400 uppercase tracking-widest font-bold">
                            <span>Tether Trivia</span>
                            <span>{currentStep + 1} / {TRIVIA_QUESTIONS.length}</span>
                        </div>

                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500"
                                style={{ width: `${((currentStep + 1) / TRIVIA_QUESTIONS.length) * 100}%` }}
                            />
                        </div>

                        <h3 className="text-xl font-bold text-white text-center">
                            {TRIVIA_QUESTIONS[currentStep].question}
                        </h3>

                        <div className="grid grid-cols-1 gap-3">
                            {TRIVIA_QUESTIONS[currentStep].options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-left transition-all active:scale-95 text-slate-200 hover:text-white font-medium group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                                        {option}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-violet-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Tether Shared!</h3>
                            <p className="text-slate-400 text-sm">
                                Your answers have been sent to the chat. Wait for your match to respond!
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full btn-primary py-3 font-bold"
                        >
                            Back to Chat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
