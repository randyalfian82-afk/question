```javascript
// =====================================================
// NOMOR WHATSAPP TUJUAN
// =====================================================
//
// Contoh:
// 081234567890
//
// menjadi:
// 6281234567890
//
// Jangan pakai:
// +62
// spasi
// tanda -
//

const nomorWhatsApp = "6289508350068";


// =====================================================
// PERTANYAAN
// =====================================================

const questions = [

    "Apa hal yang paling sering kamu senyum-senyum sendiri saat mengingatnya?",

    "Kalau kita bisa pergi ke mana saja besok, ke mana kamu ingin ajak aku?",

    "Apa harapanmu ke depannya?",

    "Apa hal pertama yang terlintas di pikiranmu saat mendengar namaku?",

    "Bagaimana cara terbaik aku bisa menemani dan mendukungmu?"

];


// =====================================================
// DATA
// =====================================================

let currentQuestion = 0;

let userName = "";

let userBirthday = "";

let answers = [];


// =====================================================
// ELEMENT
// =====================================================

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


const loginButton =
    document.getElementById("loginButton");

const nextButton =
    document.getElementById("nextButton");

const whatsappButton =
    document.getElementById("whatsappButton");

const restartButton =
    document.getElementById("restartButton");


const questionCounter =
    document.getElementById("questionCounter");

const progressBar =
    document.getElementById("progressBar");

const questionText =
    document.getElementById("questionText");

const answerInput =
    document.getElementById("answerInput");

const finalName =
    document.getElementById("finalName");


// =====================================================
// CEK ELEMENT
// =====================================================

console.log("JavaScript berhasil dimuat.");


// =====================================================
// MASUK
// =====================================================

function masuk() {

    const nama =
        namaInput.value.trim();

    const tanggal =
        birthdayInput.value.trim();


    // Tidak perlu cek benar/salah.
    // Hanya memastikan tidak kosong.

    if (nama === "") {

        alert(
            "Nama lengkapnya diisi dulu ya ❤️"
        );

        namaInput.focus();

        return;
    }


    if (tanggal === "") {

        alert(
            "Tanggal lahirnya diisi dulu ya ❤️"
        );

        birthdayInput.focus();

        return;
    }


    userName = nama;

    userBirthday = tanggal;

    currentQuestion = 0;

    answers = [];


    // Ganti halaman

    loginPage.classList.add("hidden");

    questionPage.classList.remove("hidden");

    finishPage.classList.add("hidden");


    tampilkanPertanyaan();
}


// =====================================================
// TAMPILKAN PERTANYAAN
// =====================================================

function tampilkanPertanyaan() {

    questionCounter.textContent =
        "PERTANYAAN " +
        (currentQuestion + 1) +
        " / " +
        questions.length;


    questionText.textContent =
        questions[currentQuestion];


    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;


    progressBar.style.width =
        progress + "%";


    answerInput.value = "";


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


    setTimeout(function () {

        answerInput.focus();

    }, 200);
}


// =====================================================
// NEXT QUESTION
// =====================================================

function nextQuestion() {

    const answer =
        answerInput.value.trim();


    if (answer === "") {

        alert(
            "Jawab dulu pertanyaannya ya ❤️"
        );

        answerInput.focus();

        return;
    }


    answers[currentQuestion] =
        answer;


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


// =====================================================
// HALAMAN SELESAI
// =====================================================

function tampilkanHalamanSelesai() {

    questionPage.classList.add("hidden");

    finishPage.classList.remove("hidden");


    finalName.textContent =
        userName;
}


// =====================================================
// KIRIM WHATSAPP
// =====================================================

function kirimWhatsApp() {

    if (
        answers.length !==
        questions.length
    ) {

        alert(
            "Masih ada jawaban yang belum diisi ❤️"
        );

        return;
    }


    let message = "";

    message +=
        "💌 ADA YANG MAU AKU CERITAKAN...\n\n";


    message +=
        "Halo ❤️\n\n";


    message +=
        "👤 Nama:\n" +
        userName +
        "\n\n";


    message +=
        "🎂 Tanggal Lahir:\n" +
        userBirthday +
        "\n\n";


    message +=
        "━━━━━━━━━━━━━━━━━━\n\n";


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        message +=
            "❤️ PERTANYAAN " +
            (i + 1) +
            "\n\n";


        message +=
            questions[i] +
            "\n\n";


        message +=
            "💭 Jawaban:\n" +
            answers[i] +
            "\n\n";


        message +=
            "━━━━━━━━━━━━━━━━━━\n\n";
    }


    message +=
        "✨ Semua pertanyaan sudah dijawab.\n\n";


    message +=
        "Terima kasih sudah meluangkan waktu " +
        "untuk menjawab semuanya. ❤️";


    const encodedMessage =
        encodeURIComponent(message);


    const whatsappURL =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodedMessage;


    window.open(
        whatsappURL,
        "_blank"
    );
}


// =====================================================
// MULAI LAGI
// =====================================================

function mulaiLagi() {

    currentQuestion = 0;

    userName = "";

    userBirthday = "";

    answers = [];


    namaInput.value = "";

    birthdayInput.value = "";

    answerInput.value = "";


    progressBar.style.width =
        "20%";


    finishPage.classList.add("hidden");

    questionPage.classList.add("hidden");

    loginPage.classList.remove("hidden");


    namaInput.focus();
}


// =====================================================
// EVENT
// =====================================================

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


// =====================================================
// ENTER NAMA
// =====================================================

namaInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            birthdayInput.focus();

        }

    }
);


// =====================================================
// ENTER TANGGAL
// =====================================================

birthdayInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            masuk();

        }

    }
);


// =====================================================
// CTRL + ENTER JAWABAN
// =====================================================

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
