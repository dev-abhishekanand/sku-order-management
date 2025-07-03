import { useCallback } from 'react';

export const useToast = () => {
    const showToast = useCallback((message, type = 'success', duration = 3000) => {
        const toast = document.createElement('div');

        toast.className = `
      fixed bottom-5 right-5 z-[9999]
      px-4 py-2 rounded shadow text-white text-sm
      transition-all duration-300 ease-in-out
      animate-toastEnter
      ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-700'}
    `;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 5000);
        }, duration);
    }, []);

    return showToast;
};
