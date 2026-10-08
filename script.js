const form = document.getElementById("feedbackForm");
        const container = document.getElementById("feedbackContainer");
        const message = document.getElementById("message");

        let feedbacks =
            JSON.parse(localStorage.getItem("feedbacks")) || [];


        form.addEventListener("submit", function(event) {

            event.preventDefault();

            const feedback = {
                id: Date.now(),

                name: document.getElementById("name").value,

                email: document.getElementById("email").value,

                category:
                    document.getElementById("category").value,

                rating:
                    Number(document.getElementById("rating").value),

                text:
                    document.getElementById("feedback").value
            };

            feedbacks.push(feedback);

            saveData();

            form.reset();

            message.textContent =
                "✓ Feedback submitted successfully!";

            setTimeout(function() {
                message.textContent = "";
            }, 2500);

            displayFeedback();

            updateDashboard();
        });


        function saveData() {

            localStorage.setItem(
                "feedbacks",
                JSON.stringify(feedbacks)
            );
        }


        function displayFeedback() {

            if (feedbacks.length === 0) {

                container.innerHTML = `
                    <div class="empty">
                        <div class="empty-icon">📭</div>
                        <h3>No Feedback Yet</h3>
                        <p>Be the first person to submit feedback.</p>
                    </div>
                `;

                return;
            }


            container.innerHTML = feedbacks.map(item => {

                const stars =
                    "★".repeat(item.rating) +
                    "☆".repeat(5 - item.rating);

                return `
                    <div class="feedback-card">

                        <div class="user">

                            <div>
                                <h3>${item.name}</h3>
                                <p class="email">
                                    ${item.email}
                                </p>
                            </div>

                            <span class="category">
                                ${item.category}
                            </span>

                        </div>

                        <div class="stars">
                            ${stars}
                        </div>

                        <p class="feedback-text">
                            ${item.text}
                        </p>

                        <button
                            class="delete"
                            onclick="deleteFeedback(${item.id})"
                        >
                            Delete
                        </button>

                    </div>
                `;

            }).join("");
        }


        function deleteFeedback(id) {

            if (
                confirm("Do you want to delete this feedback?")
            ) {

                feedbacks =
                    feedbacks.filter(item => item.id !== id);

                saveData();

                displayFeedback();

                updateDashboard();
            }
        }


        function updateDashboard() {

            const total = feedbacks.length;

            document.getElementById("total").textContent =
                total;


            if (total === 0) {

                document.getElementById("average").textContent =
                    "0";

                document.getElementById("positive").textContent =
                    "0";

                return;
            }


            const totalRating =
                feedbacks.reduce(
                    (sum, item) => sum + item.rating,
                    0
                );


            const average =
                totalRating / total;


            const positive =
                feedbacks.filter(
                    item => item.rating >= 4
                ).length;


            document.getElementById("average").textContent =
                average.toFixed(1);


            document.getElementById("positive").textContent =
                positive;
        }


        displayFeedback();

        updateDashboard();
