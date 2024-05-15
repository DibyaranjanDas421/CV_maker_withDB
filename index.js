
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();
const port = 8086;

let data = []; // This should be populated with your actual data

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Route to display the CV and handle form submissions
app.post('/profile', (req, res) => {
    // Reset 'data' for each new profile submission
    data = [];
    data.push(req.body);
    console.log(data);
    // Render the CV template without the download button for PDF generation
    res.render('Cv', { data, isPrinting: false });
});

// Route to handle PDF generation
app.get('/download-cv', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Render the CV template with the download button hidden
    const content = await ejs.renderFile(path.join(__dirname, 'views', 'Cv.ejs'), { data, isPrinting: true });
    await page.setContent(content);
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    res.contentType('application/pdf');
    res.send(pdf);
});
