import { useState, useRef, useEffect } from 'react';

export function useChatInput({ isLoading, onSendMessage }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  // Tự resize textarea theo nội dung
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (trimmed && !isLoading) {
      onSendMessage(trimmed);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceRecord = async () => {
    if (isRecording) return;

    try {
      setIsRecording(true);
      const res = await fetch("http://localhost:8000/voice/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration: 5, language: "vi-VN" }),
      });
      const data = await res.json();

      if (data.success && data.text) {
        onSendMessage(data.text);
      } else {
        alert("Không nhận diện được giọng nói.");
      }
    } catch (err) {
      console.error("Lỗi ghi âm:", err);
      alert("Lỗi khi ghi âm hoặc kết nối server.");
    } finally {
      setIsRecording(false);
    }
  };

  return {
    message,
    setMessage,
    isRecording,
    textareaRef,
    handleSubmit,
    handleKeyDown,
    handleVoiceRecord,
  };
}
