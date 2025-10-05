import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Send, Mic } from 'lucide-react';
import { useChatInput } from '../../hooks/useChatInput'; // đường dẫn đúng tùy project

function ChatInput({ onSendMessage, isLoading, messagesCount }) {
  const {
    message,
    setMessage,
    isRecording,
    textareaRef,
    handleSubmit,
    handleKeyDown,
    handleVoiceRecord,
  } = useChatInput({ isLoading, onSendMessage });

  return (
    <div
      className={`px-3 py-3 border-top bg-white shadow-sm ${messagesCount === 0 ? 'rounded shadow-lg' : ''}`}
      style={{
        position: 'sticky',
        bottom: 0,
        borderRadius: '24px !important',
        backdropFilter: messagesCount === 0 ? 'blur(10px)' : 'none',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <div className="position-relative">
          <Form.Control
            as="textarea"
            ref={textareaRef}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn...(Enter gửi / Shift+Enter xuống dòng)"
            disabled={isLoading}
            className="border-0 shadow-none pe-5"
            style={{
              borderRadius: '24px',
              resize: 'none',
              padding: '12px 60px 12px 16px',
              fontSize: '0.95rem',
              minHeight: '44px',
              maxHeight: '200px',
              overflowY: 'auto',
              background: '#f8f9fa',
            }}
          />

          <Button
            type="button"
            aria-label="Ghi âm"
            onClick={handleVoiceRecord}
            disabled={isLoading || isRecording}
            className="position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center"
            style={{
              right: '60px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isRecording
                ? 'linear-gradient(135deg, #dc3545, #ff6b6b)'
                : 'linear-gradient(135deg, #6c757d, #adb5bd)',
              border: 'none',
              color: '#fff',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Mic color="#fff" size={18} />
          </Button>

          <Button
            type="submit"
            aria-label="Gửi"
            disabled={isLoading || !message.trim()}
            className="position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isLoading || !message.trim()
                ? 'linear-gradient(135deg, #adb5bd, #868e96)'
                : 'linear-gradient(135deg, #007bff, #6f42c1)',
              border: 'none',
              color: '#fff',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : <Send size={18} />}
          </Button>
        </div>
      </Form>

      <div className="text-center mt-2">
        <small className="text-muted">
          Gnar AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
        </small>
      </div>
    </div>
  );
}

export default ChatInput;
