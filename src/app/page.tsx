'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState('future-self');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const personas = [
    { id: 'future-self', name: 'Future Self', description: 'Your wise future self offering guidance', color: 'bg-blue-600', emoji: '🌟' },
    { id: '60-year-old', name: '60-Year-Old Self', description: 'Life experience and wisdom', color: 'bg-green-600', emoji: '👴' },
    { id: 'biggest-fan', name: 'Biggest Fan', description: 'Believes in you unconditionally', color: 'bg-purple-600', emoji: '🎉' },
    { id: 'honest-friend', name: 'Brutally Honest Friend', description: 'Tells you the truth', color: 'bg-red-600', emoji: '💬' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const userMessage: Message = { role: 'user', content: message, timestamp: new Date() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage('');
    
    try {
      setIsLoading(true);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          persona: selectedPersona,
          message: message,
          history: updatedMessages
        })
      });
      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.response, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPersona = personas.find(p => p.id === selectedPersona);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">LifeGPT</h1>
          <p className="text-gray-400 text-lg">Your AI reflection buddy for personal growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {personas.map((persona) => (
            <button key={persona.id} onClick={() => setSelectedPersona(persona.id)}
              className={`p-6 rounded-xl transition-all transform hover:scale-105 border-2 ${selectedPersona === persona.id ? `${persona.color} text-white shadow-lg border-white` : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600'}`}>
              <div className="text-3xl mb-3">{persona.emoji}</div>
              <h3 className="font-semibold mb-2 text-lg">{persona.name}</h3>
              <p className="text-sm opacity-90">{persona.description}</p>
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-2xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className={`w-4 h-4 rounded-full ${currentPersona?.color} mr-3`}></span>
            <span className="mr-2">{currentPersona?.emoji}</span>
            Chatting with {currentPersona?.name}
          </h2>
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none'}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <p className="text-xs opacity-70 mt-2">{msg.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 p-4 rounded-lg rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{currentPersona?.emoji} is thinking</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-4 shadow-2xl">
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Ask ${currentPersona?.name} something...`}
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>✨ Powered by AI • Your conversations are private and secure • Built for personal growth ✨</p>
      </div>
    </main>
  );
}
