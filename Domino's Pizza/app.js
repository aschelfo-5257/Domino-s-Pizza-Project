const Domino = require('domino');
const fs = require('fs');
const path = require('path');

function loadHTML(filePath) {
  const htmlContent = fs.readFileSync(filePath, 'UTF-8');
  const window = Domino.createWindow(htmlContent);
  return window.document;
}

function extractData(document) {
  const data = [];
  const items = document.querySelectorAll('.item'); // Adjust the selector based on your HTML structure
    items.forEach(item => {
    const title = item.querySelector('.title') ? item.querySelector('.title').textContent.trim() : 'No Title';
    const price = item.querySelector('.price') ? item.querySelector('.price').textContent.trim() : 'No Price';
    data.push({ title, price });
  });
  return data;
};
