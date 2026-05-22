import Avatar from './Avatar';

const formatTime = (date) =>
  new Date(date).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function MessageItem({ msg, isYou }) {
  return (
    <div className="message-row">
      <Avatar name={msg.username} className="msg-avatar" />
      <div className="msg-body">
        <div className="msg-header">
          <span className={`msg-username ${isYou ? 'you' : ''}`}>{msg.username}</span>
          <span className="msg-time">{formatTime(msg.createdAt)}</span>
        </div>
        <p className="msg-text">{msg.text}</p>
      </div>
    </div>
  );
}
