// Questionnaire data and logic
const questions = [
    {
        question: "Wat voor soort evenement wilt u organiseren?",
        options: [
            "Festival of muziekevenement",
            "Markt of braderie",
            "Sportevenement",
            "Cultureel evenement",
            "Bedrijfsfeest",
            "Privéfeest (verjaardag, bruiloft, etc.)",
            "Anders"
        ],
        type: "single"
    },
    {
        question: "Hoeveel bezoekers verwacht u ongeveer?",
        options: [
            "Minder dan 50 personen",
            "50-100 personen",
            "100-500 personen",
            "500-1000 personen",
            "1000-5000 personen",
            "Meer dan 5000 personen"
        ],
        type: "single"
    },
    {
        question: "Waar wilt u het evenement organiseren?",
        options: [
            "Op eigen terrein (particulier)",
            "Op openbare ruimte (park, plein)",
            "In een gebouw/zaal",
            "Op een commerciële locatie",
            "Op een sportterrein"
        ],
        type: "single"
    },
    {
        question: "Zal er muziek worden gedraaid?",
        options: [
            "Nee, geen muziek",
            "Ja, achtergrondmuziek (niet hard)",
            "Ja, live muziek/optredens",
            "Ja, dj of versterkte muziek",
            "Ja, buitenmuziek (hard geluid)"
        ],
        type: "single"
    },
    {
        question: "Op welke dagen/tijden vindt het evenement plaats?",
        options: [
            "Alleen overdag (09:00-18:00)",
            "Overdag en 's avonds (09:00-22:00)",
            "Tot middernacht (09:00-24:00)",
            "Tot in de nacht (na 24:00)",
            "Meerdere dagen achtereen"
        ],
        type: "single"
    },
    {
        question: "Zal er alcohol worden geschonken?",
        options: [
            "Nee, geen alcohol",
            "Ja, alleen bier en wijn",
            "Ja, alle soorten alcohol",
            "Ja, door professionele horeca",
            "Ik weet het nog niet"
        ],
        type: "single"
    },
    {
        question: "Zijn er speciale activiteiten gepland?",
        options: [
            "Nee, alleen standaard activiteiten",
            "Ja, vuurwerk",
            "Ja, attracties/kermis",
            "Ja, foodtrucks",
            "Ja, meerdere van bovenstaande"
        ],
        type: "multiple"
    },
    {
        question: "Heeft u al ervaring met het organiseren van evenementen?",
        options: [
            "Nee, dit is mijn eerste evenement",
            "Ja, beperkte ervaring",
            "Ja, regelmatig evenementen georganiseerd",
            "Ja, professionele evenementenorganisator"
        ],
        type: "single"
    }
];

let currentQuestion = 0;
let answers = {};
let checklistItems = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeQuestionnaire();
    initializeChecklist();
    initializeContactForm();
});

function initializeQuestionnaire() {
    displayQuestion();
    updateProgress();
}

function displayQuestion() {
    const question = questions[currentQuestion];
    const questionCard = document.getElementById('questionCard');
    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const questionOptions = document.getElementById('questionOptions');
    const totalQuestions = document.getElementById('totalQuestions');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    questionNumber.textContent = currentQuestion + 1;
    totalQuestions.textContent = questions.length;
    questionText.textContent = question.question;

    // Clear previous options
    questionOptions.innerHTML = '';

    // Create options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index, option);
        
        // Check if already selected
        if (answers[currentQuestion] && answers[currentQuestion].includes(option)) {
            optionElement.classList.add('selected');
        }
        
        questionOptions.appendChild(optionElement);
    });

    // Update navigation buttons
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = !answers[currentQuestion] || answers[currentQuestion].length === 0;
    
    // Update next button text
    nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Bekijk resultaat' : 'Volgende';
}

function selectOption(index, option) {
    const question = questions[currentQuestion];
    const optionElements = document.querySelectorAll('.option');
    
    if (question.type === 'single') {
        // Single selection - clear all and select this one
        optionElements.forEach(el => el.classList.remove('selected'));
        optionElements[index].classList.add('selected');
        answers[currentQuestion] = [option];
    } else {
        // Multiple selection - toggle selection
        const isSelected = optionElements[index].classList.contains('selected');
        if (isSelected) {
            optionElements[index].classList.remove('selected');
            answers[currentQuestion] = answers[currentQuestion].filter(a => a !== option);
        } else {
            optionElements[index].classList.add('selected');
            if (!answers[currentQuestion]) {
                answers[currentQuestion] = [];
            }
            answers[currentQuestion].push(option);
        }
    }

    // Enable/disable next button
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = !answers[currentQuestion] || answers[currentQuestion].length === 0;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgress();
    } else {
        showResult();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function showResult() {
    // Hide questionnaire
    document.querySelector('.questionnaire').style.display = 'none';
    
    // Show result section
    const resultSection = document.getElementById('resultaat');
    resultSection.style.display = 'block';
    
    // Calculate result based on answers
    const result = calculateResult();
    
    // Update result content
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDescription').textContent = result.description;
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function calculateResult() {
    const visitorCount = answers[1] && answers[1][0];
    const location = answers[2] && answers[2][0];
    const music = answers[3] && answers[3][0];
    const alcohol = answers[5] && answers[5][0];
    
    // Simple logic based on common requirements
    let needsPermit = false;
    let permitType = "";
    
    // Always need permit for public spaces
    if (location && location.includes("openbare ruimte")) {
        needsPermit = true;
        permitType = "evenementvergunning";
    }
    
    // Need permit for larger events
    if (visitorCount && (visitorCount.includes("500") || visitorCount.includes("1000") || visitorCount.includes("5000"))) {
        needsPermit = true;
        permitType = "evenementvergunning";
    }
    
    // Need permit for loud music
    if (music && (music.includes("live muziek") || music.includes("dj") || music.includes("buitenmuziek"))) {
        needsPermit = true;
        permitType = "evenementvergunning";
    }
    
    // Need permit for alcohol service
    if (alcohol && alcohol.includes("alcohol")) {
        needsPermit = true;
        permitType = "evenementvergunning en horecavergunning";
    }
    
    if (needsPermit) {
        return {
            title: "Evenementvergunning vereist",
            description: `Op basis van uw antwoorden heeft u een ${permitType} nodig. Gebruik de checklist hieronder om ervoor te zorgen dat u alle benodigde documenten heeft.`
        };
    } else {
        return {
            title: "Geen vergunning vereist",
            description: "Op basis van uw antwoorden heeft u waarschijnlijk geen evenementvergunning nodig. Neem bij twijfel contact op met de gemeente."
        };
    }
}

function resetQuestionnaire() {
    currentQuestion = 0;
    answers = {};
    
    // Hide result section
    document.getElementById('resultaat').style.display = 'none';
    
    // Show questionnaire
    document.querySelector('.questionnaire').style.display = 'block';
    
    // Reset display
    displayQuestion();
    updateProgress();
    
    // Scroll to questionnaire
    document.getElementById('vragenlijst').scrollIntoView({ behavior: 'smooth' });
}

// Checklist functionality
function initializeChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateChecklistProgress);
    });
}

function updateChecklistProgress() {
    const totalItems = document.querySelectorAll('.checklist-item input[type="checkbox"]').length;
    const checkedItems = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    const progress = Math.round((checkedItems / totalItems) * 100);
    
    const progressCircle = document.querySelector('.progress-circle');
    const checklistStatus = document.getElementById('checklistStatus');
    
    progressCircle.style.background = `conic-gradient(var(--primary-color) ${progress}%, var(--medium-gray) ${progress}%)`;
    document.querySelector('.progress-circle span').textContent = progress;
    
    if (progress === 0) {
        checklistStatus.textContent = "Start met het afvinken van de items";
    } else if (progress === 100) {
        checklistStatus.textContent = "Gefeliciteerd! U heeft alles afgevinkt.";
    } else {
        checklistStatus.textContent = `${checkedItems} van ${totalItems} items afgevinkt`;
    }
}

// Contact form functionality
function initializeContactForm() {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', handleContactFormSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Vul alle velden in.');
        return;
    }
    
    // Simulate form submission
    alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
    e.target.reset();
}

// Navigation functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Add some interactivity to the page
document.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});
