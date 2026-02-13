const fs = require('fs');
const https = require('https');
const path = require('path');

// Read existing products
const dataPath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Target directory
const imagesDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(imagesDir, filename);
        const file = fs.createWriteStream(filePath);

        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                file.close();
                fs.unlink(filePath, () => { }); // Delete empty file
                reject(new Error(`Status Code: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
};

(async () => {
    const updatedProducts = [];

    for (const product of products) {
        console.log(`Processing: ${product.name}`);

        // Check if image is already local to avoid re-download or invalid URL error
        if (product.image.startsWith('/images/')) {
            console.log(`Skipping ${product.name}, already local.`);
            updatedProducts.push(product);
            continue;
        }

        // Determine extension
        let ext = 'jpg';
        if (product.image.includes('.webp')) ext = 'webp';
        else if (product.image.includes('.png')) ext = 'png';

        const filename = `${product.id}.${ext}`;
        const localPath = `/images/products/${filename}`;

        try {
            await downloadImage(product.image, filename);
            console.log(`Downloaded to included ${filename}`);

            // push updated product
            updatedProducts.push({
                ...product,
                image: localPath
            });
        } catch (error) {
            console.error(`Failed to download ${product.name}: ${error.message}`);
            // Use placeholder or keep original URL if download fails?
            // User wants all local. If fail, maybe keep original or fallback.
            // Let's keep original URL if fail, but log it.
            updatedProducts.push(product);
        }
    }

    // Write back to file
    fs.writeFileSync(dataPath, JSON.stringify(updatedProducts, null, 4));
    console.log('All done! products.json updated.');
})();
