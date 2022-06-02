// Задачи
// 1) Создать 3d блок
// 2) Создавать точки в рандомном месте этого блока
// 3) Соединять эти точки линиями
// 4) Эти точки должны менять положение по всем осям

document.addEventListener('DOMContentLoaded', e => {
    function createLines(parent, number) {

        const parentBlock = document.querySelector(parent);
        
        create3D();
    
        createDots();
    
        function create3D() {
            const newBlock = document.createElement('div');
            newBlock.classList.add('vision');
    
            newBlock.style.cssText = `
                transform-style: preserve-3d;
                width: 100%;
                height: 100%;
                background: black;
            `;
    
    
            parentBlock.append(newBlock);
        }
    
    
        function createDots() {
            const  parent = document.querySelector('.vision'),
                    parentWidth = parent.offsetWidth,
                    parentHeigth = parent.offsetHeight;
            for(let i = 0; i < number; i++ ){
                const dot = document.createElement('div'),
                      top = random(parentHeigth),
                      left = random(parentWidth),
                      delay = randomFromTo(20000, 2000),
                      topAnimate = random(parentHeigth),
                      leftAnimate = random(parentWidth);


                dot.classList.add('dot');
                dot.classList.add(`animate${i}`);
        
                parent.append(dot);
    
                dot.style.cssText = `
                    position: absolute;
                    background: white;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                `;
                
                document.querySelector(`.animate${i}`).animate([
                    { 
                        top: `${top}px`,
                        left: `${left}px`,
                        opacity: 0 
                    },
                    { 
                        top: `${(top + topAnimate)/2}px`,
                        left: `${(left + leftAnimate)/2}px`,
                        opacity: 1
                    }, 
                    { 
                        top: `${topAnimate}px`,
                        left: `${leftAnimate}px`,
                        opacity: 0  
                    }
                  ], {
                    duration: delay,
                    iterations: Infinity
                })
                
            }
            
        }


        function createDotsLines() {

            for(let i = 0; i < 100; i++) {
                const lineBlock = document.createElement('div'),
                      parent = document.querySelector('.vision');
                lineBlock.classList.add('lineAnimate')
                parent.append(lineBlock);
            }

            document.querySelectorAll('.lineAnimate').forEach((elem, i) => {
            const delay = randomFromTo(20000, 2000);

                elem.animate([
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0
                    }
                ], {
                    duration: delay,
                    iterations: Infinity
                });
                const interval = setInterval(() => {
                    
                    const top1 = document.querySelectorAll('.dot')[i].offsetTop + 5,
                            left1 = document.querySelectorAll('.dot')[i].offsetLeft + 5,
                            top2 = document.querySelectorAll('.dot')[i-1].offsetTop + 5,
                            left2 = document.querySelectorAll('.dot')[i-1].offsetLeft + 5;

    
                    const angl = Math.atan( (top2-top1) / (left2-left1) ) * 180 / Math.PI,
                        anglRad = angl * Math.PI / 180,
                        widthLine = Math.sqrt(Math.pow(top2 - top1, 2) + Math.pow(left2 - left1, 2));
    
                    let topTotal,
                    leftTotal;
                                    
                    if ((left1 <= left2 && top1 <= top2) || (left1 <= left2 && top1 > top2)) {
                        topTotal = top1 + widthLine/2 * Math.sin(anglRad);
                        leftTotal = left1 - (widthLine/2 - widthLine/2 * Math.cos(anglRad));
                    } else if ((left1 > left2 && top1 <= top2) || (left1 > left2 && top1 > top2)) {
                        topTotal = top2 + widthLine/2 * Math.sin(anglRad);
                        leftTotal = left2 - (widthLine/2 - widthLine/2 * Math.cos(anglRad));
                    } 
    
                    elem.style.cssText = `
                        position: absolute;
                        width: ${widthLine}px;
                        transform: rotate(${angl}deg);
                        height: 1px;
                        background: grey;
                        top: ${topTotal}px;
                        left: ${leftTotal}px;
                    `;
    
                }, 0)

            });
            
        }
        createDotsLines();
    
    }
    
    function randomFromTo(max, min) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function random(num) {
        return Math.floor(Math.random() * num);
    }

    createLines('.lines', 100)
})


