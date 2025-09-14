// Global variables
let currentUser = null;
let users = [];
let applications = [];
let complaints = [];
let notices = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadData(); // Load data from localStorage or use defaults
    setupEventListeners();
    checkLoginStatus();
});

// ===================================================================================
// DATA PERSISTENCE (localStorage)
// ===================================================================================

/**
 * Loads data from browser's localStorage.
 * If no data is found, it initializes with default data and saves it.
 */
function loadData() {
    const storedUsers = localStorage.getItem('gp_users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
        applications = JSON.parse(localStorage.getItem('gp_applications'));
        complaints = JSON.parse(localStorage.getItem('gp_complaints'));
        notices = JSON.parse(localStorage.getItem('gp_notices'));
        console.log("Data loaded from localStorage.");
    } else {
        // Initial Data (only used on first run if localStorage is empty)
        users = [
            // ---(Citizens) ---
            { id: 1, name: 'PESARAPATI NAGAMANI', username: 'Y23CA037', password: 'password', role: 'citizen', email: 'y23ca037@example.com', phone: '900000001', address: 'Guntur' },
            { id: 2, name: 'ARAVAPALLI AKHILA', username: 'Y24CA001', password: 'password', role: 'citizen', email: 'y24ca001@example.com', phone: '900000002', address: 'Guntur' },
            { id: 3, name: 'ASODI AKHILA', username: 'Y24CA002', password: 'password', role: 'citizen', email: 'y24ca002@example.com', phone: '900000003', address: 'Guntur' },
            { id: 4, name: 'AVANIGADDA PRUDHVI', username: 'Y24CA003', password: 'password', role: 'citizen', email: 'y24ca003@example.com', phone: '900000004', address: 'Guntur' },
            { id: 5, name: 'BANDARUPALLI HEMANTH SAI KUMAR', username: 'Y24CA004', password: 'password', role: 'citizen', email: 'y24ca004@example.com', phone: '900000005', address: 'Guntur' },
            { id: 6, name: 'BEJJAM RATNARAJU', username: 'Y24CA005', password: 'password', role: 'citizen', email: 'y24ca005@example.com', phone: '900000006', address: 'Guntur' },
            { id: 7, name: 'BHUKYA KRISHNAVENI', username: 'Y24CA006', password: 'password', role: 'citizen', email: 'y24ca006@example.com', phone: '900000007', address: 'Guntur' },
            { id: 8, name: 'BHUPATHI GOPI CHAND', username: 'Y24CA007', password: 'password', role: 'citizen', email: 'y24ca007@example.com', phone: '900000008', address: 'Guntur' },
            { id: 9, name: 'BJAM ASWINI', username: 'Y24CA008', password: 'password', role: 'citizen', email: 'y24ca008@example.com', phone: '900000009', address: 'Guntur' },
            { id: 10, name: 'BODDOJU VENKATA NAGA SAI JAHNAVI', username: 'Y24CA009', password: 'password', role: 'citizen', email: 'y24ca009@example.com', phone: '900000010', address: 'Guntur' },
            { id: 11, name: 'BOMMIDI MANIKYA RAO', username: 'Y24CA010', password: 'password', role: 'citizen', email: 'y24ca010@example.com', phone: '900000011', address: 'Guntur' },
            { id: 12, name: 'CHEEMALADINNE LEELA VASANTHA TRIVENI', username: 'Y24CA011', password: 'password', role: 'citizen', email: 'y24ca011@example.com', phone: '900000012', address: 'Guntur' },
            { id: 13, name: 'CHEGU JAYASRI', username: 'Y24CA012', password: 'password', role: 'citizen', email: 'y24ca012@example.com', phone: '900000013', address: 'Guntur' },
            { id: 14, name: 'CHINTALA CHERUVU CHANDRIKA MANOJA', username: 'Y24CA013', password: 'password', role: 'citizen', email: 'y24ca013@example.com', phone: '900000014', address: 'Guntur' },
            { id: 15, name: 'DAMODARA PRIYANKA', username: 'Y24CA014', password: 'password', role: 'citizen', email: 'y24ca014@example.com', phone: '900000015', address: 'Guntur' },
            { id: 16, name: 'DESIREDDY ASWANI', username: 'Y24CA015', password: 'password', role: 'citizen', email: 'y24ca015@example.com', phone: '900000016', address: 'Guntur' },
            { id: 17, name: 'DHARMARAJU SIVA NAGA DURGA PRASAD', username: 'Y24CA016', password: 'password', role: 'citizen', email: 'y24ca016@example.com', phone: '900000017', address: 'Guntur' },
            { id: 18, name: 'DIVYANJALI NEMALIKANTI', username: 'Y24CA017', password: 'password', role: 'citizen', email: 'y24ca017@example.com', phone: '900000018', address: 'Guntur' },
            { id: 19, name: 'DODDI TEJASWI', username: 'Y24CA018', password: 'password', role: 'citizen', email: 'y24ca018@example.com', phone: '900000019', address: 'Guntur' },
            { id: 20, name: 'DUDDU SRAVANI', username: 'Y24CA019', password: 'password', role: 'citizen', email: 'y24ca019@example.com', phone: '900000020', address: 'Guntur' },
            { id: 21, name: 'EEGA PRASANNA LAKSHMI', username: 'Y24CA020', password: 'password', role: 'citizen', email: 'y24ca020@example.com', phone: '900000021', address: 'Guntur' },
            { id: 22, name: 'GORANTLA VENKATESH', username: 'Y24CA021', password: 'password', role: 'citizen', email: 'y24ca021@example.com', phone: '900000022', address: 'Guntur' },
            { id: 23, name: 'GRANDHI NAGA SAI ROHITH', username: 'Y24CA022', password: 'password', role: 'citizen', email: 'y24ca022@example.com', phone: '900000023', address: 'Guntur' },
            { id: 24, name: 'GUNTUPALLI HARSHITHA', username: 'Y24CA023', password: 'password', role: 'citizen', email: 'y24ca023@example.com', phone: '900000024', address: 'Guntur' },
            { id: 25, name: 'GUNTUPALLI MADHURI', username: 'Y24CA024', password: 'password', role: 'citizen', email: 'y24ca024@example.com', phone: '900000025', address: 'Guntur' },
            { id: 26, name: 'JAVVAJI LAKSHMI', username: 'Y24CA025', password: 'password', role: 'citizen', email: 'y24ca025@example.com', phone: '900000026', address: 'Guntur' },
            { id: 27, name: 'JONNADULA NITHISH KUMAR', username: 'Y24CA026', password: 'password', role: 'citizen', email: 'y24ca026@example.com', phone: '900000027', address: 'Guntur' },
            { id: 28, name: 'KALAVAKOLLU USHA RANI', username: 'Y24CA027', password: 'password', role: 'citizen', email: 'y24ca027@example.com', phone: '900000028', address: 'Guntur' },
            { id: 29, name: 'KAMMA SUNEETHA', username: 'Y24CA028', password: 'password', role: 'citizen', email: 'y24ca028@example.com', phone: '900000029', address: 'Guntur' },
            { id: 30, name: 'KANAMARLAPUDI AKASHKUMAR', username: 'Y24CA029', password: 'password', role: 'citizen', email: 'y24ca029@example.com', phone: '900000030', address: 'Guntur' },
            { id: 31, name: 'KANATHARAPU RAGHUSAI', username: 'Y24CA030', password: 'password', role: 'citizen', email: 'y24ca030@example.com', phone: '900000031', address: 'Guntur' },
            { id: 32, name: 'KANDIAN VARSHINI', username: 'Y24CA031', password: 'password', role: 'citizen', email: 'y24ca031@example.com', phone: '900000032', address: 'Guntur' },
            { id: 33, name: 'KANDIMALLA ROHIT NARAYAN', username: 'Y24CA032', password: 'password', role: 'citizen', email: 'y24ca032@example.com', phone: '900000033', address: 'Guntur' },
            { id: 34, name: 'KOMERA LEELAVATHI', username: 'Y24CA033', password: 'password', role: 'citizen', email: 'y24ca033@example.com', phone: '900000034', address: 'Guntur' },
            { id: 35, name: 'LAGADAPATI BINDU SWATHI', username: 'Y24CA034', password: 'password', role: 'citizen', email: 'y24ca034@example.com', phone: '900000035', address: 'Guntur' },
            { id: 36, name: 'MADDU AMULYA', username: 'Y24CA035', password: 'password', role: 'citizen', email: 'y24ca035@example.com', phone: '900000036', address: 'Guntur' },
            { id: 37, name: 'MAJJIGA NARESH', username: 'Y24CA036', password: 'password', role: 'citizen', email: 'y24ca036@example.com', phone: '900000037', address: 'Guntur' },
            { id: 38, name: 'MALLISETTY NAGA HARSHA VARDHAN', username: 'Y24CA037', password: 'password', role: 'citizen', email: 'y24ca037@example.com', phone: '900000038', address: 'Guntur' },
            { id: 39, name: 'MANGATI JAHNAVI', username: 'Y24CA038', password: 'password', role: 'citizen', email: 'y24ca038@example.com', phone: '900000039', address: 'Guntur' },
            { id: 40, name: 'MANDRU DEEPIKA', username: 'Y24CA039', password: 'password', role: 'citizen', email: 'y24ca039@example.com', phone: '900000040', address: 'Guntur' },
            { id: 41, name: 'MEKALA VENKATA AJAY', username: 'Y24CA040', password: 'password', role: 'citizen', email: 'y24ca040@example.com', phone: '900000041', address: 'Guntur' },
            { id: 42, name: 'MINDALA NAVYA SREE', username: 'Y24CA041', password: 'password', role: 'citizen', email: 'y24ca041@example.com', phone: '900000042', address: 'Guntur' },
            { id: 43, name: 'NAKKA VIJAYA RAJU', username: 'Y24CA042', password: 'password', role: 'citizen', email: 'y24ca042@example.com', phone: '900000043', address: 'Guntur' },
            { id: 44, name: 'PALNATI CHAITANYA LAKSHMI', username: 'Y24CA043', password: 'password', role: 'citizen', email: 'y24ca043@example.com', phone: '900000044', address: 'Guntur' },
            { id: 45, name: 'PARCHURU VAHEEDA', username: 'Y24CA044', password: 'password', role: 'citizen', email: 'y24ca044@example.com', phone: '900000045', address: 'Guntur' },
            { id: 46, name: 'PITTU JOHN BABU', username: 'Y24CA045', password: 'password', role: 'citizen', email: 'y24ca045@example.com', phone: '900000046', address: 'Guntur' },
            { id: 47, name: 'PITTU RAGHAVENDRA', username: 'Y24CA046', password: 'password', role: 'citizen', email: 'y24ca046@example.com', phone: '900000047', address: 'Guntur' },
            { id: 48, name: 'PRATTIPATI BALA PRASANNA', username: 'Y24CA047', password: 'password', role: 'citizen', email: 'y24ca047@example.com', phone: '900000048', address: 'Guntur' },
            { id: 49, name: 'PULAGARA MOUNIKA', username: 'Y24CA048', password: 'password', role: 'citizen', email: 'y24ca048@example.com', phone: '900000049', address: 'Guntur' },
            { id: 50, name: 'RAYIDI GAYATHRI', username: 'Y24CA049', password: 'password', role: 'citizen', email: 'y24ca049@example.com', phone: '900000050', address: 'Guntur' },
            { id: 51, name: 'SABBELLA ALEKHYA', username: 'Y24CA050', password: 'password', role: 'citizen', email: 'y24ca050@example.com', phone: '900000051', address: 'Guntur' },
            { id: 52, name: 'SANDU SIREESHA', username: 'Y24CA051', password: 'password', role: 'citizen', email: 'y24ca051@example.com', phone: '900000052', address: 'Guntur' },
            { id: 53, name: 'SHAIK HEENA NAAZ', username: 'Y24CA052', password: 'password', role: 'citizen', email: 'y24ca052@example.com', phone: '900000053', address: 'Guntur' },
            { id: 54, name: 'SHAIK IRFAN', username: 'Y24CA053', password: 'password', role: 'citizen', email: 'y24ca053@example.com', phone: '900000054', address: 'Guntur' },
            { id: 55, name: 'SHAIK NAZMA', username: 'Y24CA054', password: 'password', role: 'citizen', email: 'y24ca054@example.com', phone: '900000055', address: 'Guntur' },
            { id: 56, name: 'SHAIK UZMA PARVEEN', username: 'Y24CA055', password: 'password', role: 'citizen', email: 'y24ca055@example.com', phone: '900000056', address: 'Guntur' },
            { id: 57, name: 'SURAVARAPU MARIYA JYOTHI', username: 'Y24CA056', password: 'password', role: 'citizen', email: 'y24ca056@example.com', phone: '900000057', address: 'Guntur' },
            { id: 58, name: 'TAMMINENI BALAKRISHNA REDDY', username: 'Y24CA057', password: 'password', role: 'citizen', email: 'y24ca057@example.com', phone: '900000058', address: 'Guntur' },
            { id: 59, name: 'TANGIRALA VENKATA NAGAMANI', username: 'Y24CA058', password: 'password', role: 'citizen', email: 'y24ca058@example.com', phone: '900000059', address: 'Guntur' },
            { id: 60, name: 'UDDANTI DEEPTHI MAHESWARI', username: 'Y24CA059', password: 'password', role: 'citizen', email: 'y24ca059@example.com', phone: '900000060', address: 'Guntur' },
            { id: 61, name: 'VADITHE ANURADHA', username: 'Y24CA060', password: 'password', role: 'citizen', email: 'y24ca060@example.com', phone: '900000061', address: 'Guntur' },
            { id: 62, name: 'VEERANKI VISHNU PRIYA', username: 'Y24CA061', password: 'password', role: 'citizen', email: 'y24ca061@example.com', phone: '900000062', address: 'Guntur' },
            { id: 63, name: 'VELIVELLI MYTHILI', username: 'Y24CA062', password: 'password', role: 'citizen', email: 'y24ca062@example.com', phone: '900000063', address: 'Guntur' },
            { id: 64, name: 'VISSARAPU GANESH', username: 'Y24CA063', password: 'password', role: 'citizen', email: 'y24ca063@example.com', phone: '900000064', address: 'Guntur' },
            { id: 65, name: 'VUNNAM LAKSHMI PUJITHA', username: 'Y24CA064', password: 'password', role: 'citizen', email: 'y24ca064@example.com', phone: '900000065', address: 'Guntur' },
            { id: 66, name: 'YAKKALA ASWANI', username: 'Y24CA065', password: 'password', role: 'citizen', email: 'y24ca065@example.com', phone: '900000066', address: 'Guntur' },
            { id: 67, name: 'YERVA VENKATA BHARGAVI', username: 'Y24CA066', password: 'password', role: 'citizen', email: 'y24ca066@example.com', phone: '900000067', address: 'Guntur' },
        
            // --- Staff & Admin ---
            { id: 68, name: 'Portal Staff', username: 'staff1', password: 'password', role: 'staff', email: 'staff@example.com', phone: '9000000100', address: 'Guntur' },
            { id: 69, name: 'Portal Admin', username: 'admin', password: 'password', role: 'admin', email: 'admin@example.com', phone: '9000000101', address: 'Guntur' }
        ];
        applications = [
            { id: 1, userId: 5, certificateType: 'income', fullName: 'BANDARUPALLI HEMANTH SAI KUMAR', phone: '900000005', purpose: 'Bank loan application', status: 'pending', submittedAt: '2025-01-15', trackingId: 'APP001' },
            { id: 2, userId: 12, certificateType: 'caste', fullName: 'CHEEMALADINNE LEELA VASANTHA TRIVENI', phone: '900000012', purpose: 'College admission', status: 'approved', submittedAt: '2025-01-16', trackingId: 'APP002' },
            { id: 3, userId: 27, certificateType: 'residence', fullName: 'JONNADULA NITHISH KUMAR', phone: '900000027', purpose: 'Address proof', status: 'pending', submittedAt: '2025-01-17', trackingId: 'APP003' },
            { id: 4, userId: 33, certificateType: 'income', fullName: 'KANDIMALLA ROHIT NARAYAN', phone: '900000033', purpose: 'Scholarship application', status: 'in-progress', submittedAt: '2025-01-18', trackingId: 'APP004' },
            { id: 5, userId: 41, certificateType: 'caste', fullName: 'MEKALA VENKATA AJAY', phone: '900000041', purpose: 'Job application', status: 'approved', submittedAt: '2025-01-19', trackingId: 'APP005' },
            { id: 6, userId: 46, certificateType: 'residence', fullName: 'PITTU JOHN BABU', phone: '900000046', purpose: 'Gas connection proof', status: 'pending', submittedAt: '2025-01-20', trackingId: 'APP006' },
            { id: 7, userId: 52, certificateType: 'income', fullName: 'SANDU SIREESHA', phone: '900000052', purpose: 'Fee reimbursement', status: 'pending', submittedAt: '2025-01-21', trackingId: 'APP007' },
            { id: 8, userId: 57, certificateType: 'caste', fullName: 'SURAVARAPU MARIYA JYOTHI', phone: '900000057', purpose: 'Higher studies admission', status: 'approved', submittedAt: '2025-01-22', trackingId: 'APP008' },
            { id: 9, userId: 63, certificateType: 'income', fullName: 'VELIVELLI MYTHILI', phone: '900000063', purpose: 'Medical aid', status: 'in-progress', submittedAt: '2025-01-23', trackingId: 'APP009' },
            { id: 10, userId: 67, certificateType: 'residence', fullName: 'YERVA VENKATA BHARGAVI', phone: '900000067', purpose: 'Rental agreement proof', status: 'pending', submittedAt: '2025-01-24', trackingId: 'APP010' }
        ];
        complaints = [
            { id: 1, userId: 7, subject: 'Water supply issue', priority: 'high', description: 'No water supply for 2 days in hostel area', status: 'pending', submittedAt: '2025-01-12' },
            { id: 2, userId: 15, subject: 'Street lights not working', priority: 'medium', description: 'Street lights near the college road are not working', status: 'in-progress', submittedAt: '2025-01-14' },
            { id: 3, userId: 22, subject: 'Garbage not collected', priority: 'low', description: 'Garbage bins in our area have not been cleared for a week', status: 'resolved', submittedAt: '2025-01-16' },
            { id: 4, userId: 29, subject: 'Road repair needed', priority: 'high', description: 'Main road has potholes causing accidents', status: 'pending', submittedAt: '2025-01-18' },
            { id: 5, userId: 36, subject: 'Noise disturbance', priority: 'low', description: 'Loud music being played in the community late at night', status: 'pending', submittedAt: '2025-01-20' },
            { id: 6, userId: 42, subject: 'Public tap leakage', priority: 'medium', description: 'Water tap near bus stand leaking continuously', status: 'in-progress', submittedAt: '2025-01-22' },
            { id: 7, userId: 49, subject: 'Drainage overflow', priority: 'high', description: 'Drainage overflowing during rains in my street', status: 'pending', submittedAt: '2025-01-24' },
            { id: 8, userId: 55, subject: 'Tree fallen on road', priority: 'urgent', description: 'Big tree fell and blocking the main road', status: 'resolved', submittedAt: '2025-01-25' },
            { id: 9, userId: 61, subject: 'Mosquito problem', priority: 'medium', description: 'High mosquito problem due to stagnant water', status: 'in-progress', submittedAt: '2025-01-26' },
            { id: 10, userId: 66, subject: 'Broken hand pump', priority: 'low', description: 'Hand pump in our colony is broken and not usable', status: 'pending', submittedAt: '2025-01-27' }
        ];
        notices = [
            { id: 1, title: 'Village Meeting Announcement', category: 'meeting', content: 'Monthly village meeting will be held on 28th January 2025 at 10 AM in the community hall.', validFrom: '2025-01-20', validUntil: '2025-01-28', postedBy: 'staff1', postedAt: '2025-01-18' },
            { id: 2, title: 'New Scholarship Scheme', category: 'scheme', content: 'Applications are open for Post-Matric Scholarships. Eligible students can apply online.', validFrom: '2025-01-15', validUntil: '2025-02-15', postedBy: 'staff1', postedAt: '2025-01-15' },
            { id: 3, title: 'Electricity Maintenance', category: 'urgent', content: 'Power cut scheduled on 22nd January 2025 from 9 AM to 2 PM for line maintenance.', validFrom: '2025-01-20', validUntil: '2025-01-22', postedBy: 'admin', postedAt: '2025-01-19' },
            { id: 4, title: 'Republic Day Celebration', category: 'event', content: 'Flag hoisting on 26th January 2025 at 8 AM in the college ground. All are invited.', validFrom: '2025-01-22', validUntil: '2025-01-26', postedBy: 'staff1', postedAt: '2025-01-21' },
            { id: 5, title: 'Digital Services Training', category: 'training', content: 'Free digital literacy training camp for citizens starting 1st February 2025.', validFrom: '2025-01-25', validUntil: '2025-02-05', postedBy: 'admin', postedAt: '2025-01-25' },
            { id: 6, title: 'Water Supply Maintenance', category: 'urgent', content: 'Water supply will be stopped on 30th January 2025 from 10 AM to 4 PM for repairs.', validFrom: '2025-01-28', validUntil: '2025-01-30', postedBy: 'staff1', postedAt: '2025-01-27' },
            { id: 7, title: 'Cultural Fest', category: 'event', content: 'Annual cultural fest to be held on 10th February 2025. Students can register online.', validFrom: '2025-02-01', validUntil: '2025-02-10', postedBy: 'admin', postedAt: '2025-01-28' },
            { id: 8, title: 'Health Camp', category: 'health', content: 'Free health checkup camp on 5th February 2025 at PHC center.', validFrom: '2025-02-01', validUntil: '2025-02-05', postedBy: 'staff1', postedAt: '2025-01-29' },
            { id: 9, title: 'New Ration Distribution', category: 'scheme', content: 'Ration distribution for BPL families will begin from 3rd February 2025.', validFrom: '2025-02-01', validUntil: '2025-02-07', postedBy: 'admin', postedAt: '2025-01-30' },
            { id: 10, title: 'Sports Trials', category: 'event', content: 'Sports trials for inter-college competitions will be held on 7th February 2025.', validFrom: '2025-02-02', validUntil: '2025-02-07', postedBy: 'staff1', postedAt: '2025-01-31' }
        ];
        console.log("Initialized with default data and saved to localStorage.");
        saveData(); // Save the initial data to localStorage
    }
}

/**
 * Saves all current application data arrays to localStorage.
 */
function saveData() {
    localStorage.setItem('gp_users', JSON.stringify(users));
    localStorage.setItem('gp_applications', JSON.stringify(applications));
    localStorage.setItem('gp_complaints', JSON.stringify(complaints));
    localStorage.setItem('gp_notices', JSON.stringify(notices));
    console.log("Data saved to localStorage.");
}

// ===================================================================================
// APPLICATION LOGIC
// ===================================================================================

// Setup event listeners
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('newApplicationForm').addEventListener('submit', handleNewApplication);
    document.getElementById('newComplaintForm').addEventListener('submit', handleNewComplaint);
    document.getElementById('newNoticeForm').addEventListener('submit', handleNewNotice);
    document.getElementById('addUserForm').addEventListener('submit', handleAddUser);
    document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
}

// Check login status
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    } else {
        showLoginScreen();
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    const user = users.find(u => u.username === username && u.password === password && u.role === role);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMainApp();
    } else {
        alert('Invalid credentials. Please check username, password, and role.');
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('mainApp').classList.add('hidden');
}

// Show main application
function showMainApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    
    // Update user info
    document.getElementById('currentUserName').textContent = currentUser.name;
    document.getElementById('currentUserRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    document.getElementById('userInfo').classList.remove('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');
    
    // Show appropriate navigation
    showNavigation();
    
    // Show default section based on role
    if (currentUser.role === 'citizen') {
        showSection('dashboard');
    } else if (currentUser.role === 'staff') {
        showSection('staff-dashboard');
    } else if (currentUser.role === 'admin') {
        showSection('admin-dashboard');
    }
    
    updateDashboardStats();
}

// Show navigation based on role
function showNavigation() {
    // Hide all navigations
    document.getElementById('citizenNav').classList.add('hidden');
    document.getElementById('staffNav').classList.add('hidden');
    document.getElementById('adminNav').classList.add('hidden');
    
    // Show appropriate navigation
    if (currentUser.role === 'citizen') {
        document.getElementById('citizenNav').classList.remove('hidden');
    } else if (currentUser.role === 'staff') {
        document.getElementById('staffNav').classList.remove('hidden');
    } else if (currentUser.role === 'admin') {
        document.getElementById('adminNav').classList.remove('hidden');
    }
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Update navigation active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('border-blue-500', 'text-blue-600');
    });
    
    // Load section data
    loadSectionData(sectionId);
}

// Load section data
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
        case 'staff-dashboard':
        case 'admin-dashboard':
            updateDashboardStats();
            break;
        case 'applications':
            loadUserApplications();
            break;
        case 'complaints':
            loadUserComplaints();
            break;
        case 'notices':
            loadNotices();
            break;
        case 'profile':
            loadUserProfile();
            break;
        case 'review-applications':
            loadReviewApplications();
            break;
        case 'manage-complaints':
            loadManageComplaints();
            break;
        case 'user-profiles':
            loadUserProfiles();
            break;
        case 'user-management':
            loadUserManagement();
            break;
        case 'reports':
            updateReportStats();
            break;
        case 'all-applications':
            loadAllApplications();
            break;
    }
}

// Handle new application
function handleNewApplication(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newApplication = {
        id: applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1,
        userId: currentUser.id,
        certificateType: formData.get('certificateType'),
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        purpose: formData.get('purpose'),
        status: 'pending',
        submittedAt: new Date().toISOString().split('T')[0],
        trackingId: 'APP' + String(applications.length + 1).padStart(3, '0')
    };
    
    applications.push(newApplication);
    saveData(); // Persist data
    event.target.reset();
    updateDashboardStats();
    alert(`Application submitted successfully! Tracking ID: ${newApplication.trackingId}`);
}

// Handle new complaint
function handleNewComplaint(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newComplaint = {
        id: complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 1,
        userId: currentUser.id,
        subject: formData.get('subject'),
        priority: formData.get('priority'),
        description: formData.get('description'),
        status: 'pending',
        submittedAt: new Date().toISOString().split('T')[0]
    };
    
    complaints.push(newComplaint);
    saveData(); // Persist data
    event.target.reset();
    updateDashboardStats();
    alert('Complaint submitted successfully!');
}

// Handle new notice
function handleNewNotice(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const title = formData.get('title').trim();
    const content = formData.get('content').trim();
    const validFrom = formData.get('validFrom');
    const validUntil = formData.get('validUntil');
    
    if (!title || !content || !validFrom || !validUntil) {
        alert('Please fill all fields.');
        return;
    }
    
    if (validUntil < validFrom) {
        alert('Valid until date must be after valid from date.');
        return;
    }
    
    const newNotice = {
        id: notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1,
        title: title,
        category: formData.get('category'),
        content: content,
        validFrom: validFrom,
        validUntil: validUntil,
        postedBy: currentUser.username,
        postedAt: new Date().toISOString().split('T')[0]
    };
    
    notices.push(newNotice);
    saveData(); // Persist data
    event.target.reset();
    updateDashboardStats();
    alert('Notice posted successfully!');
}

// Load user applications
function loadUserApplications() {
    const userApps = applications.filter(app => app.userId === currentUser.id);
    const tbody = document.getElementById('userApplicationsTable');
    tbody.innerHTML = userApps.map(app => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${app.trackingId}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${app.certificateType.charAt(0).toUpperCase() + app.certificateType.slice(1)}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full status-${app.status}">
                    ${app.status.toUpperCase()}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${app.submittedAt}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="downloadCertificate(${app.id})" class="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                <button onclick="trackApplication('${app.trackingId}')" class="text-green-600 hover:text-green-900">Track</button>
            </td>
        </tr>
    `).join('');
}

// Load user complaints
function loadUserComplaints() {
    const userComplaints = complaints.filter(c => c.userId === currentUser.id);
    const tbody = document.getElementById('userComplaintsTable');
    tbody.innerHTML = userComplaints.map(complaint => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CMP${String(complaint.id).padStart(3, '0')}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${complaint.subject}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full priority-${complaint.priority}">
                    ${complaint.priority.toUpperCase()}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full status-${complaint.status}">
                    ${complaint.status.toUpperCase()}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${complaint.submittedAt}</td>
        </tr>
    `).join('');
}

// Load notices
function loadNotices() {
    const today = new Date().toISOString().split('T')[0];
    const activeNotices = notices
        .filter(n => n.validFrom <= today && n.validUntil >= today)
        .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    
    const container = document.getElementById('noticesList');
    container.innerHTML = activeNotices.length ? activeNotices.map(notice => {
        let cardClass = 'bg-white rounded-lg shadow-lg p-6 card-hover';
        let categoryColor = 'bg-blue-100 text-blue-800';
        if (notice.category === 'urgent') {
            cardClass = 'bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow-lg p-6 card-hover border-l-4 border-red-500';
            categoryColor = 'bg-red-100 text-red-800';
        }
        return `
            <div class="${cardClass}">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">${notice.title}</h3>
                    <span class="px-3 py-1 rounded-full text-xs font-medium ${categoryColor}">${notice.category.toUpperCase()}</span>
                </div>
                <p class="text-gray-600 mb-4 leading-relaxed">${notice.content}</p>
                <div class="flex justify-between text-sm text-gray-500 border-t pt-3">
                    <span>Valid until: ${new Date(notice.validUntil).toLocaleDateString()}</span>
                    <span>Posted by: ${users.find(u => u.username === notice.postedBy)?.role || 'Staff'}</span>
                </div>
            </div>
        `;
    }).join('') : '<p class="text-center text-gray-500">No active notices found.</p>';
}

// Load review applications (staff)
function loadReviewApplications() {
    const tbody = document.getElementById('reviewApplicationsTable');
    tbody.innerHTML = applications.map(app => {
        const user = users.find(u => u.id === app.userId);
        return `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${app.trackingId}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user ? user.name : 'Unknown'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${app.certificateType.charAt(0).toUpperCase() + app.certificateType.slice(1)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full status-${app.status}">${app.status.toUpperCase()}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${app.submittedAt}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    ${app.status === 'pending' || app.status === 'in-progress' ? `
                        <button onclick="updateApplicationStatus(${app.id}, 'approved')" class="text-green-600 hover:text-green-900 mr-3">Approve</button>
                        <button onclick="updateApplicationStatus(${app.id}, 'rejected')" class="text-red-600 hover:text-red-900">Reject</button>
                    ` : `<span class="text-gray-500">Processed</span>`}
                </td>
            </tr>
        `;
    }).join('');
}

// Load all applications for admin
function loadAllApplications() {
    const tbody = document.getElementById('allApplicationsTable');
    if (!tbody) return;
    tbody.innerHTML = applications.map(app => {
        const user = users.find(u => u.id === app.userId);
        return `
            <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${app.trackingId}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${user ? user.name : "Unknown"}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${app.certificateType}</td>
                <td class="px-6 py-4"><span class="px-2 py-1 text-xs rounded-full status-${app.status}">${app.status.toUpperCase()}</span></td>
                <td class="px-6 py-4 text-sm text-gray-500">${app.submittedAt}</td>
            </tr>
        `;
    }).join('');
}

// Load manage complaints (staff)
function loadManageComplaints() {
    const tbody = document.getElementById('manageComplaintsTable');
    tbody.innerHTML = complaints.map(complaint => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CMP${String(complaint.id).padStart(3, '0')}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${complaint.subject}</td>
            <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full priority-${complaint.priority}">${complaint.priority.toUpperCase()}</span></td>
            <td class="px-6 py-4 whitespace-nowrap">
                <select onchange="updateComplaintStatus(${complaint.id}, this.value)" class="text-sm border border-gray-300 rounded px-2 py-1">
                    <option value="pending" ${complaint.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="in-progress" ${complaint.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="resolved" ${complaint.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${complaint.submittedAt}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="viewComplaintDetails(${complaint.id})" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
        </tr>
    `).join('');
}

// Load user profile (citizen)
function loadUserProfile() {
    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profileUsername').value = currentUser.username;
    document.getElementById('profileEmail').value = currentUser.email || '';
    document.getElementById('profilePhone').value = currentUser.phone || '';
    document.getElementById('profileAddress').value = currentUser.address || '';
    
    const userApps = applications.filter(app => app.userId === currentUser.id);
    const userComplaints = complaints.filter(c => c.userId === currentUser.id);
    
    document.getElementById('profileApplicationsCount').textContent = userApps.length;
    document.getElementById('profileApprovedCount').textContent = userApps.filter(a => a.status === 'approved').length;
    document.getElementById('profilePendingCount').textContent = userApps.filter(a => a.status === 'pending').length;
    document.getElementById('profileComplaintsCount').textContent = userComplaints.length;
}

// Handle profile update
function handleProfileUpdate(event) {
    event.preventDefault();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].name = document.getElementById('profileName').value;
        users[userIndex].email = document.getElementById('profileEmail').value;
        users[userIndex].phone = document.getElementById('profilePhone').value;
        users[userIndex].address = document.getElementById('profileAddress').value;
        
        currentUser = users[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        saveData(); // Persist data
        
        document.getElementById('currentUserName').textContent = currentUser.name;
        alert('Profile updated successfully!');
    }
}

// Load user profiles (staff)
function loadUserProfiles() {
    const citizenUsers = users.filter(user => user.role === 'citizen');
    const tbody = document.getElementById('userProfilesTable');
    tbody.innerHTML = citizenUsers.map(user => {
        const appCount = applications.filter(a => a.userId === user.id).length;
        const complaintCount = complaints.filter(c => c.userId === user.id).length;
        return `
            <tr>
                <td class="px-6 py-4 text-sm text-gray-900">${user.id}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${user.name}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${user.email}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${user.phone}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${appCount}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${complaintCount}</td>
                <td class="px-6 py-4 text-sm font-medium">
                    <button onclick="viewUserDetails(${user.id})" class="text-blue-600 hover:text-blue-900">Details</button>
                </td>
            </tr>
        `;
    }).join('');
}

function viewUserDetails(userId) {
    const user = users.find(u => u.id === userId);
    alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}`);
}

// Load user management (admin)
function loadUserManagement() {
    const tbody = document.getElementById('userManagementTable');
    tbody.innerHTML = users.map(user => `
        <tr>
            <td class="px-6 py-4 text-sm text-gray-900">${user.id}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${user.name}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${user.username}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${user.role}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${user.email}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${user.phone}</td>
            <td class="px-6 py-4 text-sm font-medium">
                <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Update dashboard statistics for all roles
function updateDashboardStats() {
        const today = new Date().toISOString().split('T')[0];
    const validNotices = notices.filter(n => n.validUntil >= today);

    // Citizen dashboard notices
    const citizenNoticesContainer = document.getElementById('dashboardNotices');
    if (citizenNoticesContainer) {
        citizenNoticesContainer.innerHTML = validNotices.slice(0, 3).map(n => `
            <div class="p-3 bg-blue-50 rounded-md">
                <p class="font-medium">${n.title}</p>
                <p class="text-xs text-gray-600">Valid Until: ${n.validUntil}</p>
            </div>
        `).join('');
    }

    // Staff dashboard notices
    const staffNoticesContainer = document.getElementById('staffDashboardNotices');
    if (staffNoticesContainer) {
        staffNoticesContainer.innerHTML = validNotices.slice(0, 3).map(n => `
            <div class="p-3 bg-green-50 rounded-md">
                <p class="font-medium">${n.title}</p>
                <p class="text-xs text-gray-600">Valid Until: ${n.validUntil}</p>
            </div>
        `).join('');
    }

    if (currentUser.role === 'citizen') {
        const userApps = applications.filter(app => app.userId === currentUser.id);
        document.getElementById('userApplicationsCount').textContent = userApps.length;
        document.getElementById('userApprovedCount').textContent = userApps.filter(a => a.status === 'approved').length;
        document.getElementById('userPendingCount').textContent = userApps.filter(a => a.status === 'pending').length;
        document.getElementById('userComplaintsCount').textContent = complaints.filter(c => c.userId === currentUser.id).length;
        loadDashboardNotices('dashboardNotices');
    } else if (currentUser.role === 'staff') {
        document.getElementById('staffPendingCount').textContent = applications.filter(a => a.status === 'pending').length;
        document.getElementById('staffComplaintsCount').textContent = complaints.filter(c => c.status !== 'resolved').length;
        document.getElementById('staffProcessedCount').textContent = applications.filter(a => a.status !== 'pending').length;
        document.getElementById('staffUsersCount').textContent = users.filter(u => u.role === 'citizen').length;
        loadDashboardNotices('staffDashboardNotices');
    } else if (currentUser.role === 'admin') {
        document.getElementById('adminUsersCount').textContent = users.length;
        document.getElementById('adminApplicationsCount').textContent = applications.length;
        document.getElementById('adminComplaintsCount').textContent = complaints.length;
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('adminNoticesCount').textContent = notices.filter(n => n.validFrom <= today && n.validUntil >= today).length;
        loadDashboardNotices('adminDashboardNotices');
    }
}

// Load recent notices for any dashboard
function loadDashboardNotices(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const today = new Date().toISOString().split('T')[0];
    const recentNotices = notices
        .filter(n => n.validFrom <= today && n.validUntil >= today)
        .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
        .slice(0, 3);
    
    if (recentNotices.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">No recent notices</p>';
        return;
    }

    container.innerHTML = recentNotices.map(notice => `
        <div class="p-3 bg-green-50 rounded-lg border-l-4 border-green-600">
            <h4 class="font-semibold text-green-800">${notice.title}</h4>
            <p class="text-sm text-gray-600">${notice.content.substring(0, 80)}...</p>
            <span class="text-xs text-gray-500">Valid until: ${notice.validUntil}</span>
        </div>
    `).join('');
}

// Update application status
function updateApplicationStatus(appId, status) {
    const app = applications.find(a => a.id === appId);
    if (app) {
        app.status = status;
        saveData(); // Persist data
        loadReviewApplications();
        updateDashboardStats();
        alert(`Application ${app.trackingId} has been ${status}!`);
    }
}

// Update complaint status
function updateComplaintStatus(complaintId, status) {
    const complaint = complaints.find(c => c.id === complaintId);
    if (complaint) {
        complaint.status = status;
        saveData(); // Persist data
        updateDashboardStats();
        alert(`Complaint status updated to ${status}!`);
    }
}

// View complaint details
function viewComplaintDetails(complaintId) {
    const complaint = complaints.find(c => c.id === complaintId);
    const user = users.find(u => u.id === complaint.userId);
    alert(`Complaint Details:\n\nID: CMP${String(complaint.id).padStart(3, '0')}\nBy: ${user.name}\nSubject: ${complaint.subject}\nDescription: ${complaint.description}`);
}

// Download certificate
function downloadCertificate(appId) {
    const app = applications.find(a => a.id === appId);
    if (app.status === 'approved') {
        alert(`Downloading ${app.certificateType} certificate for ${app.fullName}...`);
    } else {
        alert('Certificate is available only for approved applications.');
    }
}

// Track application
function trackApplication(trackingId) {
    const app = applications.find(a => a.trackingId === trackingId);
    alert(`Application Status: ${app.status.toUpperCase()}`);
}

// User management functions
function showAddUserModal() { document.getElementById('addUserModal').classList.remove('hidden'); }
function hideAddUserModal() { document.getElementById('addUserModal').classList.add('hidden'); }

function handleAddUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');

    if (users.some(u => u.username === username)) {
        alert('Username already exists.');
        return;
    }

    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: formData.get('name'),
        username: username,
        password: formData.get('password'),
        role: formData.get('role'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: ''
    };
    
    users.push(newUser);
    saveData(); // Persist data
    hideAddUserModal();
    loadUserManagement();
    updateDashboardStats();
    alert('User added successfully!');
}

function deleteUser(userId) {
    if (userId === currentUser.id) {
        alert('You cannot delete your own account.');
        return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.id !== userId);
        saveData(); // Persist data
        loadUserManagement();
        updateDashboardStats();
        alert('User deleted successfully!');
    }
}

// CSV Management Functions
function exportToCSV(dataType) {
    let data;
    switch(dataType) {
        case 'users': data = users; break;
        case 'applications': data = applications; break;
        case 'complaints': data = complaints; break;
        case 'notices': data = notices; break;
        default: return;
    }
    const csvContent = "data:text/csv;charset=utf-8," + [Object.keys(data[0]), ...data.map(item => Object.values(item))].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${dataType}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importFromCSV() {
    const file = document.getElementById('csvFileInput').files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        const lines = event.target.result.split('\n');
        const headers = lines[0].split(',');
        const dataType = document.getElementById('importDataType').value;
        const dataArray = lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index].trim();
                return obj;
            }, {});
        });

        switch(dataType) {
            case 'users': users.push(...dataArray); break;
            case 'applications': applications.push(...dataArray); break;
            case 'complaints': complaints.push(...dataArray); break;
            case 'notices': notices.push(...dataArray); break;
        }
        saveData(); // Persist imported data
        alert('Data imported successfully!');
        // Optionally refresh the current view
        loadSectionData(document.querySelector('.section:not(.hidden)').id);
    };
    reader.readAsText(file);
}


function downloadTemplate(dataType) {
    let headers;
    switch(dataType) {
        case 'users': headers = 'id,name,username,password,role,email,phone,address'; break;
        case 'applications': headers = 'id,userId,certificateType,fullName,phone,purpose,status,submittedAt,trackingId'; break;
        case 'complaints': headers = 'id,userId,subject,priority,description,status,submittedAt'; break;
        case 'notices': headers = 'id,title,category,content,validFrom,validUntil,postedBy,postedAt'; break;
        default: return;
    }
    const csvContent = "data:text/csv;charset=utf-8," + headers;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${dataType}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Reports Functions
function updateReportStats() {
    document.getElementById('monthlyApplications').textContent = applications.length; // Simplified for example
    const approvalRate = applications.length ? (applications.filter(a => a.status === 'approved').length / applications.length * 100).toFixed(0) : 0;
    document.getElementById('approvalRate').textContent = `${approvalRate}%`;
    const resolvedRate = complaints.length ? (complaints.filter(c => c.status === 'resolved').length / complaints.length * 100).toFixed(0) : 0;
    document.getElementById('resolvedComplaints').textContent = `${resolvedRate}%`;
}

function generateReport(reportType) {
    const reportResults = document.getElementById('reportResults');
    const reportContent = document.getElementById('reportContent');
    let content = `<h4>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h4>`;
    
    // This is a simplified report generation. A real one would be more detailed.
    switch(reportType) {
        case 'applications':
            content += `<p>Total Applications: ${applications.length}</p>`;
            content += `<p>Approved: ${applications.filter(a=>a.status === 'approved').length}</p>`;
            break;
        case 'complaints':
            content += `<p>Total Complaints: ${complaints.length}</p>`;
            content += `<p>Resolved: ${complaints.filter(c=>c.status === 'resolved').length}</p>`;
            break;
        case 'users':
            content += `<p>Total Users: ${users.length}</p>`;
            content += `<p>Citizens: ${users.filter(u=>u.role === 'citizen').length}</p>`;
            break;
        default:
            content += '<p>Report generated.</p>';
    }
    
    reportContent.innerHTML = content;
    reportResults.classList.remove('hidden');
}


// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    showLoginScreen();
}
