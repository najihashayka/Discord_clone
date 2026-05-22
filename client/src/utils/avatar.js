const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899', '#34d399', '#f97316'];

export const getInitials = (name) => (name || '?').slice(0, 2).toUpperCase();

export const avatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + hash;
  return COLORS[hash % COLORS.length];
};
