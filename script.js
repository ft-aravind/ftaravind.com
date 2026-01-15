// 1. Setup Local Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.min.js';

// 2. Splash Screen Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-app').classList.remove('hidden');
    }, 2000);
});

const fileInput = document.getElementById('file-input');
const emptyState = document.getElementById('empty-state');
const pdfViewer = document.getElementById('pdf-viewer');
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');

// 3. Handle File Selection
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
        // Switch views immediately
        emptyState.classList.add('hidden');
        pdfViewer.classList.remove('hidden');
        
        // Start rendering the PDF
        renderPDF(file);
    }
});

// 4. Rendering Function
function renderPDF(file) {
    const reader = new FileReader();
    reader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        
        pdfjsLib.getDocument(typedarray).promise.then(pdf => {
            // Automatically render the first page
            pdf.getPage(1).then(page => {
                // 'scale' controls the zoom level
                const viewport = page.getViewport({ scale: 1.5 });
                
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                page.render(renderContext);
            });
        }).catch(err => {
            alert("Error: " + err.message);
        });
    };
    reader.readAsArrayBuffer(file);
}

// 5. Back Button Logic
function closeViewer() {
    pdfViewer.classList.add('hidden');
    emptyState.classList.remove('hidden');
    // Clear the input so you can re-select the same file if needed
    fileInput.value = ""; 
}
