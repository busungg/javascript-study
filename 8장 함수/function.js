/**
 * ---------------------------------------------------
 * 함수 선언 구문 vs 함수 표현식
 * Q: 함수 표현식도 var 문은 끌어올려지는데
 *    왜 자바스크립트 구문에서 모두 사용될 수 있는가?
 * A: 식별자는 끌어올려지지만 초기화는 해당 구문에서
 *    진행되기 때문에 조건문에 해당되지 않으면 function
 *    이 할당되지 않는다.
 * ---------------------------------------------------
 */

/**
 * ---------------------------------------------------
 * Arguments
 * Q: 원시 타입은 값이므로 값이 복사된다.
 *    그렇다면 Arguments가 변해도 매개변수가 변하지 않을 것 이다.
 * A: 아니다.
 *    식별자는 메모리 주소를 바라보고 있는데 arguments또한 같은
 *    메모리 주소를 바라보고 있기 때문에 값이 변경되서
 *    동일하게 변경된다.
 * ---------------------------------------------------
 */

function argumentTest(x) {
  console.log(x);
  arguments[0] = 10;
  console.log(x);
}

argumentTest(1);

/**
 * ---------------------------------------------------
 * 함수 프로퍼티
 * Q: 함수 프로퍼티를 사용해보자
 * A:
 * ---------------------------------------------------
 */
(function () {
  function factorial(n) {
    if (isFinite(n) && n > 0 && n == Math.round(n)) {
      //유한, 양의 정수만 받음
      if (!(n in factorial)) {
        //만약 캐시 해둔 결과가 없다면
        factorial[n] = n * factorial(n - 1); // 팩터리얼을 계산하고, 계산 값 캐시
      }

      return factorial[n];
    } else {
      return NaN; //잘못된 입력 값이 들어오면 NaN을 반환한다.
    }
  }
  factorial[1] = 1;

  console.log(factorial(10));
  console.dir(factorial);
})();

/**
 * ---------------------------------------------------
 * 함수형 프로그래밍
 * Q: 함수형 프로그래밍을 사용해보자
 * A:
 * ---------------------------------------------------
 */
(function () {
  function compose(f, g) {
    return function () {
      //f는 하나의 값만 넘기기 때문에 call을 사용하고
      //g에는 값 배열을 넘겨야 하기 때문에 apply를 사용한다.
      return f.call(null, g.apply(null, arguments));
    };
  }

  var square = function (x) {
    return x * x;
  };
  var sum = function (x, y) {
    return x + y;
  };
  var squareofsum = compose(square, sum);
  console.log(squareofsum);

  console.log(squareofsum(2, 3));
})();

(function () {
  function array(a, n) {
    //메서드가 this 값을 사용하면 매개변수로 전달한 this를 사용한다고 생각한다.
    return Array.prototype.slice.call(a, n || 0);
  }

  //array 테스트
  function arrayTest() {
    return array(arguments, 1);
  }

  console.log(arrayTest(1, 2, 3, 4, 5));

  //이 함수에 전달된 인자는 대상 함수의 인자 목록에 대해 왼쪽으로 전달된다.
  function partialLeft(f /*,...*/) {
    var args = arguments; //외부 인자 배열을 저장한다.
    return function () {
      /**
       * 제일 중요한점
       * 내부 function의 arguments랑 외부 function의 arguments의 내용은 다르다.
       * 그 이유는 호출 시점이 다르기 때문이다.
       */

      //함수를 반환
      var a = array(args, 1); //외부 인자의 1번 인덱스부터 시작(0번은 함수 f)
      a = a.concat(array(arguments)); //이후, 이 내부 함수로 전달된 모든 인자를 추가
      return f.apply(this, a); //그 다음, 지금까지 만든 인자 목록으로 f를 호출
    };
  }

  //이 함수에 전달된 인자는 대상 함수의 인자 목록에 대해 오른쪽으로 전달된다.
  function partialRight(f) {
    var args = arguments;
    return function () {
      var a = array(arguments); //먼저 내부 함수에 전달된 인자로 시작
      a = a.concat(array(args, 1)); //외부 인자의 1번 인덱스부터 나머지를 추가
      return f.apply(this, a); //이후, 지금까지 만든 인자 목록으로 f를 호출
    };
  }

  //이 함수에 전달된 인자는 템플릿으로 사용된다. 인자목록에서
  //정의되지 않은(undefined)값은 내부 함수에 전달된 인자의 값으로 채워진다.
  function partial(f /*,...*/) {
    var args = arguments; //외부 인자 배열을 저장한다.
    return function () {
      var a = array(args, 1); //외부 인자의 1번 인덱스로부터 시작한다.
      var i = 0,
        j = 0;

      //args에 대해 루프를 돌며, undefined 값을 만나면
      //내부 함수에 전달된 인자 값으로 설정한다.
      for (; i < a.length; i++) {
        if (a[i] === undefined) {
          a[i] = arguments[j++];
        }
      }
      //이제 남은 내부 인자 값들을 추가한다.
      a = a.concat(array(arguments, j));
      return f.apply(this, a);
    };
  }

  //세 인자를 전달하는 함수
  var f = function (x, y, z) {
    return x * (y - z);
  };

  //이 세 파셜 애플리케이션이 서로 어떻게 다른지 살펴보라
  console.log(partialLeft(f, 2)(3, 4)); // => -2 첫 번째 인자로 바인딩 함 2 * (3-4)
  console.log(partialRight(f, 2)(3, 4)); // => 6 마지막 인자로 바인딩 함 3 * (4-2)
  console.log(partial(f, undefined, 2)(3, 4)); //=> -6 가운데 인자로 바인딩 함 3 * (2-4)
})();
