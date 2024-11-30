const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('./db');

// OpenAI API yapılandırması
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Prompt'ları saklayan nesne
const prompts = {
    animals: `
Provide SQL query for adding 10 entries to the table and columns specified as I specify and include only the SQL query in your response, nothing else.
   Table: animals
   Columns: 
     - name (string),
     - species (string, e.g., "dog", "cat", "rabbit"),
     - gender (string, "Male" or "Female"),
     - breed
     - age (integer, between 1 and 15),
     - neutered (integer, 0 or 1)
`,
    veterinarians: `
Provide SQL query for adding 10 entries to the table and columns specified as I specify and include only the SQL query in your response, nothing else.
   Table: veterinarians
   Columns: 
     - name (string),
     - specialization (string, e.g., "dog", "cat", "rabbit"),
     - phone_number (string, valid phone format),
     - years_of_experience (integer, between 1 and 30)
`,
    shelters: `
Provide SQL query for adding 10 entries to the table and columns specified as I specify and include only the SQL query in your response, nothing else.
   Table: shelters
   Columns: 
     - location (string),
     - capacity (integer, between 20 and 100),
     - phone_number (string, valid phone format),
     - current_animal_count (integer, between 0 and capacity)
`
};

// Veri oluşturma fonksiyonu
const handleGenerateData = async (req, res) => {
    const { type } = req.params;

    try {
        // Prompt'u seç
        const prompt = prompts[type];
        if (!prompt) {
            return res.status(400).json({ error: "Invalid type provided." });
        }

        // OpenAI'ye istek gönder
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o",
        });

        // Yanıtı al ve kontrol et
        const generatedData = chatCompletion.choices[0].message.content.trim();

        // JSON dosyasına kaydet
        const outputPath = path.join(__dirname, `../data/generated_${type}_data.json`);
        fs.writeFileSync(outputPath, JSON.stringify({ data: generatedData }, null, 2));

        // Sorguyu çalıştır veya kontrol için logla
        
        console.log(`Veri başarıyla oluşturuldu ve '${outputPath}' dosyasına kaydedildi.`);
        res.status(200).json({ message: `${type} için veri başarıyla oluşturuldu.` });

        await runQuery(outputPath);
    } catch (error) {
        console.error(`${type} için veri oluşturulurken hata oluştu:`, error);
        res.status(500).json({ error: `${type} için veri oluşturulamadı.` });
    }
};

// Sorguyu çalıştırma fonksiyonu
const runQuery = async (filePath) => {
   try {
    const query = readJsonFile(filePath);
    
    // Sequelize ile sorguyu çalıştır
    const result = await sequelize.query(query);
    console.log("Sorgu başarıyla çalıştırıldı:", result);
  } catch (error) {
    console.error("Sorgu çalıştırılırken hata oluştu:", error);
    throw error;
  }
};

// JSON dosyasını okuma fonksiyonu
const readJsonFile = (filePath) => {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return formatResponse(JSON.stringify(JSON.parse(jsonData).data));
    } catch (error) {
        console.error('JSON dosyası okunurken hata oluştu:', error);
        throw error;
    }
};

// Yanıt formatlama fonksiyonu
const formatResponse = (response) => {
    const firstNewlineIndex = response.indexOf("\\n");
    const lastNewlineIndex = response.lastIndexOf("\\n");

    if (firstNewlineIndex === -1 || lastNewlineIndex === -1 || firstNewlineIndex === lastNewlineIndex) {
        return response;
    }

    const betweenNewlines = response.slice(firstNewlineIndex + 2, lastNewlineIndex);
    return betweenNewlines.replace(/\\n/g, '\n').trim();
};

module.exports = { handleGenerateData };


































// const { OpenAI } = require('openai');
// const fs = require('fs');
// const path = require('path');

// // OpenAI API'yi yapılandır
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// // Tablo tanımlamaları
// const tableSchema = `
// Provide SQL query for adding 10 entries to the table and columns specified as I specify and include only the SQL query in your response, nothing else.
//    Table: animals
//    Columns: 
//      - name (string),
//      - species (string, e.g., "dog", "cat", "rabbit"),
//      - gender (string, "Male" or "Female"),
//      - breed
//      - age (integer, between 1 and 15),
//      - neutered (integer, 0 or 1)
// `;

// // Veri oluşturma fonksiyonu
// const handleGenerateData = async (req, res) => {
//     try {
//         // OpenAI'ye istek gönder
//         const chatCompletion = await openai.chat.completions.create({
//             messages: [{ role: "user", content: tableSchema }],
//             model: "gpt-4o",
//         });

//         // Yanıtı al ve kontrol et
//         const generatedData = chatCompletion.choices[0].message.content.trim();

//         // JSON dosyasına kaydet
//         const outputPath = path.join(__dirname, "../data/generated_table_data.json");
//         fs.writeFileSync(outputPath, JSON.stringify({ data: generatedData }, null, 2));

//         runQuery(outputPath);


//         console.log(`Veri başarıyla oluşturuldu ve '${outputPath}' dosyasına kaydedildi.`);
//         res.status(200).json({ message: "sıkıntı yok" })
//     } catch (error) {
//         console.error("Veri oluşturulurken hata oluştu:", error);
//         res.status(400).json({ error: "error" });
//     }
// };

// const runQuery = (filePath) => {
//     const query = readJsonFile(filePath);
//     console.log(query);
// };


// const readJsonFile = (filePath) => {
//     try {
//         const jsonData = fs.readFileSync(filePath, 'utf-8');
//         return formatResponse(JSON.stringify(JSON.parse(jsonData).data));
//     } catch (error) {
//         console.error('JSON dosyası okunurken hata oluştu:', error);
//         throw error;
//     }
// };

// const formatResponse = (response) => {
//     // İlk \n ile son \n arasındaki kısmı al
//     const firstNewlineIndex = response.indexOf("\\n");
//     const lastNewlineIndex = response.lastIndexOf("\\n");

//     // Eğer \n bulunmazsa ya da sadece bir tane varsa, orijinal metni döndür
//     if (firstNewlineIndex === -1 || lastNewlineIndex === -1 || firstNewlineIndex === lastNewlineIndex) {
//         return response;
//     }

//     // İlk \n ile son \n arasındaki kısmı al
//     const betweenNewlines = response.slice(firstNewlineIndex + 2, lastNewlineIndex);

//     // Gelen yanıttaki \n karakterlerini gerçek satır atlamalarına dönüştür
//     const formattedResponse = betweenNewlines.replace(/\\n/g, '\n');

//     // Gerekirse fazladan boşlukları da temizle
//     return formattedResponse.trim();
// };

// module.exports = { handleGenerateData };
