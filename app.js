/* 게임 변수 3개 선언 */
const STARTING_POKER_CHIPS = 100; // points
const PLAYERS = 3;
const NO_OF_STARTER_CARDS = 2;

let playerOneName = "Chloe";
let playerTwoName = "Jasmine";
let playerThreeName = "Jen";

/* 3개의 플레이어 시작 점수 할당 */
let playerOnePoints = STARTING_POKER_CHIPS;
let playerTwoPoints = STARTING_POKER_CHIPS;
let playerThreePoints = STARTING_POKER_CHIPS;

/* 점수 배팅 */
playerOnePoints -= 50;
playerTwoPoints -= 25;
playerThreePoints += 75; 


console.log(`Welcome! 챔피언십 타이틀은 ${playerOneName}, ${playerTwoName}, ${playerThreeName} 중 한 명에게 주어집니다. 선수는 $(STARTING_POKER_CHIPS) 의 칩을 가지고 시작합니다. 흥미로운 경기가 될 것입니다. 최고의 선수가 승리하길 바랍니다!');

