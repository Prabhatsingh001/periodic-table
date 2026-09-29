import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { sendGeminiMessage } from '../services/geminiApi';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Hello! I\'m your AI chemistry assistant powered by Google Gemini. Ask me anything about the elements, their properties, or chemical reactions! 🧪'
};

const ChatBubble = ({ msg }) => {
  const isUser = msg.role === 'user';

  return (
    <div className={`flex gap-2 sm:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border"
        style={{
          backgroundColor: isUser ? 'var(--accent-soft)' : 'var(--hover-bg)',
          borderColor: isUser ? 'var(--accent-glow)' : 'var(--divider)',
          color: isUser ? 'var(--accent)' : 'var(--text-muted)',
        }}
      >
        {isUser ? <User size={16} className="sm:w-5 sm:h-5" /> : <Bot size={16} className="sm:w-5 sm:h-5" />}
      </div>
      <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 whitespace-pre-wrap text-sm sm:text-base border ${
          isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
      }`}
        style={isUser ? {
          backgroundColor: 'var(--accent-soft)',
          borderColor: 'var(--accent-glow)',
          color: 'var(--text-primary)',
        } : {
          backgroundColor: 'var(--hover-bg)',
          borderColor: 'var(--divider)',
          color: 'var(--text-secondary)',
        }}
      >
        {msg.content}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-2 sm:gap-4">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm"
      style={{ backgroundColor: 'var(--hover-bg)', borderColor: 'var(--divider)', color: 'var(--text-muted)' }}
    >
      <Bot size={16} className="sm:w-5 sm:h-5" />
    </div>
    <div className="border rounded-2xl rounded-tl-sm p-3 sm:p-4 flex gap-1.5 items-center h-12 sm:h-14 shadow-sm"
      style={{ backgroundColor: 'var(--hover-bg)', borderColor: 'var(--divider)' }}
    >
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce [animation-delay:0ms]" style={{ backgroundColor: 'var(--accent)' }} />
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce [animation-delay:150ms]" style={{ backgroundColor: 'var(--accent)' }} />
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce [animation-delay:300ms]" style={{ backgroundColor: 'var(--accent)' }} />
    </div>
  </div>
);

const SAMPLE_QUESTIONS = [
  'Why is Carbon essential for life? 🧪',
  'What makes Francium so reactive? ⚡',
  'Explain trends in electronegativity 📈',
  'How was Helium discovered in the Sun? ☀️',
];

const Learn = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (questionText) => {
    const text = (typeof questionText === 'string' ? questionText : input).trim();
    if (!text) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendGeminiMessage(updatedMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      console.error('Learn API Error:', err);

      let errorContent;
      if (err.message === 'MISSING_API_KEY') {
        errorContent = '⚠️ No Gemini API key found.\n\nTo enable AI responses:\n1. Get a free key at aistudio.google.com/apikey\n2. Create a .env file in your project root\n3. Add: VITE_GEMINI_API_KEY=your_key_here\n4. Restart the dev server';
      } else if (err instanceof TypeError) {
        errorContent = '🔌 Unable to reach the Gemini API. Please check your internet connection and try again.';
      } else {
        errorContent = `❌ ${err.message || 'Something went wrong. Please try again.'}`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: errorContent }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)]">
      <div className="mb-3 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3 uppercase tracking-[0.15em] font-['Playfair_Display',serif]"
          style={{ color: 'var(--accent)' }}
        >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--accent)' }} />
            AI Lab Assistant
        </h1>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>Ask questions and explore chemistry concepts.</p>
      </div>

      <div className="flex-1 glass rounded-t-xl sm:rounded-t-2xl p-3 sm:p-4 lg:p-6 overflow-y-auto flex flex-col gap-3 sm:gap-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} msg={msg} />
        ))}
        {messages.length === 1 && !isLoading && (
          <div className="flex flex-col gap-2 mt-2 pt-2 border-t" style={{ borderColor: 'var(--divider)' }}>
            <span className="text-xs font-['JetBrains_Mono',monospace] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Suggested Inquiries:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-left text-xs sm:text-sm p-2 sm:p-2.5 rounded-lg border hover:opacity-80 transition-all font-medium"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--divider)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="glass rounded-b-xl sm:rounded-b-2xl border-t p-2 sm:p-3 lg:p-4"
        style={{ borderColor: 'var(--divider)' }}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 sm:gap-4 relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about an element..."
                className="flex-1 min-w-0 border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-1 transition-all font-medium text-sm sm:text-base"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--input-border)',
                  color: 'var(--text-primary)',
                  '--tw-ring-color': 'var(--accent-glow)',
                }}
            />
            <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="text-white px-3 sm:px-6 rounded-lg sm:rounded-xl font-bold flex items-center gap-1 sm:gap-2 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
                style={{
                  backgroundColor: 'var(--accent)',
                  boxShadow: '0 0 12px var(--accent-glow)',
                }}
            >
                <span className="hidden sm:inline">Send</span> <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
        </form>
      </div>
    </div>
  );
};

export default Learn;
