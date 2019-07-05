function getClickBtn(btn) {
  if(btn != undefined) {
    //console.log(btn);
    const maxLength = 24;
    var lines = document.getElementById('result').value.split('\n');//разбиваем содержимое textarea по строкам
    var str = lines[0]; //набираемое выражение
    var strLength = str.length;
    var numbers = ['1','2','3','4','5','6','7','8','9','0'];
    switch(true) {
      case btn == 'backspace':
        if(lines[1] != '=') {//удаляем предыдущий символ из выражения
          str = str.slice(0, -1);
        } else { //ничего в textarea не менять -  переписываем в textarea всё как есть
          str = str + '\r\n' + '=' + '\r\n' + lines[2];
        }
        break;
      case btn == 'C':
        str = '';
        break;
      case btn in numbers:
        if(strLength < maxLength) {
          if(lines[1] != '=') {
            str += btn;
          } else {//если уже был отображен результат вычислений, то затираем его, записывая нажатую цифру
            str = btn;
          }
        }
        if(strLength == maxLength && lines[1] == '=') { //если строка полная и уже был отображен результат вычислений, то ничего в textarea на 2-ой и 3-ей линиях не менять -  переписываем как есть
          str = str + '\r\n' + '=' + '\r\n' + lines[2];
        }
        break;
      case btn == '.':
        if(strLength < (maxLength - 1)) {
          if(str.slice(-1) in numbers && lines[1] != '=') {//если последний символ - цифра, то ставим после неё зяпятую
            str = str + btn;
          } else if(str == '' || lines[1] == '=') {//если пусто или уже был отображен результат вычислений, то затираем его, записывая "0,"
            str = '0.';
          }
        }
        if(strLength >= (maxLength - 1) && lines[1] == '=') { //если строка полная и уже был отображен результат вычислений, то ничего в textarea на 2-ой и 3-ей линиях не менять -  переписываем как есть
          str = str + '\r\n' + '=' + '\r\n' + lines[2];
        }
        break;
      case btn == '+':
      case btn == '-':
      case btn == '*':
      case btn == '/':
        if(str != '' && strLength < maxLength) {//добавляем в выражение знак только когда уже записано число
          if(lines[1] == '=') {
            str = lines[2] + btn;
          } else if(str.slice(-1) in numbers) {
            str += btn;
          }
        }
        // нужно доработать, чтоб сравнивалась длинна 3-ей линии textarea, а не 1-ой  
        if(strLength == maxLength && lines[1] == '=') { //если строка полная и уже был отображен результат вычислений, то ничего в textarea на 2-ой и 3-ей линиях не менять -  переписываем как есть
          str = str + '\r\n' + '=' + '\r\n' + lines[2];
        }
        break;
      case btn == '=':
        if(str != '') {
          if(str.slice(-1) in numbers) { //проверяем последний символ в выражении - должна быть цифра
            str = str + '\r\n' + '=' + '\r\n' + calc(str);
          } else {// если не цифра, то удаляем из выражения последний символ и вычисляем выражение без него
            str = str.slice(0, -1) + '\r\n' + '=' + '\r\n' + calc(str.slice(0, -1));
          }
        }
        break;
    }
    document.getElementById('result').value = str;
  }
}

function calc(str) {
  var result = eval(str);
  if(result === Infinity) {
    result = 'Делить на ноль нельзя!';
  }
  if(isNaN(result)) {
    result = 'Результат не определен';
  }
  return result;
}

function clickBtn() {//прописываем ко всем кнопкам калькулятора обработчик событий
  var elements = document.querySelectorAll('input.calc-btn');
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('onclick', 'getClickBtn(this.value)');
  }
}
