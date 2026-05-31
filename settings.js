// settings.js — конфигурация сайта. Изменяйте только этот файл для обновления данных.
const SITE_CONFIG = {
  // Ссылки на соцсети
  socials: {
    instagram: "https://instagram.com/ваш_ник",
    telegram: "https://t.me/ваш_ник",
    pinterest: "https://pinterest.com/ваш_ник",
    youtube: "https://youtube.com/@ваш_ник"
  },

  // Username публичного Telegram-канала для ленты (без @)
  telegramUsername: "goluboglazich",

  // Массив проектов. Добавляйте новые объекты в конец массива.
  projects: [
    {
      title: "Название проекта",
      description: "Краткое описание функционала, технологий и целей.",
      cover: "assets/project1.jpg", // путь к обложке (можно оставить пустым "")
      downloadUrl: "assets/project1.zip"
    },
    {
      title: "Второй проект",
      description: "Описание второго проекта. Замените данные на актуальные.",
      cover: "",
      downloadUrl: "https://example.com/download/project2"
    }
  ]
};
