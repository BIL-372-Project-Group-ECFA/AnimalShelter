İlk kurulumlar:
1. Ngrok hesabı oluşturun -> https://dashboard.ngrok.com/signup
2. Hesabınıza giriş yaptıktan sonra, Ngrok kontrol panelinde "Your Authtoken" sayfasına gidin ve Authtoken'ınızı kopyalayın.
3. Ngrok indirin. -> https://download.ngrok.com
4. İndirdiğiniz ngrok.exe dosyasını çalıştırın.
5. Açılan terminalde `<authtoken>` kısmına kendi Authtoken'ınızı yapıştırmak suretiyle
    "ngrok config add-authtoken `<authtoken>`" komutunu çalıştırın.

Uygulamayı başlatmak için:
1. Projeyi klonladıktan sonra "npm install" komutu ile bağımlılıkları yükleyin.
2. "npm run dev" komutu ile uygulamayı başlatın.