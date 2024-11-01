// 모든 식물 요소 가져오기
const plants = document.querySelectorAll('.plant');

// 각 식물 요소에 드래그 앤 드롭 이벤트 리스너 추가
plants.forEach(plant => {
    plant.draggable = true; // 드래그 가능 설정
    plant.addEventListener('dragstart', dragStart);
    plant.addEventListener('dragend', dragEnd);
    plant.addEventListener('dblclick', bringToFront); // 더블 클릭으로 최상위 배치
});

// 테라리움 영역 가져오기
const terrarium = document.getElementById('terrarium');

// 테라리움에 드래그 오버 및 드롭 이벤트 추가
terrarium.addEventListener('dragover', dragOver);
terrarium.addEventListener('drop', drop);

// 드래그가 시작될 때 실행
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.style.opacity = '0.6'; // 드래그 중 투명도 조정
}

// 드래그가 끝날 때 실행
function dragEnd(event) {
    event.target.style.opacity = '1'; // 드래그 후 원래 투명도로 복원
}

// 드래그 요소가 테라리움 위에 있을 때 실행
function dragOver(event) {
    event.preventDefault(); // 기본 동작 방지하여 드롭 허용
}

// 드롭 시 실행
function drop(event) {
    event.preventDefault(); // 기본 동작 방지

    const id = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(id);

    // 드래그한 요소를 테라리움 안으로 이동
    if (draggedElement.parentNode !== terrarium) {
        terrarium.appendChild(draggedElement);
    }

    // 드롭 위치를 테라리움 내의 좌표로 계산
    const terrariumRect = terrarium.getBoundingClientRect();
    const dropX = event.clientX - terrariumRect.left - (draggedElement.clientWidth / 2);
    const dropY = event.clientY - terrariumRect.top - (draggedElement.clientHeight / 2);

    // 드롭된 위치에 요소 배치, transform 없이 위치 조정
    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${dropX}px`;
    draggedElement.style.top = `${dropY}px`;
}

// 더블 클릭 시 요소를 최상위로 배치
function bringToFront(event) {
    console.log("dbclicked");
    event.preventDefault();
    const TopPlant = document.getElementsByClassName("plant");
    let highestZIndex = 2;

    // 모든 식물 요소의 zIndex 중 가장 높은 값 찾기
    for(let i = 0; i< TopPlant.length ; i++) {
        if(TopPlant[i].style.zIndex > highestZIndex) {
            highestZIndex = TopPlant[i].style.zIndex;
        }
    }

    // 현재 요소의 zIndex를 가장 높은 값 + 1로 설정
    event.currentTarget.style.zIndex = highestZIndex + 1;
}
