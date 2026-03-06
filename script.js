const questions = [
    { 
        q: "Что я почувствовал, когда впервые тебя увидел?", 
        a: ["Сразу понял — это ОНА", "Просто симпатию", "Сильное волнение", "Любопытство"], 
        c: 0 
    },
    { 
        q: "Какая твоя черта характера заставляет меня улыбаться каждый день?", 
        a: ["Твоё чувство юмора", "Твоя доброта", "Твоя искренность", "Всё вместе"], 
        c: 3 
    },
    { 
        q: "Какое было первое свидание?", 
        a: ["В кино", "Стрельба из лука", "В парке", "Гончарное мастерство"], 
        c: 3 
    },
    { 
        q: "Какое моё любимое воспоминание, связанное с тобой?", 
        a: ["Наше первое свидание", "Наш первый новый год", "Тот день, когда мы решили жить вместе", "Каждый момент с тобой — любимой"], 
        c: 3 
    },
    { 
        q: "Что я больше всего ценю в наших отношениях?", 
        a: ["Поддержку", "Юмор", "Такстильность", "Секс"], 
        c: 0 
    },
    { 
        q: "Как изменилась моя жизнь после встречи с тобой?", 
        a: ["Стала спокойнее", "Наполнилась смыслом и теплом", "Стала ярче", "Всё сразу"], 
        c: 1 
    },
    { 
        q: "На что я готов ради твоей улыбки?", 
        a: ["На безумные поступки", "На всё, что угодно", "На вкусный ужин", "На долгие прогулки"], 
        c: 1 
    },
    { 
        q: "Какую песню или музыку я ассоциирую с тобой?", 
        a: ["Ту, под которую мы танцевали", "Приятная", "10", "Шаман- ты моя"], 
        c: 1
    },
    { 
        q: "Если бы мне предложили прожить этот путь заново...", 
        a: ["Я бы ничего не менял", "Я бы нашел тебя раньше", "Я бы прожил его так же", "Варианты 1 и 2"], 
        c: 3 
    },
    { 
        q: "Люблю ли я тебя?", 
        a: ["Да", "Безумно", "Больше жизни", "Все ответы верны ❤️"], 
        c: 3 
    }
];


let current = 0;
let score = 0;
const SECRET_PASS = "020820";

// --- ЭФФЕКТ ДВИЖЕНИЯ ФОНА ЗА КУРСОРОМ ---
document.addEventListener('mousemove', (e) => {
    const collage = document.querySelector('.background-collage');
    if (collage) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
        collage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }
});

// --- ЭФФЕКТ СЕРДЕЧЕК ---
function createHearts(btn) {
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('span');
        heart.innerText = '❤️';
        heart.className = 'heart-particle';
        heart.style.left = (Math.random() * 80 + 10) + '%';
        heart.style.top = '20%';
        heart.style.setProperty('--mdx', (Math.random() * 100 - 50) + 'px');
        btn.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

function checkAuth() {
    const input = document.getElementById("pass-input").value;
    if (input === SECRET_PASS) {
        document.getElementById("auth-zone").classList.add("hidden");
        document.getElementById("game-zone").classList.remove("hidden");
        render();
    } else {
        document.getElementById("auth-error").classList.remove("hidden");
        document.getElementById("pass-input").value = "";
    }
}

function render() {
    const data = questions[current];
    document.getElementById("progress").innerText = `Вопрос ${current + 1} из ${questions.length}`;
    document.getElementById("question").innerText = data.q;
    document.getElementById("progress-bar").style.width = (current / questions.length) * 100 + "%";

    const container = document.getElementById("options");
    container.innerHTML = "";

    data.a.forEach((ans, i) => {
        const b = document.createElement("button");
        b.className = "btn";
        b.innerText = ans;
        b.style.position = 'relative'; // Нужно для сердечек
        
        b.onclick = () => {
            const all = container.querySelectorAll(".btn");
            all.forEach(btn => btn.style.pointerEvents = "none");
            
            if (i === data.c) {
                b.classList.add("correct");
                score++;
                createHearts(b); // Запуск сердечек
            } else {
                b.classList.add("wrong");
                all[data.c].classList.add("correct");
            }

            setTimeout(() => {
                current++;
                if (current < questions.length) render();
                else finish();
            }, 1000);
        };
        container.appendChild(b);
    });
}

function finish() {
    document.getElementById("game-zone").classList.add("hidden");
    document.getElementById("result-zone").classList.remove("hidden");
    document.getElementById("score-display").innerText = `Твой результат: ${score} из ${questions.length}`;
    
    confetti({
        particleCount: score * 15,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffafbd', '#d4418e', '#ffc3a0']
    });
}
