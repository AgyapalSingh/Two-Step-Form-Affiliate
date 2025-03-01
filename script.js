document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = currentDate;
});

const addMoreLinksBtn = document.querySelector(".add-more-links");
const additionalLinksDiv = document.querySelector(".additional-links");
const form = document.getElementById("contactForm");

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
      const currentDate = new Date().toISOString().split("T")[0];
      document.getElementById("date").value = currentDate;
      additionalLinksDiv.style.display = "none";
      addMoreLinksBtn.textContent = "Add More Links";
      additionalLinksDiv
        .querySelectorAll("input")
        .forEach((input) => (input.value = ""));
      setTimeout(() => {
        formResponse.textContent = "";
      }, 2000);
    })
    .catch((error) => {
      formResponse.textContent =
        "An error occurred while submitting. Please try again.";
    });

    console.log(formData);
});

document.addEventListener("DOMContentLoaded", function () {
  const UniqStep1 = document.querySelector(".uniq-step-1");
  const UniqStep2 = document.querySelector(".uniq-step-2");

  const nextBtn = document.querySelector(".uniq-next-step-btn");
  const prevBtn = document.querySelector(".uniq-prev-step-btn");

  UniqStep1.classList.add("stepActive");

  nextBtn.addEventListener("click", function () {
    UniqStep1.classList.remove("stepActive");
    UniqStep2.classList.add("stepActive");
  });

  prevBtn.addEventListener("click", function () {
    UniqStep2.classList.remove("stepActive");
    UniqStep1.classList.add("stepActive");
  });
});
