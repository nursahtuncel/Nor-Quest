import React, { useState } from 'react';
import { Send, Sparkles, HelpCircle, Loader2, Star, BookOpen, Clock, Heart } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export default function SupportView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Selam! Ben sizin Noor Quest Yapay Zeka Yardımcınızım. 🌙✨\n\nÇocuklar için özel Kuran kıssaları oluşturmanıza, testler hazırlamanıza, ders planları tasarlamanıza ve çocuk dostu Tecvid öğretim ipuçları bulmanıza yardımcı olabilirim. Aşağıdaki harika hızlı butonlardan birine tıklamayı deneyebilir veya kendi sorunuzu yazabilirsiniz!'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Suggested prompt list
  const suggestedPrompts = [
    { text: 'Yunus Peygamber ve balina hakkında eğlenceli bir kıssa anlat', mode: 'story', icon: '🐳' },
    { text: 'Fatiha Suresi için 3 Tecvid test sorusu hazırla', mode: 'quiz', icon: '❓' },
    { text: 'Çocuklar için eğlenceli bir Kalkale egzersizi öner', mode: 'assignment-tips', icon: '🗣️' },
    { text: 'İhlas Suresi için 5 günlük bir çalışma planı hazırla', mode: 'plan', icon: '🗓️' }
  ];

  const handleSendMessage = async (textToSend: string, modeOverride?: string) => {
    if (!textToSend.trim()) return;

    // Append user message
    const userMsg: ChatMessage = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // Trigger Express full-stack API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          mode: modeOverride || 'general'
        })
      });

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: data.text || 'Es-Selamu Aleykum! Bağlantıda ufak bir dalgalanma oldu. Lütfen kısa bir süre sonra tekrar deneyin.'
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errMsg: ChatMessage = {
        sender: 'ai',
        text: 'Eyvah! Çevrimdışı bağlantıda bir dalgalanma yaşandı. Ama ben yine de yardımcı olmak isterim! Kaynaklar kütüphanemizdeki Tecvid Kartlarını inceleyebilirsiniz.'
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto" id="support-view-root">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-bold text-primary-green tracking-tight font-sans">Yapay Zeka Eğitim Yardımcısı</h2>
        <p className="text-neutral-muted text-sm mt-1 font-medium">
          Yapay zeka yardımıyla kıssa taslakları, özel ödev değerlendirmeleri ve hızlı test sayfaları oluşturun.
        </p>
      </div>

      {/* Main chat board layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Preset prompts - Left column */}
        <div className="bg-neutral-card rounded-3xl p-5 border border-primary-green-light shadow-sm lg:col-span-4 space-y-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm">✨</span>
            <h3 className="text-xs font-extrabold text-neutral-dark uppercase tracking-wider">Yapay Zeka Sihirbazları</h3>
          </div>
          <p className="text-xs text-neutral-muted leading-relaxed mb-4 font-medium">
            Çocuklar için özelleştirilmiş eğitim materyalleri oluşturmak için aşağıdaki sihirbaz kartlarından birine tıklayın.
          </p>

          <div className="space-y-2.5">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                disabled={loading}
                onClick={() => handleSendMessage(prompt.text, prompt.mode)}
                className="w-full p-3 bg-neutral-bg hover:bg-primary-green-light border border-primary-green-light/40 rounded-xl text-left text-xs font-bold text-neutral-dark flex items-center gap-2.5 transition-all hover:translate-x-1 cursor-pointer disabled:opacity-50"
              >
                <span className="text-base bg-white w-7 h-7 rounded-lg flex items-center justify-center shadow-sm">
                  {prompt.icon}
                </span>
                <span className="flex-1 leading-snug">{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat box panel - Right column */}
        <div className="bg-neutral-card rounded-3xl border border-primary-green-light shadow-md lg:col-span-8 flex flex-col h-[520px] justify-between overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 bg-primary-green text-white border-b border-primary-green-dark flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent-gold/25 flex items-center justify-center font-serif text-base text-accent-gold">
                🌙
              </div>
              <div>
                <h4 className="font-extrabold text-sm tracking-tight leading-none">Noor Quest Yapay Zeka Rehberi</h4>
                <span className="text-[10px] text-primary-green-light font-bold">İslami İlimler ve Tecvid Yol Arkadaşı</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-bold bg-black/15 px-2.5 py-1 rounded-full text-accent-gold">
              <Sparkles className="w-3 h-3 fill-current" /> Gemini Destekli
            </div>
          </div>

          {/* Chat history list */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#F5F8F6]/40">
            {messages.map((msg, i) => {
              const isAi = msg.sender === 'ai';
              return (
                <div key={i} className={`flex gap-3 ${isAi ? '' : 'justify-end'}`}>
                  {isAi && (
                    <div className="w-8 h-8 rounded-full bg-primary-green-light text-primary-green flex items-center justify-center text-sm font-serif shadow-sm flex-shrink-0">
                      🌙
                    </div>
                  )}

                  <div
                    className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      isAi
                        ? 'bg-white text-neutral-dark border border-primary-green-light/60 rounded-tl-sm'
                        : 'bg-primary-green text-white rounded-tr-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-green-light text-primary-green flex items-center justify-center text-sm font-serif shadow-sm flex-shrink-0 animate-spin">
                  🌙
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-primary-green-light/40 flex items-center gap-2 text-xs font-semibold text-neutral-muted">
                  <Loader2 className="w-4.5 h-4.5 animate-spin text-primary-green" />
                  <span>Cevap hazırlanıyor...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat input box */}
          <div className="p-4 border-t border-primary-green-light/50 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                disabled={loading}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tecvid kuralları, Kuran testleri veya kıssa ipuçları hakkında sorun..."
                className="flex-1 text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="w-11 h-11 rounded-xl bg-primary-green hover:bg-primary-green-dark text-white flex items-center justify-center shadow-md cursor-pointer transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
