import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import Avatar from '../components/Avatar';
import MessageItem from '../components/MessageItem';

export default function Chat() {
  const { user, logout } = useAuth();
  const socket = useSocket();
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    api.get('/channels')
      .then(({ data }) => {
        setChannels(data);
        if (data[0]) setActiveChannel(data[0]);
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  useEffect(() => {
    if (!activeChannel) return;
    api.get(`/channels/${activeChannel._id}/messages`).then(({ data }) => setMessages(data));
    socket?.emit('join_channel', activeChannel._id);
  }, [activeChannel, socket]);

  useEffect(() => {
    if (!socket || !activeChannel) return;
    const onMsg = (msg) => {
      if (msg.channel === activeChannel._id) setMessages((prev) => [...prev, msg]);
    };
    socket.on('receive_message', onMsg);
    return () => socket.off('receive_message', onMsg);
  }, [socket, activeChannel]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !socket || !activeChannel) return;
    socket.emit('send_message', { channelId: activeChannel._id, text });
    setText('');
  };

  const logoutAndLeave = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="chat-layout">
      <nav className="server-rail" aria-label="Servers">
        <div className="server-icon" title="Discord Clone">D</div>
        <div className="rail-divider" />
      </nav>

      <aside className="sidebar">
        <div className="sidebar-top">
          <h2>Discord Clone</h2>
          <span className="online-dot" title="Online" />
        </div>
        <div className="channels-section">
          <p className="channels-label">Text Channels</p>
          <ul className="channel-list">
            {channels.map((ch) => (
              <li
                key={ch._id}
                className={activeChannel?._id === ch._id ? 'active' : ''}
                onClick={() => setActiveChannel(ch)}
              >
                {ch.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="user-panel">
          <Avatar name={user?.username} className="user-avatar" />
          <div className="user-info">
            <div className="name">{user?.username}</div>
            <div className="status">● Online</div>
          </div>
          <button type="button" className="btn-logout" onClick={logoutAndLeave} title="Logout">Exit</button>
        </div>
      </aside>

      <main className="chat-main">
        <header className="chat-header">
          <span className="hash">#</span>
          <h3>{activeChannel?.name || '...'}</h3>
          {activeChannel?.description && <span className="desc">{activeChannel.description}</span>}
        </header>

        <div className="messages-area">
          {activeChannel && (
            <div className="welcome-banner">
              <div className="big-hash">#</div>
              <h4>Welcome to #{activeChannel.name}!</h4>
              <p>{activeChannel.description || 'This is the start of the channel.'}</p>
            </div>
          )}
          {messages.map((msg) => (
            <MessageItem key={msg._id} msg={msg} isYou={msg.username === user?.username} />
          ))}
          <div ref={endRef} />
        </div>

        <form className="message-form" onSubmit={sendMessage}>
          <div className="message-input-wrap">
            <input
              type="text"
              placeholder={`Message #${activeChannel?.name || 'channel'}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="btn-send">Send</button>
          </div>
        </form>
      </main>
    </div>
  );
}
