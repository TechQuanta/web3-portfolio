'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, User, Clock, MessageSquare, Loader2, X } from 'lucide-react'; 
import Head from 'next/head'; 
import ShinyText from "@/components/ui/ShinyText"; 
import Aurora from '@/components/ui/Aurora'; // 👈 NEW: Import Aurora component

// Configuration for the Gemini API
const PRATIK_CHAT_API_KEY = ""; // ⚠️ WARNING: REPLACE THIS WITH YOUR GEMINI API KEY!
const PRATIK_CHAT_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${PRATIK_CHAT_API_KEY}`;

// --- CONSTANTS ---
const PRATIK_ASSISTANT_IMAGE_URL = "https://placehold.co/40x40/000000/ffffff?text=P"; 
const PRATIK_USER_IMAGE_URL = "https://placehold.co/40x40/60a5fa/ffffff?text=U"; 
const PRATIK_ASSISTANT_NAME = "Pratik personal assistant";
const PRATIK_MAX_INPUT_WORDS = 500; 

// --- UTILITY FUNCTIONS (Kept unique names for safety) ---
const getPratikWordCount = (text) => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
};

const formatPratikTime = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) return 'Time N/A';
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); 
};

const generatePratikId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

const pratikInitialMessages = [
    { 
        id: generatePratikId(), 
        text: `Hello, I'm ${PRATIK_ASSISTANT_NAME}. I'm an advanced AI designed to assist you with deep insights. Please **ask me about my work, professional background, finance, or current market trends.**`, 
        isBot: true, 
        timestamp: new Date() 
    }
];

// =========================================================================
// 1. MESSAGE COMPONENT (PratikChatMessage)
// =========================================================================

const PratikChatMessage = ({ message, isBot, isAssistantOnline, assistantImageUrl, userImageUrl }) => {
    const text = message?.text || '';
    const timestamp = message?.timestamp;
    
    // --- STYLING FOR CHAT BUBBLES ---
    const botAvatarClasses = "w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-700 "; 
    // Bot bubble has different colors for contrast: gray-100 (light) / gray-800 (dark)
    const botBubbleClasses = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 p-2 pl-10  rounded-xl rounded-tl-md"; 
    const userAvatarClasses = "w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-700 "; 
    const userBubbleClasses = "bg-blue-600 text-white p-2 pr-10 rounded-xl rounded-tr-md"; 
    
    const AvatarWrapper = ({ imageUrl, name, isBot, isOnline }) => (
        <div 
            className={`absolute top-1 w-8 h-8 ${isBot ? 'left-1' : 'right-1'}`} 
            title={name}
        >
            <div className="relative w-full h-full">
                <div className={isBot ? botAvatarClasses : userAvatarClasses}>
                    <img 
                        src={imageUrl} 
                        alt={`${name} Avatar`} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = isBot ? "https://placehold.co/40x40/000000/ffffff?text=P" : "https://placehold.co/40x40/60a5fa/ffffff?text=U"; 
                        }}
                    />
                </div>
                <div 
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ${isBot 
                        ? (isOnline ? 'bg-green-500 ring-white dark:ring-gray-700' : 'bg-red-500 ring-white dark:ring-gray-700') 
                        : 'bg-yellow-400 ring-blue-600'}`}
                    title={isBot ? (isOnline ? "Online" : "Offline") : "Active"}
                />
            </div>
        </div>
    );

    return (
        <div 
            className={`relative z-10 flex w-full my-2 ${isBot ? 'justify-start' : 'justify-end'}`}
        >
            <div 
                className={`relative max-w-[70%] transition-all duration-300 ${isBot ? botBubbleClasses : userBubbleClasses}`}
            >
                {isBot && (
                    <AvatarWrapper 
                        imageUrl={assistantImageUrl}
                        name={PRATIK_ASSISTANT_NAME}
                        isBot={true}
                        isOnline={isAssistantOnline}
                    />
                )}

                <p className="whitespace-pre-wrap break-words mb-1 text-sm leading-relaxed">
                    {text}
                </p>
                
                <div 
                    className={`flex items-center mt-1 text-xs opacity-75 ${isBot 
                        ? 'justify-end text-gray-500 dark:text-gray-400'
                        : 'justify-start text-white/70'}`}
                >
                    <Clock className={`w-2 h-2 mr-1 ${isBot ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'}`} />
                    <span className={`${isBot ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'}`}>
                        {formatPratikTime(timestamp)}
                    </span>
                </div>

                {!isBot && (
                    <AvatarWrapper 
                        imageUrl={userImageUrl}
                        name={"You"}
                        isBot={false}
                        isOnline={true}
                    />
                )}
            </div>
        </div>
    );
};


// =========================================================================
// 2. CORE CHATBOT LOGIC & INTERFACE (PratikChatInterface)
// =========================================================================

const PratikChatInterface = ({ onClose, isDarkMode }) => { 
    const [messages, setMessages] = useState(pratikInitialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const wordCount = getPratikWordCount(input);
    const isInputTooLong = wordCount > PRATIK_MAX_INPUT_WORDS;
    const isAssistantOnline = true;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const callPratikApiWithBackoff = async (payload) => {
        if (!PRATIK_CHAT_API_KEY) {
             console.error("API Key is missing. Cannot call Gemini API.");
             throw new Error("API Key is missing.");
        }
        
        const MAX_RETRIES = 5;
        let delay = 1000;

        for (let i = 0; i < MAX_RETRIES; i++) {
            try {
                const response = await fetch(PRATIK_CHAT_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorBody = await response.text();
                    console.error(`API Error Response (${response.status}):`, errorBody);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error(`API call failed (Attempt ${i + 1}/${MAX_RETRIES}):`, error.message);
                if (i === MAX_RETRIES - 1) {
                    throw new Error("Maximum retries reached. Failed to get a response.");
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; 
            }
        }
    };

    const handlePratikSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading || isInputTooLong) return;

        const userMessage = { id: generatePratikId(), text: input, isBot: false, timestamp: new Date() };
        const updatedMessages = [...messages, userMessage];
        
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        const chatHistory = updatedMessages.map(msg => ({
            role: msg.isBot ? "model" : "user",
            parts: [{ text: msg.text }]
        }));

        const payload = {
            contents: chatHistory,
            systemInstruction: {
                parts: [{ text: `You are a friendly, concise, and helpful assistant named ${PRATIK_ASSISTANT_NAME}. Keep your responses short (under 75 words) and engaging. Use Markdown for formatting where appropriate.` }]
            },
        };

        try {
            const result = await callPratikApiWithBackoff(payload);
            
            const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that request.";
            
            setMessages(prev => [
                ...prev,
                { id: generatePratikId(), text: botResponse, isBot: true, timestamp: new Date() }
            ]);

        } catch (error) {
            console.error("Error communicating with Gemini API:", error);
            setMessages(prev => [
                ...prev,
                { id: generatePratikId(), text: "Connection error: Failed to reach the AI. Please check the API key and try again.", isBot: true, timestamp: new Date() }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePratikInputChange = (e) => {
        const value = e.target.value;
        const potentialWordCount = getPratikWordCount(value);
        
        if (potentialWordCount <= PRATIK_MAX_INPUT_WORDS) {
            setInput(value);
        } else {
            const words = value.trim().split(/\s+/).filter(Boolean);
            if (words.length > PRATIK_MAX_INPUT_WORDS) {
                const limitedWords = words.slice(0, PRATIK_MAX_INPUT_WORDS);
                const limitedText = limitedWords.join(' ');
                
                if (input !== limitedText) {
                    setInput(limitedText);
                }
            } else {
                setInput(value);
            }
        }
    };


    return (
        <>
            <style jsx global>{`
                /* WOW Send Button Styling (Unique Class Naming for Safety) */
                .pratik-wow-send-button {
                    background-image: linear-gradient(145deg, #6366f1, #a855f7); 
                    color: white;
                    transition: all 0.2s ease-in-out;
                }
                .pratik-wow-send-button:hover:not(:disabled) {
                    background-image: linear-gradient(145deg, #4f46e5, #9333ea);
                    transform: scale(1.05); 
                  
                }
                .pratik-wow-send-button:disabled {
                    background-image: linear-gradient(145deg, #9ca3af, #d1d5db);
                    color: #4b5563; 
                    box-shadow: none;
                }
                .dark .pratik-wow-send-button {
                    background-image: linear-gradient(145deg, #7c3aed, #a855f7);
                }
                .dark .pratik-wow-send-button:hover:not(:disabled) {
                    background-image: linear-gradient(145deg, #6d28d9, #9333ea);

                }
            `}</style>

            <div className="flex flex-col h-full antialiased">
                {/* HEADER - Adjusted dark background to be more transparent (dark:bg-black/80) to let Aurora shine through */}
                <header 
                    className="sticky top-0 z-50 flex items-center justify-between py-4 px-3 bg-white/70 dark:bg-black/80 backdrop-blur-md transition duration-300 rounded-t-xl"
                >
                    <div className="flex items-center space-x-2 pl-1">
                        <div className="relative">
                            <img 
                                src={PRATIK_ASSISTANT_IMAGE_URL} 
                                alt="Assistant Avatar"
                                className="w-7 h-7 rounded-full object-cover" 
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/000000/ffffff?text=P" }}
                            />
                            <div 
                                className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${isAssistantOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                title={isAssistantOnline ? "Online" : "Offline"}
                            />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                                {PRATIK_ASSISTANT_NAME}
                            </h3>
                            <p className={`text-xs ${isAssistantOnline ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                {isAssistantOnline ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex space-x-0.5">
                        <button
                            onClick={onClose} 
                            // UPDATED: Icon color to text-gray-800 dark:text-gray-100
                            className="p-1 rounded-full text-gray-800 dark:text-gray-100 hover:bg-red-100 dark:hover:bg-red-900 transition"
                            title="Close Chat"
                        >
                            <span className="sr-only">Close Chat</span>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Message Display Area - Adjusted dark background to be more transparent (dark:bg-black/80) */}
                <div 
                    className="flex-grow flex flex-col overflow-hidden bg-white/70 dark:bg-black/80 backdrop-blur-xl transition duration-300 [color-scheme:light]"
                >
                    <div className="flex-grow p-3 space-y-4 overflow-y-auto injected-scrollbar">
                        {messages.map(msg => (
                            <PratikChatMessage 
                                key={msg.id} 
                                message={msg} 
                                isBot={msg.isBot} 
                                isAssistantOnline={isAssistantOnline}
                                assistantImageUrl={PRATIK_ASSISTANT_IMAGE_URL} 
                                userImageUrl={PRATIK_USER_IMAGE_URL} 
                            />
                        ))}
                        
                        {/* Typing Indicator (Gray bubble kept for contrast) */}
                        {isLoading && (
                                <div className="relative z-10 flex w-full my-2 justify-start">
                                    <div className="relative max-w-[60%] rounded-xl rounded-tl-md bg-gray-800 text-gray-100 p-2 pl-10 "> 
                                        <div 
                                            className="absolute left-1 top-1 w-8 h-8" 
                                            title={PRATIK_ASSISTANT_NAME}
                                        >
                                            <div className="relative w-full h-full">
                                                <div className="w-full h-full rounded-full overflow-hidden border-1 border-white dark:border-gray-700 "> 
                                                    <img 
                                                        src={PRATIK_ASSISTANT_IMAGE_URL} 
                                                        alt="Bot Avatar" 
                                                        className="w-full h-full object-cover" 
                                                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/000000/ffffff?text=P" }}
                                                    />
                                                </div>
                                                <div 
                                                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-700`}
                                                    title="Online"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex space-x-1 items-center ml-4">
                                            <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                                            <span className="text-sm">Typing...</span>
                                        </div>
                                    </div>
                                </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Form (FOOTER) - Dark background removed, now fully transparent (dark:bg-black/0) */}
                <form onSubmit={handlePratikSend} 
                    className="sticky bottom-0 z-50 p-1 mx-3 bg-gray-100/0 dark:bg-black/0 backdrop-blur-none transition duration-300"
                >
                    {/* Input Container - Inner background kept dark:bg-black for text contrast */}
                    <div 
                        className={`relative flex items-center border-t-2 border-l-2 border-r-2 space-x-2 bg-white dark:bg-black p-1 rounded-t-xl ${isInputTooLong ? 'border-2 border-red-500' : ''}`}
                    >
                        <textarea
                            rows={1}
                            value={input}
                            onChange={handlePratikInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handlePratikSend(e);
                                }
                            }}
                            placeholder="Ask me about my work..."
                            className="flex-grow py-1.5 px-3 border-none focus:outline-none bg-transparent dark:text-gray-100 text-gray-800 transition duration-150 rounded-lg resize-none overflow-y-hidden [color-scheme:light]"
                            disabled={isLoading}
                        />
                        
                        {/* Send Button */}
                        <button
                            type="submit"
                            className={`pratik-wow-send-button p-1 rounded-xl transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-8 h-8 flex-shrink-0`}
                            disabled={!input.trim() || isLoading || isInputTooLong}
                            title="Send Message"
                        >
                            <ShinyText 
                                text={<Send className="w-4 h-4 text-white dark:text-white transform -translate-x-px" />}
                                disabled={!input.trim() || isLoading || isInputTooLong} 
                                speed={3}
                                className="!bg-transparent text-white dark:text-white" 
                            />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};


// =========================================================================
// 3. MAIN EXPORTED COMPONENT (PratikChatbotWidget)
// =========================================================================

export default function PratikChatbotWidget() { 
    
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return true; 
    });
    const [isOpen, setIsOpen] = useState(true); 
    
    const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);
    
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            const updateTheme = (e) => {
                const newMode = e.matches;
                setIsDarkMode(newMode);
                if (newMode) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            };

            updateTheme({ matches: isDarkMode });

            mediaQuery.addEventListener('change', updateTheme);

            return () => {
                mediaQuery.removeEventListener('change', updateTheme);
            };
        }
    }, [isDarkMode]);

    const modalShadowClass = isDarkMode ? '' : '';

    // UPDATED: Modal base background is dark:bg-black for Aurora effect
    const modalClasses = `
        fixed z-[99] transition-all duration-500 ease-in-out ${modalShadowClass}
        
        bg-white/90 dark:bg-black backdrop-blur-xl flex flex-col overflow-hidden
        
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}

 
        inset-0 w-full h-screen rounded-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        
        /* Desktop (md:): Fixed position, slides B to T. */
        md:inset-auto md:bottom-0 md:right-4 md:w-full md:max-w-lg md:h-[550px] md:rounded-xl md:translate-x-0
        ${isOpen ? 'md:translate-y-0' : 'md:translate-y-full'}
    `;

    const mobileTriggerClasses = `
        fixed z-50 flex md:hidden right-0 top-1/2 transform -translate-y-1/2 
        p-2 rounded-l-xl flex-col items-center justify-center space-y-1 text-sm
        bg-transparent text-black dark:text-white transition-all duration-500 ease-in-out 
        hover:bg-blue-700 hover:scale-[1.03]
        ${isOpen 
            ? 'translate-x-full opacity-0 pointer-events-none' 
            : 'translate-x-0 opacity-100 cursor-pointer'
        }
    `;

    const desktopTriggerClasses = `
        fixed z-50 hidden md:flex items-center bottom-0 right-4 px-6 py-3 rounded-t-lg 
        bg-transparent text-black dark:text-white shadow-lg transition-all duration-500 ease-in-out 
         hover:scale-[1.03]
        ${isOpen 
            ? 'translate-y-full opacity-0 pointer-events-none' 
            : 'translate-y-0 opacity-100 cursor-pointer'
        }
    `;

    return (
        <div 
            className={`bg-white dark:bg-black transition-colors duration-500 font-inter ${isOpen ? 'overflow-hidden' : ''}`}
        >
            <Head>
                <title>Pratik's Chatbot</title>
            </Head>

            {/* Mobile Trigger Button */}
            <button onClick={toggleChat} 
                className={mobileTriggerClasses} 
                title="Open Chatbot"
            >
                <MessageSquare className="w-5 h-5" />
                <ShinyText 
                    text={<span className="font-semibold whitespace-nowrap [writing-mode:vertical-rl] rotate-180">Let's Chat</span>} 
                    speed={5}
                    className="text-white" 
                />
            </button>

            {/* Desktop/Tablet Trigger Button */}
            <button onClick={toggleChat} 
                className={desktopTriggerClasses} 
                title="Open Chatbot"
            >
                <MessageSquare className="w-5 h-5 mr-2" />
                <ShinyText 
                    text={<span className="text-base font-semibold whitespace-nowrap">Let's Chat</span>} 
                    speed={3}
                    className="text-white" 
                />
            </button>

            {/* The Sliding Modal Container */}
            <div className={modalClasses}>
                
                {/* 🌟 AURORA BACKGROUND LAYER (Only render in Dark Mode) 🌟 */}
                {isDarkMode && (
                    <div className="absolute inset-0 z-0 opacity-70">
                        <Aurora
                            colorStops={["#F8F8FF", "#00B0FF", "#FF6E40"]}
                            blend={0.7}
                            amplitude={1.0}
                            speed={0.6}
                        />
                    </div>
                )}
                
                {/* Main Chat Interface (Higher Z-Index) */}
                <div className="relative z-10 w-full h-full">
                    <PratikChatInterface 
                        onClose={toggleChat} 
                        isDarkMode={isDarkMode} 
                    />
                </div>
            </div>
        </div>
    );
}