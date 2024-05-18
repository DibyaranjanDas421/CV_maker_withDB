

document.getElementById('my-button').addEventListener('click', function() {
  document.getElementById('success-alert').style.display = 'block';
});

// Function to add a new input field
function addInputField(sectionId) {
  var section = document.getElementById(sectionId);
  var button = section.querySelector('button'); // Get the first button in the section, which should be the "Add" button
  var newInputGroup = document.createElement('div');
  newInputGroup.className = 'input-group';

  // Define the innerHTML based on the section
  if (sectionId === 'skillsSection') {
    newInputGroup.innerHTML = '<input type="text" name="skills[]" placeholder="Skill" required>';
  } else if (sectionId === 'achievementsSection') {
    newInputGroup.innerHTML = '<input type="text" name="achievements[]" placeholder="Achievement" required>';
  } else if (sectionId === 'projectSection') {
    newInputGroup.innerHTML = `
      <input type="text" name="projectNames[]" placeholder="Project Name" required>
      <input type="text" name="technologyUseds[]" placeholder="Technology Used" required>
      <textarea name="Descriptions[]" placeholder="Project Description" required></textarea>
    `;
  } else if (sectionId === 'experienceSection') {
    newInputGroup.innerHTML = `
      <input type="text" name="companyNames[]" placeholder="Company Name" required>
      <input type="text" name="positions[]" placeholder="Position" required>
      <textarea name="projectDescriptions[]" placeholder="Experience Description" required></textarea>
      <input type="date" name="startDates[]" placeholder="Start Date" required>
      <input type="date" name="endDates[]" placeholder="End Date" required>
    `;
  } else if (sectionId === 'educationSection') {
    newInputGroup.innerHTML = `
      <input type="text" name="colleges[]" placeholder="College/University Name" required>
      <input type="text" name="degrees[]" placeholder="Degree Name" required>
      <input type="text" name="cgpas[]" placeholder="CGPA/Percentage" required>
      <input type="text" name="passoutYears[]" placeholder="Passout Year" required>
    `;
  }
  else if (sectionId === 'honorsSection') { // Corrected section ID
    newInputGroup.innerHTML = '<input type="text" name="honors[]" placeholder="Honor" required>';
  }

  // Insert the new input group before the "Add" button
  section.insertBefore(newInputGroup, button);

  // Find and show the remove button
  var removeButton = section.querySelector('.btn-outline-danger');
  if (removeButton) {
    removeButton.style.display = 'inline-block';
  }
}

// Function to remove the last input field
function removeInputField(sectionId) {
  var section = document.getElementById(sectionId);
  var inputGroups = section.getElementsByClassName('input-group');
  if (inputGroups.length > 1) { // Check if more than one input group exists
    section.removeChild(inputGroups[inputGroups.length - 1]); // Remove the last input group
  }

  // If only the default input group remains, hide the remove button
  if (inputGroups.length <= 1) {
    var removeButton = section.querySelector('.btn-outline-danger');
    if (removeButton) {
      removeButton.style.display = 'none';
    }
  }
}


window.onload = function() {
  var removeButtons = document.querySelectorAll('.btn-outline-danger');
  removeButtons.forEach(function(button) {
    button.style.display = 'none';
  });
};
    

  
function removeInputField(sectionId) {
  const section = document.getElementById(sectionId);
  const inputGroups = section.querySelectorAll('.input-group');
  const lastInputGroup = inputGroups[inputGroups.length - 1];
  const removeButton = section.querySelector('#remove');
  console.log(inputGroups.length);

  if (inputGroups.length > 1) { 
    section.removeChild(lastInputGroup);
    
  } if(inputGroups.length==1){
    removeButton.style.display='none';
  }
  
}

