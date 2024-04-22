//* Burger Menu
document.addEventListener("DOMContentLoaded", function () {
  function toggleMenu() {
    var navigationItems = document.querySelector(".nav");
    var burgerIcon = document.querySelector(".burger-menu");
    navigationItems.classList.toggle("nav-open");
    burgerIcon.classList.toggle("active");
  }

  const burgerMenu = document.querySelector(".burger-menu");
  if (burgerMenu) {
    burgerMenu.addEventListener("click", toggleMenu);
  } else {
    console.error("Burger menu element not found.");
  }

  const navItems = document.querySelectorAll(".nav-item");
  if (navItems.length > 0) {
    navItems.forEach((item) => {
      item.addEventListener("click", toggleMenu);
    });
  } else {
    console.error("Navigation items not found.");
  }
});

//* Scrolled
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");

  //if (window.innerWidth <= 768) {
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
  //}
});

//* Site loaded
window.onload = function () {
  document.body.className += " loaded";
};

//* Counter
document.addEventListener("DOMContentLoaded", (event) => {
  const counters = document.querySelectorAll(".counter");
  const animationDuration = 1500; // 5 seconds for the animation
  const updateInterval = 10; // Update every 50 milliseconds

  const startCount = (element) => {
    const target = +element.getAttribute("data-num");
    const isPercentage = element.hasAttribute("data-is-percentage");
    const steps = animationDuration / updateInterval;
    const increment = target / steps;
    let count = 0;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        if (isPercentage) {
          element.innerText = `${Math.ceil(count)}%`;
        } else {
          element.innerText = Math.ceil(count);
        }

        if (count < target) {
          setTimeout(updateCount, updateInterval);
        } else {
          element.innerText = isPercentage ? `${target}%` : target;
        }
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

//*Lucide Icons
document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();
});

//*AOS
document.addEventListener("DOMContentLoaded", function () {
  var width = window.innerWidth;

  if (width <= 768) {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  } else if (width > 768 && width <= 1024) {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  } else {
    AOS.init();
  }
});

//* Footer Parallax Placeholder
document.addEventListener("DOMContentLoaded", function () {
  const placeholder = document.querySelector(".footer-placeholder");
  const footer = document.querySelector("footer");

  // On DOMContentLoaded, set placeholder height to be equal to footer height
  updateHeight();

  window.addEventListener("resize", onResize);

  // On window resize, update placeholder height to be equal to footer height
  function onResize() {
    updateHeight();
  }

  function updateHeight() {
    // Placeholder should always match footer height
    placeholder.style.height = `${footer.offsetHeight}px`;
  }
});

//* Rellax
document.addEventListener("DOMContentLoaded", function () {
  var rellax = new Rellax(".rellax", {
    speed: 1,
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false,
  });
});

//* Scroll Load Bar
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

//* light mode toggle
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("toggleDarkMode")
    .addEventListener("click", function () {
      document.body.classList.toggle("light-mode");
      var icon = document.getElementById("theme-icon");
      icon.classList.toggle("fa-sun");
      icon.classList.toggle("fa-moon");
    });
});

//* Text reveal
document.addEventListener("DOMContentLoaded", function () {
  const textContainers = document.querySelectorAll(".text-reveal");

  textContainers.forEach((container) => {
    prepareText(container); // Prepare each container immediately on load
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateText(entry.target);
          observer.unobserve(entry.target); // Optional: Stop observing after animating
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.8, // This triggers the animation when 10% of the element is visible
    }
  );

  textContainers.forEach((container) => {
    observer.observe(container); // Start observing each text container
  });

  function prepareText(container) {
    const phrase = container.textContent.trim();
    container.textContent = ""; // Clear the container
    const words = phrase.split(/\s+/); // Split phrase into words at one or more whitespace
    const fontSize = window.getComputedStyle(container).fontSize;
    const gapSize = parseFloat(fontSize) / 6; // Calculate gap size based on font size

    container.style.setProperty("--gap-size", `${gapSize}px`); // Set the gap size

    words.forEach((word) => {
      let wordContainer = document.createElement("div");
      wordContainer.classList.add("reveal-mask");
      wordContainer.style.overflow = "hidden"; // Hide overflow to control visibility

      let wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      wordSpan.textContent = word + " ";

      wordContainer.appendChild(wordSpan);
      container.appendChild(wordContainer);
    });
  }

  function animateText(container) {
    const wordSpans = container.querySelectorAll(".word");

    const revealDelay =
      container.getAttribute("reveal-delay") !== null
        ? parseInt(container.getAttribute("reveal-delay"))
        : 100; // Default delay is 200ms, properly handle "0"

    wordSpans.forEach((span, index) => {
      setTimeout(() => {
        span.style.animation = "reveal 0.6s forwards"; // Apply the reveal animation
      }, revealDelay * index); // Use custom delay for stagger timing
    });
  }
});

//* Dropdown
document.addEventListener("DOMContentLoaded", function () {
  setupDropdownBehavior();
  window.addEventListener("resize", debounce(setupDropdownBehavior, 250));
});

function toggleDropdown(dropdownBtnId, dropdownContentId) {
  const dropdownContent = document.getElementById(dropdownContentId);
  const dropdownButton = document.getElementById(dropdownBtnId);

  // Toggle the visibility of the dropdown content
  dropdownContent.classList.toggle("show");

  // Toggle the 'active' class on the dropdown button
  dropdownButton.classList.toggle("active"); // This line ensures the 'active' class is correctly toggled

  // Close all other dropdowns except the current one
  const allDropdownContents = document.querySelectorAll(".dropdown-content");
  allDropdownContents.forEach((content) => {
    if (content.id !== dropdownContentId) {
      content.classList.remove("show");
    }
  });

  const allDropdownButtons = document.querySelectorAll(".dropbtn");
  allDropdownButtons.forEach((button) => {
    if (button.id !== dropdownBtnId) {
      button.classList.remove("active");
    }
  });
}

function setupDropdownBehavior() {
  const isMobileView = window.matchMedia("(max-width: 768px)").matches;
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".dropdown-open");
    const dropdownContentId = btn.getAttribute("data-dropdown");

    // Clean up previous event listeners
    btn.removeEventListener("click", handleDropdownClick);
    btn.removeEventListener("mouseenter", handleDropdownMouseEnter);
    dropdown.removeEventListener("mouseleave", handleDropdownMouseLeave);

    if (isMobileView) {
      btn.addEventListener("click", handleDropdownClick);
    } else {
      btn.addEventListener("mouseenter", handleDropdownMouseEnter);
      dropdown.addEventListener("mouseleave", handleDropdownMouseLeave);
    }
  });

  // Only for mobile: Close all dropdowns when clicking outside
  if (isMobileView) {
    document.addEventListener("click", closeAllDropdowns, true);
  } else {
    document.removeEventListener("click", closeAllDropdowns, true);
  }
}

function handleDropdownClick(event) {
  const btn = event.target;
  const dropdownContentId = btn.getAttribute("data-dropdown");
  toggleDropdown(btn.id, dropdownContentId);
  event.stopPropagation(); // Prevent triggering closeAllDropdowns
}

function handleDropdownMouseEnter(event) {
  const btn = event.target;
  const dropdownContentId = btn.getAttribute("data-dropdown");
  toggleDropdown(btn.id, dropdownContentId);
}

function handleDropdownMouseLeave(event) {
  const dropdownContent =
    event.currentTarget.querySelector(".dropdown-content");
  dropdownContent.classList.remove("show");
}

function closeAllDropdowns(event) {
  if (!event.target.matches(".dropdown-open")) {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
    const dropbtns = document.querySelectorAll(".dropdown-open");
    dropbtns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
}

// Debounce function to limit resize event handling
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//* Accordion
document.addEventListener("DOMContentLoaded", function () {
  const accordionTitles = document.querySelectorAll(".accordion-title");

  accordionTitles.forEach((title) => {
    title.addEventListener("click", function () {
      const parentItem = this.parentNode;

      // Check if the clicked title's parent has the 'active' class
      const isActive = parentItem.classList.contains("active");

      // Remove 'active' class from all accordion items
      accordionTitles.forEach((t) => {
        t.parentNode.classList.remove("active");
      });

      // Add 'active' class to the clicked title's parent if it was not active
      if (!isActive) {
        parentItem.classList.add("active");
      }
    });
  });
});
