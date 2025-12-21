export const ChatTemplates = {
  welcome: () =>
    `<div class="welcome-section" id="welcomeSection">
      <div class="welcome-message">
        <div class="welcome-text">
          <strong>Greetings! I'm Sewak</strong>
          <br />
          I'm here to answer any questions you may have about iHRMS services.
          Talk to me in English.
        </div>
        <div class="welcome-text">
          Choose one of these popular topics or type your question below..
        </div>
      </div>

      ${ChatTemplates.serviceShortcuts()}

      <div class="final-prompt">
        <i class="fa-solid fa-lightbulb"></i> You can always click the menu icon
        (☰) to see all services.
      </div>
    </div>`,
  chatIndicator: () => `
      <div class="message bot typing-indicator" id="typingIndicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      </div>
      `,
  serviceShortcuts: () => `
  <div class="chips-container" id="welcomeChips">
        <div class="chip" data-action="i want to download Pay Slip">
          <i class="fa-solid fa-receipt chip-icon"></i>
          <span>Pay Slip</span>
        </div>
        <div class="chip" data-action="Apply Leave">
          <i class="fa-solid fa-calendar-plus chip-icon"></i>
          <span>Apply Leave</span>
        </div>
        <div class="chip featured" data-action="Check In">
          <i class="fa-solid fa-right-to-bracket chip-icon"></i>
          <span>Check In</span>
          <span class="chip-new-badge">NEW</span>
        </div>
        <div class="chip" data-action="Leave Application Status">
          <i class="fa-solid fa-clock chip-icon"></i>
          <span>Leave Status</span>
        </div>
        <div class="chip" data-action="Tax Subscription">
          <i class="fa-solid fa-money-bill-wave chip-icon"></i>
          <span>Tax Subscription</span>
        </div>
        <div class="chip" data-action="ACR Status">
          <i class="fa-solid fa-tasks chip-icon"></i>
          <span>ACR Status</span>
        </div>
      </div>
   `,
};
