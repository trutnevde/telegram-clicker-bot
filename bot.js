const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// === Бот ===
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    inline_keyboard: [[
      {
        text: '🎮 Открыть кликер',
        web_app: { url: 'https://telegram-clicker-bot.vercel.app/clicker.html'  }
      }
    ]]
  };

  bot.sendMessage(chatId, 'Нажми кнопку ниже, чтобы начать ловить рыбу!', {
    reply_markup: keyboard
  });
});

// === Веб-сервер для раздачи clicker.html ===
const app = express();
const PORT = process.env.PORT || 3000;

// Раздаём статические файлы из корня проекта
app.use(express.static(path.resolve(__dirname)));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});