import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Copy, Check, Mail, MessageCircle, Send, Share } from 'lucide-react';

export default function ShareDropdown({ urlToShare }) {
    const [copied, setCopied] = useState(false);

    // Đổi localhost -> IP LAN
    const getShareUrl = () => {
        let url = window.location.href || 'http://localhost:5173/';
        return url;
    };

    const shareText = "Chào mừng bạn đến với GnarAI:";

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(getShareUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy lỗi:', err);
            const textArea = document.createElement('textarea');
            textArea.value = urlToShare;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareViaEmail = () => {
        const subject = encodeURIComponent('Nội dung được chia sẻ');
        const body = encodeURIComponent(`${shareText}\n\n${getShareUrl()}`);

        window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`);
    };


    const shareViaSMS = () => {
        const message = encodeURIComponent(`${shareText} ${getShareUrl()}`);
        window.open(`sms:?body=${message}`);
    };

    const shareViaTelegram = () => {
       getShareUrl();
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(shareText)}`;
        window.open(telegramUrl, '_blank');
    };

    const nativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Chia sẻ',
                    text: shareText,
                    url: getShareUrl(),
                });
            } catch (err) {
                console.error('Native share lỗi:', err);
                copyToClipboard();
            }
        } else {
            copyToClipboard();
        }
    };

    return (
        <Dropdown align="end">
            <Dropdown.Toggle
                size={16}
                className="d-flex align-items-center justify-content-center p-1 rounded"
            >
                <i className="bi bi-share" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={copyToClipboard}>
                    {copied ? (
                        <Check size={16} className="me-2 text-success" />
                    ) : (
                        <Copy size={16} className="me-2" />
                    )}
                    {copied ? 'Đã copy!' : 'Sao chép liên kết'}
                </Dropdown.Item>

                <Dropdown.Item onClick={nativeShare}>
                    <Share size={16} className="me-2 text-primary" />
                    Chia sẻ (Native)
                </Dropdown.Item>

                <Dropdown.Item onClick={shareViaEmail}>
                    <Mail size={16} className="me-2 text-danger" />
                    Gửi Email
                </Dropdown.Item>

                <Dropdown.Item onClick={shareViaSMS}>
                    <MessageCircle size={16} className="me-2 text-success" />
                    Gửi SMS
                </Dropdown.Item>

                <Dropdown.Item onClick={shareViaTelegram}>
                    <Send size={16} className="me-2 text-info" />
                    Telegram
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
