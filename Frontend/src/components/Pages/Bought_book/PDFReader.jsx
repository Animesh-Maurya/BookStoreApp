// PDFReader.jsx
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Proper worker for pdfjs-dist v4.x
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js`;

export default function PDFReader({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale((prev) => prev + 0.2);
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        <button onClick={goToPrevPage} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">⬅ Prev</button>
        <button onClick={goToNextPage} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">Next ➡</button>
        <button onClick={zoomOut} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded">- Zoom Out</button>
        <button onClick={zoomIn} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded">+ Zoom In</button>
      </div>

      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(err) => console.error('PDF load error:', err)}
        className="bg-white p-4 rounded shadow-lg"
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>

      {numPages && (
        <p className="mt-4 text-sm">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
}
