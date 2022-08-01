var players 
var answer
var day
var input

fetch("player_data.json")
    .then(response => response.json()).then(resp => {players=resp.players; answer= players[resp.answer]; day =resp.day})


var guesses = []

function clear_suggestions() {
    document.getElementById('suggestions').innerHTML = ''
}

function ready() {
    input = document.getElementById('name')
    input.addEventListener("keyup", function(event) {
        let curr = 0
        if (input.value.length == 0) {
            clear_suggestions()
            return
        }
        clear_suggestions()
        for (let key in players) {
            if (key.startsWith(input.value.toLowerCase()) && curr < 6) {
                curr ++
                console.log(curr, key)
                newElem = document.createElement("div")
                newElem.setAttribute('class', 'item')
                newElem.innerHTML = `<strong>${players[key][0]}</strong>`
                document.getElementById('suggestions').appendChild(newElem)
                newElem.addEventListener('click', function(click) {
                    let name = players[key][0]
                    input.value = name
                    clear_suggestions()
                })
            }
        } 


        if (event.key === "Enter") {
            play()
        }
        
    });

}

function play() {
    pname = input.value.toLowerCase();
    input.value = ''
    clear_suggestions()
    if (pname in players) {
        document.querySelectorAll('.box').forEach(element => {
            element.classList.remove('box')
        });
        var guesss = []
        let player = players[pname]
        if (player == answer) {
            html = `<tr class="box"><td class="green">${player[0]}</td>`
            guesss.push(129001)
        } 
        else {
            html = `<tr class="box"><td class="">${player[0]}</td>`
            guesss.push(0x1F7E5)
        } 

        guesss.push(32)
        
        if (player[1] == answer[1]) {
            html += `<td class=" green">${player[1]}</td>`
            guesss.push(129001) /* Green */
        }
        else if (player[2] == answer[2]) {
            html += `<td class=" yellow">${player[1]}</td>`
            guesss.push(0x1F7E8)
        }
        else {
            html += `<td class="">${player[1]}</td>`
            guesss.push(0x1F7E5)
        }

        if (player[3] == answer[3]) {
            html += `<td class=" green">${player[3]}</td><td>`
            guesss.push(129001)
        } 
        else { 
            html += `<td class="">${player[3]}</td><td>`
            guesss.push(0x1F7E5)
        }

        guesss.push(32)

        player[4].map(
            function (agent, i) {
                if (answer[4][i] == agent) {
                    html += `<img class="rounded border-green" src="assets/${agent}_icon.png">`
                    guesss.push(129001)
                }
                else if (answer[4].includes(agent)) {
                    html += `<img class="rounded border-yellow" src="assets/${agent}_icon.png">`
                    guesss.push(0x1F7E8)
                }
                else {
                    console.log('Unique agents')
                    html += `<img class="border-4 rounded" src="assets/${agent}_icon.png">`
                    guesss.push(0x1F7E5)
                }
            }
        )

        guesss.push(32)
        /* IGL */
        if (answer[5] == player[5]) {
            if (answer[5]) {
                html += `<td class=" green">Is IGL</td>`
                guesss.push(129001)
            }
            else {
                html += `<td class=" green">Not IGL</td>`
                guesss.push(129001)
            }
        }
        else {
            if (player[5]) {
                html += `<td class="">Is IGL</td>`
                guesss.push(0x1F7E5)
            }
            else {
                html += `<td class="">Not IGL</td>`
                guesss.push(0x1F7E5)
            }
        }
        html += "</tr>"
        document.getElementById('data').innerHTML += html
        guesses.push(String.fromCodePoint(...guesss))

        document.getElementById('timer').innerHTML = `${guesses.length}/8`

        if (player == answer | guesses.length == 8) {
            document.getElementById('name').disabled = true
            document.getElementById('submit').disabled = true
            if (guesses.length == 8 && player != answer){
                document.getElementById('exampleModalLabel').innerHTML = `Nice try, but not there yet! The answer to today's Valorantle is ${answer[0]}.`
            }
            else {
                document.getElementById('exampleModalLabel').innerHTML = `Well played, you guessed today's Valorantle!`               
            }
            var modal = new bootstrap.Modal(document.getElementById('exampleModal'))
            modal.show()
        }
    }
}

function copy_result() {
    navigator.clipboard.writeText(`Valorantle #${day} ${guesses.length}/8\n\n` + guesses.join('\n') + '\n\nhttps://valorantle.melro5e.com')
}