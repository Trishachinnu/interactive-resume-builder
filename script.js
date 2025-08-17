function generateResume() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const skills = document.getElementById('skills').value;

  document.getElementById('r-name').innerText = name;
  document.getElementById('r-email').innerText = `Email: ${email}`;
  document.getElementById('r-phone').innerText = `Phone: ${phone}`;
  document.getElementById('r-skills').innerText = `Skills: ${skills}`;

  const img = document.getElementById('preview-img');
  const rImg = document.getElementById('r-img');
  if (img && img.src) {
    rImg.src = img.src;
    rImg.style.display = 'block';
  }

  const eduList = document.querySelectorAll('.education-item');
  const rEdu = document.getElementById('r-education');
  rEdu.innerHTML = '';
  eduList.forEach(item => {
    const inst = item.querySelector('.edu-institution')?.value || '';
    const deg = item.querySelector('.edu-degree')?.value || '';
    const years = item.querySelector('.edu-years')?.value || '';
    if (inst || deg || years) {
      const li = document.createElement('li');
      li.textContent = `${inst} - ${deg} (${years})`;
      rEdu.appendChild(li);
    }
  });

  const expList = document.querySelectorAll('.experience-item');
  const rExp = document.getElementById('r-experience');
  rExp.innerHTML = '';
  expList.forEach(item => {
    const comp = item.querySelector('.exp-company')?.value || '';
    const role = item.querySelector('.exp-role')?.value || '';
    const dur = item.querySelector('.exp-duration')?.value || '';
    if (comp || role || dur) {
      const li = document.createElement('li');
      li.textContent = `${role} at ${comp} (${dur})`;
      rExp.appendChild(li);
    }
  });

  const achievementsInput = document.getElementById('achievements').value;
  const rAch = document.getElementById('r-achievements');
  rAch.innerHTML = '';
  if (achievementsInput.trim()) {
    achievementsInput.split(',').forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.trim();
      rAch.appendChild(li);
    });
  }

  const certificatesInput = document.getElementById('certificates').value;
  const rCert = document.getElementById('r-certificates');
  rCert.innerHTML = '';
  if (certificatesInput.trim()) {
    certificatesInput.split(',').forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.trim();
      rCert.appendChild(li);
    });
  }
}

function addEducation() {
  const section = document.getElementById('education-section');
  const div = document.createElement('div');
  div.className = 'education-item';
  div.innerHTML = `
    <input type="text" placeholder="Institution" class="edu-institution" />
    <input type="text" placeholder="Degree" class="edu-degree" />
    <input type="text" placeholder="Years" class="edu-years" />
  `;
  section.appendChild(div);
}

function addExperience() {
  const section = document.getElementById('experience-section');
  const div = document.createElement('div');
  div.className = 'experience-item';
  div.innerHTML = `
    <input type="text" placeholder="Company" class="exp-company" />
    <input type="text" placeholder="Role" class="exp-role" />
    <input type="text" placeholder="Duration" class="exp-duration" />
  `;
  section.appendChild(div);
}

// Profile image upload and sync with resume preview
document.getElementById('profile-pic').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const previewImg = document.getElementById('preview-img');
    const resumeImg = document.getElementById('r-img');
    previewImg.src = e.target.result;
    resumeImg.src = e.target.result;
    previewImg.style.display = 'block';
    resumeImg.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// Template switching logic
document.querySelectorAll('.template-card').forEach(card => {
  card.addEventListener('click', () => {
    const preview = document.getElementById('resume-preview');
    preview.className = ''; // Remove previous classes
    preview.classList.add(card.dataset.template);
  });
});

// Color picker logic
document.querySelectorAll('.color-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.color;
    const preview = document.getElementById('resume-preview');
    preview.style.color = color;
    preview.querySelectorAll('h2, h3').forEach(el => {
      el.style.color = color;
    });
  });
});

// Export to PDF using jsPDF
function exportPDF() {
  const doc = new jsPDF();
  let y = 10;

  function writeLine(text, size = 12) {
    doc.setFontSize(size);
    doc.text(text, 10, y);
    y += 10;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const skills = document.getElementById('skills').value;

  writeLine(name, 16);
  writeLine(`Email: ${email}`);
  writeLine(`Phone: ${phone}`);
  writeLine(`Skills: ${skills}`);

  writeLine("Education:", 14);
  document.querySelectorAll('.education-item').forEach(item => {
    const inst = item.querySelector('.edu-institution').value;
    const deg = item.querySelector('.edu-degree').value;
    const years = item.querySelector('.edu-years').value;
    if (inst || deg || years) {
      writeLine(`- ${inst} - ${deg} (${years})`);
    }
  });

  writeLine("Experience:", 14);
  document.querySelectorAll('.experience-item').forEach(item => {
    const comp = item.querySelector('.exp-company').value;
    const role = item.querySelector('.exp-role').value;
    const dur = item.querySelector('.exp-duration').value;
    if (comp || role || dur) {
      writeLine(`- ${role} at ${comp} (${dur})`);
    }
  });

  const achievements = document.getElementById('achievements').value;
  if (achievements.trim() !== "") {
    writeLine("Achievements:", 14);
    achievements.split(',').forEach(ach => {
      writeLine(`- ${ach.trim()}`);
    });
  }

  const certificates = document.getElementById('certificates').value;
  if (certificates.trim() !== "") {
    writeLine("Certificates:", 14);
    certificates.split(',').forEach(cert => {
      writeLine(`- ${cert.trim()}`);
    });
  }

  doc.save('resume.pdf');
}
