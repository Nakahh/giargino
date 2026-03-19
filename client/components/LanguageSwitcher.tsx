import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const isPortuguese = i18n.language === 'pt-BR';

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
      title={isPortuguese ? 'Switch to English' : 'Mudar para Português'}
      style={{ color: '#FFFFFF' }}
    >
      <span className="text-lg">
        {isPortuguese ? '🇺🇸' : '🇧🇷'}
      </span>
      <span className="text-sm md:text-base font-semibold">
        {isPortuguese ? 'EN' : 'PT'}
      </span>
    </button>
  );
}
