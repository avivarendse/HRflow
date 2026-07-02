const requestList = document.getElementById("requestList");

function displayLeaveRequests() {

    requestList.innerHTML = "";

    let pending = 0;
    let approved = 0;
    let rejected = 0;

    employees.forEach(employee => {

        employee.leaveRequests.forEach(request => {

            const initials = employee.name
                .split(" ")
                .map(word => word[0])
                .join("");

            const card = document.createElement("div");

            card.className = "employee-card";

            card.innerHTML = `

            <div class="left">

                <div class="avatar">
                    ${initials}
                </div>

                <div>

                    <h3>${employee.name}</h3>

                    <p>${request.reason}</p>

                    <small>${request.date}</small>

                </div>

            </div>

            <div class="buttons">

                ${
                    request.status === "Pending"
                    ?

                    `<button class="reject">Reject</button>
                     <button class="approve">Approve</button>`

                    :

                    request.status === "Approved"

                    ?

                    `<span style="color:green;font-weight:bold;">Approved ✔</span>`

                    :

                    `<span style="color:red;font-weight:bold;">Rejected ✖</span>`

                }

            </div>

            `;

            requestList.appendChild(card);

            if(request.status === "Pending"){

                card.querySelector(".approve").onclick = () => {

                    request.status = "Approved";

                    displayLeaveRequests();

                }

                card.querySelector(".reject").onclick = () => {

                    request.status = "Rejected";

                    displayLeaveRequests();

                }

                pending++;

            }

            else if(request.status === "Approved"){

                approved++;

            }

            else{

                rejected++;

            }

        });

    });

    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("approvedCount").textContent = approved;
    document.getElementById("rejectedCount").textContent = rejected;

}

displayLeaveRequests();