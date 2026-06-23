/* ══════════════════════════════════════════
   Mumbi's Thrift Haven — script.js
   1. Promotion popup (auto-shows on load)
   2. Registration form built & validated by JavaScript
      (Full Name, Email, Phone, Gender)
      Email must be a Gmail address, e.g. natalie@gmail.com
══════════════════════════════════════════ */

/* ── 1. PROMOTION POPUP ── */
window.addEventListener("load", function () {
    setTimeout(function () {
        var popup = document.getElementById("promoPopup");
        if (popup) popup.style.display = "flex";
    }, 3000); // show after 3 seconds
});

function closePromo() {
    var popup = document.getElementById("promoPopup");
    if (popup) popup.style.display = "none";
}

/* Close popup when clicking the dark overlay (outside the box) */
document.addEventListener("click", function (e) {
    var popup = document.getElementById("promoPopup");
    if (popup && e.target === popup) popup.style.display = "none";
});

/* ── 2. REGISTRATION FORM (built by JavaScript) ── */
document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("register-form");
    if (!container) return;

    // Build the form markup with JavaScript
    container.innerHTML =
        '<form id="userForm" novalidate>' +
            '<label for="reg-name">Full Name *</label>' +
            '<input type="text" id="reg-name" placeholder="e.g. Natalie Mumbi">' +
            '<span class="error" id="err-name"></span>' +

            '<label for="reg-email">Email *</label>' +
            '<input type="email" id="reg-email" placeholder="e.g. natalie@gmail.com">' +
            '<span class="error" id="err-email"></span>' +

            '<label for="reg-phone">Phone Number *</label>' +
            '<input type="tel" id="reg-phone" placeholder="e.g. 0726 790 080">' +
            '<span class="error" id="err-phone"></span>' +

            '<label for="reg-gender">Gender *</label>' +
            '<select id="reg-gender">' +
                '<option value="">Select…</option>' +
                '<option value="female">Female</option>' +
                '<option value="male">Male</option>' +
                '<option value="other">Other</option>' +
            '</select>' +
            '<span class="error" id="err-gender"></span>' +

            '<button type="submit">Register</button>' +
            '<div class="success" id="form-success"></div>' +
        '</form>';

    document.getElementById("userForm").addEventListener("submit", handleRegister);
});

/* Email must be a valid Gmail address, e.g. natalie@gmail.com */
function isValidGmail(email) {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
}

function setError(id, message) {
    var el = document.getElementById(id);
    if (el) el.textContent = message;
}

function handleRegister(event) {
    event.preventDefault();

    var name   = document.getElementById("reg-name");
    var email  = document.getElementById("reg-email");
    var phone  = document.getElementById("reg-phone");
    var gender = document.getElementById("reg-gender");
    var success = document.getElementById("form-success");

    // clear previous messages
    ["err-name", "err-email", "err-phone", "err-gender"].forEach(function (id) {
        setError(id, "");
    });
    success.textContent = "";
    success.classList.remove("visible");

    var valid = true;

    // Full Name
    if (name.value.trim().length < 2) {
        setError("err-name", "Please enter your full name.");
        valid = false;
    }

    // Email — must be a Gmail address
    if (email.value.trim() === "") {
        setError("err-email", "Email is required.");
        valid = false;
    } else if (!isValidGmail(email.value)) {
        setError("err-email", "Email must be a Gmail address, e.g. natalie@gmail.com");
        valid = false;
    }

    // Phone — 7–15 digits (allows +, spaces, hyphens)
    if (phone.value.trim() === "") {
        setError("err-phone", "Phone number is required.");
        valid = false;
    } else if (!/^[0-9\s\-\+]{7,15}$/.test(phone.value.trim())) {
        setError("err-phone", "Enter a valid phone number (7–15 digits).");
        valid = false;
    }

    // Gender
    if (gender.value === "") {
        setError("err-gender", "Please select your gender.");
        valid = false;
    }

    if (!valid) return;

    // Success
    success.textContent = "🤎 Thank you, " + name.value.trim().split(" ")[0] +
        "! You're now registered with Mumbi's Thrift Haven.";
    success.classList.add("visible");
    document.getElementById("userForm").reset();
}
