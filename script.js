const actionButton = document.querySelector("#action-button");
const statusText = document.querySelector("#status-text");

if (actionButton && statusText) {
    actionButton.addEventListener("click", () => {
        statusText.textContent = "Button clicked!";
    });
}
