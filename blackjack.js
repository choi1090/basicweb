let cardOne = 7;
let cardTwo = 5;
//let sum = cardOne + cardTwo;
let cardOneBank = 7;
let cardTwoBank = 5;
//let cardThreeBank = 6;
//let cardFourBank = 4;


//랜덤의 카드 가져오는 함수
function getRandomCard(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}


//플레이어의 카드뽑기
let sum = getRandomCard(1, 10) + getRandomCard(1, 10)
//let cardThree = 7;
while (true) {
    if (sum == 21) {
        console.log('BLACKJACK!!');
        break;
    } else if (sum > 21) {
        console.log('You lost');
        break;
    } else {
        sum += getRandomCard(1, 10); }
}
//console.log('You have ${sum} points');


//딜러의 카드뽑기
let bankSum = getRandomCard(1, 10) + getRandomCard(1, 10)
//let bankSum = cardOneBank + cardTwoBank;     // + cardThreeBank + cardFourBank;
while (bankSum < 17) {
    //console.log('Bank, take more card');
    bankSum += getRandomCard(1, 10);
    
    if (bankSum >= 17) {
        //console.log('Bank, stop.');
        break;
    } 
}


if (bankSum > 21 || (sum <= 21 && sum > bankSum)) {
    console.log('You win');
} else if (sum == bankSum) {
    console.log('Draw');
} else if (bankSum > 21 && sum > 21) {
    console.log('No winner')
} 
else {
    console.log('Bank wins');
}
console.log('Player score : ' + sum + ' Bank Score : ' + bankSum);