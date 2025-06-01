interface LanguageSwitcherProps {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
}

export default function LanguageSwitcher({
  language,
  setLanguage,
}: LanguageSwitcherProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
        className="flex items-center space-x-1 bg-[#005BAA] border border-[#FFD700] px-3 py-1 rounded hover:bg-[#004488] transition"
      >
        <span>{language === 'en' ? '🇬🇧' : '🇫🇷'}</span>
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'FR'}
        </span>
      </button>
    </div>
  );
}