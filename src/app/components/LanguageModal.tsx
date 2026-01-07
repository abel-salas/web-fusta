'use client';

import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

interface LanguageModalProps {
    currentLocale: string;
    onClose: () => void;
}

export default function LanguageModal({ currentLocale, onClose }: LanguageModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animación de entrada
        setIsVisible(true);
    }, []);

    const handleLanguageSelect = (langCode: string) => {
        // Cerrar modal con animación y redirigir
        setIsVisible(false);
        setTimeout(() => {
            window.location.href = `/${langCode}${window.location.pathname.replace(`/${currentLocale}`, '') || '/'}`;
        }, 300);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isVisible ? 'bg-black bg-opacity-50' : 'bg-transparent'
                }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Language
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        aria-label="Cerrar"
                    >
                        <span className="material-icons-outlined text-2xl">close</span>
                    </button>
                </div>

                {/* Language Switcher in Modal Mode */}
                <LanguageSwitcher
                    currentLocale={currentLocale}
                    isModal={true}
                    onLanguageSelect={handleLanguageSelect}
                />

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                        Restaurant La Fusta
                    </p>
                </div>
            </div>
        </div>
    );
}