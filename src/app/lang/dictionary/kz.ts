export default defineI18nLocale(() => {
  return {
    validation: {
      required: "Бұл өріс міндетті түрде толтырылуы керек",
      min: "Ең аз таңба саны - {0}",
      max: "Ең көп таңба саны - {0}",
      email: "Дұрыс email мекенжайын енгізіңіз",
      captcha: "Өзіңіздің робот емес екеніңізді растаңыз",
    },
    localeFooter: {
      lbl_corruption_title: "ЖЕМҚОРЛЫҚ ТӘУЕКЕЛІ БОЙЫНША",
      lbl_corruption_email: "skk@khc.kz",
      lbl_corruption_phone: "+7 (7172) 79-75-75 (ішкі. 4444)",
      lbl_corruption_phone_tel: "+77172797575",
      lbl_corruption_report_label: "Сыбайлас жемқорлық туралы хабарлау",
      lbl_corruption_report_link:
        "https://khc.kz/kz/%d1%82%d0%b5%d1%85%d0%bd%d0%b8%d1%87%d0%b5%d1%81%d0%ba%d0%b0%d1%8f-%d0%bf%d0%be%d0%b4%d0%b4%d0%b5%d1%80%d0%b6%d0%ba%d0%b0-2/",
    },
    localErrors: {
      otp_error: "Бір реттік код жарамсыз",
      user_not_found: "Пайдаланушы табылмады",
    },

    header: {
      brand: "BG Company Astana",
      menu: {
        home: "Басты бет",
        services: "Қызметтер",
        shop: "Дүкен",
        contact: "Қоңырауды сұрау",
      },
    },
    shop: {
      title: "BG Company дүкені",
      subtitle:
        "Жақында каталог ашылады: созылмалы төбелер, тапсырыспен жасалатын жиһаз және байланысты материалдар. Қазір-ақ есептеу қажет болса, басты беттегі байланыс формасын пайдаланыңыз.",
    },
    footer: {
      rights: "Барлық құқықтар қорғалған",
      contacts: "Байланыс",
      address: "Мекенжай",
      madeByTitle: "Сайтты жасаған",
      madeByName: "Anthurium_webdesign",
    },
  };
});
