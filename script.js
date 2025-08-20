        const $ = (q) => document.querySelector(q);
        let decks = {
            "Day 1 – Agents Basics": [
                {"q": "What is the OpenAI Agents SDK used for?", "a": "Building AI agents that can use tools and perform actions."},
                {"q": "Which programming language is most commonly used with the Agents SDK?", "a": "Python."},
                {"q": "What is the purpose of a tool in the Agents SDK?", "a": "To let the agent interact with external systems or perform actions."},
                {"q": "What does an agent typically consist of?", "a": "Goal, memory, tools, and reasoning ability."},
                {"q": "Which function is used to start running an agent?", "a": "runner.run()."},
                {"q": "What is the role of memory in an agent?", "a": "To store past interactions and context."},
                {"q": "What are tools usually defined as in the SDK?", "a": "Functions or APIs the agent can call."},
                {"q": "Which file usually stores API keys for safety?", "a": ".env."},
                {"q": "What is the difference between sync and async execution in Python?", "a": "Async allows non-blocking operations; sync does not."},
                {"q": "Why is error handling important in agents?", "a": "It ensures smooth recovery when tools or actions fail."}
            ],
            "Day 2 – Agent Tools": [
                {"q": "What does agent.step() do?", "a": "Runs a single reasoning–action cycle."},
                {"q": "What does runner.run() do?", "a": "Runs the agent until the task is completed."},
                {"q": "What is the benefit of structured tools?", "a": "Validate input and output with defined schemas."},
                {"q": "How are tool arguments usually validated?", "a": "Using JSON Schema."},
                {"q": "What is an output type?", "a": "The format the agent’s final answer should be in."},
                {"q": "Why are clear output types important?", "a": "They ensure reliable and predictable agent responses."},
                {"q": "What does memory allow agents to do?", "a": "Maintain context across multiple steps."},
                {"q": "What is the main purpose of an agent?", "a": "Achieve goals by reasoning and using tools."},
                {"q": "Which SDK object represents the agent itself?", "a": "Agent."},
                {"q": "Which SDK object manages the loop execution?", "a": "Runner."}
            ],
            "Day 3 – Workflows": [
                {"q": "What is tool registration?", "a": "Making tools available to an agent."},
                {"q": "Why do we register tools?", "a": "So the agent knows what tools it can use."},
                {"q": "What happens if an agent calls an unregistered tool?", "a": "It fails with an error."},
                {"q": "Example of a tool?", "a": "Weather API or calculator."},
                {"q": "What is prompt engineering in Agents SDK?", "a": "Shaping prompts to guide reasoning and tool use."},
                {"q": "How does the SDK connect to external APIs?", "a": "Through registered tools."},
                {"q": "Risk of letting agents call tools?", "a": "Security issues if tools are not sandboxed."},
                {"q": "Safe practice when building tools?", "a": "Validate inputs and restrict dangerous actions."},
                {"q": "If a tool raises an exception?", "a": "Handle via error handling and retries."},
                {"q": "What is Chainlit often used for?", "a": "Front-end UIs for agents."}
            ],
            "Day 4 – Async & Reliability": [
                {"q": "What does asyncio provide?", "a": "Support for asynchronous programming."},
                {"q": "What does async I/O mean?", "a": "Tasks can progress without blocking each other."},
                {"q": "Sync vs async?", "a": "Sync blocks; async allows concurrency."},
                {"q": "Why is async useful in agents?", "a": "Handle multiple tool calls efficiently."},
                {"q": "Keyword for async functions?", "a": "async def."},
                {"q": "Keyword to wait for async results?", "a": "await."},
                {"q": "Forget to await an async function?", "a": "You get a coroutine object, not a result."},
                {"q": "Example async usage in agents?", "a": "Calling multiple APIs at once."},
                {"q": "What is a coroutine?", "a": "Function that can be paused and resumed."},
                {"q": "What is the event loop?", "a": "The core of asyncio that schedules and runs tasks."}
            ],
            "Day 5 – Advanced Concepts": [
                {"q": "What does the Agents SDK primarily enable?", "a": "Creating agents that can use tools and reason."},
                {"q": "Which component automates execution until completion?", "a": "Runner."},
                {"q": "Which component handles reasoning and tool usage?", "a": "Agent."},
                {"q": "Why are tools important?", "a": "They let the agent perform external actions."},
                {"q": "Why is memory useful?", "a": "Keeps track of past interactions."},
                {"q": "Role of output types?", "a": "Define the format of final results."},
                {"q": "Single cycle method?", "a": "agent.step()."},
                {"q": "Whole loop method?", "a": "runner.run()."},
                {"q": "Why validate tools?", "a": "Ensure correct input/output."},
                {"q": "What does prompt engineering influence?", "a": "How the agent reasons and uses tools."}
            ],
            "Day 6 – Deepening Skills": [
                {"q": "What does the Agent object primarily represent?", "a": "The central AI agent with memory, goal, and actions."},
                {"q": "Method for a single step of the loop?", "a": "agent.step()."},
                {"q": "runner.run() vs agent.step()?", "a": "run() full loop; step() one iteration."},
                {"q": "What are structured tools?", "a": "Tools defined with argument schemas (JSON Schema)."},
                {"q": "Why define tool argument schemas?", "a": "Validate inputs and guide outputs."},
                {"q": "Role of Runner?", "a": "Executes loop connecting agent and tools until done."},
                {"q": "How handle external APIs?", "a": "Wrap them as registered tools."},
                {"q": "Which feature preserves state across conversations?", "a": "Memory."},
                {"q": "What are output types?", "a": "Format of the agent’s final result."},
                {"q": "Why error handling?", "a": "Recover from tool failures and prevent crashes."}
            ]
        };

        let currentDeck = [];
        let currentIndex = 0;
        let showingAnswer = false;
        let known = 0, unknown = 0;

        function startDeck(day) {
            currentDeck = [...decks[day]];
            currentIndex = 0;
            known = 0;
            unknown = 0;
            renderCard();
            updateProgress();
        }

        function renderCard() {
            if (currentDeck.length === 0) {
                $("#cardContent").textContent = "No cards";
                return;
            }
            const card = currentDeck[currentIndex];
            $("#cardContent").textContent = showingAnswer ? card.a : card.q;
        }

        function flipCard() {
            showingAnswer = !showingAnswer;
            renderCard();
        }

        function nextCard() {
            if (currentIndex < currentDeck.length - 1) {
                currentIndex++;
                showingAnswer = false;
                renderCard();
                updateProgress();
            }
        }

        function prevCard() {
            if (currentIndex > 0) {
                currentIndex--;
                showingAnswer = false;
                renderCard();
                updateProgress();
            }
        }

        function markKnown() {
            known++;
            nextCard();
            updateProgress();
        }

        function markUnknown() {
            unknown++;
            nextCard();
            updateProgress();
        }

        function updateProgress() {
            $("#progressText").textContent = (currentIndex + 1) + " / " + currentDeck.length;
            $("#knownStats").textContent = "Known: " + known + " • Unknown: " + unknown;
            $("#progressFill").style.width = ((currentIndex + 1) / currentDeck.length * 100) + "%";
        }

        function shuffleDeck() {
            currentDeck.sort(() => Math.random() - 0.5);
            currentIndex = 0;
            showingAnswer = false;
            renderCard();
            updateProgress();
        }
        
        // Event listeners
        $("#flipBtn").addEventListener("click", flipCard);
        $("#nextBtn").addEventListener("click", nextCard);
        $("#prevBtn").addEventListener("click", prevCard);
        $("#knownBtn").addEventListener("click", markKnown);
        $("#unknownBtn").addEventListener("click", markUnknown);
        $("#shuffleBtn").addEventListener("click", shuffleDeck);
        $("#resetBtn").addEventListener("click", () => startDeck($("#deckSelect").value));
        $("#deckSelect").addEventListener("change", () => startDeck($("#deckSelect").value));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            switch (e.key) {
                case 'ArrowLeft':
                    prevCard();
                    break;
                case 'ArrowRight':
                    nextCard();
                    break;
                case ' ':
                    e.preventDefault();
                    flipCard();
                    break;
                case '1':
                    markKnown();
                    break;
                case '2':
                    markUnknown();
                    break;
                case 's':
                case 'S':
                    shuffleDeck();
                    break;
            }
        });

        // Initial load
        window.onload = function() {
            const deckSelect = $("#deckSelect");
            Object.keys(decks).forEach(day => {
                const opt = document.createElement("option");
                opt.value = day;
                opt.textContent = day;
                deckSelect.appendChild(opt);
            });
            startDeck(Object.keys(decks)[0]);
        };
