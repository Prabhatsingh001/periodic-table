import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';

const Learn = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI chemistry assistant. Ask me anything about the elements, their properties, or chemical reactions.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `Mock Response: I received your message "${userMessage.content}". To get real AI answers, please run your app with a VITE_OPENAI_API_KEY in your .env file.` 
          }]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are an educational chemistry assistant embedded in a periodic table web app. Explain concepts clearly and concisely.' },
            ...messages,
            userMessage
          ]
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        setMessages(prev => [...prev, data.choices[0].message]);
      } else {
        throw new Error('Invalid response from AI');
      }

    } catch (err) {
      console.error('Learn API Error:', err);
      const isNetwork = err instanceof TypeError;
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: isNetwork
          ? 'Unable to reach the AI service. Please check your network connection and try again.'
          : `Something went wrong while processing your request: ${err.message || 'Unknown error'}. Please try again.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-2 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 uppercase tracking-widest">
            <Sparkles className="text-purple-400" />
            AI Lab Assistant
        </h1>
        <p className="text-slate-400">Ask questions and explore chemistry concepts.</p>
      </div>

      <div className="flex-1 glass rounded-t-2xl p-6 overflow-y-auto flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                msg.role === 'user' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50' : 'bg-purple-600/30 text-purple-400 border border-purple-500/50'
            }`}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-tr-sm' 
                : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-purple-600/30 text-purple-400 border border-purple-500/50 shadow-sm">
                    <Bot size={20} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center h-14 shadow-sm">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="glass rounded-b-2xl border-t border-white/10 p-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-4 relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about an element..."
                className="flex-1 bg-slate-900/50 border border-white/10 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium"
            />
            <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
                Send <Send size={18} />
            </button>
        </form>
      </div>
    </div>
  );
};

export default Learn;
