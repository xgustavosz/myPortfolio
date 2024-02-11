function menuShow() {
    const menuMobile = document.querySelector('.mobileMenu');
    const icon = document.querySelector('.icon');

    menuMobile.classList.toggle('open');
    icon.src = menuMobile.classList.contains('open') ? "images/closeMenu.svg" : "images/menu.svg";
}

function scrollToContact() {
    var contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}

function openProject() {
    const hiddenProjects = document.querySelectorAll('.toHidden');
    const seeAllBtn = document.querySelector('.seeAllBtn');
    const buttonText = seeAllBtn.querySelector('span');

    hiddenProjects.forEach(project => {
        project.classList.toggle('hiddenProject');
    });

    if (buttonText.textContent.trim() === 'Ver mais') {
        buttonText.textContent = 'Ver menos';
    } else {
        buttonText.textContent = 'Ver mais';
    }
}

class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
        this.url = this.form.getAttribute("action");
      }
      this.sendForm = this.sendForm.bind(this);
    }
  
    displaySuccess() {
      this.form.innerHTML = this.settings.success;
    }
  
    displayError() {
      this.form.innerHTML = this.settings.error;
    }
  
    getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }
  
    onSubmission(event) {
      event.preventDefault();
      event.target.disabled = true;
      event.target.innerText = "Enviando...";
    }
  
    async sendForm(event) {
      try {
        event.preventDefault();
  
        const isValid = this.form.checkValidity();
  
        if (!isValid) {
          return;
        }
  
        this.onSubmission(event);
  
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()),
        });
  
        this.displaySuccess();
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }
  
    init() {
      if (this.form) this.formButton.addEventListener("click", this.sendForm);
      return this;
    }
  }
  
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
  });
  formSubmit.init();