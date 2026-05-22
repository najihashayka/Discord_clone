import { getInitials, avatarColor } from '../utils/avatar';

export default function Avatar({ name, className }) {
  return (
    <div className={className} style={{ background: avatarColor(name) }}>
      {getInitials(name)}
    </div>
  );
}
