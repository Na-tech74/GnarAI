import { useState, useEffect, useRef } from 'react';

export default function useChatBot() {
  
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([]);
  const [editTitle, setEditTitle] = useState('');
  const [editingChatId, setEditingChatId] = useState(null);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      setChatHistory(parsed);
      setCurrentChatId(parsed[0]?.id || null);
      setMessages(parsed[0]?.messages || []);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: `Chat ${chatHistory.length + 1}`,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: 0,
    };
    setChatHistory([newChat, ...chatHistory]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  };

  const handleSelectChat = (chat) => {
    setCurrentChatId(chat.id);
    setMessages(chat.messages);
    setShowSidebar(false);
  };

  const updateHistory = (updatedMessages) => {
    const newHistory = chatHistory.map(chat =>
      chat.id === currentChatId
        ? {
          ...chat,
          messages: updatedMessages,
          messageCount: updatedMessages.length,
          updatedAt: new Date().toISOString(),
        }
        : chat
    );
    setChatHistory(newHistory);
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    const userMsg = { role: 'user', content: messageText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    updateHistory(newMessages);
    setError('');
    setIsLoading(true);

    try {
      const conversationHistory = newMessages
        .filter((msg) => msg.role !== 'bot')
        .map((msg) => ({
          role: msg.role === 'bot' ? 'assistant' : msg.role,
          content: msg.content,
        }));

      // su dung bien moi de phan biet moi truong dev va prod
      // trong file vite.config.js da cau hinh proxy
      // trong truong hop khong su dung proxy
      // nao can biuld lai thi doi url
      //'http://localhost:8000/chat/stream?stream=true'

      const response = await fetch(import.meta.env.VITE_API_URL + '/chat/stream?stream=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          messages: conversationHistory,
          model: 'mistral:7b-instruct',
        }),
      });

      if (!response.ok || !response.body) {
        const errorText = await response.text();
        throw new Error(`Lỗi phản hồi: ${response.status} - ${errorText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let botMsg = { role: 'bot', content: '' };
      const updatedMessages = [...newMessages, botMsg];
      setMessages(updatedMessages);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data = JSON.parse(line);
            if (data.message?.content) {
              botMsg.content += data.message.content;
              setMessages([...newMessages, { ...botMsg }]);
            }
          } catch (e) {
            console.error('Parse error:', e);
          }
        }
      }

      updateHistory([...newMessages, botMsg]);
    } catch (err) {
      console.error('Stream error:', err);
      setError('Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTitle = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setEditingChatId(chatId);
      setEditTitle(chat.title);
    }
  };

  const saveEditTitle = () => {
    const updated = chatHistory.map(chat =>
      chat.id === editingChatId ? { ...chat, title: editTitle.trim() } : chat
    );
    setChatHistory(updated);
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleDeleteChat = () => {
    const updated = chatHistory.filter((chat) => chat.id !== chatToDelete);
    setChatHistory(updated);
    setShowDeleteModal(false);
    setChatToDelete(null);
    if (chatToDelete === currentChatId) {
      setCurrentChatId(updated[0]?.id || null);
      setMessages(updated[0]?.messages || []);
    }
  };

  return {
    chatHistory,
    currentChatId,
    searchTerm,
    setSearchTerm,
    messages,
    editTitle,
    editingChatId,
    chatToDelete,
    showDeleteModal,
    showSidebar,
    collapsedSidebar,
    isLoading,
    error,
    bottomRef,
    setEditTitle,
    setEditingChatId,
    setChatToDelete,
    setShowDeleteModal,
    setShowSidebar,
    setCollapsedSidebar,
    setError,
    handleNewChat,
    handleSelectChat,
    handleSendMessage,
    handleEditTitle,
    saveEditTitle,
    handleDeleteChat,
  };
}
