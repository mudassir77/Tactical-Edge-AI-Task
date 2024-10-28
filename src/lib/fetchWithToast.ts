import { toast } from 'react-toastify';

interface FetchWithToastOptions extends RequestInit {
  successMessage?: string;
  errorMessage?: string;
}

export async function fetchWithToast(
  url: string,
  options: FetchWithToastOptions = {}
): Promise<any> {
  try {
    const response = await fetch(url, { ...options, cache: 'no-store' });
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = options.errorMessage || errorData.message || 'An error occurred';

      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (options.successMessage) {
      toast.success(options.successMessage);
    }

    return data;
  } catch (error: any) {
    if (!error.message) {
      toast.error('An unexpected error occurred');
    }
    throw error;
  }
}