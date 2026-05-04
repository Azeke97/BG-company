export const loadRecaptcha = () => {
  return new Promise<void>((resolve) => {
    const renderWait = () => {
      setTimeout(() => {
        if (window.grecaptcha?.render) {
          resolve();
        } else {
          renderWait();
        }
      }, 200);
    };

    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.onload = () => renderWait();
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
};
