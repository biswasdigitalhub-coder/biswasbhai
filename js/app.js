/**
 * Biswas Digital Hub - Interactive Agency-Grade Client Logic
 * Handles: Intro Curtain Reveal, Dual-Mode Hero Desk Tabs,
 * Quick Search, Live Digital Thermal Receipt, Dynamic Checklist, & FAQ.
 */

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Fast Cinematic Intro Curtain Loader
  initIntroCurtain();

  // 3. Update Business Open/Closed Status
  updateBusinessStatus();

  // 4. Initial Render for Checklist & Receipt
  switchChecklist('pan');
  updateReceipt();

  // 5. Update Year
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 6. Advanced Scroll-Driven Motion Animations
  initScrollAnimations();

  // 7. Global Search Shortcut (Cmd+K / Ctrl+K)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      focusSearch();
    }
  });
});

/* ==========================================================================
   1. INTRO CURTAIN LOADER
   ========================================================================== */
function initIntroCurtain() {
  const curtain = document.getElementById("introCurtain");
  if (window.location.search.includes("nocurtain")) {
    if (curtain) curtain.style.display = "none";
    return;
  }
  const bar = document.getElementById('loaderProgress');
  if (!curtain || !bar) return;

  // Rapid smooth progress
  setTimeout(() => {
    bar.style.width = '100%';
  }, 50);

  // Reveal site after 350ms
  setTimeout(() => {
    curtain.classList.add('curtain-up');
  }, 400);
}

/* ==========================================================================
   2. BUSINESS LIVE STATUS CHECKER
   ========================================================================== */
function updateBusinessStatus() {
  const statusEl = document.getElementById('deskLiveStatus');
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay(); // 0 is Sunday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours + minutes / 60;

  let isOpen = false;
  if (day === 0) {
    // Sunday: 9:00 AM - 2:00 PM
    isOpen = time >= 9.0 && time < 14.0;
  } else {
    // Mon-Sat: 8:00 AM - 9:30 PM
    isOpen = time >= 8.0 && time < 21.5;
  }

  if (isOpen) {
    statusEl.textContent = 'Live Desk Online • Open till 9:30 PM';
    statusEl.parentElement.className = 'inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-medium text-[11px]';
  } else {
    statusEl.textContent = 'Closed Now • WhatsApp Open for Documents';
    statusEl.parentElement.className = 'inline-flex items-center gap-1.5 bg-amber-950/80 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-medium text-[11px]';
  }
}

/* ==========================================================================
   3. HERO CYBER DESK DUAL-MODE TAB SWITCHER
   ========================================================================== */
function switchHeroTab(tab) {
  const viewRates = document.getElementById('heroViewRates');
  const viewChat = document.getElementById('heroViewChat');
  const btnRates = document.getElementById('tabHeroRates');
  const btnChat = document.getElementById('tabHeroChat');

  if (tab === 'rates') {
    if (viewRates) viewRates.classList.remove('hidden');
    if (viewChat) viewChat.classList.add('hidden');
    
    if (btnRates) {
      btnRates.classList.add('active', 'bg-white', 'text-slate-900', 'shadow-xs');
      btnRates.classList.remove('text-slate-600');
    }
    if (btnChat) {
      btnChat.classList.remove('active', 'bg-white', 'text-slate-900', 'shadow-xs');
      btnChat.classList.add('text-slate-600');
    }
  } else {
    if (viewRates) viewRates.classList.add('hidden');
    if (viewChat) viewChat.classList.remove('hidden');
    
    if (btnChat) {
      btnChat.classList.add('active', 'bg-white', 'text-slate-900', 'shadow-xs');
      btnChat.classList.remove('text-slate-600');
    }
    if (btnRates) {
      btnRates.classList.remove('active', 'bg-white', 'text-slate-900', 'shadow-xs');
      btnRates.classList.add('text-slate-600');
    }
  }
  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   4. INTERACTIVE SMARTPHONE WHATSAPP SIMULATOR
   ========================================================================== */
const chatScripts = {
  pan: {
    userMsg: 'Partho da, amake ekta notun PAN Card banate hobe. Ki ki lagbe?',
    replyMsg: 'নমস্কার! নতুন প্যান কার্ডের জন্য শুধু আধার কার্ড এবং ২ কপি পাসপোর্ট ফটো লাগবে। আধারে মোবাইল লিংক থাকলে ২ ঘণ্টার মধ্যে e-PAN রেডি হয়ে যাবে! খরচ: ₹107 গভঃ ফি + ₹50 সার্ভিস চার্জ।',
    waText: 'Hello Partho da, I want to apply for a New PAN Card. Aadhaar is ready.'
  },
  job: {
    userMsg: 'WBP Constable / SSC GD Form fill-up korbo. Koto khoroch aar ki lagbe?',
    replyMsg: 'WBP/SSC এর জন্য মাধ্যমিক এডমিট ও মার্কশীট, আধার, কাস্ট সার্টিফিকেট, পাসপোর্ট ফটো ও সিগনেচার লাগবে। আমরা নির্দিষ্ট KB ও DPI মাপে ছবি রিসাইজ করে ড্রাফট চেক করিয়ে সাবমিট করি। চার্জ: ₹50 - ₹100।',
    waText: 'Hello Partho da, I need to fill up a Govt Job Application form.'
  },
  train: {
    userMsg: 'Emergency Tatkal Train Ticket lagbe Howrah theke. Hobe ki?',
    replyMsg: 'হ্যাঁ নিশ্চয়ই! এসি তৎকাল সকাল ১০:০০ টা এবং স্লিপার তৎকাল সকাল ১১:০০ টায় খোলে। ভ্রমণের ১ দিন আগে অন্তত ৩০ মিনিট পূর্বে যাত্রীদের নাম, বয়স ও আধার নম্বর WhatsApp করুন। কনফার্ম টিকিট বুকিং সাপোর্ট দেওয়া হবে।',
    waText: 'Hello Partho da, I need Tatkal Train Ticket Booking emergency.'
  },
  photo: {
    userMsg: '8 copy Passport Photo lagbe, white background. Koto somoy lagbe?',
    replyMsg: 'কাউন্টারে এলে মাত্র ৫ মিনিটে ৮ কপি ল্যাব কোয়ালিটি ফুজি পেপার পাসপোর্ট ফটো প্রিন্ট রেডি হয়ে যাবে। যেকোনো ব্যাকগ্রাউন্ড ডিজিটাল চেঞ্জ করা যাবে। চার্জ মাত্র ₹50 টাকা!',
    waText: 'Hello Partho da, I need 8 copies of Passport Size Photos urgently.'
  }
};

function simulateChat(key) {
  const data = chatScripts[key];
  if (!data) return;

  const msgContainer = document.getElementById('simulatedMessages');
  const typingIndicator = document.getElementById('simTypingIndicator');
  const chatBody = document.getElementById('phoneChatBody');

  // Append User message
  const userBubble = document.createElement('div');
  userBubble.className = 'wa-msg-bubble-user p-2 max-w-[85%] ml-auto text-slate-800 text-left';
  userBubble.innerHTML = `
    <p class="font-medium text-[11px]">${data.userMsg}</p>
    <span class="text-[9px] text-slate-500 block text-right mt-0.5">${getCurrentTime()} ✓✓</span>
  `;
  msgContainer.appendChild(userBubble);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Show Typing Indicator
  if (typingIndicator) {
    typingIndicator.classList.remove('hidden');
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Simulate Desk Reply after 500ms
  setTimeout(() => {
    if (typingIndicator) {
      typingIndicator.classList.add('hidden');
    }

    const deskBubble = document.createElement('div');
    deskBubble.className = 'wa-msg-bubble-desk p-2 max-w-[88%] text-slate-800 text-left';
    deskBubble.innerHTML = `
      <p class="font-bold text-[10px] text-[#075e54] mb-0.5">Partho da (Desk)</p>
      <p class="leading-relaxed text-[11px]">${data.replyMsg}</p>
      <div class="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between">
        <span class="text-[9px] text-slate-400">${getCurrentTime()}</span>
        <a href="https://wa.me/919547632403?text=${encodeURIComponent(data.waText)}" target="_blank" class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100">
          WhatsApp-এ পাঠান →
        </a>
      </div>
    `;
    msgContainer.appendChild(deskBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
    if (window.lucide) lucide.createIcons();
  }, 500);
}

function getCurrentTime() {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

/* ==========================================================================
   5. INTERACTIVE DOCUMENT CHECKLIST
   ========================================================================== */
const checklistData = {
  pan: {
    category: 'GOVERNMENT IDENTITY',
    title: 'New PAN Card Application Checklist',
    time: '2-Hour e-PAN • Same Day',
    tip: 'আধারের সাথে মোবাইল নম্বর লিংক থাকলে ২ ঘণ্টার মধ্যে ডিজিটাল ই-প্যান (e-PAN) রেডি হয়ে যায়!',
    items: [
      { name: 'Original Aadhaar Card (আধার কার্ড)', desc: 'Proof of identity, date of birth & address.' },
      { name: 'Active Mobile Number with Aadhaar (মোবাইল নম্বর)', desc: 'For instant UIDAI OTP verification.' },
      { name: '2 Copies Passport Size Photo (২ কপি ছবি)', desc: 'Recent white/light background photographs.' },
      { name: 'Signature on White Paper (স্বাক্ষর)', desc: 'Clear blue or black ink signature.' }
    ]
  },
  job: {
    category: 'EMPLOYMENT & RECRUITMENT',
    title: 'Govt Job Form Fill-up (WBP / SSC / Railway)',
    time: '15-20 Mins Drafting',
    tip: 'আমরা সরকারি নিয়মানুযায়ী নিখুঁত 20KB-50KB সাইজে ফটো ও সিগনেচার রিসাইজ করে সাবমিট করি।',
    items: [
      { name: 'Madhyamik Admit & Marksheet (মাধ্যমিক এডমিট)', desc: 'For strict Name and DOB verification.' },
      { name: 'Highest Educational Certificate', desc: 'HS, Graduation or Diploma mark-sheet & certificates.' },
      { name: 'Caste Certificate (কাস্ট সার্টিফিকেট)', desc: 'SC / ST / OBC certificate if applicable.' },
      { name: 'Passport Photo & Specimen Signature', desc: 'Strict dimension & size compliant with portal.' },
      { name: 'Active Email ID & Mobile Number', desc: 'To receive Registration ID, OTP & Admit updates.' }
    ]
  },
  scholarship: {
    category: 'EDUCATION & GRANTS',
    title: 'SVMCM / Oasis / Aikyashree Scholarship Checklist',
    time: '30 Mins Processing',
    tip: 'ইনকাম সার্টিফিকেট ও ব্যাঙ্ক পাশবই পরিষ্কারভাবে স্ক্যান করা জরুরি যাতে রিজেকশন না হয়।',
    items: [
      { name: 'Previous Year Marksheet (মার্কশীট)', desc: 'Minimum percentage requirement marksheet.' },
      { name: 'Admission Fee Receipt (ভর্তির রসিদ)', desc: 'Current academic year college/school fee challan.' },
      { name: 'Bank Passbook Front Page (ব্যাঙ্ক পাসবই)', desc: 'Aadhaar linked account with clear IFSC code.' },
      { name: 'Family Income Certificate (ইনকাম সার্টিফিকেট)', desc: 'BDO / SDO / Gazetted Officer signed certificate.' },
      { name: 'Applicant Aadhaar Card & Ration Card', desc: 'For identity & residential authentication.' }
    ]
  },
  aadhaar: {
    category: 'IDENTITY SERVICES',
    title: 'Aadhaar PVC Card & Mobile Link Checklist',
    time: '10 Mins Ready',
    tip: 'হাই-কোয়ালিটি পিভিসি কার্ড পকেটে সহজে রাখা যায় এবং সম্পূর্ণ ওয়াটারপ্রুফ!',
    items: [
      { name: 'Aadhaar Number or Enrolment Slip', desc: '12-digit Aadhaar UID or 28-digit EID.' },
      { name: 'Linked Mobile Phone for OTP', desc: 'To download official encrypted e-Aadhaar XML.' },
      { name: 'Any active phone if ordering physical PVC', desc: 'Non-registered mobile also works for physical delivery.' }
    ]
  },
  tatkal: {
    category: 'TRAVEL TICKETING',
    title: 'IRCTC Tatkal Railway Booking Checklist',
    time: '10 AM (AC) / 11 AM (SL)',
    tip: 'তৎকাল বুকিংয়ের জন্য ভ্রমণের ১ দিন পূর্বে অন্তত ৩০ মিনিট আগে ডিটেইলস জমা দিন।',
    items: [
      { name: 'Train Number & Desired Class', desc: 'e.g. 12301 Rajdhani, 3A / 2A / SL class.' },
      { name: 'All Passengers Names & Exact Ages', desc: 'As per Govt photo ID (Aadhaar / Voter).' },
      { name: 'Boarding & Destination Stations', desc: 'Departure and arrival station names.' },
      { name: 'ID Proof Number for Leader', desc: 'Aadhaar / Driving License / Voter Card number.' }
    ]
  }
};

let currentChecklistKey = 'pan';

function switchChecklist(key) {
  currentChecklistKey = key;
  const data = checklistData[key];
  if (!data) return;

  // Update tabs
  document.querySelectorAll('.checklist-tab-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-blue-600', 'text-white');
    btn.classList.add('bg-white', 'text-slate-700');
  });

  const activeBtn = document.getElementById(`tab-${key}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-blue-600', 'text-white');
    activeBtn.classList.remove('bg-white', 'text-slate-700');
  }

  // Update fields
  document.getElementById('checkCategory').textContent = data.category;
  document.getElementById('checkTitle').textContent = data.title;
  document.getElementById('checkTime').textContent = data.time;
  document.getElementById('checkProTip').textContent = data.tip;

  // Render items
  const itemsContainer = document.getElementById('checkItemsList');
  itemsContainer.innerHTML = '';

  data.items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition';
    row.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
        <i data-lucide="check" class="w-3.5 h-3.5"></i>
      </div>
      <div>
        <h4 class="text-xs sm:text-sm font-bold text-slate-800 font-display">${item.name}</h4>
        <p class="text-[11px] sm:text-xs text-slate-500 font-bn">${item.desc}</p>
      </div>
    `;
    itemsContainer.appendChild(row);
  });

  if (window.lucide) lucide.createIcons();
}

function sendChecklistWa() {
  const data = checklistData[currentChecklistKey];
  if (!data) return;

  let text = `*Biswas Digital Hub - Document Checklist*\n`;
  text += `Service: ${data.title}\n\n`;
  text += `Required Documents:\n`;
  data.items.forEach((item, i) => {
    text += `${i + 1}. ${item.name}\n`;
  });
  text += `\nPlease check my documents on WhatsApp (+91 95476 32403).`;

  window.open(`https://wa.me/919547632403?text=${encodeURIComponent(text)}`, '_blank');
}

/* ==========================================================================
   6. LIVE RATE ESTIMATOR & DIGITAL CASH RECEIPT
   ========================================================================== */
function updateReceipt() {
  const checkboxes = document.querySelectorAll('.rate-calc-box');
  const itemsContainer = document.getElementById('receiptItems');
  const totalEl = document.getElementById('receiptTotalAmount');
  if (!itemsContainer || !totalEl) return;

  itemsContainer.innerHTML = '';
  let total = 0;

  checkboxes.forEach(box => {
    if (box.checked) {
      const name = box.getAttribute('data-name');
      const price = parseInt(box.getAttribute('data-price') || '0', 10);
      total += price;

      const itemRow = document.createElement('div');
      itemRow.className = 'flex items-center justify-between text-xs text-slate-700 py-1';
      itemRow.innerHTML = `
        <span class="truncate pr-2">${name}</span>
        <span class="font-mono font-bold shrink-0">₹${price}</span>
      `;
      itemsContainer.appendChild(itemRow);
    }
  });

  if (total === 0) {
    itemsContainer.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-xs italic">
        Select services on the left to generate receipt.
      </div>
    `;
  }

  totalEl.textContent = `₹${total}`;
  totalEl.classList.remove('price-updated');
  void totalEl.offsetWidth;
  totalEl.classList.add('price-updated');

  // Update receipt date and number
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const dateEl = document.getElementById('receiptDate');
  if (dateEl) dateEl.textContent = `DATE: ${dateStr}`;
}

function sendReceiptToWhatsApp() {
  const checkboxes = document.querySelectorAll('.rate-calc-box:checked');
  let total = 0;
  let itemsList = [];

  checkboxes.forEach(box => {
    const name = box.getAttribute('data-name');
    const price = parseInt(box.getAttribute('data-price') || '0', 10);
    total += price;
    itemsList.push(`- ${name} (₹${price})`);
  });

  if (itemsList.length === 0) {
    alert('Please select at least one service from the calculator.');
    return;
  }

  let text = `*Biswas Digital Hub - Quotation & Booking Request*\n`;
  text += `Selected Services:\n${itemsList.join('\n')}\n\n`;
  text += `*Estimated Total: ₹${total}*\n\n`;
  text += `Hello Partho da, I want to book these services. Please let me know how to proceed.`;

  window.open(`https://wa.me/919547632403?text=${encodeURIComponent(text)}`, '_blank');
}

/* ==========================================================================
   7. FILTER & SEARCH FOR ALL 16+ SERVICES
   ========================================================================== */
function filterServices(cat, triggerBtn) {
  document.querySelectorAll(".category-pill").forEach(btn => {
    btn.classList.remove("active", "bg-blue-600", "text-white");
    btn.classList.add("bg-white", "text-slate-700");
  });

  const targetBtn = triggerBtn || (window.event && window.event.currentTarget);
  if (targetBtn && targetBtn.classList) {
    targetBtn.classList.add("active", "bg-blue-600", "text-white");
    targetBtn.classList.remove("bg-white", "text-slate-700");
  }

  const cards = document.querySelectorAll('#servicesGrid .bento-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (cat === 'all' || cardCat === cat) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const noRes = document.getElementById('noResults');
  if (noRes) {
    noRes.classList.toggle('hidden', visibleCount > 0);
  }
}

function handleSearch(query) {
  const term = query.toLowerCase().trim();
  const cards = document.querySelectorAll('#servicesGrid .bento-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const title = (card.getAttribute('data-title') || '').toLowerCase();
    const text = card.innerText.toLowerCase();

    if (!term || title.includes(term) || text.includes(term)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const noRes = document.getElementById('noResults');
  if (noRes) {
    noRes.classList.toggle('hidden', visibleCount > 0);
  }
}

function quickSearch(term) {
  const input = document.getElementById('heroSearchInput');
  if (input) {
    input.value = term;
    handleSearch(term);
    scrollToServices();
  }
}

function focusSearch() {
  const input = document.getElementById('heroSearchInput');
  if (input) {
    input.focus();
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function scrollToServices() {
  const section = document.getElementById('services');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   8. ACCORDION PHYSICS FOR FAQ
   ========================================================================== */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
  });

  // Toggle clicked
  if (!isActive) {
    item.classList.add('active');
  }
}

/* ==========================================================================
   9. INTERACTIVE SERVICE DETAILS MODAL (POPUP ON TILE CLICK)
   ========================================================================== */
const serviceModalDetails = {
  job: {
    icon: 'assets/images/3d/job.png',
    cat: 'EMPLOYMENT & RECRUITMENT',
    title: 'Govt Job Application Fill-up',
    bengali: 'WBP Constable, KP, SSC GD, Railway Group D, WBPSC',
    desc: 'সরকারি নির্দেশিকা অনুযায়ী নির্ভুল 20KB-50KB ফটো ও সিগনেচার রিসাইজিং, ক্যাটাগরি ফি পেমেন্ট এবং ড্রাফট স্ক্রিনশট পাঠিয়ে ভেরিফিকেশন। রিজেকশন হওয়ার কোনো সুযোগ নেই।',
    docs: '• মাধ্যমিক এডমিট ও মার্কশীট<br>• আধার কার্ড ও কাস্ট সার্টিফিকেট (যদি থাকে)<br>• পাসপোর্ট ফটো ও সিগনেচার (সাদা কাগজে)',
    price: '₹50 - ₹100',
    turnaround: '15-20 Mins',
    waText: 'Hello Partho da, I want to fill up a Govt Job Application (WBP/SSC).'
  },
  pan: {
    icon: 'assets/images/3d/card.png',
    cat: 'GOVERNMENT IDENTITY',
    title: 'PAN Card & Instant e-PAN',
    bengali: 'নতুন প্যান কার্ড আবেদন, নামের ভুল সংশোধন ও ডিজিটাল ই-প্যান',
    desc: 'আধারে মোবাইল লিংক থাকলে মাত্র ২ ঘণ্টায় পেয়ে যান ডিজিটাল e-PAN! নতুন মাইনর/মেজর প্যান, আধার লিংক ও স্পিড পোস্টে ৭-১০ দিনে বাড়ির ঠিকানায় আসল প্লাস্টিক পিভিসি কার্ড ডেলিভারি।',
    docs: '• আধার কার্ড (বাধ্যতামূলক)<br>• আধারের সাথে লিঙ্ক থাকা মোবাইল নম্বর (OTP এর জন্য)<br>• ২ কপি পাসপোর্ট সাইজ ফটো',
    price: '₹107 Govt + ₹50 Desk',
    turnaround: '2-Hour e-PAN',
    waText: 'Hello Partho da, I want to apply for a New PAN Card / e-PAN.'
  },
  voter: {
    icon: 'assets/images/3d/vote.png',
    cat: 'ELECTION COMMISSION',
    title: 'Voter ID / EPIC Services',
    bengali: 'নতুন ভোটার কার্ড আবেদন (Form 6), সংশোধন (Form 8) ও ডিজিটাল e-EPIC',
    desc: 'ভোটার তালিকায় নাম তোলা, স্থান পরিবর্তন, ছবি ও নাম সংশোধন এবং আধার কার্ড লিঙ্কিং। সম্পূর্ণ ভেরিফায়েড আবেদন স্লিপ দেওয়া হয়।',
    docs: '• আধার কার্ড ও বয়সের প্রমাণপত্র (মাধ্যমিক এডমিট)<br>• ১ কপি পাসপোর্ট সাইজ ছবি<br>• পরিবারের যেকোনো সদস্যের ভোটার নম্বর',
    price: '₹50 Desk',
    turnaround: 'Form 6 / 8',
    waText: 'Hello Partho da, I need Voter ID Card service.'
  },
  aadhaar: {
    icon: 'assets/images/3d/id.png',
    cat: 'UIDAI SERVICES',
    title: 'Aadhaar Download & Smart PVC Card',
    bengali: 'অরিজিনাল ই-আধার ডাউনলোড ও ওয়াটারপ্রুফ এটিএম সাইজ পিভিসি প্রিন্ট',
    desc: 'UIDAI অনুমোদিত হাই-রেজোলিউশন কিউআর কোড সহ পিভিসি স্মার্ট কার্ড প্রিন্ট। পকেটে দীর্ঘস্থায়ী ও পানিরোধক।',
    docs: '• আধার নম্বর বা এনরোলমেন্ট স্লিপ<br>• লিঙ্কড মোবাইলে ওটিপি (ডাউনলোডের জন্য)',
    price: 'From ₹30',
    turnaround: '10 Mins Ready',
    waText: 'Hello Partho da, I need Aadhaar Download / PVC Card print.'
  },
  scholarship: {
    icon: 'assets/images/3d/grad.png',
    cat: 'EDUCATION SCHOLARSHIPS',
    title: 'Scholarship Assistance',
    bengali: 'স্বামী বিবেকানন্দ (SVMCM), Oasis, ঐক্যশ্রী ও ন্যাশনাল স্কলারশিপ',
    desc: 'স্কুল ও কলেজ ছাত্রছাত্রীদের ফ্রেশ ও রিনিউয়াল স্কলারশিপ আবেদন। সঠিক ইনকাম সার্টিফিকেট ও ব্যাঙ্ক ডিটেইলস লিঙ্কিং।',
    docs: '• শেষ ক্লাসের মার্কশীট (কমপক্ষে ৬০% SVMCM এর জন্য)<br>• বর্তমান ভর্তির রসিদ<br>• আধার সংযুক্ত ব্যাঙ্ক পাসবই ও ইনকাম সার্টিফিকেট',
    price: '₹60 - ₹100',
    turnaround: 'Zero Rejection',
    waText: 'Hello Partho da, I need Scholarship Application assistance (SVMCM/Oasis).'
  },
  train: {
    icon: 'assets/images/3d/train.png',
    cat: 'IRCTC RAILWAY DESK',
    title: 'IRCTC Tatkal & General Train Tickets',
    bengali: 'কনফার্ম তৎকাল ও জেনারেল ট্রেনের টিকিট বুকিং কাউন্টার',
    desc: 'স্লিপার (সকাল ১১:০০ টা) ও এসি (সকাল ১০:০০ টা) ক্লাসের নিশ্চিত তৎকাল বুকিং সাপোর্ট। ভ্রমণের ১ দিন পূর্বে বুকিং শুরু।',
    docs: '• ট্রেনের নম্বর বা নাম ও ভ্রমণের তারিখ<br>• সমস্ত যাত্রীর পুরো নাম, বয়স ও জেন্ডার<br>• যেকোনো একজনের আধার নম্বর',
    price: '₹40 - ₹60 Desk',
    turnaround: '10 AM / 11 AM',
    waText: 'Hello Partho da, I need Emergency Tatkal Train Ticket booking.'
  },
  flight: {
    icon: 'assets/images/3d/plane.png',
    cat: 'AIR TICKETING',
    title: 'Flight Ticket Booking',
    bengali: 'ইন্ডিগো, এয়ার ইন্ডিয়া অভ্যন্তরীণ ও আন্তর্জাতিক বিমানের টিকিট',
    desc: 'কম খরচে সস্তা ফ্লাইটের টিকিট, অতিরিক্ত ব্যাগেজ সিলেকশন ও ওয়েব চেক-ইন সহ প্রিন্টেড বোর্ডিং পাস।',
    docs: '• যাত্রীদের সরকারি ফটো আইডি নাম অনুযায়ী<br>• ভ্রমণের তারিখ ও গন্তব্য',
    price: '₹100 Desk',
    turnaround: 'Instant Ticket',
    waText: 'Hello Partho da, I need Flight Ticket Booking.'
  },
  photo: {
    icon: 'assets/images/3d/camera.png',
    cat: 'STUDIO PRINTING',
    title: '5-Minute Lab Passport Photo (8 Pcs)',
    bengali: '৫ মিনিটে ৮ কপি ফুজি ল্যাব-কোয়ালিটি পাসপোর্ট ফটো',
    desc: 'হাই-ডেফিনিশন স্টুডিও শট, ডিজিটাল ব্যাকগ্রাউন্ড পরিবর্তন (সাদা বা নীল), চকচকে ওয়াটারপ্রুফ ফুজি পেপারে প্রিন্ট।',
    docs: '• কাউন্টারে সরাসরি ৫ মিনিটে ছবি তোলা ও প্রিন্ট<br>• অথবা WhatsApp-এ পরিষ্কার ছবি পাঠালেও প্রিন্ট রেডি থাকবে',
    price: '₹50 (8 Copies)',
    turnaround: '5 Mins Lab',
    waText: 'Hello Partho da, I need Passport Size Studio Photos.'
  },
  xerox: {
    icon: 'assets/images/3d/printer.png',
    cat: 'HIGH SPEED COPYING',
    title: 'Xerox & Bulk Photocopy',
    bengali: 'ক্লিন সিঙ্গেল ও ডাবল সাইড লেজার জেরক্স',
    desc: '1200 DPI অপটিক্যাল লেজার প্রযুক্তি। ছাত্রছাত্রী ও অফিসের জন্য বাল্ক ডিসকাউন্ট দেওয়া হয়।',
    docs: '• অরিজিনাল ডকুমেন্ট বা বই',
    price: '₹2 / Page (Bulk ₹1.5)',
    turnaround: 'Instant',
    waText: 'Hello Partho da, I need Xerox / Photocopy service.'
  },
  color: {
    icon: 'assets/images/3d/page.png',
    cat: 'COLOR LASER',
    title: 'Color & Glossy Printing',
    bengali: 'হাই-কোয়ালিটি রঙিন প্রিন্টিং ও প্রজেক্ট ফাইল',
    desc: 'স্কুল/কলেজ প্রজেক্ট রিপোর্ট, সার্টিফিকেট, ব্রোশিওর ও বন্ড পেপার কালার আউটপুট।',
    docs: '• WhatsApp বা পেনড্রাইভে PDF / Word ফাইল',
    price: '₹10 / Page',
    turnaround: 'High Quality',
    waText: 'Hello Partho da, I need Color Printing service.'
  },
  scan: {
    icon: 'assets/images/3d/scan.png',
    cat: 'DIGITAL FORMATTING',
    title: 'Scanning & Exact-KB Resizing',
    bengali: 'সরকারি পোর্টালে আপলোডের জন্য নিখুঁত স্ক্যানিং ও কম্প্রেশন',
    desc: 'WBP, SSC, UPSC নিয়মানুযায়ী নির্দিষ্ট KB (20KB, 50KB, 100KB, 200KB) ও DPI মাপে নিখুঁত রিসাইজ।',
    docs: '• অরিজিনাল সার্টিফিকেট ও ছবি',
    price: '₹10 / File',
    turnaround: 'Instant',
    waText: 'Hello Partho da, I need Document Scanning & KB Resizing.'
  },
  lamination: {
    icon: 'assets/images/3d/memo.png',
    cat: 'PROTECTIVE SEAL',
    title: 'Heavy Micron Lamination',
    bengali: 'সার্টিফিকেট, মার্কশীট ও কার্ডের সুরক্ষিত থার্মাল লেমিনেশন',
    desc: 'হেভি-মাইক্রন হিট-সিল থার্মাল পাউচ। আজীবনের জন্য পানিরোধী ও ধুলোবালি মুক্ত সুরক্ষা।',
    docs: '• যেকোনো সাইজের ডকুমেন্ট (A4, Legal, ID Card)',
    price: '₹10 - ₹30',
    turnaround: '5 Mins',
    waText: 'Hello Partho da, I need Lamination service.'
  },
  aeps: {
    icon: 'assets/images/3d/money.png',
    cat: 'BIOMETRIC BANKING',
    title: 'AEPS Cash Withdrawal (Micro ATM)',
    bengali: 'আধার ফিঙ্গারপ্রিন্ট দিয়ে নগদ টাকা তোলা ও ব্যালেন্স চেক',
    desc: 'SBI, PNB, বঙ্গীয় গ্রামীণ বিকাশ ব্যাঙ্ক, ICICI সহ সমস্ত ব্যাঙ্কের আধার লিঙ্কড অ্যাকাউন্ট থেকে নিরাপদ ক্যাশ উইথড্রয়াল।',
    docs: '• আধার কার্ড নম্বর<br>• গ্রাহকের উপস্থিতিতে বায়োমেট্রিক ফিঙ্গারপ্রিন্ট',
    price: 'Official AEPS (Free)',
    turnaround: 'Instant',
    waText: 'Hello Partho da, I need AEPS Cash Withdrawal service.'
  },
  dmt: {
    icon: 'assets/images/3d/zap.png',
    cat: 'INSTANT TRANSFER',
    title: 'Direct Money Transfer (DMT)',
    bengali: 'ভারতের যেকোনো ব্যাংক অ্যাকাউন্টে তাৎক্ষণিক টাকা পাঠান',
    desc: '২৪x৭ তাৎক্ষণিক IMPS মানি ট্রান্সফার। অফিসিয়াল প্রিন্টেড পেমেন্ট রসিদ সহ লেনদেন সম্পন্ন হয়।',
    docs: '• প্রাপকের ব্যাঙ্ক অ্যাকাউন্ট নম্বর ও IFSC কোড',
    price: 'Nominal Bank Fee',
    turnaround: 'Instant IMPS',
    waText: 'Hello Partho da, I want to transfer money to a bank account.'
  },
  bill: {
    icon: 'assets/images/3d/mobile.png',
    cat: 'UTILITY DESK',
    title: 'WBSEDCL Electricity Bill & Recharge',
    bengali: 'বিদ্যুৎ বিল পেমেন্ট, মোবাইল রিচার্জ ও DTH টপ-আপ',
    desc: 'WBSEDCL অফিশিয়াল ডিসকাউন্ট সহ বিল পেমেন্ট এবং তাৎক্ষণিক রসিদ। Jio, Airtel, Vi এবং Tata Play রিচার্জ।',
    docs: '• বিদ্যুৎ বিলের কনজিউমার আইডি (Consumer ID)',
    price: 'Official Receipt (No Extra Charge)',
    turnaround: 'Instant Receipt',
    waText: 'Hello Partho da, I want to pay Electricity Bill / Mobile Recharge.'
  },
  typing: {
    icon: 'assets/images/3d/keyboard.png',
    cat: 'LEGAL DTP',
    title: 'Document Typing & DTP',
    bengali: 'বাংলা ও ইংরেজি আবেদনপত্র, কোর্ট এফিডেভিট ও নোটিশ টাইপিং',
    desc: 'আইনি বয়ান, দরখাস্ত, পঞ্চায়েত অ্যাপ্লিকেশন ও প্রজেক্টের সঠিক ফরম্যাটিং ও প্রিন্ট।',
    docs: '• হাতে লেখা খসড়া বা বিবরণ',
    price: '₹25 / Sheet',
    turnaround: '15 Mins',
    waText: 'Hello Partho da, I need Document Typing & DTP service.'
  }
};

function openServiceModal(key) {
  const data = serviceModalDetails[key];
  if (!data) return;

  document.getElementById('modalIcon').src = data.icon;
  document.getElementById('modalCategory').textContent = data.cat;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalBengali').textContent = data.bengali;
  document.getElementById('modalDesc').innerHTML = data.desc;
  document.getElementById('modalDocs').innerHTML = data.docs;
  document.getElementById('modalPrice').textContent = data.price;
  document.getElementById('modalTurnaround').textContent = data.turnaround;
  document.getElementById('modalWaBtn').href = `https://wa.me/919547632403?text=${encodeURIComponent(data.waText)}`;

  const modal = document.getElementById('serviceModal');
  if (modal) {
    modal.classList.add('active');
  }
  if (window.lucide) lucide.createIcons();
}

function closeServiceModalDirect() {
  const modal = document.getElementById('serviceModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function closeServiceModal(e) {
  if (e.target.id === 'serviceModal') {
    closeServiceModalDirect();
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeServiceModalDirect();
  }
});

/* ==========================================================================
   10. ONE-SCREEN APP HUB & DRAWER CONTROLLER
   ========================================================================== */
function filterAppServices(cat, triggerBtn) {
  document.querySelectorAll(".category-pill").forEach(btn => {
    btn.classList.remove("active", "bg-blue-600", "text-white");
    btn.classList.add("bg-slate-50", "text-slate-700");
  });

  const targetBtn = triggerBtn || (window.event && window.event.currentTarget);
  if (targetBtn && targetBtn.classList) {
    targetBtn.classList.add("active", "bg-blue-600", "text-white");
    targetBtn.classList.remove("bg-slate-50", "text-slate-700");
  }

  const tiles = document.querySelectorAll("#appTilesGrid .app-tile");
  tiles.forEach(tile => {
    const tileCat = tile.getAttribute("data-category");
    if (cat === "all" || tileCat === cat) {
      tile.style.display = "flex";
    } else {
      tile.style.display = "none";
    }
  });

  const cards = document.querySelectorAll("#detailedCardsGrid .service-tile");
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category");
    if (cat === "all" || cardCat === cat) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function switchServiceLayout(mode) {
  const hubView = document.getElementById("appHubView");
  const cardsView = document.getElementById("detailedCardsView");
  const btnApp = document.getElementById("layoutBtnApp");
  const btnCards = document.getElementById("layoutBtnCards");

  if (mode === "app") {
    if (hubView) hubView.classList.remove("hidden");
    if (cardsView) cardsView.classList.add("hidden");
    
    if (btnApp) {
      btnApp.className = "px-3 py-1.5 rounded-lg bg-white text-blue-600 shadow-xs flex items-center gap-1.5 transition";
    }
    if (btnCards) {
      btnCards.className = "px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition";
    }
  } else {
    if (hubView) hubView.classList.add("hidden");
    if (cardsView) cardsView.classList.remove("hidden");
    
    if (btnCards) {
      btnCards.className = "px-3 py-1.5 rounded-lg bg-white text-blue-600 shadow-xs flex items-center gap-1.5 transition";
    }
    if (btnApp) {
      btnApp.className = "px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition";
    }

    renderDetailedCards();
  }
  if (window.lucide) lucide.createIcons();
}

function renderDetailedCards() {
  const container = document.getElementById("detailedCardsGrid");
  if (!container || container.children.length > 0) return;

  Object.keys(serviceModalDetails).forEach(key => {
    const item = serviceModalDetails[key];
    const card = document.createElement("div");
    card.className = "service-tile group cursor-pointer p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-blue-400 transition";
    card.setAttribute("data-category", item.cat.includes("GOV") || item.cat.includes("UIDAI") || item.cat.includes("ELECTION") || item.cat.includes("EMPLOYMENT") || item.cat.includes("SCHOLARSHIP") ? "gov" : item.cat.includes("RAILWAY") || item.cat.includes("AIR") ? "travel" : item.cat.includes("BANKING") || item.cat.includes("TRANSFER") || item.cat.includes("UTILITY") ? "banking" : "print");
    card.setAttribute("onclick", `openServiceDrawer('${key}')`);
    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center">
          <img src="${item.icon}" alt="${item.title}" class="w-full h-full object-contain">
        </div>
        <span class="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">${item.price}</span>
      </div>
      <h3 class="text-sm font-bold text-slate-900 font-display">${item.title}</h3>
      <p class="text-[11px] text-blue-600 font-bn mb-2">${item.bengali}</p>
      <div class="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
        <span class="text-[10px] font-mono text-slate-400">${item.turnaround}</span>
        <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
          <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Order
        </span>
      </div>
    `;
    container.appendChild(card);
  });
}

function openServiceDrawer(key) {
  const data = serviceModalDetails[key];
  if (!data) return;

  const iconEl = document.getElementById("drawerIcon");
  const catEl = document.getElementById("drawerCategory");
  const titleEl = document.getElementById("drawerTitle");
  const bengaliEl = document.getElementById("drawerBengali");
  const descEl = document.getElementById("drawerDesc");
  const docsEl = document.getElementById("drawerDocs");
  const priceEl = document.getElementById("drawerPrice");
  const timeEl = document.getElementById("drawerTurnaround");
  const waBtnEl = document.getElementById("drawerWaBtn");

  if (iconEl) iconEl.src = data.icon;
  if (catEl) catEl.textContent = data.cat;
  if (titleEl) titleEl.textContent = data.title;
  if (bengaliEl) bengaliEl.textContent = data.bengali;
  if (descEl) descEl.innerHTML = data.desc;
  if (docsEl) docsEl.innerHTML = data.docs;
  if (priceEl) priceEl.textContent = data.price;
  if (timeEl) timeEl.textContent = data.turnaround;
  if (waBtnEl) waBtnEl.href = `https://wa.me/919547632403?text=${encodeURIComponent(data.waText)}`;

  const drawer = document.getElementById("serviceDrawer");
  if (drawer) {
    drawer.classList.add("active");
  }
  if (window.lucide) lucide.createIcons();
}

function closeServiceDrawerDirect() {
  const drawer = document.getElementById("serviceDrawer");
  if (drawer) {
    drawer.classList.remove("active");
  }
}

function closeServiceDrawer(e) {
  if (e.target.id === "serviceDrawer") {
    closeServiceDrawerDirect();
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeServiceDrawerDirect();
  }
});

/* ==========================================================================
   11. ADVANCED SCROLL-DRIVEN MOTION CONTROLLER
   ========================================================================== */
function initScrollAnimations() {
  const progressBar = document.getElementById("scrollProgressBar");
  const header = document.querySelector("header");
  const backToTopBtn = document.getElementById("backToTopBtn");
  const navLinks = document.querySelectorAll("header nav a");
  const sections = document.querySelectorAll("section[id]");

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // 1. Top Scroll Progress Bar
    if (progressBar && docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = `${scrollPercent}%`;
    }

    // 2. Navbar Elevation on Scroll
    if (header) {
      if (scrollY > 30) {
        header.classList.add("navbar-scrolled");
      } else {
        header.classList.remove("navbar-scrolled");
      }
    }

    // 3. Back to Top Button Visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // 4. Parallax Background Shift
    const parallaxOrbs = document.querySelectorAll(".parallax-orb");
    parallaxOrbs.forEach(orb => {
      const speed = parseFloat(orb.getAttribute("data-speed") || "0.06");
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });

    // 5. Scrollspy Navigation Highlighting
    let currentSectionId = "";
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 140;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === `#${currentSectionId}`) {
          link.classList.add("text-blue-600", "bg-blue-50/80");
          link.classList.remove("text-slate-600");
        } else {
          link.classList.remove("text-blue-600", "bg-blue-50/80");
          link.classList.add("text-slate-600");
        }
      });
    }
  }

  // Trigger on initial load
  handleScroll();

  // 6. IntersectionObserver for Reveal Elements & Groups
  initRevealObserver();
}

function initRevealObserver() {
  const targets = document.querySelectorAll(".scroll-reveal, .reveal-group");
  if (!targets.length) return;

  // Headless screenshot parameter safety
  if (window.location.search.includes("nocurtain")) {
    targets.forEach(el => el.classList.add("revealed"));
    return;
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px"
    });

    targets.forEach(el => observer.observe(el));
  } else {
    targets.forEach(el => el.classList.add("revealed"));
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
