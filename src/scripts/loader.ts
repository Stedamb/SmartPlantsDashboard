const loader = document.querySelector(".loader");

if (loader) {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 1500);

    setTimeout(() => {
        loader.classList.remove("flex");
        loader.classList.add("hidden");
    }, 2100);
}