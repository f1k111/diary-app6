# Diary App - Praktikum Modul 6 (State & React Hooks)

Aplikasi **Diary App** berbasis **React Native** menggunakan **Expo CLI** dan **Expo Router**. Project ini dibangun dari awal untuk memahami dan mengimplementasikan konsep State Management, React Hooks, serta Custom Hooks pada aplikasi multi-screen.

---

## 👤 Identitas Mahasiswa

* **Nama:** Taufiq Komara
* **NIM:** 2430511052
* **Kelas:** 5C

---

## 🚀 Fitur Aplikasi

1. **Home Screen (`app/(tabs)/index.tsx`)**:
   * Menampilkan seluruh daftar entri buku harian.
   * Pencarian judul, isi preview, dan tanggal dengan fitur *debounce* (delay 350 ms).
   * Filter entri berdasarkan kategori *Mood* (😊, 🎯, 😌, 🥳).
   * Tombol **Reset Filter** untuk mengosongkan pencarian dan filter *mood* sekaligus mengembalikan fokus cursor ke *input search*.
   * Menyukai/batal menyukai (*Toggle Like*) entri langsung dari kartu diary.

2. **Favorites Screen (`app/(tabs)/favorites.tsx`)**:
   * Menampilkan daftar entri buku harian yang telah disukai (*liked*).
   * Sinkronisasi status *like* secara *real-time* dengan *Home* dan *Detail Screen*.

3. **Tambah Diary (`app/(tabs)/create.tsx`)**:
   * Form interaktif untuk menambah entri buku harian baru.
   * Pilihan mood interaktif, input judul, tanggal, dan isi cerita harian.
   * *Controlled component* dengan validasi tombol **Simpan**.

4. **Detail Screen (`app/detail/[id].tsx`)**:
   * Menampilkan isi lengkap entri buku harian secara spesifik berdasarkan ID.
   * Opsi *Toggle Like* yang tersinkronisasi.

5. **Pengaturan Screen (`app/(tabs)/settings.tsx`)**:
   * Pengaturan mode tampilan menggunakan *Switch local state*.

---

## 📋 Penjelasan React Hooks yang Digunakan

Sesuai dengan ketentuan tugas praktikum, berikut adalah rincian penjelasan minimal 5 React Hooks yang diimplementasikan pada project ini:

| Hook | Input / Dependency | Output / State | Alasan Pemilihan & Fungsi |
| :--- | :--- | :--- | :--- |
| **`useState`** | Nilai awal state (e.g., `''`, `null`, `false`) | State variabel & fungsi pengubah (*setter*) | Digunakan untuk mengelola *local state* komponen interaktif, seperti input pencarian (`query`), pilihan mood (`selectedMood`), form entri baru, dan status switch pada Pengaturan. |
| **`useContext`** | `DiaryContext` | Data `entries`, `likedIds`, dan fungsi-fungsi aksi (`addEntry`, `toggleLike`, `getById`) | Mengakses *shared state* lintas screen tanpa *prop drilling*. Memungkinkan data buku harian dan status disukai diakses secara global di Home, Detail, Create, dan Favorites. |
| **`useEffect`** | `[query]` | Side-effect timer (*setTimeout*) & Cleanup (*clearTimeout*) | Mengatur efek delay (*debounce*) selama 350 ms ketika pengguna mengetik di *search input*. Fungsi *cleanup* membatalkan timer lama jika pengguna masih mengetik, mencegah re-render berlebihan. |
| **`useMemo`** | `[entries, debouncedQuery, selectedMood]` / `[entries, likedIds]` | Nilai hasil komputasi yang di-cache (*filteredEntries*, *likedEntries*, *context value*) | Mengoptimalkan performa komputasi penyaringan data (*filtering*). Komputasi pencarian dan filter mood hanya dijalankan ulang apabila dependency-nya mengalami perubahan. |
| **`useRef`** | Referensi elemen `TextInput` | Objek reference `.current` | Mengakses elemen native `TextInput` secara langsung tanpa memicu re-render ulang komponen. Digunakan untuk mengembalikan fokus kursor ke kolom pencarian saat tombol *Reset* ditekan. |

---

## 🛠️ Custom Hooks

1. **`useDiarySearch(entries)`**:
   Mengemas logika pencarian (*debounce timer*), filtering berdasarkan teks query, filtering berdasarkan emoji *mood*, serta penanganan *reset filter*.
2. **`useLikedEntries(entries, likedIds)`**:
   Mengemas logika pengambil data entri yang berstatus *disukai* (*liked*) untuk ditampilkan pada tab *Favorites*.