class Ship {
  constructor(name) {
    //dynamic creation of different types of ships
    const nameList = {
      Carrier: 5,
      Battleship: 4,
      Cruiser: 3,
      Submarine: 3,
      Destroyer: 2
    }
    this.name = name
    this.length = nameList[name]
    this.hits = 0
  }

  hit() {
    this.hits++
  }

  isSunk() {
    return this.length === this.hits
  }
}

class GameBoard {
  constructor(size) {
    this.size = size
    // 2 arrays to 1) place the ship 2) to track isAttack or not
    this.board = Array.from({ length: size }, () => Array(size).fill(null))
    this.isAttack = Array.from({ length: size }, () => Array(size).fill(false))
    this.num = 0
  }


  // test if valid : edge and overlapping
  isPlacementValid(row, col, dir, ship) {
    // limiting the edge
    if (dir === 'horizontal') {
      if (col + ship.length > this.size) return false
    } else if (dir === 'vertical') {
      if (row + ship.length > this.size) return false
    }
    // check for overlapping: to see every grid the ship taken is null or not
    for (let i = 0; i < ship.length; i++) {
      const r = dir === 'horizontal' ? row : row + i;
      const c = dir === 'horizontal' ? col + i : col;
      if (this.board[r][c] !== null) return false;
    }

    return true
  }

  // place the ship
  placeShip(row, col, dir, ship) {
    if (!this.isPlacementValid(row, col, dir, ship)) return 'please enter valid coordinates'

    for (let i = 0; i < ship.length; i++) {
      const r = dir === 'horizontal' ? row : row + i;
      const c = dir === 'horizontal' ? col + i : col;
      // place the whole object instead of the property
      this.board[r][c] = ship
    }

  }

  // receiveAttack: take coordinates and determine if being attacked
  // not attacked
  // attack a empty cell
  // attack on the ship
  receiveAttack(col, row) {

    // coordinates out of range
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      return 'Attack out of bounds';
    }

    // already being attacked
    if (this.isAttack[row][col]) {
      return 'Cell already attacked';
    }

    this.isAttack[row][col] = true;
    const cell = this.board[row][col];
    // attack a empty cell
    if (cell === null) {
      return 'Missed attack';
    }

    cell.hit();
    if (cell.isSunk()) {
      this.num++
      return `Sunk`;
    }

    return 'Hit'

  }


}


class Player {
  constructor(name, gameboard) {
    this.name = name
    this.gameboard = gameboard
  }

  attack(opponent, col, row) {
    return opponent.gameboard.receiveAttack(col, row)
  }

  isWinning(opponent) {
    return opponent.gameboard.num === 5

  }

}





// test
const player1 = new Player('player1', new GameBoard(10))
const player2 = new Player('player2', new GameBoard(10))

// place the ships manually
const board1Ships = [
  { name: 'Carrier', row: 1, col: 2, dir: 'horizontal' },
  { name: 'Battleship', row: 5, col: 4, dir: 'vertical' },
  { name: 'Cruiser', row: 3, col: 7, dir: 'vertical' },
  { name: 'Submarine', row: 7, col: 1, dir: 'horizontal' },
  { name: 'Destroyer', row: 9, col: 6, dir: 'horizontal' }
];

const board2Ships = [
  { name: 'Carrier', row: 0, col: 3, dir: 'vertical' },
  { name: 'Battleship', row: 6, col: 2, dir: 'horizontal' },
  { name: 'Cruiser', row: 4, col: 7, dir: 'vertical' },
  { name: 'Submarine', row: 8, col: 0, dir: 'horizontal' },
  { name: 'Destroyer', row: 2, col: 8, dir: 'vertical' }
];

board1Ships.forEach(item => {
  const ship = new Ship(item.name)
  player1.gameboard.placeShip(item.row, item.col, item.dir, ship)
});

board2Ships.forEach(item => {
  const ship = new Ship(item.name)
  player2.gameboard.placeShip(item.row, item.col, item.dir, ship)
});


export {
  player1,

  player2
}





