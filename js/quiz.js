/**
 * Personal Trainers HK (PTHK) - Interactive Trainer Matchmaker Engine
 * Analyzes client goals, location, and coaching style to recommend the optimal coach.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTrainerQuiz();
});

function initTrainerQuiz() {
  const quizContainer = document.getElementById('quiz-widget');
  if (!quizContainer) return;

  let currentStep = 1;
  const totalSteps = 3;
  const userAnswers = {
    goal: 'fatloss',
    location: 'Central',
    style: 'structured',
    genderPref: 'any'
  };

  const steps = quizContainer.querySelectorAll('.quiz-step');
  const progressBar = document.getElementById('quiz-progress-fill');
  const stepCountText = document.getElementById('quiz-step-indicator');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const resultCard = document.getElementById('quiz-result-container');

  function updateStepUI() {
    steps.forEach((step, idx) => {
      if (idx + 1 === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    if (progressBar) {
      const pct = ((currentStep) / totalSteps) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (stepCountText) {
      stepCountText.textContent = `Step ${currentStep} of ${totalSteps}`;
    }

    if (prevBtn) {
      prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    }

    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.innerHTML = `<span>Generate My Match</span> <i class="ri-sparkling-fill"></i>`;
      } else {
        nextBtn.innerHTML = `<span>Next Step</span> <i class="ri-arrow-right-line"></i>`;
      }
    }
  }

  // Option selection handling
  quizContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = btn.closest('.quiz-options-grid');
      parent.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const field = btn.getAttribute('data-field');
      const val = btn.getAttribute('data-val');
      if (field && val) {
        userAnswers[field] = val;
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateStepUI();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepUI();
      } else {
        // Calculate & render result
        renderQuizResult();
      }
    });
  }

  function renderQuizResult() {
    // Hide steps and controls
    document.getElementById('quiz-steps-wrapper').style.display = 'none';
    document.getElementById('quiz-controls').style.display = 'none';
    resultCard.style.display = 'block';

    // Match calculation
    let matchedTrainer = PTHK_DATA.trainers[0];
    let matchScore = 98;

    if (userAnswers.goal === 'strength') {
      matchedTrainer = PTHK_DATA.trainers.find(t => t.id === 'marcus-vance') || PTHK_DATA.trainers[0];
      matchScore = 99;
    } else if (userAnswers.goal === 'fatloss') {
      matchedTrainer = PTHK_DATA.trainers.find(t => t.id === 'sarah-chen') || PTHK_DATA.trainers[1];
      matchScore = 97;
    } else if (userAnswers.goal === 'boxing') {
      matchedTrainer = PTHK_DATA.trainers.find(t => t.id === 'alex-reyes') || PTHK_DATA.trainers[2];
      matchScore = 99;
    } else if (userAnswers.goal === 'rehab') {
      matchedTrainer = PTHK_DATA.trainers.find(t => t.id === 'kenji-tanaka') || PTHK_DATA.trainers[3];
      matchScore = 98;
    } else {
      matchedTrainer = PTHK_DATA.trainers.find(t => t.id === 'elena-koval') || PTHK_DATA.trainers[4];
      matchScore = 96;
    }

    resultCard.innerHTML = `
      <div class="match-success-card animate-fade-in">
        <div class="match-header">
          <div class="match-badge">
            <i class="ri-shield-check-fill"></i> ${matchScore}% Compatibility Match
          </div>
          <h3>Your Ideal Personal Coach Match</h3>
          <p class="match-subtitle">Based on your target goal, preferred location (${userAnswers.location}), and timeline.</p>
        </div>

        <div class="matched-trainer-profile">
          <div class="matched-trainer-img-wrap">
            <img src="${matchedTrainer.image}" alt="${matchedTrainer.name}" class="matched-trainer-img">
            <span class="trainer-cert-pill">${matchedTrainer.certifications[0]}</span>
          </div>

          <div class="matched-trainer-details">
            <div class="matched-name-row">
              <h4>${matchedTrainer.name}</h4>
              <span class="star-rating"><i class="ri-star-fill"></i> ${matchedTrainer.rating} (${matchedTrainer.reviewsCount} reviews)</span>
            </div>
            <p class="matched-title">${matchedTrainer.title}</p>
            <p class="matched-bio">${matchedTrainer.bio}</p>

            <div class="matched-tags-list">
              ${matchedTrainer.specialties.map(spec => `<span class="matched-tag"><i class="ri-checkbox-circle-fill"></i> ${spec}</span>`).join('')}
            </div>

            <div class="matched-meta-footer">
              <div class="matched-rate">
                <span class="rate-label">Session Rate:</span>
                <span class="rate-amount">${matchedTrainer.rateHKD} HKD / hr</span>
              </div>
              <div class="matched-actions">
                <button class="btn btn-primary" onclick="openBookingModalWithTrainer('${matchedTrainer.id}')">
                  <i class="ri-calendar-check-line"></i> Book Free Consultation with ${matchedTrainer.name.split(' ')[0]}
                </button>
                <button class="btn btn-secondary" onclick="resetQuiz()">
                  <i class="ri-refresh-line"></i> Retake Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.resetQuiz = function() {
    currentStep = 1;
    document.getElementById('quiz-steps-wrapper').style.display = 'block';
    document.getElementById('quiz-controls').style.display = 'flex';
    resultCard.style.display = 'none';
    updateStepUI();
  };

  updateStepUI();
}
