document.addEventListener("DOMContentLoaded", function () {
  // togle class active hamburger menu
  const navbarNav = document.querySelector(".navbar-nav");

  //ketika hamburger menu di cklick
  document.querySelector("#hamburger-menu").onclick = (e) => {
    e.preventDefault(); //agar halaman tidak reload ketika di click
    navbarNav.classList.toggle("active");
  };
  // click di luar element
  const hm = document.querySelector("#hamburger-menu");
  const sb = document.querySelector("#search-button");
  const sc = document.querySelector("#shopping-cart-button");

  document.addEventListener("click", (e) => {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
      //diclick di mananpun di halaman yg di luar hamburgerMenu dan navbarnav
      navbarNav.classList.remove("active");
    }
    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
      //diclick di mananpun di halaman yg di luar  navbarnav
      searchForm.classList.remove("active");
    }
    if (!sc.contains(e.target) && !ShoppingCard.contains(e.target)) {
      //diclick di mananpun di halaman yg di luar  navbarnav
      ShoppingCard.classList.remove("active");
    }
  });

  //togle class active untuk search form
  const searchForm = document.querySelector(".search-form");
  const searchBox = document.querySelector("#search-box");
  document.querySelector("#search-button").onclick = (e) => {
    searchForm.classList.toggle("active");
    console.log(searchForm);
    searchBox.focus(); // agar inputnya fokus supaya hanya diclick cukup 1 kali
    e.preventDefault(); //saat di clikc akan di bawa ke atas (defaultnya) makannya cegah aksidefaulnya
  };

  // toggle class active untk shopping card
  const ShoppingCard = document.getElementsByClassName("shopping-card")[0];
  document.querySelector("#shopping-cart-button").onclick = (e) => {
    ShoppingCard.classList.toggle("active");
    e.preventDefault();
  };

  //modal box
  // buat logika lain karena ini haya menampilkan 1 modal gambar yg sama
  const ItemDetailModal = document.getElementById("item-detail-modal");
  const ItemDetailButtons = document.querySelectorAll(".detail-button");
  console.log(ItemDetailButtons);
  console.log(ItemDetailModal);

  ItemDetailButtons.forEach((btn) => {
    // karena qeryselectorAll dlm bentuk nodelist(Array)
    btn.onclick = (e) => {
      ItemDetailModal.style.display = "flex";
      e.preventDefault();
      //ItemDetailModal.style.display = "block"; //window di click display di item-detail-modal display block
    };
  });
  //click modal
  document.querySelector(".modal .close-icon").onclick = (e) => {
    ItemDetailModal.style.display = "none"; //window di click display di item-detail-modal display none
    e.preventDefault(); //agar halaman tidak reload ketika di clicki
  };

  //ketika diclick di luar modal nya
  window.onclick = (e) => {
    if (e.target == ItemDetailModal) {
      ItemDetailModal.style.display = "none"; //window di click display di item-detail-modal display none
    }
  };
  // ambil data dari setiap tombol aye di klick dan masukan ke modal box nya
});
