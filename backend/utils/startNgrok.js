const fs = require('fs');
const ngrok = require('ngrok');
const path = require('path');

// .env dosyasının yolu
const envFilePath = path.join(__dirname, '../../.env');

async function startNgrok() {
    const PORT = process.env.PORT;

    try {
        // Ngrok bağlantısını başlat ve URL'yi al
        const url = await ngrok.connect(PORT);
        console.log(`Ngrok connection has been started: ${url}`);

        // .env dosyasını oku ve `BACKEND_URL` değerini güncelle
        let envContent = '';
        if (fs.existsSync(envFilePath)) {
            envContent = fs.readFileSync(envFilePath, 'utf-8');
        }

        // BACKEND_URL varsa güncelle, yoksa ekle
        if (envContent.includes('BACKEND_URL=')) {
            envContent = envContent.replace(/BACKEND_URL=.*/, `BACKEND_URL=${url}`);
        } else {
            envContent += `\nBACKEND_URL=${url}`;
        }

        // Güncellenmiş .env içeriğini kaydet
        fs.writeFileSync(envFilePath, envContent, 'utf-8');
        console.log(`.env file has been updated: BACKEND_URL = ${url}`);
    } catch (error) {
        console.error('Failed to start Ngrok: ', error);
    }
}

module.exports = startNgrok;