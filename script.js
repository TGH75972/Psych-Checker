const disorders = {
    Depression: {
        symptoms: [
            'Do you often feel sad or down?',
            'Do you have trouble sleeping?',
            'Do you feel hopeless or worthless?',
            'Do you have changes in appetite or weight?',
            'Do you find it hard to enjoy activities you once liked?',
            'Do you feel fatigued or lacking energy?',
            'Do you have trouble concentrating?',
            'Do you feel irritable or restless?',
            'Do you experience frequent crying spells?',
            'Do you have thoughts of self-harm or suicide?'
        ],
        score: 0
    },
    Anxiety: {
        symptoms: [
            'Do you feel anxious or worried most of the time?',
            'Do you experience frequent panic attacks?',
            'Do you find it difficult to relax?',
            'Do you have excessive worry about everyday things?',
            'Do you avoid certain places or situations due to anxiety?',
            'Do you experience physical symptoms like sweating or trembling?',
            'Do you have trouble sleeping due to worry?',
            'Do you experience racing thoughts?',
            'Do you have difficulty focusing on tasks?',
            'Do you feel easily overwhelmed?'
        ],
        score: 0
    },
    Insomnia: {
        symptoms: [
            'Do you have trouble falling asleep?',
            'Do you wake up frequently during the night?',
            'Do you feel tired even after a full night’s sleep?',
            'Do you have difficulty staying asleep?',
            'Do you feel restless or have trouble relaxing before bed?',
            'Do you experience anxiety about falling asleep?',
            'Do you have difficulty with daytime drowsiness?',
            'Do you use substances like caffeine or alcohol close to bedtime?',
            'Do you find yourself needing more sleep than usual?',
            'Do you experience physical discomfort that interferes with sleep?'
        ],
        score: 0
    },
    ADHD: {
        symptoms: [
            'Do you have trouble focusing on tasks?',
            'Do you frequently make careless mistakes?',
            'Do you often forget to complete tasks?',
            'Do you find it difficult to stay organized?',
            'Do you get easily distracted by external stimuli?',
            'Do you have difficulty following through on instructions?',
            'Do you have trouble prioritizing tasks?',
            'Do you often lose things necessary for tasks or activities?',
            'Do you experience restlessness or fidgeting?',
            'Do you interrupt others or have difficulty waiting your turn?'
        ],
        score: 0
    },
    Bipolar: {
        symptoms: [
            'Do you experience extreme mood swings?',
            'Do you have periods of elevated or irritable mood?',
            'Do you feel unusually energetic or agitated?',
            'Do you have episodes of depression followed by periods of high energy?',
            'Do you engage in risky behaviors during manic episodes?',
            'Do you experience rapid changes in your mood?',
            'Do you have periods of increased activity or restlessness?',
            'Do you have difficulty sleeping during manic episodes?',
            'Do you have racing thoughts or speech during high periods?',
            'Do you experience impulsive decision-making?'
        ],
        score: 0
    }
};

let currentDisorder = 'Depression';
let currentQuestionIndex = 0;
let disorderOrder = ['Depression', 'Anxiety', 'Insomnia', 'ADHD', 'Bipolar'];
let disorderIndex = 0;

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const nextBtn = document.getElementById('next-btn');
const questionElement = document.getElementById('question');
const resultElement = document.getElementById('result');

yesBtn.addEventListener('click', () => handleResponse('yes'));
noBtn.addEventListener('click', () => handleResponse('no'));
nextBtn.addEventListener('click', nextQuestion);

function startQuiz() {
    disorderIndex = 0;
    currentQuestionIndex = 0;
    currentDisorder = disorderOrder[disorderIndex];
    document.getElementById('result').innerText = '';
    nextQuestion();
}

function handleResponse(response) {
    if (response === 'yes') {
        disorders[currentDisorder].score++;
    }
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    const currentDisorderData = disorders[currentDisorder];
    const symptoms = currentDisorderData.symptoms;

    currentQuestionIndex++;
    if (currentQuestionIndex < symptoms.length) {
        questionElement.innerText = symptoms[currentQuestionIndex];
        resultElement.innerText = '';
        nextBtn.style.display = 'none';
    } else {
        disorderIndex++;
        if (disorderIndex < disorderOrder.length) {
            currentDisorder = disorderOrder[disorderIndex];
            currentQuestionIndex = 0;
            questionElement.innerText = disorders[currentDisorder].symptoms[currentQuestionIndex];
            resultElement.innerText = '';
            nextBtn.style.display = 'none';
        } else {
            showResults();
        }
    }
}

function showResults() {
    const results = Object.entries(disorders).map(([disorder, data]) => ({
        disorder,
        score: data.score
    }));

    results.sort((a, b) => b.score - a.score);

    let message = '';
    if (results[0].score > 5) {
        message = `You might be experiencing symptoms of ${results[0].disorder}. Consider consulting a mental health professional.`;
    } else {
        message = 'Your responses do not indicate any specific disorder. If you have concerns, please consult a mental health professional.';
    }

    resultElement.innerText = message;
    document.getElementById('question-container').style.display = 'none';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    nextBtn.style.display = 'none';
}

startQuiz();
