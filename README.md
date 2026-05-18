# EmoVision - Frontend

EmoVision adalah aplikasi web pelacak kesehatan mental berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pengguna memahami, memvisualisasikan, dan mengelola kondisi emosional mereka secara real-time. Aplikasi ini mengintegrasikan deteksi emosi wajah, jurnal harian analitis, dan berbagai fitur interaktif pendukung kesehatan mental.

## Fitur Utama
- **Face Mood Detection**: Deteksi suasana hati secara real-time menggunakan kamera berbasis AI.
- **Journaling & AI Generate**: Ruang curahan hati harian terintegrasi dengan feedback analitis otomatis dari AI.
- **Affirmation & Positive Quotes**: Pengingat pesan positif harian untuk memotivasi pengguna.
- **Mindful Breathing**: Latihan pernapasan terpandu (teknik 4-7-8) untuk meredakan kecemasan.
- **Mood Graphic**: Visualisasi grafik mingguan untuk melihat perkembangan emosi secara kronologis.
- **Streak Tracker**: Membangun kebiasaan positif melalui pelacakan konsistensi journaling harian.

##  Tech Stack
- **Framework/Library**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons (Fi Icons)

## Prasyarat & Instalasi
Sebelum menjalankan aplikasi, pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di perangkat Anda.

1. **Clone Repository**
   ```bash
   git clone [https://github.com/username/emovision-frontend.git](https://github.com/username/emovision-frontend.git)
   cd emovision-frontend
   ```
2. **Instalasi Dependencies**
    ```bash
   npm install
   ```
3. **Konfigurasi Environment Variables**

    Buat file .env di root folder dan masukkan URL backend (Railway):
    ```bash
   VITE_API_URL=[https://emovision-backend-production.up.railway.app/api](https://emovision-backend-production.up.railway.app/api)
   ```
## Menjalankan Aplikasi Secara Lokal
Untuk menjalankan server pengembangan lokal:
```bash
npm run dev
```
Aplikasi secara default akan berjalan di alamat http://localhost:5173.

## Deployment (Vercel)
Proyek ini dikonfigurasi untuk di-deploy ke Vercel secara otomatis melalui integrasi GitHub. Pastikan Anda telah menambahkan VITE_API_URL pada menu Environment Variables di dashboard project Vercel Anda sebelum melakukan deployment.