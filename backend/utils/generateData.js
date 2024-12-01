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
Provide SQL query for adding 5 entries to the table and columns specified as I specify and include only the SQL query in your response, nothing else.
Each entry should be added via a different INSERT INTO query.
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

const generatePrompt = (type, rowCount) => {
    const prompts = {
        animals: `
Provide SQL query for adding ${rowCount} entries to the table and columns specified as I specify and include only the SQL query in your response, nothing else.
Each entry should be added via a different INSERT INTO query each of which written in a single line. I mean, there should be as many lines as the insert statements in your response.
There must not be empty lines between insert statements.
   Table: animals
   Columns: 
     - name (string),
     - species (string, one of the following three: "dog", "cat", "rabbit"),
     - gender (string, "Male" or "Female"),
     - breed
     - age (integer, between 1 and 15),
     - neutered (integer, 0 or 1)
`,
        veterinarians: `
Provide SQL query for adding ${rowCount} entries to the table and columns specified as I specify and include only the SQL query in your response, nothing else.
   Table: veterinarians
   Columns: 
     - name (string),
     - specialization (string, e.g., "dog", "cat", "rabbit"),
     - phone_number (string, valid phone format),
     - years_of_experience (integer, between 1 and 30)
`,
        shelters: `
Provide SQL query for adding ${rowCount} entries to the table and columns specified as I specify and include only the SQL query in your response, nothing else.
   Table: shelters
   Columns: 
     - location (string),
     - capacity (integer, between 20 and 100),
     - phone_number (string, valid phone format),
     - current_animal_count (integer, between 0 and capacity)
`
    };

    return prompts[type];
};

// Veri oluşturma fonksiyonu
const handleGenerateData = async (req, res) => {
    const { type } = req.params;
    const rowCount = parseInt(req.params.rowCount, 10) || 5; // Gelen satır sayısı ya da varsayılan 5

    try {
        // Prompt'u oluştur
        let prompt;
        if (type === 'vaccinations')
            prompt = await formatPromptForVaccinations(rowCount);
        else
            prompt = generatePrompt(type, rowCount);

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
        const jsonOutputPath = path.join(__dirname, `../data/generated_${type}_data.json`);
        const txtOutputPath = path.join(__dirname, `../data/generated_${type}_data.txt`);
        fs.writeFileSync(jsonOutputPath, JSON.stringify({ data: generatedData }, null, 2));
        fs.writeFileSync(txtOutputPath, generatedData);

        console.log(`Veri başarıyla oluşturuldu ve '${jsonOutputPath}' dosyasına kaydedildi.`);
        await runQuery(jsonOutputPath, type);
        res.status(200).json({ message: `${type} için veri başarıyla oluşturuldu.` });
    } catch (error) {
        console.error(`${type} için veri oluşturulurken hata oluştu:`, error);
        res.status(500).json({ error: `${type} için veri oluşturulamadı.` });
    }
};

// Sorguyu çalıştırma fonksiyonu
const runQuery = async (filePath, type) => {
    try {
      const query = readJsonFile(filePath);
  
      console.log("Gelen sorgular:");
      console.log(query);
  
      // Sorguları satırlara ayır (\n ile ayrılmış)
      const queries = query.split("\n").filter((line) => line.trim() !== "");
  
      for (const singleQuery of queries) {
        let species = null;

        if(type === 'animals') {
          const match = singleQuery.match(/VALUES\s*\(([^)]+)\)/i);
          console.log("match:", match);
            if (match) {
              const values = match[1].split(',').map(v => v.trim().replace(/['"]+/g, ''));
              console.log("values: " + values);
              species = values[1]; // species sütunu  
              console.log("run query içi species: " + species);
            }  
        }      

        try {
          console.log(`Çalıştırılıyor: ${singleQuery}`);
          let PhotoBlob;
          if(type === 'animals') {
            photoBlob = getRandomPhoto(species);
          }  
          const result = await sequelize.query(singleQuery.trim());
          if(type === 'animals') {
            await sequelize.query(
              `UPDATE animals SET photo = ? WHERE animal_id = (SELECT LAST_INSERT_ID())`,
              { replacements: [photoBlob], type: sequelize.QueryTypes.UPDATE }
            );
          }
          console.log("Sorgu başarıyla çalıştırıldı:", result);
        } catch (error) {
          console.error(`Hata oluştu: ${singleQuery}`, error);
        }
      }
      console.log("Tüm sorgular tamamlandı.");
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


// animal_id'leri veri tabanından çekme fonksiyonu
const getAnimalIds = async () => {
    try {
      const [animalIds] = await sequelize.query("SELECT animal_id FROM animals");
      return animalIds.map((row) => row.animal_id); // Liste halinde dön
    } catch (error) {
      console.error("Animal ID'ler alınırken hata oluştu:", error);
      throw error;
    }
  };
  
  // vaccine_id'leri veri tabanından çekme fonksiyonu
  const getVaccineIds = async () => {
    try {
      const [vaccineIds] = await sequelize.query("SELECT vaccine_id FROM vaccines");
      return vaccineIds.map((row) => row.vaccine_id); // Liste halinde dön
    } catch (error) {
      console.error("Vaccine ID'ler alınırken hata oluştu:", error);
      throw error;
    }
  };

  const formatPromptForVaccinations = async (rowCount) => {
    let animalIds = null;
    let vaccineIds = null;

    try {
        animalIds = await getAnimalIds();
        vaccineIds = await getVaccineIds();
    } catch (error) {
        console.error("Error while formatting the prompt for vaccinations:", error);
    }

    return `
Using the following lists:
- animal_id: [${animalIds.join(", ")}]
- vaccine_id: [${vaccineIds.join(", ")}]

Generate SQL insert statements for the table "vaccination_details". Each row should have:
- vaccination_id: Auto-increment (do not include in SQL statement).
- animal_id: Randomly pick from the animal_id list.
- vaccination_type_id: Randomly pick from the vaccine_id list.
- vaccination_date: Random date in the last 2 years.

Add ${rowCount} entries to the vaccination_details table.
Each entry should be added via a different INSERT INTO statement each of which is written in a single line.
There must not be empty lines between insert statements.
You may add multiple types of vaccinations for the same animal.
The SQL query should only include valid insert statements.
I mean, your answer should only include a SQL query, nothing else.
`;
};



const getRandomPhoto = (species) => {
  console.log("species: " + species);

  const speciesFolderMap = {
    cat: 'cats',
    dog: 'dogs',
    rabbit: 'rabbits'
  };

  const folderPath = path.join(__dirname, 'images', speciesFolderMap[species.toLowerCase()]);
  const files = fs.readdirSync(folderPath);
  const randomFile = files[Math.floor(Math.random() * files.length)];

  return fs.readFileSync(path.join(folderPath, randomFile)); // Fotoğrafı binary (BLOB) olarak oku
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
