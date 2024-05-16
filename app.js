document.getElementById('my-button').addEventListener('click', function() {
  document.getElementById('success-alert').style.display = 'block';
});




function addInputField(sectionId) {
    var section = document.getElementById(sectionId);
    var button = section.querySelector('button'); 
  
    
    var newInputGroup = document.createElement('div');
    newInputGroup.className = 'input-group';
  
    
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
        <textarea name="projectDescriptions[]" placeholder="experience Description" required></textarea>
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
    } else if (sectionId === 'honorsSection') {
      newInputGroup.innerHTML = '<input type="text" name="honors[]" placeholder="Honor" required>';
    }
  
    // Insert the new set of input fields before the "Add" button
    section.insertBefore(newInputGroup, button);
  }
    

  
function removeInputField(sectionId) {
  const section = document.getElementById(sectionId);
  const inputGroups = section.querySelectorAll('.input-group');
  const lastInputGroup = inputGroups[inputGroups.length - 1];
  if (inputGroups.length > 1) { 
    section.removeChild(lastInputGroup);
  }
}