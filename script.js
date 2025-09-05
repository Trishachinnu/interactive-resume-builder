function addField(sectionId) {
  const container = document.getElementById(sectionId);
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.gap = '8px';
  wrapper.style.marginBottom = '6px';

  const input = document.createElement('input');
  input.type = "text";
  input.placeholder = `Enter ${sectionId}...`;

  const delBtn = document.createElement('button');
  delBtn.textContent = "❌";
  delBtn.onclick = () => wrapper.remove();

  wrapper.appendChild(input);
  wrapper.appendChild(delBtn);
  container.appendChild(wrapper);
}

function previewResume() {
  const preview = document.getElementById('resumePreview');
  preview.innerHTML = "";

  const left = document.createElement('div');
  left.className = "left-column";
  const right = document.createElement('div');
  right.className = "right-column";

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const github = document.getElementById('github').value.trim();
  const linkedin = document.getElementById('linkedin').value.trim();
  const aboutMe = document.getElementById('aboutMe').value.trim();
  const profilePic = document.getElementById('profilePic').files[0];

  const personal = document.createElement('div');
  personal.className = "resume-section";

  if (profilePic) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      personal.prepend(img);
    };
    reader.readAsDataURL(profilePic);
  }

  const nameEl = document.createElement('h2');
  nameEl.textContent = fullName;
  personal.appendChild(nameEl);
  if (email) personal.appendChild(document.createElement('p')).textContent = email;
  if (phone) personal.appendChild(document.createElement('p')).textContent = phone;

  if (github) {
    const p = document.createElement('p');
    p.innerHTML = `<i class="fab fa-github"></i> <a href="${github}" target="_blank">${github}</a>`;
    personal.appendChild(p);
  }

  if (linkedin) {
    const p = document.createElement('p');
    p.innerHTML = `<i class="fab fa-linkedin"></i> <a href="${linkedin}" target="_blank">${linkedin}</a>`;
    personal.appendChild(p);
  }

  if (aboutMe) personal.appendChild(document.createElement('p')).textContent = aboutMe;
  left.appendChild(personal);

  const leftSections = ["skills", "education", "hobbies", "languages"];
  const rightSections = ["experience", "projects", "achievements", "certificates"];

  leftSections.forEach(id => buildSection(id, left));
  rightSections.forEach(id => buildSection(id, right));

  preview.appendChild(left);
  preview.appendChild(right);

  const fontSize = document.getElementById('fontSize').value;
  const fontFamily = document.getElementById('fontFamily').value;
  const fontColor = document.getElementById('fontColor').value;

  preview.style.fontSize = fontSize;
  preview.style.fontFamily = fontFamily;
  preview.style.color = fontColor;
}

function buildSection(id, parent) {
  const inputs = document.querySelectorAll(`#${id} input`);
  if (!inputs.length) return;

  const section = document.createElement('div');
  section.className = "resume-section";
  section.innerHTML = `<h3>${capitalize(id)}</h3>`;

  const ul = document.createElement('ul');
  inputs.forEach(input => {
    if (input.value.trim()) {
      const li = document.createElement('li');
      li.textContent = input.value.trim();
      ul.appendChild(li);
    }
  });
  section.appendChild(ul);
  parent.appendChild(section);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function downloadPDF() {
  const resume = document.getElementById("resumePreview");
  html2pdf().from(resume).save(`${document.getElementById("fullName").value || "resume"}.pdf`);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
