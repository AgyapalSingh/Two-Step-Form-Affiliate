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

  // Mobile Number
  const mobileInput = document.getElementById("mobile");
  mobileInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    const mobilePattern = /^[6-9][0-9]{9}$/;
    if (this.value.length === 10) {
      if (!mobilePattern.test(this.value)) {
        formResponse.textContent = "Mobile number must start with 6-9.";
        formResponse.style.color = "red";
      } else {
        formResponse.textContent = "Mobile number looks good!";
        formResponse.style.color = "green";
        setTimeout(() => {
          formResponse.textContent = "";
        }, 2000);
      }
    } else {
      formResponse.textContent = "Mobile number must be exactly 10 digits.";
      formResponse.style.color = "red";
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
    const address = document.getElementById("address").value.trim();
    const social1 = document.getElementById("social1").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !address || !mobile || !social1 || !message) {
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
      "https://script.google.com/macros/s/AKfycbwaadgUdXIH2oJWnMCcboe7oyFdF5h76CnHqRHEG2JenMpZJRgYshoosr-6VFMz-l5yvw/exec",
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
          window.location.href = "https://uniqaya.com/pages/thank-you";
        }, 1000);
        step2.classList.remove("stepActive");
        step1.classList.add("stepActive");
      })
      .catch((error) => {
        formResponse.textContent =
          "An error occurred while submitting. Please try again.";
      });
  });
});

$(".accordion__header").click(function (e) {
  e.preventDefault();
  var currentIsActive = $(this).hasClass("is-active");
  $(this).parent(".accordion").find("> *").removeClass("is-active");
  if (currentIsActive != 1) {
    $(this).addClass("is-active");
    $(this).next(".accordion__body").addClass("is-active");
  }
});
