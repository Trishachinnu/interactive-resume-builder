function addField(sectionId) {
  const container = document.getElementById(sectionId);

  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.gap = '8px';
  wrapper.style.marginBottom = '5px';

  const input = document.createElement('input');
  input.type = "text";
  input.placeholder = `Enter ${sectionId}...`;

  const delBtn = document.createElement('button');
  delBtn.textContent = "Delete";
  delBtn.type = "button";
  delBtn.style.backgroundColor = "#ff4d4d";
  delBtn.style.color = "white";
  delBtn.style.border = "none";
  delBtn.style.padding = "4px 8px";
  delBtn.style.cursor = "pointer";
  delBtn.style.transition = "background-color 0.2s ease";
  delBtn.onmouseenter = () => delBtn.style.backgroundColor = "#cc0000";
  delBtn.onmouseleave = () => delBtn.style.backgroundColor = "#ff4d4d";
  delBtn.onclick = () => container.removeChild(wrapper);

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

  // Personal Info
  const profilePic = document.getElementById('profilePic').files[0];
  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const github = document.getElementById('github').value.trim();
  const linkedin = document.getElementById('linkedin').value.trim();
  const aboutMe = document.getElementById('aboutMe').value.trim();

  const personal = document.createElement('div');
  personal.className = "resume-section";

  // Add profile image first if exists
  if (profilePic) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.width = "120px";
      img.style.height = "160px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "50% / 35%"; // oval shape
      img.style.display = "block";
      img.style.marginBottom = "10px";
      personal.insertBefore(img, personal.firstChild);
    };
    reader.readAsDataURL(profilePic);
  }

  // Add text info
  const heading = document.createElement('h2');
  heading.textContent = name;
  personal.appendChild(heading);

  if (email) personal.appendChild(document.createElement('p')).textContent = email;
  if (phone) personal.appendChild(document.createElement('p')).textContent = phone;

  if (github) {
    const p = document.createElement('p');
    p.innerHTML = `<i class="fab fa-github"></i> <a href="${github}" target="_blank" rel="noopener">${github}</a>`;
    personal.appendChild(p);
  }
  if (linkedin) {
    const p = document.createElement('p');
    p.innerHTML = `<i class="fab fa-linkedin"></i> <a href="${linkedin}" target="_blank" rel="noopener">${linkedin}</a>`;
    personal.appendChild(p);
  }

  if (aboutMe) personal.appendChild(document.createElement('p')).textContent = aboutMe;

  left.appendChild(personal);

  // Left Column Sections
  ["skills", "education", "hobbies", "languages"].forEach(id => {
    const div = document.createElement('div');
    div.className = "resume-section";
    div.innerHTML = `<h3>${id.charAt(0).toUpperCase() + id.slice(1)}</h3>`;
    const ul = document.createElement('ul');
    document.querySelectorAll(`#${id} input`).forEach(input => {
      if (input.value) {
        const li = document.createElement('li');
        li.textContent = input.value;
        ul.appendChild(li);
      }
    });
    div.appendChild(ul);
    left.appendChild(div);
  });

  // Right Column Sections
  ["experience", "achievements", "certificates", "projects"].forEach(id => {
    const div = document.createElement('div');
    div.className = "resume-section";
    div.innerHTML = `<h3>${id.charAt(0).toUpperCase() + id.slice(1)}</h3>`;
    const ul = document.createElement('ul');
    document.querySelectorAll(`#${id} input`).forEach(input => {
      if (input.value) {
        const li = document.createElement('li');
        li.textContent = input.value;
        ul.appendChild(li);
      }
    });
    div.appendChild(ul);
    right.appendChild(div);
  });

  preview.appendChild(left);
  preview.appendChild(right);

  // Apply font customizations
  const fontSize = document.getElementById('fontSize').value;
  const fontFamily = document.getElementById('fontFamily').value;
  const fontColor = document.getElementById('fontColor').value;
  preview.style.fontSize = fontSize;
  preview.style.fontFamily = fontFamily;
  preview.style.color = fontColor;
}

function downloadPDF() {
  const preview = document.getElementById('resumePreview');
  const opt = {
    margin: 0.5,
    filename: document.getElementById('fullName').value || "resume",
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(preview).save();
}
