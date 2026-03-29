window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").classList.remove("hidden");
    }, 600);
  }, 1800);
};
