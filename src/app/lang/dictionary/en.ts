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
      brand: "BG Company",
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
    mainPage: {
      hero: {
        title: "Transform your space with",
        desc: "Discover a world of innovative solutions for home renovation and design. Your dream home in just one project.",
        button: {
          feedback: "Request a consultation",
          portfolio: "Portfolio",
        },
        info: [
          "Fixed estimate",
          "1-year warranty",
          "Transparent pricing",
          "Design project included",
        ],
      },

      heroSlides: {
        items: [
          {
            title: "Our Mission",
            text: "We create cozy and functional spaces where every detail of renovation, furniture, and interior serves comfort and durability.",
          },
          {
            title: "Our Vision",
            text: "We aim to become a market leader in end-to-end home solutions, uniting renovation, ceilings, and custom furniture into one seamless service.",
          },
          {
            title: "Why Choose Us?",
            list: [
              "Full service cycle in one place",
              "Personalized approach & transparent estimates",
              "Skilled craftsmen and modern technologies",
            ],
          },
        ],
      },

      services: {
        title: "Comprehensive Services for Your Home",
        subtitle: "All-in-one solutions for your living space",
        items: [
          {
            title: "Apartment & House Renovation",
            text: "From light cosmetic touch-ups to full renovations. We create modern, functional spaces that are comfortable to live in.",
          },
          {
            title: "Stretch Ceilings",
            text: "Matte, glossy, multi-level or with lighting. Fast installation, durability and a stylish look.",
          },
          {
            title: "Custom Furniture",
            text: "Made-to-order case and soft furniture. Unique designs, high-quality materials, tailored for your interior.",
          },
        ],
        hint: "Click on a service to go to the page and learn more",
      },

      portfolio: {
        title: "Our Creative Portfolio",
        subtitle: "Selected projects showcasing quality and innovation.",
        items: [
          {
            title: "Modern Studio Apartment",
            text: "A dynamic and stylish space where every detail contributes to the overall concept. Bright accents, modern materials, and a well-thought-out layout create an atmosphere of freedom and creativity. This apartment is perfect for active people who value design and comfort.",
          },
          {
            title: "Family Home with Character",
            text: "A warm and functional interior that combines aesthetics and practicality. The mix of brick walls, natural materials, and minimalist furniture creates a cozy space for the whole family. A home where every area is carefully designed — from the kitchen to the living room.",
          },
        ],
      },

      testimonials: {
        title: "Customer Testimonials",
        roles: {
          client: "Client",
          customer: "Customer",
        },
      },
    },

    ceiling: {
      hero: {
        title: "A home begins with the ceiling",
        desc: "Perfectly smooth surface, protection from leaks, and stylish design for any interior.",
        items: [
          "Free measurement",
          "Transparent estimate",
          "Quality guarantee",
        ],
        button: {
          feedback: "Request a consultation",
          portfolio: "Portfolio",
        },
      },
      steps: {
        gkl: {
          title: "Drywall ceilings (GKL)",
          effect:
            "Creates a perfectly even surface and allows multi-level constructions.",
          visual:
            "Looks monumental and emphasizes designer shapes and lighting.",
          advantages: [
            "Easy to paint",
            "Lighting integrates easily",
            "Simple to refresh over time",
          ],
        },
        shadow: {
          title: "Shadow gap ceiling",
          effect:
            "A neat 6 mm dark gap is created between the wall and the ceiling.",
          visual: "The ceiling seems to float in the air.",
          advantages: [
            "Stylish minimalism",
            "No skirting boards",
            "Ideal for modern apartments",
          ],
        },
        floating: {
          title: "Floating ceiling",
          effect:
            "LED lighting is embedded along the perimeter to softly illuminate the walls.",
          visual: "The ceiling ‘lifts up’, making the room feel larger.",
          advantages: ["Cozy ambience", "Works as main or decorative light"],
        },
        classic: {
          title: "Classic ceiling (with insert)",
          effect: "The gap is closed with a special elastic insert.",
          visual: "A neat and universal option.",
          advantages: [
            "Most affordable price",
            "Fast installation",
            "Fits any room",
          ],
        },
        ui: {
          chooseTitle: "Which ceiling to choose for your apartment?",
          chooseSubtitle:
            "Pick a style and instantly see how it affects space and lighting.",
          cta: "Request a quote",
          labels: {
            effect: "Effect",
            visual: "Look",
            advantages: "Advantages",
          },
        },
      },

      faq: {
        title: "Ceiling FAQ",
        subtitle: "Answers to the most common questions about choice and care.",
        items: [
          {
            question: "Which ceiling is best for the kitchen?",
            answer:
              "PVC stretch ceilings or a shadow gap ceiling: moisture and grease resistant, easy to clean. Drywall is fine when you need complex geometry and light lines.",
          },
          {
            question: "How much height does a ceiling ‘take’?",
            answer:
              "Classic stretch — from 3 cm; shadow gap — ~7–10 mm plus profile; floating with LED — from 5–6 cm. Two-level drywall — from 7–10 cm.",
          },
          {
            question: "Will a stretch ceiling hold a leak from above?",
            answer:
              "Yes. PVC film can hold about 80–100 L/m². After draining and warming it can regain its shape if there’s no mechanical damage.",
          },
          {
            question: "Which ceiling is better for complex lighting?",
            answer:
              "Floating (perimeter LED) for soft light and a visually larger room; shadow gap for minimalism without skirting; drywall for niches, lines and levels.",
          },
          {
            question: "What is the most budget-friendly option?",
            answer:
              "Classic stretch ceiling with insert: quick installation, universal look and affordable cost.",
          },
          {
            question: "How to care for a stretch ceiling?",
            answer:
              "Wipe with a soft cloth every 3–6 months using a mild glass cleaner. Avoid abrasives and hard brushes.",
          },
        ],
      },
    },

    contact: {
      title: "Get in Touch",
      subtitle:
        "Fill out the form and our specialist will contact you shortly!",
      consent:
        "By submitting, you consent to the processing of personal data and agree to our {policy}.",
      policy: "Privacy Policy",
      policyUrl: "/en/privacy",
      placeholders: {
        name: "Name",
        phone: "Phone",
        email: "Email",
        message: "Message",
      },
      actions: {
        submit: "Submit",
        sending: "Sending…",
      },
      success: "Thanks! We will contact you shortly.",
    },

    social: {
      open: "Open contact options",
      close: "Close menu",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      phone: "Call",
    },

    footer: {
      rights: "All rights reserved",
      contacts: "Contacts",
      address: "Astana, 23a Kaldayakov St., office 8. BG Company",
      madeByTitle: "Site by",
      madeByName: "Anthurium_webdesign",
    },
  };
});
