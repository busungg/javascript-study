/**
 * ---------------------------------------------------
 * Constructor 프로퍼티
 * Q: prototype의 constructor 값 확인
 * A:
 * ---------------------------------------------------
 */

(function () {
  var F = function () {};
  var p = F.prototype;
  console.dir("prototype: ", p);

  var c = p.constructor;
  console.dir("constructor", c);

  console.log(c === F);
})();

/**
 * ---------------------------------------------------
 * Set 클래스
 * Q: Set 클래스를 만들어 보자
 * A:
 * ---------------------------------------------------
 */

(function () {
  function Set() {
    //생성자를 정의
    this.values = {}; //세트를 보관하는 this 객체의 프로퍼티,
    this.n = 0; //세트에 저장된 값의 개수,
    this.add.apply(this, arguments); //모든 인자를 values에 추가한다.
  }

  //각 인자를 세트에 추가한다.
  Set.prototype.add = function () {
    for (var i = 0; i < arguments.length; i++) {
      //각 인자에 대해 루프 순회
      var val = arguments[i]; //세트에 추가될 값이다.
      var str = Set._v2s(val); //해당 값을 문자열로 변환
      if (!this.values.hasOwnProperty(str)) {
        //세트에 해당 값이 없다면,
        this.values[str] = val; //문자열과 값을 매핑한다.
        this.n++; //세트의 크기를 늘린다.
      }
    }

    return this; //메서드 체이닝을 지원
  };

  //세트로부터 인자를 제거한다.
  Set.prototype.remove = function () {
    for (var i = 0; i < arguments.length; i++) {
      var str = Set._v2s(arguments[i]);
      if (this.values.hasOwnProperty(str)) {
        delete this.values[str];
        this.n--;
      }
    }
  };

  //만약 세트에 지정된 값이 있다면 true를 반환하고 없으면 false를 반환한다.
  Set.prototype.contains = function (value) {
    return this.values.hasOwnProperty(Set._v2s(value));
  };

  //세트의 크기의 반환한다.
  Set.prototype.size = function () {
    return this.n;
  };

  //지정된 컨텍스트의 세트에 있는 각 요소에 대해 함수 f를 호출한다.
  Set.prototype.foreach = function (f, context) {
    //세트의 각 문자열 순회
    for (var s in this.values) {
      //상속된 프로퍼티는 무시한다.
      if (this.values.hasOwnProperty(s)) {
        // 값에 대해 f를 호출한다.
        f.call(context, this.values[s]);
      }
    }
  };

  //이 내부 함수는 모든 자바스크립트 값을 고유 문자열로 매핑한다.
  Set._v2s = function (val) {
    switch (val) {
      case undefined:
        return "u"; //하나의 문자코드
      case null:
        return "n"; //나타낼 수 있는
      case true:
        return "t"; //특별한 원시형.
      case false:
        return "f";
      default:
        switch (typeof val) {
          case "number":
            return "#" + val; //숫자는 # 접두사를 붙인다.
          case "string":
            return '"' + val; //문자열은 " 접두사를 붙인다.
          default:
            return "@" + objectId(val); //객체와 함수 앞에는 @을 붙인다.
        }
    }
  };

  //모든 객체에 대해 문자열을 반환한다. 이 함수는 서로 다른 객체에 대해서는
  //다른 문자열을 반환하고, 같은 객체에 대해서는 언제나 같은 문자열을 반환한다.
  //이를 위해 o에 프로퍼티를 만든다.
  //ECMAScript 5에서 이 프로퍼티는 열거되지 않으며 읽기 전용이 될 수 있다.
  function objectId(o) {
    //id에 대한 전용 프로퍼티 이름.
    var prop = "|**objectid**|";
    //만약 객체에 id가 없다면
    if (!o.hasOwnProperty(prop)) {
      //next를 할당한다.
      o[prop] = Set._v2s.next++;
    }
    //id를 반환한다.
    return o[prop];
  }

  Set._v2s.next = 100; // 객체 id 시작 값으로 100을 할당한다.
})();

/**
 * ---------------------------------------------------
 * Enum 클래스
 * Q: Enum 클래스를 만들어 보자
 * A:
 * ---------------------------------------------------
 */
(function () {
  //이 함수는 새 열거형을 생성한다. 인자 객체는 열거형의 각 인스턴스에 대한 이름과 값을 지정한다.
  //이 함수의 반환 값은 새 클래스를 구별하는 생성자 함수다.
  //그러나 생성자를 직접 사용하면 예외가 발생한다는 것을 유념하라.
  //열거형의 새 인스턴스를 생성하는 데 직접 생성자 함수를 사용할 수는 없다.
  //반환된 생성자의 프로퍼티에는 생성자 그 자체를 가리키는 이름과 값 배열,
  //그리고 foreach() 열거함수가 있다.
  function enumeration(namesToValues) {
    //이것은 더미 생성자 함수이고, 이 함수가 반환 값이 된다.
    //이 변수는 로컬 변수로서 전역 enumeration 변수의 값을 가리게된다.
    var enumeration = function () {
      throw "열거형은 인스턴스화할 수 없습니다.";
    };

    //열거 값은 이 proto객체를 상속한다.
    //가장 중요한 부분이다.
    //function, object가 가진 표준 변환 메서드와 동일한 이름을 가진 프로퍼티를
    //설정하여 override 시킨 것이다. 그렇기 때문에 Value를 쓰지 않아도
    //자동으로 valueOf나 toString을 사용하여 값을 가져올 수 있다.
    var proto = (enumeration.prototype = {
      constructor: enumeration,
      toString: function () {
        return this.name;
      }, //name을 반환한다.
      valueOf: function () {
        return this.value;
      }, //value를 반환한다.
      toJSON: function () {
        return this.name;
      }, //직렬화를 위한 기능
    });
  }
})();

/**
 * ---------------------------------------------------
 * ECMAScript5 Enum 클래스
 * Q: ECMAScript5의 Object.defineProperty 메서드를 사용해서 Enum 클래스를 만들어 보자
 * A:
 * ---------------------------------------------------
 */
(function () {
  //모든 객체가 상속하는 objectId 프로퍼티를 정의하지만, 이 프로퍼티는 열거되지 않는다.
  //이 프로퍼티가 읽힐 때 getter 함수가 호출되는데 setter 함수는 없기 때문에
  //이 프로퍼티는 읽기 전용이다.
  //또한 프로퍼티 속성을 설정(configurable)할 수 없기 때문에,
  //이 프로퍼티는 임의로 삭제될 수 없다.
  Object.defineProperty(Object.prototype, "objectId", {
    get: idGetter, //값을 얻기 위한 메서드.
    enumerable: false, //열거되지 않음
    configurable: false, //삭제할 수 없음
  });

  //이 함수는 objectId가 읽힐 때 호출되는 getter 함수다.
  function idGetter() {
    if (!(idprop in this)) {
      //만약 객체에 id가 없고
      if (!Object.isExtensible(this)) {
        //만약 객체를 확장할 수 없다면
        throw Error("Can't define id for nonextensible objects");
      }

      Object.defineProperty(this, idprop, {
        //idprop을 생성한다.
        value: nextid++, //idprop의 값
        writable: false, //읽기 전용을 나타냄
        enumerable: false, //열거되지 않음
        configurable: false, //프로퍼티를 삭제할 수 없음
      });
    }

    return this[idprop]; //기존 프로퍼티 값이나 새로 만든 프로퍼티 값을 반환한다.
  }

  //다음 변수들은 idGetter()에서 사용되고 이 함수에서만 유효하다.
  var idprop = "|**objectId**|"; //이런 프로퍼티 이름은 사용되지 않는다고 가정한다.
  var nextid = 1; //시작 id 값을 지정

  //테스트
  function A() {}
  function B() {}

  var _a = new A();
  var _b = new B();
  var _c = new A();

  /*
  console.log(_a.objectId); //1
  console.log(_b.objectId); //2
  console.log(_c.objectId); //3
  */

  console.log(_c.objectId); //1
  console.log(_b.objectId); //2
  console.log(_a.objectId); //3

  try {
    _c.objectId = 100;
    console.log(_c.objectId); // getter 밖에 없기 때문에 set이 안됨
    console.log(_c["|**objectId**|"]); //실제로는 idGetter 내에서 기존 property 호출한 케이스
  } catch (e) {
    console.log(e);
  }
})();

/**
 * ---------------------------------------------------
 * ECMAScript5 클래스 확장 막기
 * Q: ECMAScript5의 Object.seal, freeze 메서드를 사용해서 클래스의 확장을 막자
 *  : 클래스대로만 사용하게 한다.
 * A:
 * ---------------------------------------------------
 */
(function () {
  function Compare(n) {
    this.n = n;
    //Object.seal(this);
  }

  Compare.prototype.upper0 = function () {
    if (this.x > 0) {
      return true;
    }

    return false;
  };

  //Compare를 seal한다.
  Object.seal(Compare);
  Object.seal(Compare.prototype);

  Compare.prototype.upper1 = 3;
  var c = new Compare(5);
  c.y = 100;

  console.dir(c);
  console.dir(Compare.prototype);

  function CompareInherit(n) {
    Compare.call(this, n);
  }

  CompareInherit.prototype = Object.assign({}, Compare.prototype);
  CompareInherit.prototype.constructor = CompareInherit;

  //상속받은 프로퍼티 객체는 재정의 할 수 있는지 확인
  CompareInherit.prototype.upper0 = function () {
    if (this.x > 1) {
      return true;
    }

    return false;
  };

  //상속받은 프로퍼티 객체에 메서드 추가 할 수 있는지 확인
  CompareInherit.prototype.upper1 = function () {
    if (this.x > 2) {
      return true;
    }

    return false;
  };

  var c1 = new CompareInherit(10);
  console.dir(c1);
  console.dir(CompareInherit.prototype);
})();
