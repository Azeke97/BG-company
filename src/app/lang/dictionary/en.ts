export default defineI18nLocale(() => {
  return {
    validation: {
      required: "This field is required",
      min: "Minimum characters amount is {0}",
      max: "Maximum characters amount is {0}",
      email: "Please enter a valid email",
      captcha: "Please verify that you are not a robot",
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
      otp_error: "Invalid one-time password",
      user_not_found: "User not found",
    },

    header: {
      brand: "BG Company Astana",
      menu: {
        home: "Home",
        services: "Services",
        shop: "Shop",
        contact: "Request a call",
      },
    },
    shop: {
      title: "BG Company Shop",
      subtitle:
        "Our catalog is coming soon: stretch ceilings, custom furniture, and related materials. Need a quote today? Use the contact form on the homepage.",
    },

    hero: {
      brand: "BG Company Astana",
      menu: {
        home: "Home",
        services: "Services",
        shop: "Shop",
        contact: "Request a call",
      },
    },

    footer: {
      rights: "All rights reserved",
      contacts: "Contacts",
      address: "Address",
      madeByTitle: "Site by",
      madeByName: "Anthurium_webdesign",
    },
  };
});
