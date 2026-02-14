const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { id: '202', url: 'https://images.unsplash.com/photo-1576045057995-568f588f8d31?w=500&auto=format&fit=crop&q=60' },
    { id: '203', url: 'https://images.unsplash.com/photo-1509440159596-0249088b7283?w=500&auto=format&fit=crop&q=60' },
    { id: '206', url: 'https://images.unsplash.com/photo-1606312619070-d48b7065e44e?w=500&auto=format&fit=crop&q=60' },
    { id: '207', url: 'https://images.unsplash.com/photo-1622543925917-06046109a1c3?w=500&auto=format&fit=crop&q=60' },
    { id: '208', url: 'https://images.unsplash.com/photo-1585838268838-8fbf9ca28355?w=500&auto=format&fit=crop&q=60' },
    { id: '209', url: 'https://images.unsplash.com/photo-1528740561666-dc24705f08a7?w=500&auto=format&fit=crop&q=60' },
    { id: '210', url: 'https://images.unsplash.com/photo-1556228720-1957be83f315?w=500&auto=format&fit=crop&q=60' }
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
};

const main = async () => {
    const dir = path.join(__dirname, 'public', 'images', 'products');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    for (const img of images) {
        const filepath = path.join(dir, `${img.id}.jpg`);
        try {
            console.log(`Downloading ${img.id}...`);
            await downloadImage(img.url, filepath);
            console.log(`Saved ${filepath}`);
        } catch (error) {
            console.error(`Error downloading ${img.id}: ${error.message}`);
        }
    }
};

main();
