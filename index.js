
// ================================
// MAIN QUEUE
// ================================
let waiting = JSON.parse(localStorage.getItem('waiting')) || [];
let queue = JSON.parse(localStorage.getItem('queue')) || [];
let audit = JSON.parse(localStorage.getItem('audit')) || 1;
let servedTotal = JSON.parse(localStorage.getItem('servedTotal')) || 0;
let skipTotal = JSON.parse(localStorage.getItem('skipTotal')) || 0;

// ================================
// SAVE TO LOCAL STORAGE
// ================================
function saveData() {
  localStorage.setItem('waiting', JSON.stringify(waiting));
  localStorage.setItem('queue', JSON.stringify(queue));
  localStorage.setItem('audit', JSON.stringify(audit));
  localStorage.setItem('servedTotal', JSON.stringify(servedTotal));
  localStorage.setItem('skipTotal', JSON.stringify(skipTotal));
}

// ================================
// SECTION NAVIGATION
// ================================
function showSection(sectionId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

// ================================
// ADD PATIENT
// ================================
let saveButton = document.getElementById('savePatient');
let clearForm = document.getElementById('reset');
clearForm.addEventListener('click', clearInputs)
saveButton.addEventListener('click', addPatient);

function addPatient() {
  let name = document.querySelector('#patientName').value.trim();
  let id = document.querySelector('#patientId').value.trim();
  if (!validatePatient(name, id)) return;
  let newPatient = createPatient(name, id);
  addToQueue(newPatient);
  waiting.push(newPatient);
  audit++;
  document.getElementById('empty').style.display = 'none';
  document.getElementById('inQueue').style.display = 'none';
  displayPatient();
  clearInputs();
  showSection('queue');
  document.getElementById('waitingCount').textContent = waiting.length;
  saveData();
}

// ================================
// VALIDATION
// ================================
function validatePatient(name, id) {
  if (!name || !id) {
    document.getElementById('empty').style.display = 'block';
    document.getElementById('inQueue').style.display = 'none';
    return false;
  }
  let exists = queue.some(patient => patient.id === id);
  if (exists) {
    document.getElementById('empty').style.display = 'none';
    document.getElementById('inQueue').style.display = 'block';
    return false;
  }
  return true;
}

// ================================
// PATIENT CREATION
// ================================
function createPatient(name, id) {
  return { position: `No ${audit}`, name: name, id: id, status: `waiting` };
}

// ================================
// QUEUE MANAGEMENT
// ================================
function addToQueue(patient) {
  queue.push(patient);
}

// ================================
// REMOVE PATIENT - FOR THE #remove BUTTON IN POPOVER
// ================================
function removePatient(id) {
  queue = queue.filter(patient => patient.id !== id);
  waiting = waiting.filter(patient => patient.id !== id);
  displayPatient();
  document.getElementById('waitingCount').textContent = waiting.length;
  saveData();
}

function remove() {
  let removeBtn = document.getElementById('remove');
  removeBtn.addEventListener('click', () => {
    let currentId = document.getElementById('more').dataset.id;
    if (currentId) {
      removePatient(currentId);
    }
    document.getElementById('more').hidePopover();
    document.getElementById('more').dataset.id = '';
  });
}
remove();

// ================================
// DISPLAY QUEUE
// ================================
function displayPatient() {
  let output = document.getElementById('queueApend');
  output.replaceChildren();
  const more = document.getElementById('more');
  queue.forEach((patient, index) => {
    let divs = document.createElement('div');
    divs.classList.add('patient-card');
    if (patient.status === 'served') {
      divs.style.backgroundColor = 'green';
      divs.style.color = 'white';
    }
    if (patient.status === 'skipped') {
      divs.style.backgroundColor = 'black';
      divs.style.color = 'white';
    }
    let list = document.createElement('ul');
    let position = document.createElement('li');
    position.textContent = `Position: ${patient.position}`;
    let name = document.createElement('li');
    name.textContent = `Name: ${patient.name}`;
    let id = document.createElement('li');
    id.textContent = `ID: ${patient.id}`;
    let stats = document.createElement('li')
    stats.textContent = ` status: ${patient.status}`
    let button = document.createElement('button');
    const anchor = `--btn-${index}`;
    button.style.anchorName = anchor;
    button.setAttribute('popovertarget', 'more');
    button.textContent = '...';
    if (patient.status === 'served' || patient.status === 'skipped') {
      button.disabled = true;
    }
    button.addEventListener('click', () => {
      more.style.positionAnchor = anchor;
      more.dataset.id = patient.id;
    });
    list.append(position, name, id, stats, button);
    divs.appendChild(list);
    output.appendChild(divs);
  });
  increment();
}

// =====================
// popup
// =====================
function popUp (id) {
  document.getElementById(id).style.display = 'block' ;
}
function closePopUp(id) {
  document.getElementById(id).style.display = 'none' ;
}

//=======================
//total patients
//=======================
function increment() {
  document.getElementById('queueTotal').textContent = ` TOTAL: ${queue.length}`
}

// ================================
// CLEAR INPUTS
// ================================
function clearInputs() {
  document.querySelector('#patientName').value = '';
  document.querySelector('#patientId').value = '';
}

// ================================
// BACK NAVIGATION
// ================================
let back = document.getElementById('back');
back.addEventListener('click', () => {
  showSection('create');
});

//========================
// send new patients
//========================
function updateNewPatients (id, variable) {
  document.getElementById(id).textContent = variable
}

// ================================
// status of patient
// =================================
function seen() {
  let startBtn = document.getElementById('start');
  startBtn.addEventListener('click', () => {
    let currentId = document.getElementById('more').dataset.id;
    let exist = queue.find(objects => objects.id === currentId);
    if (exist) {
      switch (exist.status) {
        case 'waiting':
          exist.status = 'served';
          servedTotal = servedTotal + 1;
          let i = waiting.findIndex(objects => objects.id === currentId);
          if (i !== -1) waiting.splice(i, 1);
          break;
        case 'served':
          break;
        default:
          break;
      }
      console.log(exist);
      displayPatient();
    }
    document.getElementById('servedCount').textContent = servedTotal;
    document.getElementById('waitingCount').textContent = waiting.length;
    document.getElementById('more').hidePopover();
    document.getElementById('more').dataset.id = '';
    saveData();
  });
}
seen();

function skip() {
  let skipBtn = document.getElementById('skip');
  skipBtn.addEventListener('click', () => {
    let currentId = document.getElementById('more').dataset.id;
    let exist = queue.find(objects => objects.id === currentId);
    if (exist) {
      switch (exist.status) {
        case 'waiting':
          exist.status = 'skipped';
          skipTotal = skipTotal + 1;
          let i = waiting.findIndex(objects => objects.id === currentId);
          if (i !== -1) waiting.splice(i, 1);
          break;
        case 'served':
          break;
        default:
          break;
      }
      console.log(exist);
      displayPatient();
    }
    document.getElementById('skippedCount').textContent = skipTotal;
    document.getElementById('waitingCount').textContent = waiting.length;
    document.getElementById('more').hidePopover();
    document.getElementById('more').dataset.id = '';
    saveData();
  });
}
skip();

// ================================
// LOAD SAVED DATA ON REFRESH
// ================================
displayPatient();
document.getElementById('waitingCount').textContent = waiting.length;
document.getElementById('servedCount').textContent = servedTotal;
document.getElementById('skippedCount').textContent = skipTotal;
if (queue.length > 0) {
  document.getElementById('empty').style.display = 'none';
}