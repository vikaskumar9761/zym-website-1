/**
 * Personal Trainers HK (PTHK) - Interactive Fitness Calculators
 * Features:
 * 1. BMI & Target Body Composition Analyzer
 * 2. TDEE & Macronutrient Calculator (Protein, Carbs, Fats)
 * 3. 1-Rep Max (1RM) Strength Estimator
 */

document.addEventListener('DOMContentLoaded', () => {
  initBmiCalculator();
  initMacroCalculator();
  initOneRepMaxCalculator();
  initCalculatorTabs();
});

// Calculator tab switching
function initCalculatorTabs() {
  const tabs = document.querySelectorAll('.calc-tab-btn');
  const panels = document.querySelectorAll('.calc-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(target);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// 1. BMI CALCULATOR
function initBmiCalculator() {
  const form = document.getElementById('bmi-form');
  if (!form) return;

  const heightInput = document.getElementById('bmi-height');
  const weightInput = document.getElementById('bmi-weight');
  const ageInput = document.getElementById('bmi-age');
  const genderInput = document.getElementById('bmi-gender');

  function calculateBmi() {
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return;

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const roundedBmi = bmi.toFixed(1);

    // Categories
    let category = '';
    let categoryClass = '';
    let advice = '';
    let targetWeightMin = (18.5 * heightM * heightM).toFixed(1);
    let targetWeightMax = (24.9 * heightM * heightM).toFixed(1);

    if (bmi < 18.5) {
      category = 'Underweight';
      categoryClass = 'status-blue';
      advice = 'Focus on progressive overload hypertrophy and caloric surplus with high-density nutrient nutrition.';
    } else if (bmi < 24.9) {
      category = 'Optimal Athletic Range';
      categoryClass = 'status-green';
      advice = 'Excellent baseline. Focus on body recomposition, increasing lean muscle mass, and athletic functional strength.';
    } else if (bmi < 29.9) {
      category = 'Overweight / Muscular';
      categoryClass = 'status-amber';
      advice = 'Target steady fat loss (0.5-0.8kg/week) through a moderate caloric deficit and structured resistance training.';
    } else {
      category = 'High Risk / Obesity';
      categoryClass = 'status-red';
      advice = 'Prioritize immediate lifestyle intervention, structured metabolic conditioning, and joint-friendly resistance training.';
    }

    // Gauge percentage (min 15, max 40)
    let percent = ((bmi - 15) / (40 - 15)) * 100;
    percent = Math.max(0, Math.min(100, percent));

    // Update UI
    const valueEl = document.getElementById('bmi-value');
    const badgeEl = document.getElementById('bmi-category-badge');
    const adviceEl = document.getElementById('bmi-advice-text');
    const rangeEl = document.getElementById('bmi-healthy-range');
    const pointerEl = document.getElementById('bmi-gauge-pointer');

    if (valueEl) valueEl.textContent = roundedBmi;
    if (badgeEl) {
      badgeEl.textContent = category;
      badgeEl.className = `metric-badge ${categoryClass}`;
    }
    if (adviceEl) adviceEl.textContent = advice;
    if (rangeEl) rangeEl.textContent = `${targetWeightMin} kg - ${targetWeightMax} kg`;
    if (pointerEl) pointerEl.style.left = `${percent}%`;

    // WhatsApp link setup
    const shareBtn = document.getElementById('bmi-whatsapp-share');
    if (shareBtn) {
      const msg = encodeURIComponent(`Hi PTHK Team! I calculated my BMI on your website: ${roundedBmi} (${category}) at ${weightKg}kg & ${heightCm}cm. I'd like a personalized training blueprint.`);
      shareBtn.href = `https://wa.me/85291234567?text=${msg}`;
    }
  }

  [heightInput, weightInput, ageInput, genderInput].forEach(input => {
    if (input) {
      input.addEventListener('input', calculateBmi);
      input.addEventListener('change', calculateBmi);
    }
  });

  calculateBmi();
}

// 2. MACRO & TDEE CALCULATOR
function initMacroCalculator() {
  const form = document.getElementById('macro-form');
  if (!form) return;

  const ageInput = document.getElementById('macro-age');
  const genderInput = document.getElementById('macro-gender');
  const heightInput = document.getElementById('macro-height');
  const weightInput = document.getElementById('macro-weight');
  const activityInput = document.getElementById('macro-activity');
  const goalInput = document.getElementById('macro-goal');

  function calculateMacros() {
    const age = parseFloat(ageInput.value) || 30;
    const gender = genderInput.value;
    const height = parseFloat(heightInput.value) || 175;
    const weight = parseFloat(weightInput.value) || 75;
    const activity = parseFloat(activityInput.value) || 1.4;
    const goal = goalInput.value;

    // Mifflin-St Jeor Equation for BMR
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = Math.round(bmr * activity);
    let targetCalories = tdee;
    let proteinRatio = 2.0; // g per kg
    let fatPercentage = 0.25; // 25% of calories

    if (goal === 'cut') {
      targetCalories = Math.round(tdee * 0.80); // 20% deficit
      proteinRatio = 2.2;
      fatPercentage = 0.25;
    } else if (goal === 'bulk') {
      targetCalories = Math.round(tdee * 1.15); // 15% surplus
      proteinRatio = 2.0;
      fatPercentage = 0.25;
    } else {
      // Recomp / Maintain
      targetCalories = tdee;
      proteinRatio = 2.0;
      fatPercentage = 0.28;
    }

    // Macro Breakdown
    const proteinGrams = Math.round(weight * proteinRatio);
    const proteinCalories = proteinGrams * 4;

    const fatCalories = Math.round(targetCalories * fatPercentage);
    const fatGrams = Math.round(fatCalories / 9);

    const remainingCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
    const carbGrams = Math.round(remainingCalories / 4);

    // Update UI elements
    const caloriesEl = document.getElementById('macro-calories-val');
    const tdeeEl = document.getElementById('macro-tdee-val');
    const proteinEl = document.getElementById('macro-protein-val');
    const carbsEl = document.getElementById('macro-carbs-val');
    const fatsEl = document.getElementById('macro-fats-val');

    if (caloriesEl) caloriesEl.textContent = `${targetCalories.toLocaleString()} kcal`;
    if (tdeeEl) tdeeEl.textContent = `${tdee.toLocaleString()} kcal`;
    if (proteinEl) proteinEl.textContent = `${proteinGrams}g`;
    if (carbsEl) carbsEl.textContent = `${carbGrams}g`;
    if (fatsEl) fatsEl.textContent = `${fatGrams}g`;

    // WhatsApp Export
    const shareBtn = document.getElementById('macro-whatsapp-share');
    if (shareBtn) {
      const msg = encodeURIComponent(`Hi PTHK Coach! My target calories: ${targetCalories} kcal (Protein: ${proteinGrams}g, Carbs: ${carbGrams}g, Fats: ${fatGrams}g). I'd like a custom meal protocol.`);
      shareBtn.href = `https://wa.me/85291234567?text=${msg}`;
    }
  }

  [ageInput, genderInput, heightInput, weightInput, activityInput, goalInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', calculateMacros);
      inp.addEventListener('change', calculateMacros);
    }
  });

  calculateMacros();
}

// 3. 1-REP MAX (1RM) CALCULATOR
function initOneRepMaxCalculator() {
  const weightInput = document.getElementById('onerm-weight');
  const repsInput = document.getElementById('onerm-reps');

  function calculateOneRepMax() {
    const weight = parseFloat(weightInput.value) || 100;
    const reps = parseInt(repsInput.value) || 5;

    if (weight <= 0 || reps <= 0) return;

    // Epley Formula: 1RM = Weight * (1 + 0.0333 * Reps)
    let oneRepMax = 0;
    if (reps === 1) {
      oneRepMax = weight;
    } else {
      oneRepMax = Math.round(weight * (1 + (reps / 30)));
    }

    const valueEl = document.getElementById('onerm-val');
    if (valueEl) valueEl.textContent = `${oneRepMax} kg`;

    // Percentage Breakdown Table
    const percentages = [
      { pct: 95, reps: '2 reps' },
      { pct: 90, reps: '3-4 reps' },
      { pct: 85, reps: '5-6 reps' },
      { pct: 80, reps: '7-8 reps' },
      { pct: 75, reps: '9-10 reps' },
      { pct: 70, reps: '11-12 reps' }
    ];

    const tableBody = document.getElementById('onerm-breakdown-body');
    if (tableBody) {
      tableBody.innerHTML = percentages.map(item => {
        const load = Math.round(oneRepMax * (item.pct / 100));
        return `
          <div class="onerm-row">
            <span class="pct-badge">${item.pct}% (1RM)</span>
            <span class="load-text"><strong>${load} kg</strong></span>
            <span class="reps-text">${item.reps}</span>
          </div>
        `;
      }).join('');
    }
  }

  if (weightInput && repsInput) {
    weightInput.addEventListener('input', calculateOneRepMax);
    repsInput.addEventListener('input', calculateOneRepMax);
    calculateOneRepMax();
  }
}
