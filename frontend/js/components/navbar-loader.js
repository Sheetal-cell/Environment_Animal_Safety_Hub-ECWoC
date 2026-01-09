document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("navbar-container");
  if (!container) {
    console.error("navbar-container not found");
    return;
  }

  const path = window.location.pathname;
  let prefix = "";

  // count folder depth
  const depth = path.split("/").filter(Boolean).length - 1;

  for (let i = 0; i < depth; i++) {
    prefix += "../";
  }

  const navbarPath = prefix + "/frontend/components/navbar.html";
  console.log("Navbar path:", navbarPath);

  try {
    const res = await fetch(navbarPath);
    if (!res.ok) throw new Error("Navbar not found");

    container.innerHTML = await res.text();
  } catch (err) {
    console.error("Navbar load failed:", err);
  }
});
