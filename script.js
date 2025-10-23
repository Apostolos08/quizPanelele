let questions=[];
let data={};
let current=0;
let score=0;
let timer=0;
let timerInterval;



async function loadQ(){
    const res =await
    fetch('questions.json');
    data = await res.json();

    const subjectSelect=document.getElementById("subject-select");
    Object.keys(data).forEach(subject =>{
        const opt=document.createElement("option");
        opt.value=subject;
        opt.textContent=subject;
        subjectSelect.appendChild(opt);
    });
}
document.getElementById("start-btn").addEventListener("click",()=>{
    const subject=document.getElementById("subject-select").value;
    if(!subject){
        alert("Επέλεξε Μάθημα");
        return;
    }
    questions =data[subject];
    current=0;
    score=0;
    timer=0;
document.getElementById("quiz-container").classList.remove("hidden");
document.getElementById("start-btn").classList.add("hidden");
document.getElementById("subject-select").classList.add("hidden");
document.getElementById("timer").classList.remove("hidden");

startTimer();
showQuestion();
});

function startTimer(){
    const timeDisplay=document.getElementById("time");
    timerInterval=setInterval(()=>{
        timer++;
        const minutes=Math.floor(timer/60);
        const seconds=timer%60;
        timeDisplay.textContent=`${minutes}:${seconds.toString().padStart(2,'0')}`;
    },1000);
}

function  stopTimer(){
    clearInterval(timerInterval);
}
function showQuestion(){
    const q=questions[current];
    document.getElementById("question").textContent=q.question;
    document.getElementById("feedback").textContent="";
    document.getElementById("next-btn").classList.add("hidden");
}

function checkAnswer(answer){
    const q=questions[current];
    const feedback=document.getElementById("feedback");
    if(answer===q.answer){
        feedback.textContent="ΣΩΣΤΟ";
        score++;
    }else{
        feedback.textContent="ΛΑΘΟΣ";
    }
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextQ(){
    current++;
    if(current<questions.length){
        showQuestion();
    }else{
        stopTimer();
        document.querySelector(".buttons").classList.add("hidden");
        document.getElementById("feedback").classList.add("hidden");
        document.getElementById("next-btn").classList.add("hidden");
        document.getElementById("score").classList.remove("hidden");
        const minutes=Math.floor(timer/60);
        const seconds=timer%60;
        document.getElementById("score").textContent = `Πέτυχες: ${score}/${questions.length}/n
        Χρόνος: ${minutes}:${seconds.toString().padStart(2,'0')}`;
    }
}

document.getElementById("true-btn").addEventListener("click",()=>checkAnswer(true));
document.getElementById("false-btn").addEventListener("click",()=>checkAnswer(false));
document.getElementById("next-btn").addEventListener("click",nextQ);

loadQ();

