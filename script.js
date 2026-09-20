/* =====================================================
   PENGATURAN WHATSAPP
===================================================== */

/*
    GANTI NOMOR DI BAWAH INI DENGAN
    NOMOR WHATSAPP YANG AKAN MENERIMA JAWABAN.

    Contoh:

    Nomor asli:
    081234567890

    Tulis:
    6281234567890

    Jangan menggunakan:
    +62
    spasi
    tanda -
*/

const nomorWhatsApp = "6289508350068";


/* =====================================================
   DAFTAR PERTANYAAN
===================================================== */

const questions = [

    "Apa hal yang paling sering kamu senyum-senyum sendiri saat mengingatnya?",

    "Kalau kita bisa pergi ke mana saja besok, ke mana kamu ingin ajak aku?",

    "Apa harapanmu ke depannya?",

    "Apa hal pertama yang terlintas di pikiranmu saat mendengar namaku?",

    "Bagaimana cara terbaik aku bisa menemani dan mendukungmu?"

];


/* =====================================================
   DATA PENGGUNA
===================================================== */

let currentQuestion = 0;

let userName = "";

let userBirthday = "";

let answers = [];


/* =====================================================
   AMBIL ELEMENT HTML
===================================================== */

const loginPage =
    document.getElementById("loginPage");

const questionPage =
    document.getElementById("questionPage");

const finishPage =
    document.getElementById("finishPage");

const namaInput =
    document.getElementById("nama");

const birthdayInput =
    document.getElementById("tanggalLahir");

const questionCounter =
    document.getElementById("questionCounter");

const progressBar =
    document.getElementById("progressBar");

const questionText =
    document.getElementById("questionText");

const answerInput =
    document.getElementById("answerInput");

const loginButton =
    document.getElementById("loginButton");

const nextButton =
    document.getElementById("nextButton");

const whatsappButton =
    document.getElementById("whatsappButton");

const restartButton =
    document.getElementById("restartButton");

const finalName =
    document.getElementById("finalName");


/* =====================================================
   FUNGSI MASUK
===================================================== */

function masuk() {

    const nama =
        namaInput.value.trim();

    const tanggal =
        birthdayInput.value.trim();


    /*
        Tidak ada pengecekan apakah
        nama atau tanggal tersebut benar.

        Yang penting tidak kosong.
    */

    if (
        nama === "" ||
        tanggal === ""
    ) {

        alert(
            "Nama dan tanggal lahirnya diisi dulu ya ❤️"
        );

        return;

    }


    /* Simpan data */

    userName = nama;

    userBirthday = tanggal;


    /* Reset pertanyaan */

    currentQuestion = 0;

    answers = [];


    /* Pindah halaman */

    loginPage.classList.add("hidden");

    questionPage.classList.remove("hidden");

    finishPage.classList.add("hidden");


    /* Tampilkan pertanyaan pertama */

    tampilkanPertanyaan();

}


/* =====================================================
   TAMPILKAN PERTANYAAN
===================================================== */

function tampilkanPertanyaan() {

    /* Nomor */

    questionCounter.textContent =
        `PERTANYAAN ${currentQuestion + 1} / ${questions.length}`;


    /* Pertanyaan */

    questionText.textContent =
        questions[currentQuestion];


    /* Progress */

    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    /* Kosongkan textarea */

    answerInput.value = "";


    /* Focus */

    setTimeout(() => {

        answerInput.focus();

    }, 300);


    /* Tombol */

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Selesai ❤️";

    } else {

        nextButton.textContent =
            "Lanjut ❤️";

    }

}


/* =====================================================
   PERTANYAAN BERIKUTNYA
===================================================== */

function nextQuestion() {

    const answer =
        answerInput.value.trim();


    /* Cek jawaban */

    if (answer === "") {

        alert(
            "Jawab dulu pertanyaannya ya ❤️"
        );

        answerInput.focus();

        return;

    }


    /* Simpan jawaban */

    answers[currentQuestion] =
        answer;


    /* Cek apakah masih ada */

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        tampilkanPertanyaan();

    } else {

        tampilkanHalamanSelesai();

    }

}


/* =====================================================
   HALAMAN SELESAI
===================================================== */

function tampilkanHalamanSelesai() {

    questionPage.classList.add("hidden");

    finishPage.classList.remove("hidden");


    finalName.textContent =
        userName;

}


/* =====================================================
   KIRIM KE WHATSAPP
===================================================== */

function kirimWhatsApp() {

    /*
        Pastikan semua jawaban tersedia.
    */

    if (
        answers.length !==
        questions.length
    ) {

        alert(
            "Sepertinya masih ada jawaban yang belum diisi ❤️"
        );

        return;

    }


    /*
        Pesan WhatsApp.
    */

    let message =

`💌 *ADA YANG MAU AKU CERITAKAN...*

Halo ❤️

👤 *Nama:*
${userName}

🎂 *Tanggal Lahir:*
${userBirthday}

━━━━━━━━━━━━━━━━━━━━

`;


    /*
        Masukkan semua pertanyaan
        dan jawaban.
    */

    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        message +=

`❤️ *PERTANYAAN ${i + 1}*

${questions[i]}

💭 *Jawaban:*
${answers[i]}

━━━━━━━━━━━━━━━━━━━━

`;

    }


    /*
        Penutup.
    */

    message +=

`✨ Semua pertanyaan sudah dijawab.

Terima kasih sudah meluangkan waktu
untuk menjawab semuanya. ❤️`;


    /*
        Encode pesan agar aman
        dimasukkan ke URL WhatsApp.
    */

    const encodedMessage =
        encodeURIComponent(message);


    /*
        Buat URL WhatsApp.

        Format:
        https://wa.me/nomor?text=pesan
    */

    const whatsappURL =
        `https://wa.me/${nomorWhatsApp}?text=${encodedMessage}`;


    /*
        Buka WhatsApp di tab baru.
    */

    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =====================================================
   RESTART
===================================================== */

function mulaiLagi() {

    /* Reset semua data */

    currentQuestion = 0;

    userName = "";

    userBirthday = "";

    answers = [];


    /* Kosongkan input */

    namaInput.value = "";

    birthdayInput.value = "";

    answerInput.value = "";


    /* Reset progress */

    progressBar.style.width =
        "20%";


    /* Kembali ke login */

    finishPage.classList.add("hidden");

    questionPage.classList.add("hidden");

    loginPage.classList.remove("hidden");


    namaInput.focus();

}


/* =====================================================
   EVENT LISTENER
===================================================== */

loginButton.addEventListener(
    "click",
    masuk
);


nextButton.addEventListener(
    "click",
    nextQuestion
);


whatsappButton.addEventListener(
    "click",
    kirimWhatsApp
);


restartButton.addEventListener(
    "click",
    mulaiLagi
);


/* =====================================================
   ENTER DI NAMA
===================================================== */

namaInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            birthdayInput.focus();

        }

    }
);


/* =====================================================
   ENTER DI TANGGAL LAHIR
===================================================== */

birthdayInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            masuk();

        }

    }
);


/* =====================================================
   CTRL + ENTER UNTUK JAWABAN
===================================================== */

answerInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            nextQuestion();

        }

    }
);
```
