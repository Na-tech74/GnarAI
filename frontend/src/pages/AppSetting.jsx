import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Tab,
  Nav,
  InputGroup,
} from 'react-bootstrap';
import {
  Settings,
  User,
  Globe,
  Shield,
  Bell,
  Trash2,
  Download,
  Upload,
} from 'lucide-react';

function AppSetting() {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'vi',
    fontSize: 'medium',
    sendOnEnter: true,
    showTimestamps: false,
    soundEffects: true,
    saveConversations: true,
    allowDataCollection: false,
    twoFactorAuth: false,
    emailNotifications: true,
    pushNotifications: false,
    username: 'nam98561@gmail.com',
    email: 'nam98561@gmail.com',
  });

  const [key, setKey] = useState('general');
  const [showDelete, setShowDelete] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const Toggle = ({ checked, onChange }) => (
    <Form.Check
      type="switch"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );

  const renderSelect = (key, options) => (
    <Form.Select
      value={settings[key]}
      onChange={(e) => updateSetting(key, e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Form.Select>
  );

  const renderInput = (key, type = 'text') => (
    <Form.Control
      type={type}
      value={settings[key]}
      onChange={(e) => updateSetting(key, e.target.value)}
    />
  );

  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-between align-items-center mb-4">
        <Col>
          <h2 className="d-flex align-items-center m-0">
            <Settings className="me-2" /> Cài đặt
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="outline-secondary" onClick={() => window.location.href = '/'}>
            <i className="bi bi-house-door-fill me-2"></i> Về trang chủ
          </Button>
        </Col>
      </Row>
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="general">
                  <Settings className="me-2" /> Chung
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="chat">
                  <Globe className="me-2" /> Chat
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="privacy">
                  <Shield className="me-2" /> Bảo mật
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="notifications">
                  <Bell className="me-2" /> Thông báo
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="account">
                  <User className="me-2" /> Tài khoản
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="general">
                <Form.Group className="mb-3">
                  <Form.Label>Giao diện</Form.Label>
                  {renderSelect('theme', [
                    { value: 'light', label: 'Sáng' },
                    { value: 'dark', label: 'Tối' },
                    { value: 'auto', label: 'Tự động' },
                  ])}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ngôn ngữ</Form.Label>
                  {renderSelect('language', [
                    { value: 'vi', label: 'Tiếng Việt' },
                    { value: 'en', label: 'English' },
                    { value: 'ja', label: '日本語' },
                    { value: 'ko', label: '한국어' },
                  ])}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Kích thước chữ</Form.Label>
                  {renderSelect('fontSize', [
                    { value: 'small', label: 'Nhỏ' },
                    { value: 'medium', label: 'Vừa' },
                    { value: 'large', label: 'Lớn' },
                  ])}
                </Form.Group>
              </Tab.Pane>

              <Tab.Pane eventKey="chat">
                <Form.Group className="mb-3">
                  <Form.Label>Gửi tin nhắn bằng Enter</Form.Label>
                  <Toggle
                    checked={settings.sendOnEnter}
                    onChange={(val) => updateSetting('sendOnEnter', val)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hiển thị thời gian</Form.Label>
                  <Toggle
                    checked={settings.showTimestamps}
                    onChange={(val) => updateSetting('showTimestamps', val)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Âm thanh thông báo</Form.Label>
                  <Toggle
                    checked={settings.soundEffects}
                    onChange={(val) => updateSetting('soundEffects', val)}
                  />
                </Form.Group>
              </Tab.Pane>

              <Tab.Pane eventKey="privacy">
                <Form.Group className="mb-3">
                  <Form.Label>Lưu cuộc trò chuyện</Form.Label>
                  <Toggle
                    checked={settings.saveConversations}
                    onChange={(val) => updateSetting('saveConversations', val)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Thu thập dữ liệu</Form.Label>
                  <Toggle
                    checked={settings.allowDataCollection}
                    onChange={(val) => updateSetting('allowDataCollection', val)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Xác thực 2 bước</Form.Label>
                  <Toggle
                    checked={settings.twoFactorAuth}
                    onChange={(val) => updateSetting('twoFactorAuth', val)}
                  />
                </Form.Group>
              </Tab.Pane>

              <Tab.Pane eventKey="notifications">
                <Form.Group className="mb-3">
                  <Form.Label>Thông báo email</Form.Label>
                  <Toggle
                    checked={settings.emailNotifications}
                    onChange={(val) => updateSetting('emailNotifications', val)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Thông báo đẩy</Form.Label>
                  <Toggle
                    checked={settings.pushNotifications}
                    onChange={(val) => updateSetting('pushNotifications', val)}
                  />
                </Form.Group>
              </Tab.Pane>

              <Tab.Pane eventKey="account">
                <Form.Group className="mb-3">
                  <Form.Label>Tên người dùng</Form.Label>
                  {renderInput('username')}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  {renderInput('email', 'email')}
                </Form.Group>
                <div className="d-flex flex-column gap-2">
                  <Button variant="primary">
                    <Download className="me-2" /> Xuất dữ liệu
                  </Button>
                  <Button variant="success">
                    <Upload className="me-2" /> Nhập dữ liệu
                  </Button>
                  <Button variant="danger" onClick={() => setShowDelete(true)}>
                    <Trash2 className="me-2" /> Xóa tài khoản
                  </Button>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowDelete(false);
              alert('Tài khoản đã được xóa (demo)');
            }}
          >
            Xóa tài khoản
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default AppSetting;