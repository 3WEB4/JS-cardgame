(function () {
    'use strict';

    let pairs = 6;
    let cards = [];

    let flipCount = 0;
    let firstCard = null;
    let secondCard = null

    let startTime;
    let isRunning = false;
    let correctCount = 0;
    let timeoutId;
    let result = document.getElementById('result');
    let resultScore = document.getElementById('result__score');
    let resultComment = document.getElementById('comment')
    let list1 = document.querySelector('.list1')
    let list2 = document.querySelector('.list2')
    let list3 = document.querySelector('.list3')
    let list4 = document.querySelector('.list4')
    let list5 = document.querySelector('.list5')
    let list6 = document.querySelector('.list6')
    let fall = document.querySelector('.fall')
    let stage = document.getElementById('stage')






    function init() {
        let i;
        let card;
        for (i = 1; i <= pairs; i++) {
            cards.push(createCard(i))
            cards.push(createCard(i))
            // document.getElementById('stage').appendChild(createCard(i));
            // document.getElementById('stage').appendChild(createCard(i));
        }
        while (cards.length) {
            card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0]
            document.getElementById('stage').appendChild(card);

        }

    }






    function createCard(num) {
        let container;
        let card;
        let inner;


        inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>'
        card = document.createElement('div');
        card.innerHTML = inner;
        card.className = 'card';
        card.addEventListener('click', function () {
            flipCard(this);
            if (isRunning === true) {
                return;
            }
            isRunning = true;
            startTime = Date.now();
            runTimer();
            document.getElementById('restart').className = ''

        });
        container = document.createElement('div');
        container.className = 'card-container';
        container.appendChild(card);
        return container;



    }

    function flipCard(card) {
        if (firstCard !== null && secondCard !== null) {
            return;
        }
        if (card.className.indexOf('open') !== -1) {
            return;
        }

        card.className = 'card open'
        flipCount++;
        if (flipCount % 2 === 1) {
            firstCard = card;
        } else {
            secondCard = card;
            secondCard.addEventListener('transitionend', check)

        }
    }

    function check() {
        if (firstCard.children[0].textContent !==
            secondCard.children[0].textContent
        ) {
            firstCard.className = 'card'
            secondCard.className = 'card'
        } else {
            correctCount++;
            if (correctCount === pairs) {
                clearTimeout(timeoutId)
                result.style.display = 'block'

                if (score.textContent < 15) {
                    resultScore.textContent = '記録' + score.textContent + "秒";
                    resultComment.textContent = 'にんげんそつぎょうおめでとう!!!'

                    list1.style.color = 'red'
                    stage.style.display = 'none'
                    fall.textContent = 'うおおおお'
                    result.classList.add('bg6')
                    starMaker(50)
                } else if (score.textContent < 20) {
                    resultScore.textContent = '記録' + score.textContent + "秒";
                    resultComment.textContent = 'おおすごすぎ！！！'
                    list2.style.color = 'red'
                    fall.textContent = 'あと一歩！'
                    result.classList.add('bg5')
                } else if (score.textContent < 25) {
                    resultScore.textContent = '記録' + score.textContent + "秒";
                    resultComment.textContent = 'わりとはやい！'
                    list3.style.color = 'red'
                    fall.textContent = 'いい感じ！'
                    result.classList.add('bg4')
                } else if (score.textContent < 30) {
                    resultScore.textContent = '記録' + score.textContent + "秒";
                    resultComment.textContent = 'まぁまぁやね！'
                    list4.style.color = 'red'
                    fall.textContent = 'まだいける！'
                    result.classList.add('bg3')
                } else if (score.textContent < 35) {
                    resultScore.textContent = '記録' + score.textContent + "秒";
                    resultComment.textContent = 'すこしおそい！！'
                    list5.style.color = 'red'
                    fall.textContent = 'がんばれ～！'
                    result.classList.add('bg2')
                } else if (score.textContent > 35) {
                    resultScore.textContent = '記録' + score.textContent + "秒";
                    resultComment.textContent = 'おっそ！！！'
                    list6.style.color = 'red'
                    fall.textContent = 'おっそ！！！'
                    result.classList.add('bg1')
                }
            }
        }

        secondCard.removeEventListener('transitionend', check)
        firstCard = null;
        secondCard = null;
    }

    function runTimer() {
        document.getElementById('score').textContent = ((Date.now() - startTime) / 1000).toFixed(2)
        timeoutId = setTimeout(() => {
            runTimer();
        }, 10)
    }



    init();


    function starMaker(n) {
        var star = document.createElement("div");
        star.className = "star";
        star.textContent = "★";
        for (var i = 0; i < n; i++) {
            starSet(star);
        }
    }

    function starSet(clone) {
        var starClone = clone.cloneNode(true);
        var starStyle = starClone.style;


        starStyle.left = 100 * Math.random() + "%";
        starStyle.animationDelay = 8 * Math.random() + "s";
        starStyle.fontSize = ~~(50 * Math.random() + 20) + "px";
        document.body.appendChild(starClone);

        starClone.addEventListener("animationend", function () {
            this.parentNode.removeChild(this);
            var star = document.createElement("div");
            star.className = "star";
            star.textContent = "★";
            starSet(star);
        }, false)
    }






})();