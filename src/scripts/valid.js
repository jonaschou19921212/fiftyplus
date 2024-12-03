function validateInput(inputId, regex, errorMessageId) {
  const input = document.getElementById(inputId);
  const errorMessage = document.getElementById(errorMessageId);
  input.addEventListener("input", function () {
    if (inputId == "password") {
      if (!regex.test(input.value)) {
        errorMessage.style.display = "block"; // 顯示錯誤信息
      } else {
        errorMessage.style.display = "none"; // 隱藏錯誤信息
      }
      const password2ErrorMessage = document.getElementById("password2Error");
      const passwordInput = document.getElementById("password");
      const password2Input = document.getElementById("password2");
      if (passwordInput.value != password2Input.value) {
        password2ErrorMessage.style.display = "block";
      } else {
        password2ErrorMessage.style.display = "none";
      }
    }
    if (inputId == "password2") {
      const password2ErrorMessage = document.getElementById("password2Error");
      const passwordInput = document.getElementById("password");
      const password2Input = document.getElementById("password2");
      if (passwordInput.value != password2Input.value) {
        password2ErrorMessage.style.display = "block";
      } else {
        password2ErrorMessage.style.display = "none";
      }
    } else if (!regex.test(input.value)) {
      errorMessage.style.display = "block"; // 顯示錯誤信息
    } else {
      errorMessage.style.display = "none"; // 隱藏錯誤信息
    }
  });
}

function setupValidation() {
  // 驗證規則
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // 密碼驗證
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 電子郵件驗證

  // 註冊驗證
  validateInput("password", passwordRegex, "passwordError");
  validateInput("password2", "password2", "password2Error");
  validateInput("email", emailRegex, "emailError");
}

// 將 setupValidation 函數導出
export { setupValidation };
