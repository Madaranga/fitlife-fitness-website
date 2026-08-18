# Gym / Fitness Website Project

A responsive, multi-page web application designed for a fitness center. This project features interactive workout plan filtering dynamically loaded from XML data, form validation for member registration, and modern CSS styling.

---

## 📌 Project Overview

This repository contains the source code for a complete fitness website project (`CW_final`). The website serves as an informational and interactive hub for gym members, offering details on membership plans, facility information, and an online registration portal.

### **Features**
* **Dynamic Plan Filtering:** Filter workout/membership plans dynamically using JavaScript reading from an `XML` dataset (`data/plans.xml`).
* **Form Validation:** Client-side form validation for user sign-ups (`js/validate.js`).
* **Responsive Design:** Modular CSS stylesheets (`home.css`, `plans.css`, `register.css`, `style.css`) structured for mobile, tablet, and desktop viewports.
* **Rich Visual Content:** Dedicated image assets for various fitness categories including Cardio, Muscle Gain, Flexibility, and Weight Loss.

---

## 📁 Directory Structure

```text
CW_final/
├── about.html          # Information about the gym and facilities
├── index.html          # Main landing page
├── plans.html          # Interactive workout and membership plans page
├── register.html       # Member sign-up and registration form
├── css/
│   ├── home.css        # Styles specific to the homepage
│   ├── plans.css       # Styles for the plans display and filter UI
│   ├── register.css    # Styles for the registration form
│   └── style.css       # Global styles, variables, and typography
├── data/
│   └── plans.xml       # Structured XML data containing fitness plans
├── images/             # Image assets (hero banners, plan thumbnails, social icons)
└── js/
    ├── filter.js       # Script to parse XML and filter fitness plans
    ├── main.js         # Core UI interactions and navigation logic
    └── validate.js     # Client-side form validation script
