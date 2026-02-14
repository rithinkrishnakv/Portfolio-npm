document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".scroll-reveal");

    // Immediately make all elements visible on page load
    reveals.forEach((el) => {
        el.classList.add("active");
    });
});
