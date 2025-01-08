import { player1, player2 } from "./ship_prototypes.js"
const container1 = document.querySelector('.player1_gameboard')
const container2 = document.querySelector('.player2_gameboard')

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const div = document.createElement('div')
    div.dataset.col = j
    div.dataset.row = i
    div.className = 'item'
    container1.appendChild(div)

  }

}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const div = document.createElement('div')
    div.dataset.col = j
    div.dataset.row = i
    div.className = 'item'



    container2.appendChild(div)
  }

}

// switch player
let currentPlayer = player1
currentPlayer === player1 ? container2.classList.toggle('mask') : container1.classList.toggle('mask')



const grids1 = document.querySelectorAll('.player1_gameboard .item ')
const grids2 = document.querySelectorAll('.player2_gameboard .item ')
grids2.forEach(item => item.addEventListener('click', () => {

  // stop clicking in other player's round
  if (currentPlayer !== player2) return

  const row = parseInt(item.dataset.row)
  const col = parseInt(item.dataset.col)

  const res = player2.attack(player1, col, row)

  if (res === 'Missed attack') {
    item.textContent = 'X'
    container1.classList.toggle('mask')
    container2.classList.toggle('mask')
    currentPlayer = currentPlayer === player1 ? player2 : player1
    return

  }

  if (res === 'Hit' || 'Sunk') {
    item.classList.add('hit')
    item.textContent = 'X'
  }

  if (player2.isWinning(player1)) return alert(player2.name + "wins")






}
))

grids1.forEach(item => item.addEventListener('click', () => {

  // stop clicking in other player's round
  if (currentPlayer !== player1) return

  const row = parseInt(item.dataset.row)
  const col = parseInt(item.dataset.col)

  const res = player1.attack(player2, col, row)
  console.log(res)

  if (res === 'Hit' || res === 'Sunk') {
    item.classList.add('hit')
    item.textContent = 'X'
  }

  if (res === 'Missed attack') {
    item.textContent = 'X'
    container1.classList.toggle('mask')
    container2.classList.toggle('mask')
    currentPlayer = currentPlayer === player1 ? player2 : player1
    return

  }

  if (player1.isWinning(player2)) return alert(player1.name + "wins")

}))






