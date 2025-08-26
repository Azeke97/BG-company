export const loadRecaptcha = () => {
  return new Promise((resolve) => {
    const renderWait = () => {
      setTimeout(() => {
        if (
          typeof window.grecaptcha !== 'undefined' &&
          typeof window.grecaptcha.render !== 'undefined'
        ) {
          resolve(true)
        } else {
          renderWait()
        }
      }, 200)
    }

    if (!window.grecaptcha) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js'
      script.onload = () => renderWait()
      document.head.appendChild(script)
    } else {
      resolve(true)
    }
  })
}
