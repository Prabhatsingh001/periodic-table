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
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
          isUser
            ? 'bg-blue-600/20 dark:bg-blue-600/30 text-blue-500 dark:text-blue-400 border border-blue-400/40 dark:border-blue-500/50'
            : 'bg-purple-600/20 dark:bg-purple-600/30 text-purple-500 dark:text-purple-400 border border-purple-400/40 dark:border-purple-500/50'
      }`}>
        {isUser ? <User size={16} className="sm:w-5 sm:h-5" /> : <Bot size={16} className="sm:w-5 sm:h-5" />}
      </div>
      <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 whitespace-pre-wrap text-sm sm:text-base ${
          isUser
            ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-900 dark:text-blue-100 border border-blue-300/40 dark:border-blue-500/30 rounded-tr-sm'
            : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-tl-sm'
      }`}>
        {msg.content}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-2 sm:gap-4">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 bg-purple-600/20 dark:bg-purple-600/30 text-purple-500 dark:text-purple-400 border border-purple-400/40 dark:border-purple-500/50 shadow-sm">
      <Bot size={16} className="sm:w-5 sm:h-5" />
    </div>
    <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl rounded-tl-sm p-3 sm:p-4 flex gap-1 items-center h-12 sm:h-14 shadow-sm">
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
    </div>
  </div>
);

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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
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
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 uppercase tracking-widest">
            <Sparkles className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
            AI Lab Assistant
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">Ask questions and explore chemistry concepts.</p>
      </div>

      <div className="flex-1 glass rounded-t-xl sm:rounded-t-2xl p-3 sm:p-4 lg:p-6 overflow-y-auto flex flex-col gap-3 sm:gap-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} msg={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="glass rounded-b-xl sm:rounded-b-2xl border-t border-slate-200 dark:border-white/10 p-2 sm:p-3 lg:p-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 sm:gap-4 relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about an element..."
                className="flex-1 min-w-0 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500/50 focus:ring-1 focus:ring-purple-400 dark:focus:ring-purple-500/50 transition-all font-medium text-sm sm:text-base"
            />
            <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-6 rounded-lg sm:rounded-xl font-bold flex items-center gap-1 sm:gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] text-sm sm:text-base"
            >
                <span className="hidden sm:inline">Send</span> <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
        </form>
      </div>
    </div>
  );
};

export default Learn;
