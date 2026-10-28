
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      contactStatus.textContent = "Please complete every field.";
      return;
    }

    // Replace this with WAZOBIA's confirmed official email address.
    const recipient = "wazobiacultural2009@gmail.com";

    const emailSubject = encodeURIComponent(
      "WAZOBIA Enquiry: " + subject
    );

    const emailBody = encodeURIComponent(
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Enquiry: " + subject + "\n\n" +
      "Message:\n" + message
    );

    contactStatus.textContent =
      "Opening your email application. Please review and send your message.";

    window.location.href =
      "mailto:" + recipient +
      "?subject=" + emailSubject +
      "&body=" + emailBody;
  });
}
