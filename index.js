const refs = {
  input: document.querySelector("#password"),
  form: document.querySelector("#form"),
  getPasswordBtn: document.querySelector("#getPassBtn"),
  getPasswordSpan: document.querySelector("#getPassword"),
  showPasswordBtn: document.querySelector("#showPasswordBtn"),
};

class PasswordTool {
  password = "";
  replace = "";
  input = null;
  showBtn = null;
  timeout = null;
  show = false;
  wait = 500;

  constructor(inputRef, showBtnRef) {
    this.input = inputRef;
    this.showBtn = showBtnRef;
  }

  main() {
    this.colectPassword();
    this.showBtn.addEventListener("click", () =>
      this.changePasswordVisibility()
    );
  }

  colectPassword() {
    this.input.addEventListener("input", (e) => {
      if (e.inputType === "deleteContentBackward") {
        if (this.input.value.length === 0) {
          this.password = "";
          this.makeReplace();
          return;
        }
        this.password = this.password.slice(0, this.input.value.length);
        this.makeReplace();
        return;
      }
      this.show = false;

      this.password += e.data;
      this.makeReplace();
      this.deb();
    });
  }

  changePasswordVisibility() {
    this.show = !this.show;
    this.input.value = this.show ? this.password : this.replace;
  }

  deb() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.replacePassword(), this.wait);
  }

  replacePassword() {
    this.input.value = this.replace;
  }

  makeReplace() {
    this.replace = "●".repeat(this.password.length);
  }

  setWait(wait) {
    this.wait = wait;
  }
}

const pas = new PasswordTool(refs.input, refs.showPasswordBtn);

pas.main();

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  refs.getPasswordSpan.textContent = pas.password;
  console.dir(refs.getPasswordSpan);
});
