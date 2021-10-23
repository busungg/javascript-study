/**
 * -------------------------------------------------------------
 * 프로퍼티 디스크립터 예시
 * -------------------------------------------------------------
 */

var p  = {
    x: 1,
    y: 1,
    get r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    get theta() {
        return Math.atan2(this.y, this.x);
    }
};

console.log(p.r);

console.log(Object.getOwnPropertyDescriptor(p, 'theta'));

/**
 * -------------------------------------------------------------
 * Object.defindProperty
 * -------------------------------------------------------------
 */
var o = {};

//열거할 수 없는 데이터 프로퍼티 x를 정의하고 프로퍼티의 값을 1로 설정한다.
Object.defineProperty(o, 'x', {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});

//정의한 프로퍼티를 열거할수 있는지 검사한다.
console.log(o.x);
console.log(Object.keys(o)); // => []

//프로퍼티 값을 바꿔보자
Object.defineProperty(o, 'x', {writable: false});

o.x = 2; //엄격한 모드에서는 단순히 값을 변경하지 못하거나 TypeError 예외가 발생한다.
console.log(o.x); // => 1

//프로퍼티는 여전히 configurable 속성을 갖고 있어서 다음과 같이 기존 값을 바꿀 수 있다.
Object.defineProperty(o, 'x', {value: 2});
console.log(o.x); // => 2

//프로퍼티 x를 데이터 프로퍼티에서 접근자 프로퍼티로 바꿨다.
Object.defineProperty(o, 'x', 
    {
        get: function() {
            return 0;
        }
    }
);
console.log(o.x); // => 0

/**
 * -------------------------------------------------------------
 * class 정보
 * -------------------------------------------------------------
 */
console.log(o.toString());
console.log(p.toString());