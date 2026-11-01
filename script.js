// Course data with photo link
let courses = [
    { id: 1, name: "Web Dev", cat: "Development", teacher: "Rohit", fee: 12000, desc: "HTML, CSS, React", photo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" },
    { id: 2, name: "Python Data", cat: "Data", teacher: "Neha", fee: 15000, desc: "Python, ML", photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
    { id: 3, name: "UI/UX Design", cat: "Design", teacher: "Ananya", fee: 9000, desc: "Figma, Portfolio", photo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400" },
    { id: 4, name: "Java DSA", cat: "Development", teacher: "Shradha", fee: 10000, desc: "450 Questions", photo: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400" },
    { id: 5, name: "AI Tools", cat: "Data", teacher: "Aman", fee: 6000, desc: "ChatGPT", photo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400" },
    { id: 6, name: "Graphic Design", cat: "Design", teacher: "Priya", fee: 8000, desc: "Photoshop", photo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" }
];

let courseBox = document.getElementById("courseBox");
let tableBody = document.getElementById("tableBody");
let courseSelect = document.getElementById("courseSelect");
let feeBox = document.getElementById("feeBox");

function showCourses(list) {
    courseBox.innerHTML = "";
    tableBody.innerHTML = "";
    courseSelect.innerHTML = '<option value="">-- Select Course --</option>';

    for (let course of list) {

        // Card with photo
        let card = `
            <div class="card">
                <img src="${course.photo}" alt="course photo">
                <div class="card-content">
                    <h3>${course.name}</h3>
                    <p>Category: ${course.cat}</p>
                    <p>Teacher: ${course.teacher}</p>
                    <p>${course.desc}</p>
                    <div class="price">Fee: Rs ${course.fee}</div>
                    <button onclick="selectCourse(${course.id})">Select</button>
                </div>
            </div>
        `;
        courseBox.innerHTML += card;

        // Table
        let row = `
            <tr>
                <td>${course.name}</td>
                <td>${course.teacher}</td>
                <td>Rs ${course.fee}</td>
            </tr>
        `;
        tableBody.innerHTML += row;

        // Dropdown
        let option = document.createElement("option");
        option.value = course.id;
        option.innerText = course.name + " - Rs " + course.fee;
        courseSelect.appendChild(option);
    }
}

showCourses(courses);

function filterCourse(category) {
    if (category == "All") {
        showCourses(courses);
    } else {
        let filtered = courses.filter(function(c) {
            return c.cat == category;
        });
        showCourses(filtered);
    }
}

function selectCourse(id) {
    courseSelect.value = id;
    calculateFee();
}

function calculateFee() {
    let id = courseSelect.value;
    let coupon = document.getElementById("coupon").value;

    if (id == "") {
        feeBox.innerText = "Select a course";
        return 0;
    }

    let selected = courses.find(function(c) {
        return c.id == id;
    });

    let total = selected.fee;

    if (coupon == "SAVE20") {
        total = selected.fee - (selected.fee * 20 / 100);
        feeBox.innerText = "After SAVE20: Rs " + total;
    } else {
        feeBox.innerText = "Total Fee: Rs " + total;
    }

    return total;
}

courseSelect.addEventListener("change", calculateFee);
document.getElementById("coupon").addEventListener("input", calculateFee);

document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let courseId = document.getElementById("courseSelect").value;

    if (name.length < 3) {
        alert("Enter valid name");
        return;
    }

    if (email.includes("@") == false) {
        alert("Enter valid email");
        return;
    }

    if (phone.length != 10) {
        alert("Enter 10 digit phone");
        return;
    }

    if (courseId == "") {
        alert("Select a course");
        return;
    }

    let finalFee = calculateFee();
    let courseName = courses.find(c => c.id == courseId).name;

    let successBox = document.getElementById("successBox");
    successBox.style.display = "block";
    successBox.innerHTML = `
        <h3>Enrolled!</h3>
        <br>
        Name: ${name} <br>
        Course: ${courseName} <br>
        Fee Paid: Rs ${finalFee} <br>
        Email: ${email}
    `;
});