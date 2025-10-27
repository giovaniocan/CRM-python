'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast, { ToastContent, ToastType} from '@/components/ui/Toast';

type ToastContextType = {
    showToast: (content: ToastContent) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [content, setContent] = useState<ToastContent | null>(null);

    const showToast = (content: ToastContent) => {
        setContent(content)
    };

    const hideToast = () => {
        setContent(null)
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast
                content={content}
                isVisible={!!content}
                onClose={hideToast}
                autoClose={true}
                duration={5000}
            />
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if(context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}