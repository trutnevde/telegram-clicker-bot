const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const app = express();

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    inline_keyboard: [[
      {
        text: '🎮 Открыть кликер',
        web_app: { url: 'https://yourdomain.com/clicker.html'  }
      }
    ]]
  };

  bot.sendMessage(chatId, 'Нажми кнопку ниже, чтобы начать ловить рыбу!', {
    reply_markup: keyboard
  });
});

// Обработка данных из Web App
bot.on('callback_query', (query) => {
  bot.answerCallbackQuery(query.id, {
    url: 'https://yourdomain.com/clicker.html' 
  });
});

// Сервер для раздачи статики
app.use(express.static(__dirname));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});