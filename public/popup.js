// Get modal element
var modal = document.getElementById('simpleModal');
// Get open modal button
var modalBtn = document.getElementById('modalBtn');
// Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', outsideClick);

// Open modal
function openModal(){
  modal.style.display = 'block';
}

// Close modal
function closeModal(){
  modal.style.display = 'none';
}

// Click outside and close
function outsideClick(e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}

document.querySelector("#selector-model").addEventListener("change", function() {
  let objHelper = {
      'line': {judul: "Buat Garis", isi: "Klik dan tahan dimanapun pada canvas lepaskan untuk menjadi garis"},
      'square': {judul: "Buat Kotak", isi: "Klik dan tahan dimanapun pada canvas, arahkan kotak untuk mengubah ukuran lepaskan untuk menjadi kotak"},
      'poly': {judul: "Buat Polygon (titik banyak)", isi: "Klik untuk membuat satu titik, arahkan mouse pada titik selanjutnya yang ingin di buat garis polygonnya"},
      'edit-line': {judul: "Edit Garis", isi: "Klik dan tahan pada vertik berbentuk kotak, lalu geser dengan mouse"},
      'edit-square': {judul: "Edit Kotak", isi: "Klik dan tahan pada vertik berbentuk kotak, geser dengan mouse untuk mengubah ukuran sisi kotak"},
      'edit-poly': {judul: "Edit Polygon", isi: "Klik dan tahan pada vertik berbentuk kotak, geser dengan mouse untuk mengubah bentuk polygon"},
  }

  let val = document.querySelector("#selector-model").value;
  console.log(val)

  let judul = document.querySelector("#judul");
  let isi = document.querySelector("#isi");
  judul.textContent = objHelper[val].judul;
  isi.textContent = objHelper[val].isi; 
});