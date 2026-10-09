const API_BASE = "http://localhost:5000/api";

// Fetch and render data from MongoDB
async function loadProfile() {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    const data = await res.json();

    // Populate Hero Details
    document.getElementById("profile-name").textContent = data.name;
    document.getElementById("profile-title").textContent = data.title;
    document.getElementById("profile-github").href = data.github;
    document.getElementById("download-resume-btn").href = data.github;

    // Render Skills as colorful slate tiles
    const skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = data.skills
      .map(skill => `
        <div class="skill-tile">
          <i class="fa-solid fa-layer-group"></i>
          <span>${skill}</span>
        </div>
      `)
      .join("");

    // Render Featured Projects linked straight to your forked repository
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = data.projects
      .map(p => {
        const isCompleted = p.status.toLowerCase().includes("completed");
        const chipClass = isCompleted ? "chip-done" : "chip-active";
        
        // Exact personal repository link with full frontend & backend files
        const repoLink = "https://github.com/pavansai-01/centralized-campus-portal";

        return `
          <a href="${repoLink}" target="_blank" class="project-card-real">
            <div>
              <div class="project-top-row">
                <h3>${p.title}</h3>
                <span class="project-status-chip ${chipClass}">${p.status}</span>
              </div>
              <p class="project-summary">${p.description}</p>
            </div>
            <div class="project-cta-link">
              <span>Inspect Source Files</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>
        `;
      })
      .join("");

    // Render Coding Profiles
    const codingList = document.getElementById("coding-profiles");
    codingList.innerHTML = `
      <a href="${data.codingProfiles.leetcode}" target="_blank" class="profile-brick">
        <div class="profile-brick-left">
          <i class="fa-solid fa-laptop-code"></i>
          <span class="profile-brick-title">LeetCode</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square profile-brick-arrow"></i>
      </a>
      <a href="${data.codingProfiles.hackerrank}" target="_blank" class="profile-brick">
        <div class="profile-brick-left">
          <i class="fa-brands fa-hackerrank"></i>
          <span class="profile-brick-title">HackerRank</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square profile-brick-arrow"></i>
      </a>
      <a href="${data.codingProfiles.codechef}" target="_blank" class="profile-brick">
        <div class="profile-brick-left">
          <i class="fa-solid fa-terminal"></i>
          <span class="profile-brick-title">CodeChef</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square profile-brick-arrow"></i>
      </a>
      <a href="${data.github}" target="_blank" class="profile-brick">
        <div class="profile-brick-left">
          <i class="fa-brands fa-github"></i>
          <span class="profile-brick-title">GitHub Profile</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square profile-brick-arrow"></i>
      </a>
    `;
  } catch (err) {
    console.error("Error loading profile from MongoDB:", err);
  }
}

// Modal handling
const resumeModal = document.getElementById("resume-modal");
const viewResumeNav = document.getElementById("view-resume-nav");
const viewResumeHero = document.getElementById("view-resume-hero");
const openResumeModalBtn = document.getElementById("open-resume-modal-btn");
const closeResumeModalBtn = document.getElementById("close-resume-modal-btn");
const resumeModalOverlay = document.getElementById("resume-modal-overlay");

function openModal() {
  resumeModal.classList.remove("hidden");
}

function closeModal() {
  resumeModal.classList.add("hidden");
}

viewResumeNav.addEventListener("click", openModal);
viewResumeHero.addEventListener("click", openModal);
openResumeModalBtn.addEventListener("click", openModal);
closeResumeModalBtn.addEventListener("click", closeModal);
resumeModalOverlay.addEventListener("click", closeModal);

// Shadow Monarch Assistant Chat
const chatToggleBtn = document.getElementById("chat-toggle-btn");
const chatWindow = document.getElementById("chat-window");
const closeChatBtn = document.getElementById("close-chat-btn");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatToggleBtn.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
  if (!chatWindow.classList.contains("hidden")) {
    chatInput.focus();
  }
});

closeChatBtn.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage(text, "user-msg");
  chatInput.value = "";

  const placeholder = appendMessage("Thinking...", "bot-msg");

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    placeholder.textContent = data.reply || "No response received.";
  } catch (err) {
    placeholder.textContent = "Error: Could not reach the assistant service.";
  }
});

function appendMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-msg ${className}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msgDiv;
}

loadProfile();