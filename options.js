export const bigBackOption = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Назад", callback_data: "back" },
        ],
      ],
    }),
  };

export  const periodOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "На день", callback_data: "daily" },
          { text: "На месяц", callback_data: "monthly" },
        ],
      ],
    }),
  };

export const signOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Овен", callback_data: "Aries" },
          { text: "Телец", callback_data: "Taurus" },
          { text: "Близнецы", callback_data: "Gemini" },
        ],
        [
          { text: "Рак", callback_data: "Cancer" },
          { text: "Лев", callback_data: "Leo" },
          { text: "Дева", callback_data: "Virgo" },
        ],
        [
          { text: "Весы", callback_data: "Libra" },
          { text: "Скорпион", callback_data: "Scorpio" },
          { text: "Стрелец", callback_data: "Sagittarius" },
        ],
        [
          { text: "Козерог", callback_data: "Capricorn" },
          { text: "Водолей", callback_data: "Aquarius" },
          { text: "рыбы", callback_data: "Pisces" },
        ],
        [
          {text: "Назад", callback_data: 'Back'}
        ]
      ],
    }),
  };