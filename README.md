İlk kurulumlar:
1. Ngrok hesabı oluşturun -> https://dashboard.ngrok.com/signup
2. Hesabınıza giriş yaptıktan sonra, Ngrok kontrol panelinde "Your Authtoken" sayfasına gidin ve Authtoken'ınızı kopyalayın.
3. Ngrok indirin. -> https://download.ngrok.com
4. İndirdiğiniz ngrok.exe dosyasını çalıştırın.
5. Açılan terminalde `<authtoken>` kısmına kendi Authtoken'ınızı yapıştırmak suretiyle
    "ngrok config add-authtoken `<authtoken>`" komutunu çalıştırın.

Aşağıdaki adımları sırayla uygulayın:

Backend Uygulamasını başlatmak için:
1. Projeyi klonladıktan sonra "npm install" komutu ile bağımlılıkları yükleyin.
2. "npm run dev" komutu ile uygulamayı başlatın.

Frontend Uygulamasını başlatmak için:
1. "cd frontend" komutu ile frontend klasörüne geçin.
2. "npm install" komutu ile gerekli bağımlılıkları yükleyin.
3. "npm start" komutu ile uygulamayı başlatın.