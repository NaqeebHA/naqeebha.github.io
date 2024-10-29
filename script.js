const url = 'RESUME_Naqeeb_(Oct 2024).pdf';

const pdfjsLib = window['pdfjs-dist/build/pdf'];

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

document.getElementById('download-btn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Resume-Naqeeb.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

pdfjsLib.getDocument(url).promise.then(pdf => {
    pdf.getPage(1).then(page => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });
        const adjustedViewport = page.getViewport({ scale: scale, viewport: viewport });
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.width = adjustedViewport.width;
        canvas.height = adjustedViewport.height;

        const renderContext = {
            canvasContext: context,
            viewport: adjustedViewport
        };
        page.render(renderContext);
    });
});