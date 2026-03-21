import Image from 'next/image';
import type { Session } from 'next-auth';

interface UserProfileProps {
  user: Session['user'];
}

export default function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name || 'Аватар'}
          width={32}
          height={32}
          className="rounded-full bg-gray-100 object-cover"
        />
      ) : (
        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
          {user.name?.charAt(0) || 'U'}
        </div>
      )}
      <span className="text-sm font-medium text-gray-700">{user.name}</span>
    </div>
  );
}
