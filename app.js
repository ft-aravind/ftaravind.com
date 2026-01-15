const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
let img = new Image();
let currentFilter = 'none';

upload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        img.onload = () => {
            document.getElementById('placeholder-text').style.display = 'none';
            canvas.width = img.width;
            canvas.height = img.height;
            applyAll();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

function applyAll() {
    const b = document.getElementById('brightness').value;
    const c = document.getElementById('contrast').value;
    const s = document.getElementById('saturate').value;
    
    ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%) ${currentFilter}`;
    ctx.drawImage(img, 0, 0);
}

function setFilter(filterStr) {
    currentFilter = filterStr;
    applyAll();
}

// Update sliders
document.querySelectorAll('input[type=range]').forEach(i => i.addEventListener('input', applyAll));

// Download
document.getElementById('download').onclick = () => {
    const link = document.createElement('a');
    link.download = 'proedit-photo.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
};
