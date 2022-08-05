$('#startBtn').click(function () {
  $('#startBtn').html('finish');
  $('#finishBtn').removeClass('d-none');
  this.classList.add('d-none');

  let cardsArr = $('main').children();

  function randomize (array, num) {  //функа рандомной сортировки
    array.sort(() => Math.random() - num);
  }

  randomize(cardsArr, 0.5); // вызываем и сортируем наш массив

  $('main').children().remove(); //удаляем все карточки

  for (let i = 0; i < cardsArr.length; i++) {  // циклом проходим по новым отсортированным карточкам и аппендим их в родительский блок
    $('main').append(cardsArr[i]);
  }

  setTimeout(function () { // "включаем" режим игры
    $('.card').css('transform', 'rotate3d(0, 1, 0, 180deg)');
    $('.card').css('background', '#000');
    $('.card img').css('opacity', '0');
  }, 500);

  let counter = 0;
  let allCounts = 0

  let arr = [];
  $('.card').click(function () { // по клику показываем карточку
    counter++
    this.style.transform = 'none';
    this.style.background = '#fff';
    this.childNodes[1].style.opacity = '1';
    arr.push(this);
    if (arr.length === 2) {
      let first = arr[0];
      let second = arr[1];
      if (first.childNodes[1].attributes.src.nodeValue !== second.childNodes[1].attributes.src.nodeValue) {
        setTimeout(function () {
          first.style.transform = 'rotate3d(0, 1, 0, 180deg)';
          first.style.background = '#000';
          first.childNodes[1].style.opacity = '0';
          second.style.transform = 'rotate3d(0, 1, 0, 180deg)';
          second.style.background = '#000';
          second.childNodes[1].style.opacity = '0';
        }, 500);
      } else {
        allCounts++
      }
      counter = 0;
      arr = [];
    }
    if (allCounts === 5) {
      console.log('You win');
      $('.modal-win').fadeIn();
      $('.dark-block').fadeIn();
      $('#playAgainBtn').click(function () {
        location.reload();
      })
    }
  })
})


$('#finishBtn').click(function (e) {
  $('.card').css('transform', 'none');
  $('.card').css('background', '#fff');
  $('.card').children('img').css('opacity', '1');
  setTimeout(function () {
    location.reload();
  }, 1000);
});


for (let i = 0; i < document.querySelectorAll('.card').length; i++) {  // отменяем drag картинки, чтоб не подсматривали
  document.querySelectorAll('.card')[i].ondragstart = function () {
    return false;
  }
}