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

      faq: {
        title: "Frequently Asked Questions",
        subtitle:
          "Here are answers to the most common questions about our services.",
        items: [
          {
            question: "How long does renovation or furniture production take?",
            answer:
              "Renovation work usually takes from 2 weeks depending on the area and complexity of the project. Furniture production takes on average 2–4 weeks, and stretch ceiling installation only 1–2 days.",
          },
          {
            question: "Can I order a full 'turnkey' service?",
            answer:
              "Yes, we provide a complete range of services: from apartment renovation and ceiling installation to custom furniture production. You don’t need to look for different contractors — we handle everything in one project.",
          },
          {
            question: "Do you provide a warranty?",
            answer:
              "Yes, all works and materials are covered by a warranty of up to 1 year. We are confident in our quality and also provide post-warranty service.",
          },
          {
            question: "Do you offer installments or staged payments?",
            answer:
              "Yes, staged payment is possible — details are discussed when signing the contract.",
          },
          {
            question: "Can I order only furniture or only ceilings?",
            answer:
              "Yes, services can be ordered separately or as part of a complete project.",
          },
        ],
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

    furniture: {
      hero: {
        title: "Custom furniture tailored to your interior",
        desc: "Bespoke cabinet and upholstered pieces — comfort and style in every room.",
        items: [
          "Free measurement & consultation",
          "Estimate within 1 day",
          "Quality and durability warranty",
        ],
      },
      types: {
        case: {
          title: "Cabinet Furniture",
          desc: "Made-to-measure for your space. We use quality materials:",
          materials: [
            "Chipboard — for cabinets, kitchens and pedestals",
            "MDF — for fronts and doors, durable and eco-friendly",
          ],
          cards: [
            {
              title: "Kitchen Sets",
              desc: "thought-out storage and ergonomics.",
            },
            {
              title: "Walk-in Closets",
              desc: "custom shelving and drawer layouts.",
            },
            {
              title: "Wardrobes",
              desc: "mirror or matte fronts, precise fit.",
            },
          ],
        },
        soft: {
          title: "Upholstered Furniture",
          desc: "Sofas, beds and armchairs made to order: premium fabrics, eco fillings, ergonomics and durability.",
          cards: [
            {
              title: "Sofas",
              desc: "folding mechanisms, storage niches, removable covers.",
            },
            {
              title: "Beds",
              desc: "soft headboards, built-in drawers for storage.",
            },
            {
              title: "Armchairs & Poufs",
              desc: "statement pieces for a modern interior.",
            },
          ],
        },
        cta: "Request a Quote",
      },
      whyChoose: {
        title: "Why choose our furniture?",
        items: [
          {
            title: "Premium materials & durability",
            desc: "We use tested materials — chipboard, MDF, natural veneer and solid wood — ensuring longevity and resistance to daily wear.",
          },
          {
            title: "Modern hardware & mechanisms",
            desc: "We apply up-to-date fittings and soft-close systems for comfort, silent operation and functionality.",
          },
          {
            title: "Style and design variety",
            desc: "A wide palette of styles and finishes to match any interior — from timeless classics to modern minimalism.",
          },
        ],
      },
      faq: {
        title: "Furniture FAQ",
        subtitle:
          "Answers to the most common questions about custom furniture.",
        items: [
          {
            question: "Which materials are best for furniture?",
            answer:
              "Chipboard and MDF are common for carcasses, while facades often use solid wood, veneer, or acrylic. It depends on your budget and style.",
          },
          {
            question: "How long does it take to produce custom furniture?",
            answer:
              "On average 2–6 weeks, depending on project complexity, material availability, and order volume.",
          },
          {
            question: "Can furniture be made to custom sizes?",
            answer:
              "Yes, furniture is designed to fit your exact dimensions and room features: unusual niches, ceilings, and corners are not a problem.",
          },
          {
            question: "What warranty is provided?",
            answer:
              "Typically, 12 months for structures and fittings, plus after-warranty service.",
          },
          {
            question: "Which is better: ready-made or custom furniture?",
            answer:
              "Ready-made is faster and cheaper but limited to standard models. Custom furniture fits perfectly in size and style.",
          },
          {
            question: "How to care for chipboard or MDF furniture?",
            answer:
              "Wipe with a soft damp cloth without abrasives or aggressive cleaners. Avoid excess moisture.",
          },
        ],
      },
    },

    renovate: {
      hero: {
        title: "Turnkey designer renovation in Astana with a 1-year warranty",
        desc: "Pick renovation options that fit your budget.",
        items: [
          "Fixed estimate: The price won’t change during the project.",
          "1-year warranty: We stand behind every stage.",
          "Transparent plans: Choose a package and add your preferences.",
          "Design project included: See the outcome before work begins.",
        ],
        cta: "Get a free estimate",
      },
      pricing: {
        title: "Three Transparent Renovation Packages",
        subtitle:
          "We designed three all-in-one bundles covering all essential works and materials. Choose the one that fits you best.",
        cta: "Learn more",
        plans: [
          {
            name: "BASIC",
            price: "90,000 KZT/m²",
            for: "Rent-ready or quick flip for resale",
            desc: "Perfect for fast, quality move-in prep or rentals. Includes essential finishing works and materials.",
            features: [
              "Technical design brief",
              "Walls aligned, wallpaper of choice",
              "Laminate 32–33 class",
              "Porcelain tile 60×60 (Kazakhstan/Uzbekistan)",
              "Doors 2.0 m high",
              "Final plumbing (ready bathroom: mixers, wall-hung toilet, bath/shower)",
              "Final electrics: switches & sockets",
              "Underfloor heating: hallway, bathroom, balcony",
            ],
            note: "Note: Ceiling is not included. Result: finished walls, floors and bathroom (ceiling — separately).",
            pdf: "/package-basic.pdf",
          },
          {
            name: "PREMIUM",
            price: "120,000 KZT/m²",
            for: "Best value for comfort and longevity",
            desc: "Upgraded materials and works with a balanced budget and comfort.",
            features: [
              "Full design project",
              "Walls by beacons, paint or wallpaper",
              "Herringbone laminate or SPC/LVT",
              "Porcelain tile (Iran, China)",
              "Doors 2.0–2.3 m",
              "Stretch ceiling or drywall in bedrooms",
              "Underfloor heating",
              "Bamboo panels",
              "Smart-home elements",
              "Includes turnkey cabinet furniture (TV stand with fireplace; humidifier as a gift)",
            ],
            pdf: "/package-premium.pdf",
          },
          {
            name: "LUXE",
            price: "250,000 KZT/m²",
            for: "Penthouse & townhouse level, no compromises",
            desc: "Premium materials, exclusive finishes and a complete smart-home system.",
            features: [
              "Design project with supervision",
              "Walls to ‘Losev lamp’ standard, OLSTA paint, ‘Rock’ décor, bamboo panels",
              "Herringbone laminate (ENG/FRA) or 43-class SPC/LVT",
              "Premium porcelain tile (Italy, Spain)",
              "Concealed doors from 2.3 m, glass partitions",
              "Floating ceiling, drywall and shadow profile",
              "Full smart-home: lights, curtains, sensors",
            ],
            pdf: "/package-lux.pdf",
          },
        ],
      },

      workflow: {
        title: "From project to cleanup: how we work",
        subtitle:
          "We run your project from A to Z, ensuring full control at every stage.",
        items: [
          {
            title: "Design project",
            desc: "We create visualization and a full set of drawings. You’ll see the final result before any work starts and avoid unplanned expenses.",
          },
          {
            title: "Rough works",
            desc: "Demolition of old structures, building new partitions, complete electrical and plumbing routing, wall leveling, and floor screed.",
          },
          {
            title: "Finishing works",
            desc: "The most exciting stage: laying tiles and laminate, painting or wallpapering, installing ceilings, lighting fixtures, and doors.",
          },
          {
            title: "Installation & cleaning",
            desc: "We install plumbing, sockets and switches, implement smart home, assemble case furniture. Finally, we carry out professional cleaning so you can move in immediately.",
          },
        ],
      },
      faq: {
        title: "Frequently Asked Questions about Renovation",
        subtitle:
          "Here are the most common questions clients ask about apartment and house renovation.",

        items: [
          {
            question:
              "How long does it take to renovate an apartment or house?",
            answer:
              "It depends on the size and complexity. On average, a renovation takes 1 to 3 months.",
          },
          {
            question: "Do you provide materials or can I supply my own?",
            answer:
              "We offer both options: with our materials or yours. Everything is discussed when preparing the estimate.",
          },
          {
            question: "Is it necessary to order a design project?",
            answer:
              "No, it is optional. However, a design project helps visualize the result and avoid mistakes.",
          },
          {
            question: "Do you provide a warranty for renovation work?",
            answer:
              "Yes, all our work comes with a warranty of at least 12 months.",
          },
          {
            question: "Can I pay for the renovation in installments?",
            answer:
              "Yes, payments are made in stages: prepayment, intermediate, and final after delivery.",
          },
          {
            question: "Is cleaning included after renovation?",
            answer: "Yes, we hand over a clean, move-in ready space.",
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

    pageNames: {
      home: "Главная",
      services: "Услуги",
      ceilings: "Страница потолков",
      renovation: "Страница ремонта",
      carpentry: "Страница мебели",
      other: "Другая страница",
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
