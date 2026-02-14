const fs = require('fs');
const path = require('path');

const mappings = [
    { id: '202', sourceArg: 'Vegetables/Cabbage/Cabbage_Iconic.jpg' },
    { id: '203', sourceArg: 'Vegetables/Potato/Floury-Potato/Floury-Potato_Iconic.jpg' },
    { id: '206', sourceArg: 'Packages/Yoghurt/Arla-Mild-Vanilla-Yoghurt/Arla-Mild-Vanilla-Yoghurt_Iconic.jpg' },
    { id: '207', sourceArg: 'Packages/Juice/Bravo-Orange-Juice/Bravo-Orange-Juice_Iconic.jpg' },
    { id: '208', sourceArg: 'Packages/Sour-Milk/Arla-Sour-Milk/Arla-Sour-Milk_Iconic.jpg' },
    { id: '209', sourceArg: 'Packages/Milk/Garant-Ecological-Standard-Milk/Garant-Ecological-Standard-Milk_Iconic.jpg' },
    { id: '210', sourceArg: 'Fruit/Lemon/Lemon_Iconic.jpg' }
];

const main = () => {
    const datasetRoot = path.join(__dirname, 'public', 'images', 'GroceryStoreDataset', 'dataset', 'iconic-images-and-descriptions');
    const destDir = path.join(__dirname, 'public', 'images', 'products');

    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    mappings.forEach(m => {
        const src = path.join(datasetRoot, m.sourceArg);
        const dest = path.join(destDir, `${m.id}.jpg`);
        try {
            fs.copyFileSync(src, dest);
            console.log(`Copied ${m.id} from ${m.sourceArg}`);
        } catch (e) {
            console.error(`Error copying ${m.id}: ${e.message}`);
        }
    });
};

main();
