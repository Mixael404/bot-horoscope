import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";
import { bigBackOption, periodOptions, signOptions } from "./options.js";
const TOKEN = "7193048813:AAEVXbWS9ZDu0tC9K8InfeDgM5aH5U0kze0";

const bot = new TelegramBot(TOKEN, { polling: true });
const BASE_URL = "https://horoscope-app-api.vercel.app/api/v1/get-horoscope";

const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const REQUEST_HEADING = "Переведи на русский язык этот астрологический прогноз. Переводи название знака зодиака так, как оно пишется на русском языке:"

const openai = new OpenAI({
  organization: "org-VhVLUTAhfUyYSs6tTQnCytZq",
  project: "proj_4szXpGVlXpRWFv2UmNIIIDK4",
  apiKey: "sk-proj-qEk7gvBgAJtlkB0278TqT3BlbkFJ6yNCZZhLUFjvHqIZfNYe",
});


const chats = {}

async function translateOnRussian(text){
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${text}` }],
    temperature: 0.8,
    max_tokens: 1000,
  };
  const response = await openai.chat.completions.create(requestBody);
  return response.choices[0].message.content
}

async function getHoroscope(sign, period) {
  if (!SIGNS.includes(sign)) return false;

  const response = await fetch(`${BASE_URL}/${period}?sign=${sign}`);
  const data = await response.json();
  return data["data"]["horoscope_data"];
}



const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Гороскоп на день" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "*Добро пожаловать в нашего бота! Мы предлагаем точные и актуальные прогнозы от профессиональных астрологов 🌌.*",
        { parse_mode: "Markdown" }
      );
      return bot.sendMessage(
        chatId,
        "Выбери, на какой период тебе выдать прогноз",
        periodOptions
      );
    }

    // if (text === "Leo") {
    //   const horoscopeText = await getHoroscope("Leo", "daily");
    //   return bot.sendMessage(chatId, horoscopeText);
    // }

    // if(text === "/daily"){
    //     const period = 'daily'
    //     const sign = await bot.sendMessage(chatId,"Выбери свой знак зодиака", signOptions)
    //     const horoscopeText = await getHoroscope(sign, period)
    //     return bot.sendMessage(chatId, horoscopeText, periodOptions)
    // }
    // if(text === "/monthly"){
    //     const period = 'monthly'
    //     const sign = await bot.sendMessage(chatId,"Выбери свой знак зодиака", signOptions)
    //     const horoscopeText = await getHoroscope(sign, period)
    //     return bot.sendMessage(chatId, horoscopeText, periodOptions)
    // }

    return bot.sendMessage(chatId, "This command doesn't exists!");
  });

  bot.on('callback_query', async (msg) => {
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === "daily"){
        chats[chatId] = 'daily'
        return bot.sendMessage(chatId,"Выбери свой знак зодиака", signOptions)
    }
    
    if(data === "monthly"){
        chats[chatId] = 'monthly'
        return bot.sendMessage(chatId,"Выбери свой знак зодиака", signOptions)
    }

    if(SIGNS.includes(data)){
        const period = chats[chatId]
        let headerText
        const horoscopeText = await getHoroscope(data, period)
        const translatedHoroscope = await translateOnRussian(horoscopeText)
        if(period === 'daily'){
            headerText = 'Ваш астрологический прогноз на день:'
        } else if(period === 'monthly'){
            headerText = 'Ваш астрологический прогноз на месяц:'
        }
        return bot.sendMessage(chatId, `${headerText}\n\n${translatedHoroscope}`, bigBackOption)
    }

    return bot.sendMessage(chatId, "Выбери, на какой период тебе выдать прогноз", periodOptions)
  })
};

start();
