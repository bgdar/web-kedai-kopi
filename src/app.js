document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    /// dalam kurung artinya di mengembalikan object
    items: [
      { id: 1, name: "strabery tea", img: "1.jpg", price: 20000 },
      { id: 2, name: "teh sari angin", img: "2.jpg", price: 20000 },
      { id: 3, name: "teh malam ", img: "3.jpg", price: 3000 },
      { id: 4, name: "teh sari murni", img: "4.jpg", price: 22000 },
      { id: 5, name: "teh manis", img: "5.jpg", price: 30000 },
    ],
    //untuk data menu
    itemmenu: [
      { id: 1, name: "expresso pancung", img: "coffe 1.jpg", price: 10000 },
      { id: 2, name: "natural caffee", img: "coffe 2.jpg", price: 27000 },
      { id: 3, name: "malam rindu", img: "coffe 3.jpg", price: 34000 },
      { id: 4, name: "night yard", img: "coffe 4.jpg", price: 25000 },
      { id: 5, name: "coffe 0_0", img: "coffe 5.jpg", price: 58000 },
      { id: 6, name: "santay aja", img: "coffe 6.jpg", price: 37000 },
    ],
  }));
  Alpine.store("card", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang   yg sama di card
      const cardItem = this.items.find((item) => item.id === newItem.id);
      // jika belum ada atau card masih kosong
      if (!cardItem) {
        //spert operator(dipecah jadi object) sambil nambain komponen baru
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++; // ini buat menghitung quantity dari keseluruhan barang yg ada di card
        //setiap masukin barang total nya nambah dgn harga dari item yg di masikin
        this.total += newItem.price;
        // cek item sudah ada di card
        console.log(this.items);
      } else {
        //jika  barang sudah ada ,cek apakh baram beda atau sama dgn yg di card
        this.items = this.items.map((item) => {
          {
            // jika barang berbeda
            if (item.id !== newItem.id) {
              //maka menjadi baran baru
              return item;
            } else {
              // jika barang sudah ada , tambah quantity dan totalnya (quantity dari sebuah item)
              item.quantity++;
              item.total = item.price * item.quantity;
              this.quantity++;
              this.total += item.price;
              return item;
            }
          }
        });
      }
    },
    remove(id) {
      //ambil item yg mau di remove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);
      //jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri  sat satu
        this.items = this.items.map((item) => {
          //jika bukan barang yg di click
          if (item.id !== id) {
            return item;
          } else {
            // jika sama, kurangi quantity dan totalnya
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price; //total keseluruhan di kurangi dgn harga barang yg di hapus
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika item hanya 1, maka hapus item tersebut
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price; //total keseluruhan di kurangi dgn harga barang yg di hapus
      }
    },
  });
});
//form validation
// const checkoutButton = document.querySelector(".checkout-button");
// checkoutButton.disabled = true;
// const form = document.querySelector("#checkoutForm");
// form.addEventListener("keyup", () => {
//   for (let i = 0; i < form.elements.length; i++) {
//     if (form.elements[i].value.length !== 0) {
//       //jika ada input yg kosong kasi class disable button nya
//       checkoutButton.classList.remove("disabled");
//       checkoutButton.classList.add("disabled");
//     } else {
//       //jika sudah terisi semua scip
//       return false;
//     }
//     //
//     checkoutButton.disabled = false;
//     checkoutButton.classList.remove("disabled");
//   }
// }); ganti yg bawah
const checkoutButton = document.querySelector(".checkout-button");
const form = document.querySelector("#checkoutForm");
// Fungsi untuk memeriksa apakah semua field sudah diisi
const checkFormValidity = () => {
  // Ambil semua field input
  const inputs = form.querySelectorAll("input");
  // Periksa apakah semua field memiliki nilai
  const allFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );
  if (allFilled) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add("disabled");
  }
};
// Tambahkan event listener ke semua field input
form.addEventListener("input", checkFormValidity);

// Pemeriksaan awal jika form sudah diisi sebelumnya
checkFormValidity();

//kirim data etika tombol checkout di click
checkoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  //ambil form data daro form di atas
  const formData = new FormData(form);
  //default nya di kirm dlm method get artinya datanya keliatan dlm url
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data); //datanya
  //console.log(objData);
  const message = formatMessage(objData);
  //jalnkan sebuah layana (wa.me) unt kirim pesan wa dgn membyka widow baru
  window.open(
    "http://wa.me/6289523135244/?text=" + encodeURIComponent(message)
  );
});
//format pesan whastaap
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}\n
  Email: ${obj.email}\n
  No HP: ${obj.phone}\n
  Data Pesanan :
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} ${item.quantity} X ${rupiah(item.total)}) \n`
  )}
  Total: ${rupiah(obj.total)};
  terima Kasih`;
};

// function konversi haarga ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
