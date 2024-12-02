const todo = {
    run() {
        const HTML = localStorage.getItem("task")

        if (HTML) {
            document.querySelector(".app__list").innerHTML = HTML
        }
        
        document.addEventListener('click', this.onClick.bind(this))
    },
    createHTML(text) {
        return `<div class="app__list-item">
                    <input class="app__list-checkbox" type="checkbox">
                    <p class="app__list-text">${text}</p>
                    <button><img class="app__list-deleted" src="/assets/trash.svg" alt="trash"></button>
                </div>`
    },
    addTask() { 
        const inputText = document.querySelector(".app__controls-input")

        if (!inputText.value.length) return

        document.querySelector(".app__list").insertAdjacentHTML('afterbegin', this.createHTML(inputText.value))
        inputText.value = ''
    },
    onClick(e) {
        if (e.target.className === "app__controls-button") {
            this.addTask()
            this.save()
        } else if (e.target.className === "app__list-deleted") {
            e.target.closest(".app__list-item").remove()
            this.save()
        } else if (e.target.closest(".app__list-item")) {
            const taskItem = e.target.closest(".app__list-item");
            const checkbox = taskItem.querySelector(".app__list-checkbox");

            if (!taskItem.classList.contains("completed")) {
                taskItem.classList.add("completed");
                checkbox.checked = true;
            } else {
                taskItem.classList.remove("completed");
                checkbox.checked = false;
            }
            this.save()
        }

    },
    save() {
        localStorage.setItem('task', document.querySelector(".app__list").innerHTML)
    }

}

todo.run()