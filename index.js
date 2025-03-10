const characters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

const numberToggle = document.querySelector("#numberToggle")
const symbolToggle = document.querySelector("#symbolToggle")
const darkmodeToggle = document.querySelector("#darkmodeToggle")
const copy1 = document.querySelector("#copy1")
const copy2 = document.querySelector("#copy2")
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
let darkmodeValue = document.querySelector("#darkmode")

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    let darkmodeValue = document.querySelector("#darkmode")

    if (currentTheme === 'dark') {
        darkmodeValue.checked = true;
        darkmodeToggle.classList.toggle("fa-sun-bright")
        darkmodeToggle.classList.toggle("fa-moon")
    }
}

function generateStructureMap(structLen, includeNumbers, includeSymbols) {
    let structure = [...Array(structLen).keys()].map(i => i = i + 1)

    if (includeNumbers) {
        let count = Math.floor(structLen * 0.15)
        if (count < 1) {count = 1}
        for (let i = 0; i < count; i++ ) {
            let randNum = Math.floor(Math.random() * structure.length)
            if (structure.includes(randNum)) {
                let index = structure.indexOf(randNum)
                structure[index] = "n"
            } else {
                i -= 1
            }
        }
    }

    if (includeSymbols) {
        let count = Math.floor(structLen * 0.15)
        if (count < 1) {count = 1}
        for (let i = 0; i < count; i++ ) {
            let randNum = Math.floor(Math.random() * structure.length)
            if (structure.includes(randNum)) {
                let index = structure.indexOf(randNum)
                structure[index] = "s"
            } else {
                i -= 1
            }
        }
    }

    for (let i = 0; i < structure.length; i++ ) {
        if (typeof structure[i] === 'number') {
            structure[i] = "c"
        }
    }
    return structure
}


function generateRandStr(strLen, num, sym) {
    let randArr = []
    let structMap = generateStructureMap(strLen, num, sym)
    for (let i = 0; i < strLen; i++) {
        if (structMap[i] === "c") {
            let choice = Math.floor(Math.random() * characters.length)
            randArr.push(characters[choice])
        } else if (structMap[i] === "n") {
            let choice = Math.floor(Math.random() * numbers.length)
            randArr.push(numbers[choice])
        } else if (structMap[i] === "s") {
            let choice = Math.floor(Math.random() * symbols.length)
            randArr.push(symbols[choice])
        }
    }
    return randArr.join("")
}

function generatePassword() {
    let lengthEl = document.getElementById('length')
    let numbersCheckEl = document.getElementById('numbers')
    let symbolsCheckEl = document.getElementById('symbols')
    let resultOneEl = document.getElementById('result1')
    let resultTwoEl = document.getElementById('result2')

    let passwordLength = Number(lengthEl.value)
    let numbersCheck = numbersCheckEl.checked
    let symbolsCheck = symbolsCheckEl.checked

    const password1 = generateRandStr(passwordLength, numbersCheck, symbolsCheck)
    const password2 = generateRandStr(passwordLength, numbersCheck, symbolsCheck)

    resultOneEl.value = password1
    resultTwoEl.value = password2

}

function toggleSwitch(e, checkboxId) {
    e.target.classList.toggle("fa-toggle-on")
    e.target.classList.toggle("fa-toggle-off")

    let el = document.querySelector(`#${checkboxId}`)

    if (el.checked) {
        el.checked = false
    } else {
        el.checked = true
    }
}

function toggleDarkmode(e) {
    // darkmode code from https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8
    darkmodeToggle.classList.toggle("fa-sun-bright")
    darkmodeToggle.classList.toggle("fa-moon")
    let darkmodeValue = document.querySelector("#darkmode")

    if (darkmodeValue.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        darkmodeValue.checked = false
    }
    else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkmodeValue.checked = true
    }
}

function copyResult(id) {
    // copy to clipboard code from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    let el = document.querySelector(`#${id}`)

    // Select the text field
    el.select();
    el.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(el.value);

    // Alert the copied text
    // alert("Copied the text: " + el.value);

}

numberToggle.addEventListener("click", function(e) { toggleSwitch(e, "numbers") })
symbolToggle.addEventListener("click", function(e) { toggleSwitch(e, "symbols") })
darkmodeToggle.addEventListener("click", toggleDarkmode)
copy1.addEventListener("click", function() {copyResult("result1")})
copy2.addEventListener("click", function() {copyResult("result2")})
