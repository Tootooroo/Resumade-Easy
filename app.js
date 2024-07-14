const { jsPDF } = window.jspdf;

function validateEmail(email) {
    const allowedTLDs = [
        'gmail.com', 'outlook.com', 'yahoo.com', 
        '.com', '.net', '.org', '.info', '.biz', '.name', '.xyz', '.online', 
        '.site', '.tech', '.store', '.uk', '.ca', '.au', '.de', '.fr', '.jp', 
        '.in', '.cn', '.ru', '.br', '.mil', '.int', '.aero', '.museum', 
        '.coop', '.jobs', '.mobi', '.app', '.blog', '.guru', '.design', 
        '.photography', '.travel', '.health', '.education', '.news', '.lawyer', 
        '.bank', '.insurance', '.doctor', '.realestate', '.media', 
        '.marketing', '.engineering', '.construction', '.fashion', '.food', 
        '.edu', '.gov'
    ];

    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
        alert('Incorrect format for Email');
        return false;
    }

    const TLD = emailParts[1];
    for (let i = 0; i < allowedTLDs.length; i++) {
        if (TLD == allowedTLDs[i] || TLD.endsWith(allowedTLDs[i])) {
            return true;
        }
    }

    alert('Incorrect format for Email');
    return false;
}

function validateStep(step) {
    const stepElement = document.getElementById(`step${step}`);
    const requiredFields = stepElement.querySelectorAll('[required]');
    for (let field of requiredFields) {
        if (!field.value) {
            alert(`${field.previousElementSibling.innerText} is required`);
            field.focus();
            return false;
        }
    }

    if (step === 1) {
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            return false;
        }
    }

    return true;
}

function nextStep(step) {
    if (step > 1 && !validateStep(step - 1)) {
        return;
    }
    
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.add('hidden'));
    document.getElementById(`step${step}`).classList.remove('hidden');
}

function populateDates(section) {
    const monthSelects = section.querySelectorAll('select[name$="Month"]');
    const yearSelects = section.querySelectorAll('select[name$="Year"]');
    const currentYear = new Date().getFullYear();
    const selectYear = currentYear + 6;

    monthSelects.forEach(select => {
        select.innerHTML = '<option value="">Month</option>';
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            select.appendChild(option);
        }
    });

    yearSelects.forEach(select => {
        select.innerHTML = '<option value="">Year</option>';
        for (let i = 0; i <= 56; i++) {
            const year = selectYear - i;
            const option = document.createElement('option');
            option.value = year;
            option.text = year;
            select.appendChild(option);
        }
    });
}

function addEducation() {
    const educationContainer = document.getElementById('educationContainer');
    const newEducationSection = document.createElement('div');
    newEducationSection.classList.add('education-section');
    newEducationSection.innerHTML = `
        <h2>Education</h2>
        
        <label for="school">School:</label>
        <input type="school" id="school" name="school">
        
        <label for="degree">Degree:</label>
        <select name="degree">
            <option value="">Select your degree</option>
            <option value="Associate of Arts (A.A.)">Associate of Arts (A.A.)</option>
            <option value="Associate of Science (A.S.)">Associate of Science (A.S.)</option>
            <option value="Associate of Applied Science (A.A.S.)">Associate of Applied Science (A.A.S.)</option>
            <option value="Bachelor of Arts (B.A.)">Bachelor of Arts (B.A.)</option>
            <option value="Bachelor of Science (B.Sc. or B.S.)">Bachelor of Science (B.Sc. or B.S.)</option>
            <option value="Bachelor of Fine Arts (B.F.A.)">Bachelor of Fine Arts (B.F.A.)</option>
            <option value="Bachelor of Business Administration (B.B.A.)">Bachelor of Business Administration (B.B.A.)</option>
            <option value="Bachelor of Engineering (B.Eng.)">Bachelor of Engineering (B.Eng.)</option>
            <option value="Bachelor of Technology (B.Tech.)">Bachelor of Technology (B.Tech.)</option>
            <option value="Master of Arts (M.A.)">Master of Arts (M.A.)</option>
            <option value="Master of Science (M.Sc. or M.S.)">Master of Science (M.Sc. or M.S.)</option>
            <option value="Master of Business Administration (M.B.A.)">Master of Business Administration (M.B.A.)</option>
            <option value="Master of Fine Arts (M.F.A.)">Master of Fine Arts (M.F.A.)</option>
            <option value="Master of Engineering (M.Eng.)">Master of Engineering (M.Eng.)</option>
            <option value="Master of Technology (M.Tech.)">Master of Technology (M.Tech.)</option>
            <option value="Doctor of Philosophy (Ph.D.)">Doctor of Philosophy (Ph.D.)</option>
            <option value="Doctor of Education (Ed.D.)">Doctor of Education (Ed.D.)</option>
            <option value="Doctor of Medicine (M.D.)">Doctor of Medicine (M.D.)</option>
            <option value="Juris Doctor (J.D.)">Juris Doctor (J.D.)</option>
            <option value="High School Diploma">Certificate</option>
        </select>
        
        <label for="major">Major:</label>
        <input type="text" name="major">
        
        <label for="selectMonth">Graduation Date:</label>
        <div class="inline-group">
            <select name="graduationMonth">
                <option value="">Month</option>
            </select>
            <select name="graduationYear">
                <option value="">Year</option>
            </select>
        </div>

        <label for="courses">Relevant Courses(comma-separated):</label>
        <textarea id="courses" name="courses" rows="5"></textarea>

        <button type="button" class="delete-button" onclick="deleteEducation(this)">Delete Education</button>
    `;
    educationContainer.appendChild(newEducationSection);
    populateDates(newEducationSection);
}

function addExperience() {
    const experienceContainer = document.getElementById('experienceContainer');
    const newExperienceSection = document.createElement('div');
    newExperienceSection.classList.add('experience-section');
    newExperienceSection.innerHTML = `
        <h2>Experience</h2>
        <label for="company">Company:</label>
        <input type="text" id="company" name="company">
        
        <label for="position">Position:</label>
        <input type="text" id="position" name="position">

        <label for="sc">State/Country:</label>
        <input type="text" id="sc" name="sc">

        <label for="selectMonth">Start Date:</label>
        <div class="inline-group">
            <select name="startMonth">
                <option value="">Month</option>
            </select>
            <select name="startYear">
                <option value="">Year</option>
            </select>
        </div>

        <label for="selectMonth">End Date:</label>
        <div class="inline-group">
            <select name="endMonth">
                <option value="">Month</option>
            </select>
            <select name="endYear">
                <option value="">Year</option>
            </select>
        </div>

        <label for="description1">Bullet 1:</label>
        <textarea id="description1" name="description1" rows="2"></textarea>

        <label for="description2">Bullet 2:</label>
        <textarea id="description2" name="description2" rows="2"></textarea>

        <label for="description2">Bullet 3:</label>
        <textarea id="description2" name="description2" rows="2"></textarea>
        
        <button type="button" class="delete-button" onclick="deleteExperience(this)">Delete Experience</button>    
    `;
    experienceContainer.appendChild(newExperienceSection);
    populateDates(newExperienceSection);
}

function addExtra() {
    const extraContainer = document.getElementById('extraContainer');
    const newExtraSection = document.createElement('div');
    newExtraSection.classList.add('extra-section');
    newExtraSection.innerHTML = `
        <h2>Projects/Extracurriculars</h2>
        <label for="extra">Type:</label>
        <select name="extra">
            <option value="Projects">Projects</option>
            <option value="Extracurriculars">Extracurriculars</option>
        </select>
        
        <label for="activity">Activity:</label>
        <input type="text" id="activity" name="activity">
        
        <label for="position">Position:</label>
        <input type="text" id="position" name="position">

        <label for="sc">State/Country:</label>
        <input type="text" id="sc" name="sc">
        
        <label for="city">City:</label>
        <input type="text" id="city" name="city">

        <label for="startDate">Start Date:</label>
        <div class="inline-group">
            <select name="startMonth">
                <option value="">Month</option>
            </select>
            <select name="startYear">
                <option value="">Year</option>
            </select>
        </div>

        <label for="endDate">End Date:</label>
        <div class="inline-group">
            <select name="endMonth">
                <option value="">Month</option>
            </select>
            <select name="endYear">
                <option value="">Year</option>
            </select>
        </div>

        <label for="description1">Bullet 1:</label>
        <textarea id="description1" name="description1" rows="2"></textarea>

        <label for="description2">Bullet 2:</label>
        <textarea id="description2" name="description2" rows="2"></textarea>
        
        <button type="button" class="delete-button" onclick="deleteExtra(this)">Delete Project/Extracurricular</button>
    `;
    extraContainer.appendChild(newExtraSection);
    populateDates(newExtraSection);
}

function deleteExperience(button) {
    const experienceSection = button.parentElement;
    experienceSection.remove();
}

function deleteEducation(button) {
    const educationSection = button.parentElement;
    educationSection.remove();
}

function deleteExtra(button) {
    const extraSection = button.parentElement;
    extraSection.remove();
}

function generatePDF() {
    if (!validateStep(5)) return;

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const doc = new jsPDF();

    // Personal Information
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;
    const street = document.getElementById('street').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value.replace(/-/g, '');
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;

    doc.setFontSize(18);
    doc.text(`${firstName} ${middleName} ${lastName}`, 105, 10, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`${street ? street + ', ' : ''}${city ? city + ', ' : ''}${state ? state + ', ' : ''}${country ? country + ', ' : ''}${zipcode}`, 105, 20, null, null, 'center');
    doc.text(`Phone: ${phone} | Email: ${email} | LinkedIn: ${linkedin}`, 105, 30, null, null, 'center');

    let yOffset = 40;

    // Education
    const educations = document.querySelectorAll('.education-section');
    if (educations.length > 0) {
        doc.setFontSize(14);
        doc.text('EDUCATION', 10, yOffset);
        yOffset += 10;
        doc.setFontSize(12);
        educations.forEach(section => {
            const school = section.querySelector('[name="school"]').value;
            const degree = section.querySelector('[name="degree"]').value;
            const graduationMonth = section.querySelector('[name="graduationMonth"]').value;
            const graduationYear = section.querySelector('[name="graduationYear"]').value;
            const major = section.querySelector('[name="major"]').value;
            const courses = section.querySelector('[name="courses"]').value;

            if (school) {
                doc.text(school, 10, yOffset);
                yOffset += 10;
            }
            if (degree) {
                doc.text(degree, 10, yOffset);
                yOffset += 10;
            }
            if (major) {
                doc.text(`Major: ${major}`, 10, yOffset);
                yOffset += 10;
            }
            if (graduationMonth && graduationYear) {
                doc.text(`Expected Graduation: ${monthNames[graduationMonth - 1]} ${graduationYear}`, 10, yOffset);
                yOffset += 10;
            }
            if (courses) {
                doc.text(`Relevant Courses: ${courses}`, 10, yOffset);
                yOffset += 10;
            }
            yOffset += 10;
        });
    }

    // Experience
    const experiences = document.querySelectorAll('.experience-section');
    if (experiences.length > 0) {
        doc.setFontSize(14);
        doc.text('EXPERIENCE', 10, yOffset);
        yOffset += 10;
        doc.setFontSize(12);
        experiences.forEach(section => {
            const company = section.querySelector('[name="company"]').value;
            const position = section.querySelector('[name="position"]').value;
            const startMonth = section.querySelector('[name="startMonth"]').value;
            const startYear = section.querySelector('[name="startYear"]').value;
            const endMonth = section.querySelector('[name="endMonth"]').value;
            const endYear = section.querySelector('[name="endYear"]').value;
            const description1 = section.querySelector('[name="description1"]').value;
            const description2 = section.querySelector('[name="description2"]').value;
            const description3 = section.querySelector('[name="description3"]').value;

            if (company && position) {
                doc.text(company, 10, yOffset);
                doc.text(`${position}`, 105, yOffset, null, null, 'right');
                yOffset += 10;
            }
            if (startMonth && startYear && endMonth && endYear) {
                doc.text(`${monthNames[startMonth - 1]} ${startYear} - ${monthNames[endMonth - 1]} ${endYear}`, 10, yOffset);
                yOffset += 10;
            } else if (startMonth && startYear && !endMonth && !endYear) {
                doc.text(`${monthNames[startMonth - 1]} ${startYear} - Present`, 10, yOffset);
                yOffset += 10;
            }
            if (description1) {
                doc.text(`• ${description1}`, 10, yOffset);
                yOffset += 10;
            }
            if (description2) {
                doc.text(`• ${description2}`, 10, yOffset);
                yOffset += 10;
            }
            if (description3) {
                doc.text(`• ${description3}`, 10, yOffset);
                yOffset += 10;
            }
            yOffset += 10;
        });
    }

    // Projects/Extracurriculars
    const extras = document.querySelectorAll('.extra-section');
    if (extras.length > 0) {
        doc.setFontSize(14);
        doc.text('PROJECTS/EXTRACURRICULARS', 10, yOffset);
        yOffset += 10;
        doc.setFontSize(12);
        extras.forEach(section => {
            const type = section.querySelector('[name="extra"]').value;
            const activity = section.querySelector('[name="activity"]').value;
            const position = section.querySelector('[name="position"]').value;
            const startMonth = section.querySelector('[name="startMonth"]').value;
            const startYear = section.querySelector('[name="startYear"]').value;
            const endMonth = section.querySelector('[name="endMonth"]').value;
            const endYear = section.querySelector('[name="endYear"]').value;
            const description1 = section.querySelector('[name="description1"]').value;
            const description2 = section.querySelector('[name="description2"]').value;

            if (activity) {
                doc.text(activity, 10, yOffset);
                if (position) {
                    doc.text(`${position}`, 105, yOffset, null, null, 'right');
                }
                yOffset += 10;
            }
            if (startMonth && startYear && endMonth && endYear) {
                doc.text(`${monthNames[startMonth - 1]} ${startYear} - ${monthNames[endMonth - 1]} ${endYear}`, 10, yOffset);
                yOffset += 10;
            } else if (startMonth && startYear && !endMonth && !endYear) {
                doc.text(`${monthNames[startMonth - 1]} ${startYear} - Present`, 10, yOffset);
                yOffset += 10;
            }
            if (description1) {
                doc.text(`• ${description1}`, 10, yOffset);
                yOffset += 10;
            }
            if (description2) {
                doc.text(`• ${description2}`, 10, yOffset);
                yOffset += 10;
            }
            yOffset += 10;
        });
    }

    // Skills
    const skills = document.getElementById('skill').value;
    if (skills) {
        doc.setFontSize(14);
        doc.text('SKILLS', 10, yOffset);
        yOffset += 10;
        doc.setFontSize(12);
        doc.text(skills, 10, yOffset);
        yOffset += 10;
    }

    // Interests
    const interests = document.getElementById('interest').value;
    if (interests) {
        doc.setFontSize(14);
        doc.text('INTERESTS', 10, yOffset);
        yOffset += 10;
        doc.setFontSize(12);
        doc.text(interests, 10, yOffset);
    }

    doc.save('Resume.pdf');
}

// Load LinkedIn SDK
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", onLinkedInAuth);
}

// LinkedIn authentication
function importLinkedIn() {
    IN.User.authorize();
}

// Fetch LinkedIn data after authentication
function onLinkedInAuth() {
    IN.API.Profile("me").fields([
        "firstName",
        "lastName",
        "headline",
        "location",
        "industry",
        "positions:(company,title,summary,startDate,endDate,isCurrent)",
        "educations:(schoolName,fieldOfStudy,startDate,endDate,degree,activities,notes)",
        "skills:(skill:(name))",
        "publicProfileUrl"
    ]).result(populateForm).error(onError);
}

// Populate the form with fetched LinkedIn data
function populateForm(data) {
    const profile = data.values[0];
    document.getElementById('firstName').value = profile.firstName;
    document.getElementById('lastName').value = profile.lastName;
    document.getElementById('linkedin').value = profile.publicProfileUrl;

    if (profile.location) {
        document.getElementById('city').value = profile.location.name;
    }
    if (profile.positions && profile.positions.values && profile.positions.values.length > 0) {
        const currentPosition = profile.positions.values[0];
        if (currentPosition.company) {
            document.getElementById('company').value = currentPosition.company.name;
        }
        if (currentPosition.title) {
            document.getElementById('position').value = currentPosition.title;
        }
        if (currentPosition.startDate) {
            document.querySelector('[name="startMonth"]').value = currentPosition.startDate.month;
            document.querySelector('[name="startYear"]').value = currentPosition.startDate.year;
        }
        if (currentPosition.endDate) {
            document.querySelector('[name="endMonth"]').value = currentPosition.endDate.month;
            document.querySelector('[name="endYear"]').value = currentPosition.endDate.year;
        }
    }
    
// Populate Education
if (profile.educations && profile.educations.values && profile.educations.values.length > 0) {
    profile.educations.values.forEach(education => {
        addEducation(); // Add new education section
        const educationSections = document.querySelectorAll('.education-section');
        const lastEducationSection = educationSections[educationSections.length - 1];

        if (education.schoolName) {
            lastEducationSection.querySelector('[name="school"]').value = education.schoolName;
        }
        if (education.degree) {
            lastEducationSection.querySelector('[name="degree"]').value = education.degree;
        }
        if (education.startDate) {
            lastEducationSection.querySelector('[name="graduationMonth"]').value = education.startDate.month;
            lastEducationSection.querySelector('[name="graduationYear"]').value = education.startDate.year;
        }
        if (education.endDate) {
            lastEducationSection.querySelector('[name="graduationMonth"]').value = education.endDate.month;
            lastEducationSection.querySelector('[name="graduationYear"]').value = education.endDate.year;
        }
        if (education.fieldOfStudy) {
            lastEducationSection.querySelector('[name="major"]').value = education.fieldOfStudy;
        }
    });
}
}

// Handle errors
function onError(error) {
console.log(error);
}

// Populate dates when the page loads
window.onload = () => {
    const initialEducationSection = document.querySelector('.education-section');
    const initialExperienceSection = document.querySelector('.experience-section');
    const initialExtraSection = document.querySelector('.extra-section');
    populateDates(initialEducationSection);
    populateDates(initialExperienceSection);
    populateDates(initialExtraSection);
};
