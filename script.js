document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = currentDate;

  const addMoreLinksBtn = document.querySelector(".add-more-links");
  const additionalLinksDiv = document.querySelector(".additional-links");
  const form = document.getElementById("contactForm");

  // Toggle additional links
  addMoreLinksBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (
      additionalLinksDiv.style.display === "none" ||
      additionalLinksDiv.style.display === ""
    ) {
      additionalLinksDiv.style.display = "flex";
      addMoreLinksBtn.textContent = "Remove Links";
    } else {
      additionalLinksDiv.style.display = "none";
      addMoreLinksBtn.textContent = "Add More Links";
      additionalLinksDiv
        .querySelectorAll("input")
        .forEach((input) => (input.value = ""));
    }
  });

  // Step Navigation Elements
  const step1 = document.querySelector(".uniq-step-1");
  const step2 = document.querySelector(".uniq-step-2");
  const nextBtn = document.querySelector(".uniq-next-step-btn");
  const prevBtn = document.querySelector(".uniq-prev-step-btn");

  // Show Step 1 initially
  step1.classList.add("stepActive");

  // Validation for Step 1
  function validateStep1() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const social1 = document.getElementById("social1").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !social1 || !message) {
      formResponse.textContent =
        "*Please fill the required fields before proceed.";
      formResponse.style.color = "red";
      setTimeout(() => {
        formResponse.textContent = "";
        formResponse.style.color = "green";
      }, 2000);
      return false;
    }
    return true;
  }

  // Next Button Click - Validate & Move to Step 2
  nextBtn.addEventListener("click", function () {
    if (validateStep1()) {
      step1.classList.remove("stepActive");
      step2.classList.add("stepActive");
    }
  });

  // Back Button Click - Return to Step 1
  prevBtn.addEventListener("click", function () {
    step2.classList.remove("stepActive");
    step1.classList.add("stepActive");
  });

  // Form Submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formResponse = document.getElementById("formResponse");
    formResponse.textContent = "Submitting your response, please wait...";

    const formData = new FormData(this);

    fetch(
      "https://script.google.com/macros/s/AKfycbzzGlxv24vUrbI-3L5CJK7sE132NYDy9Jdh1vwO_rjNqlLpDuYf9cJPcH2_Vh8Vd9vd6w/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((data) => {
        formResponse.textContent =
          "Thank you! Your submission has been received.";
        form.reset();
        document.getElementById("date").value = currentDate;
        additionalLinksDiv.style.display = "none";
        addMoreLinksBtn.textContent = "Add More Links";
        additionalLinksDiv
          .querySelectorAll("input")
          .forEach((input) => (input.value = ""));
        setTimeout(() => {
          formResponse.textContent = "";
        }, 2000);
        step2.classList.remove("stepActive");
        step1.classList.add("stepActive");
      })
      .catch((error) => {
        formResponse.textContent =
          "An error occurred while submitting. Please try again.";
      });
  });
});
