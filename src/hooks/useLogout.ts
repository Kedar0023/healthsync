import { useRouter } from 'next/navigation';
import { trpc } from '@/tRPC/client/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useLogout = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { isAuthenticated } = useAuth();

  const logoutMutation = trpc.logout.useMutation({
    onSuccess: () => {
      // Clear all queries and mutations from the cache
      utils.invalidate();
      
      // Show success message
      toast.success('Logged out successfully');
      
      // Redirect to home page
      router.push('/');
      
      // Force a page refresh to clear all client state
      window.location.reload();
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error.message}`);
    }
  });

  const handleLogout = async () => {
    if (!isAuthenticated) {
      toast.error('No active session to logout from');
      return;
    }

    try {
      toast.loading('Logging out...');
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { handleLogout, isLoading: logoutMutation.isLoading };
}; 