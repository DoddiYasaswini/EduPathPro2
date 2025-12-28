// --- 1. QUIZ DATA ---
const questions = [
    { id: 1, q: "What is your current engineering branch?", key: "branch", type: "text", placeholder: "e.g., CSE, ECE, Civil..." },
    { id: 2, q: "Which year are you in?", key: "year", type: "select", options: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
    { id: 3, q: "What kind of work excites you?", key: "interest", type: "multiple", options: [
        "Coding and building software", "Working with data & AI", "Hacking & Security", "Designing Circuits/VLSI", "Mechanical Designing/CAD"
    ]},
    { id: 4, q: "Your strength?", key: "strength", type: "multiple", options: ["Logic & Problem Solving", "Mathematics", "Creativity", "Hands-on Building"] }
];

// --- 2. STATISTICS DATA ---
const specStats = {
    "Software Development": { high: "45-60 LPA", avg: "8-12 LPA", least: "3.5 LPA", count: "2,00,000+", companies: "Google, Amazon, TCS, Infosys, Microsoft" },
    "Data Science / AI": { high: "50+ LPA", avg: "12-15 LPA", least: "5 LPA", count: "80,000+", companies: "Meta, Nvidia, Adobe, Fractal Analytics, Mu Sigma" },
    "Cyber Security": { high: "35-40 LPA", avg: "9-11 LPA", least: "4 LPA", count: "40,000+", companies: "Palo Alto, CrowdStrike, Cisco, EY, Deloitte" },
    "VLSI / Embedded": { high: "35 LPA", avg: "10-14 LPA", least: "4.5 LPA", count: "30,000+", companies: "Intel, Qualcomm, Texas Instruments, AMD, NVIDIA" },
    "AutoCAD / Mechanical": { high: "20 LPA", avg: "5-7 LPA", least: "3 LPA", count: "60,000+", companies: "L&T, Tata Motors, Mahindra, Autodesk, Siemens" }
};

// --- 3. ROADMAP DATA (CORRECTED & COMPLETE) ---
const roadmaps = {
    "Software Development": {
        levels: [
            { title: "Foundations", task: "Programming Logic (C/C++ or Python)", res: "CS50 by Harvard" },
            { title: "Data Structures", task: "Arrays, Linked Lists, Trees, Graphs", res: "LeetCode" },
            { title: "Frontend", task: "HTML, CSS, JavaScript, React/Vue", res: "FreeCodeCamp" },
            { title: "Backend", task: "Node.js, Express, MongoDB/SQL", res: "Traversy Media" },
            { title: "System Design", task: "Scalability, Load Balancers, Databases", res: "Grokking System Design" },
            { title: "Deployment", task: "Docker, Kubernetes, AWS/Azure", res: "TechWorld with Nana" }
        ],
        books: ["Clean Code by Robert C. Martin", "Cracking the Coding Interview by Gayle Laakmann"],
        extras: ["Frontend Masters", "FullStackOpen (Helsinki University)", "The Odin Project"]
    },
    "Data Science / AI": {
        levels: [
            { title: "Math & Stats", task: "Linear Algebra, Calculus, Probability", res: "Khan Academy" },
            { title: "Python Mastery", task: "NumPy, Pandas, Matplotlib", res: "Kaggle" },
            { title: "Machine Learning", task: "Regression, Clustering, Scikit-learn", res: "Andrew Ng's ML Course" },
            { title: "Deep Learning", task: "Neural Networks, PyTorch/TensorFlow", res: "Fast.ai" },
            { title: "NLP/GenAI", task: "Transformers, LLMs, Prompt Engineering", res: "Hugging Face" },
            { title: "Big Data", task: "Spark, Hadoop, Cloud Deployment", res: "Databricks Academy" }
        ],
        books: ["Hands-On ML with Scikit-Learn by Aurélien Géron", "Deep Learning with Python by Francois Chollet"],
        extras: ["Towards Data Science (Medium)", "Analytics Vidhya", "Datacamp"]
    },
    "Cyber Security": {
        levels: [
            { title: "Networking Base", task: "OSI Model, TCP/IP, DNS, HTTP", res: "Network+ Training" },
            { title: "Linux & Scripting", task: "Bash scripting, Linux Terminal", res: "OverTheWire (Bandit)" },
            { title: "Web Security", task: "OWASP Top 10, SQL Injection, XSS", res: "PortSwigger Academy" },
            { title: "Ethical Hacking", task: "Metasploit, Burp Suite, Nmap", res: "Hack The Box" },
            { title: "Cryptography", task: "Encryption, Hashing, PKI", res: "Coursera Cryptography" },
            { title: "Certifications", task: "Preparation for CEH or OSCP", res: "OffSec Training" }
        ],
        books: ["The Web Application Hacker's Handbook", "Hacking: The Art of Exploitation"],
        extras: ["TryHackMe", "OWASP.org", "DarkReading"]
    },
    "VLSI / Embedded": {
        levels: [
            { title: "Digital Electronics", task: "Gates, Flip-flops, Mux, K-Maps", res: "Neso Academy" },
            { title: "C & Assembly", task: "Embedded C, Microcontrollers (8051/ARM)", res: "FastBit Academy" },
            { title: "Verilog/VHDL", task: "RTL Coding, Simulation, Synthesis", res: "HDLBits" },
            { title: "FPGA Design", task: "Xilinx Vivado, Timing Analysis", res: "Nandland" },
            { title: "Physical Design", task: "Floorplanning, Placement, Routing", res: "VLSI System Design" },
            { title: "Verification", task: "SystemVerilog, UVM", res: "Verification Academy" }
        ],
        books: ["Digital Design by Morris Mano", "CMOS VLSI Design by Weste & Harris"],
        extras: ["SemiEngineering", "EEWeb", "EDAPlayground"]
    },
    "AutoCAD / Mechanical": {
        levels: [
            { title: "Engineering Drawing", task: "Projections, GD&T, Sectioning", res: "NPTEL Engineering Drawing" },
            { title: "2D Drafting", task: "AutoCAD Basics, Layers, Dimensions", res: "SourceCAD" },
            { title: "3D Modeling", task: "SolidWorks or CATIA Mastery", res: "Linkedin Learning" },
            { title: "Simulation (FEA)", task: "ANSYS basics, Stress Analysis", res: "SimScale Academy" },
            { title: "Manufacturing", task: "CNC Programming, 3D Printing", res: "Titans of CNC" },
            { title: "Product Design", task: "Material Selection, DFM", res: "Udemy Product Design" }
        ],
        books: ["Machine Design by R.S. Khurmi", "Shigley's Mechanical Engineering Design"],
        extras: ["GrabCAD Community", "Engineering Toolbox", "ASME.org"]
    }
};

// --- 4. APP STATE & LOGIC ---
let currentIdx = 0;
let answers = {};
let finalSpec = "";

function loadQuiz() {
    const q = questions[currentIdx];
    let html = `<h3 class="text-xl font-bold text-gray-800 mb-6">${q.q}</h3>`;
    
    if (q.type === "text") {
        html += `<input type="text" id="ans-${q.id}" class="w-full p-4 border rounded-xl" placeholder="${q.placeholder}">`;
    } else if (q.type === "select") {
        html += `<select id="ans-${q.id}" class="w-full p-4 border rounded-xl">` + 
                q.options.map(opt => `<option>${opt}</option>`).join('') + `</select>`;
    } else if (q.type === "multiple") {
        html += `<div class="grid grid-cols-1 gap-3">` + 
                q.options.map(opt => `<button onclick="selectOption('${opt}')" class="option-btn p-4 rounded-xl text-left">${opt}</button>`).join('') + `</div>`;
    }

    document.getElementById('question-container').innerHTML = html;
    document.getElementById('progress-bar').style.width = `${((currentIdx + 1) / questions.length) * 100}%`;
    document.getElementById('prevBtn').classList.toggle('hidden', currentIdx === 0);
}

function selectOption(val) {
    const q = questions[currentIdx];
    answers[q.key] = val;
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.toggle('selected-option', btn.innerText === val);
    });
}

function handleNext() {
    const q = questions[currentIdx];
    let val;

    // Retrieve Value
    if(q.type === "multiple") {
        val = answers[q.key];
    } else {
        val = document.getElementById(`ans-${q.id}`).value;
    }

    // Validation Check: Prevent empty answers
    if (!val || val.trim() === "") {
        alert("Please answer the question to proceed!");
        return;
    }

    answers[q.key] = val;

    // Navigate or Finish
    if(currentIdx < questions.length - 1) {
        currentIdx++;
        loadQuiz();
    } else {
        showStats();
    }
}

function handlePrev() {
    if(currentIdx > 0) {
        currentIdx--;
        loadQuiz();
    }
}

function showStats() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('stats-section').classList.remove('hidden');

    // Recommendation Logic
    const interest = answers.interest;
    if(interest.includes("Coding")) finalSpec = "Software Development";
    else if(interest.includes("Data")) finalSpec = "Data Science / AI";
    else if(interest.includes("Security")) finalSpec = "Cyber Security";
    else if(interest.includes("VLSI")) finalSpec = "VLSI / Embedded";
    else finalSpec = "AutoCAD / Mechanical";

    const stats = specStats[finalSpec] || specStats["Software Development"];
    document.getElementById('spec-name').innerText = finalSpec;
    document.getElementById('high-pack').innerText = stats.high;
    document.getElementById('avg-pack').innerText = stats.avg;
    document.getElementById('least-pack').innerText = stats.least;
    document.getElementById('placements-count').innerText = `${stats.count} students placed per year globally.`;
    document.getElementById('top-companies').innerText = stats.companies;
}

function showRoadmapPage() {
    document.getElementById('stats-section').classList.add('hidden');
    document.getElementById('roadmap-section').classList.remove('hidden');
    
    // Fallback to Software Development if roadmap is missing (safeguard)
    const data = roadmaps[finalSpec] || roadmaps["Software Development"];
    
    document.getElementById('roadmap-title').innerText = `${finalSpec} Mastery Roadmap`;

    // Inject Roadmap Levels
    document.getElementById('levels-container').innerHTML = data.levels.map((l, i) => `
        <div class="flex gap-6 relative group">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold z-10">L${i+1}</div>
                <div class="w-1 h-full bg-indigo-100 absolute top-5"></div>
            </div>
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex-grow group-hover:shadow-md transition-all">
                <h4 class="font-bold text-gray-800 text-xl">${l.title}</h4>
                <p class="text-indigo-600 font-medium my-1">Task: ${l.task}</p>
                <p class="text-sm text-gray-500">Resource: ${l.res}</p>
            </div>
        </div>
    `).join('');

    // Inject Books
    document.getElementById('books-container').innerHTML = data.books.map(book => `
        <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
            <div class="text-2xl">📘</div>
            <span class="font-medium text-gray-700">${book}</span>
        </div>
    `).join('');

    // Inject Extras
    document.getElementById('extra-resources').innerHTML = data.extras.map(res => `
        <li><a href="#" class="hover:underline">${res}</a></li>
    `).join('');
}

function downloadPDF() {
    window.print(); 
}

// Initial Load
loadQuiz();
          
