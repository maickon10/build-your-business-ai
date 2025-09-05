import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Plus, Mic, ArrowUp } from "lucide-react";
import AuthModal from "./AuthModal";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Que ideia interessante! Para criar sua empresa perfeita, preciso entender melhor seu negócio. Qual o público-alvo que você quer atingir?",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        {messages.length === 0 ? (
          // Initial Chat Input
          <div className="glass-card rounded-2xl p-1 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 p-4">
              <Button size="sm" variant="ghost" className="text-white/60 hover:bg-white/10 p-2">
                <Plus className="w-4 h-4" />
              </Button>
              
              <div className="flex-1">
                <Input
                  placeholder="Digite sua ideia de negócio..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 text-base"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-white/60 hover:bg-white/10 p-2">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-white text-black hover:bg-white/90 p-2"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Chat Messages View
          <div className="space-y-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'chat-bubble-user' 
                        : 'chat-bubble-ai'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input for ongoing conversation */}
            <div className="glass-card rounded-2xl p-1">
              <div className="flex items-center gap-3 p-4">
                <div className="flex-1">
                  <Input
                    placeholder="Continue a conversa..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0"
                  />
                </div>
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-white text-black hover:bg-white/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
          handleSendMessage();
        }}
      />
    </>
  );
};

export default ChatInterface;