export default defineI18nLocale(() => {
  return {
    validation: {
      required: "Поле обязательно для заполнения",
      min: "Минимальное количество символов - {0}",
      max: "Максимальное количество символов - {0}",
      email: "Пожалуйста, введите корректный email",
      captcha: "Пожалуйста, подтвердите, что вы не робот",
    },
    localeFooter: {
      lbl_corruption_title: "ПО КОРРУПЦИОННЫМ РИСКАМ",
      lbl_corruption_email: "skk@khc.kz",
      lbl_corruption_phone: "+7 (7172) 79-75-75 (вн. 4444)",
      lbl_corruption_phone_tel: "+77172797575",
      lbl_corruption_report_label: "Сообщить о коррупции",
      lbl_corruption_report_link:
        "https://khc.kz/ru/%d1%82%d0%b5%d1%85%d0%bd%d0%b8%d1%87%d0%b5%d1%81%d0%ba%d0%b0%d1%8f-%d0%bf%d0%be%d0%b4%d0%b4%d0%b5%d1%80%d0%b6%d0%ba%d0%b0-2/",
    },
    localErrors: {
      otp_error: "Неверный одноразовый код",
      user_not_found: "Пользователь не найден",
    },

    header: {
      brand: "BG Company Astana",
      menu: {
        home: "Главная",
        services: "Услуги",
        shop: "Магазин",
        contact: "Заказать звонок",
      },
    },

    shop: {
      title: "Магазин BG Company",
      subtitle:
        "Скоро здесь будет наш каталог: натяжные потолки, мебель на заказ и сопутствующие материалы. Если нужен расчёт — напишите нам через форму на главной.",
    },

    hero: {
      title: "Преобразите свое пространство с",
      desc: "Откройте для себя мир инновационных решений для ремонта и дизайна дома. Дом вашей мечты всего в одном проекте.",
      button: {
        feedback: "Заказать консультацию",
        portfolio: "Портфолио",
      },
      info: [
        "Фиксированная смета",
        "Гарантия 1 год",
        "Прозрачные тарифы",
        "Дизайн-проект в комплекте",
      ],
    },

    footer: {
      rights: "Все права защищены",
      contacts: "Контакты",
      address: "Адрес",
      madeByTitle: "Сайт разработан",
      madeByName: "Anthurium_webdesign",
    },
  };
});
