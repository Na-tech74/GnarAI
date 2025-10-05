import React from 'react';
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import useChatBot from '../../hooks/useChatBot';
import ChatHeader from '../../components/layout/ChatHeader';
import ChatMessages from '../../components/chat/ChatMessages';
import ChatInput from '../../components/layout/ChatInput';
import ErrorAlert from '../../components/ErrorAlert';
import ChatHistory from '../../components/chat/ChatHistory';
import ShareDropdown from '../../components/layout/ShareDropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ChatBot() {
  const navigate = useNavigate();
  const chat = useChatBot(navigate);

  // Destructure toàn bộ state từ custom hook
  const {
    chatHistory,
    currentChatId,
    messages,
    isLoading,
    error,
    bottomRef,
    handleSendMessage,
    setMessages,
    handleNewChat,
    handleSelectChat,
    searchTerm,
    setSearchTerm,
    collapsedSidebar,
    setCollapsedSidebar,
    showSidebar,
    setShowSidebar,
    editingChatId,
    editTitle,
    setEditTitle,
    handleEditTitle,
    saveEditTitle,
    showDeleteModal,
    setShowDeleteModal,
    setChatToDelete,
    handleDeleteChat,
  } = chat;

  return (
    <Container fluid className="p-0 m-0 vh-100">
      <div className="d-flex h-100 fixed-top">
        {/* Sidebar desktop */}
        <div
          className="d-none d-md-block"
          style={{
            width: collapsedSidebar ? '50px' : '280px',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          }}
        >
          <div
            style={{ backgroundColor: '#dee2e6' }}
            className="d-flex justify-content-between p-2"
          >
            {!collapsedSidebar && (
              <ShareDropdown shareUrl={`https://yourdomain.com/chat/${currentChatId}`} />
            )}

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setCollapsedSidebar(!collapsedSidebar)}
            >
              {collapsedSidebar
                ? <i className="bi bi-arrow-bar-right" />
                : <i className="bi bi-arrow-bar-left" />}
            </Button>
          </div>

          {!collapsedSidebar && (
            <ChatHistory
              chatHistory={chatHistory}
              currentChatId={currentChatId}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleNewChat={handleNewChat}
              handleSelectChat={handleSelectChat}
              editingChatId={editingChatId}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              handleEditTitle={handleEditTitle}
              saveEditTitle={saveEditTitle}
              setChatToDelete={setChatToDelete}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        </div>

        {/* Icon dock khi sidebar thu gọn */}
        {collapsedSidebar && (
          <div className="position-fixed bottom-0 start-0 mb-3 d-none d-md-flex z-3">
            <div className="d-flex flex-column align-items-center gap-3 p-3 rounded-end">
              <a href="https://www.facebook.com/nguyen.nam.394402" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-secondary">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="https://www.instagram.com/nam.hocfrontend/" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-secondary">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="https://github.com/Na-tech74" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-secondary">
                <i className="bi bi-github fs-5"></i>
              </a>
              <a href="mailto:namhoc.frontend@gmail.com" title="Email" className="text-secondary">
                <i className="bi bi-envelope-check fs-5"></i>
              </a>
              <a
                href="#settings"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/settings');
                }}
                title="Cài đặt"
                className="text-secondary"
              >
                <i className="bi bi-gear fs-5"></i>
              </a>
            </div>
          </div>
        )}

        {/* Chat area */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Header mobile */}
          <div className="d-md-none border-bottom bg-light p-2">
            <Row className="align-items-center">
              <Col xs={6}>
                <Button variant="outline-primary" onClick={() => setShowSidebar(true)} size="sm">
                  📚 Lịch sử chat
                </Button>
              </Col>
              <Col xs={6} className="text-end">
                <div className="d-flex justify-content-end gap-3">
                  <a href="https://www.facebook.com/nguyen.nam.394402" target="_blank" rel="noopener noreferrer" className="text-secondary">
                    <i className="bi bi-facebook fs-5"></i>
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-secondary">
                    <i className="bi bi-instagram fs-5"></i>
                  </a>
                  <a href="https://github.com/Na-tech74" target="_blank" rel="noopener noreferrer" className="text-secondary">
                    <i className="bi bi-github fs-5"></i>
                  </a>
                  <a href="mailto:namhoc.frontend@gmail.com" className="text-secondary">
                    <i className="bi bi-envelope-check fs-5"></i>
                  </a>
                </div>
              </Col>
            </Row>
          </div>

          <div className="position-sticky top-0 z-3">
            <ChatHeader
              messagesCount={messages.length}
              onClearChat={() => setMessages([])}
              isLoading={isLoading}
            />
          </div>

          <div className="flex-grow-1 overflow-auto px-3 py-2 mt-5">
            <Container style={{ maxWidth: '850px' }}>
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                onQuickMessage={handleSendMessage}
              />
              <div ref={bottomRef} />
            </Container>
          </div>

          <ErrorAlert error={error} onDismiss={() => setError('')} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="position-sticky bottom-0"
            style={{ zIndex: 1000 }}
          >
            <div className="d-flex justify-content-center px-2 py-3">
              <div style={{ width: '100%', maxWidth: '850px' }}>
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  messagesCount={messages.length}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sidebar mobile */}
      <Modal show={showSidebar} onHide={() => setShowSidebar(false)} className="d-md-none">
        <Modal.Header closeButton>
          <Modal.Title>Lịch sử trò chuyện</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <ChatHistory
            chatHistory={chatHistory}
            currentChatId={currentChatId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleNewChat={handleNewChat}
            handleSelectChat={handleSelectChat}
            editingChatId={editingChatId}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            handleEditTitle={handleEditTitle}
            saveEditTitle={saveEditTitle}
            setChatToDelete={setChatToDelete}
            setShowDeleteModal={setShowDeleteModal}
          />
        </Modal.Body>
      </Modal>

      {/* Modal xác nhận xoá */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xoá cuộc trò chuyện này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Huỷ
          </Button>
          <Button variant="danger" onClick={handleDeleteChat}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ChatBot;
