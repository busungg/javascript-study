/**
 * ---------------------------------------------------
 * Constructor 프로퍼티
 * Q: prototype의 constructor 값 확인
 * A: 
 * ---------------------------------------------------
 */

(function() {
    var F = function() {};
    var p = F.prototype;
    console.dir('prototype: ', p);

    var c = p.constructor;
    console.dir('constructor', c);

    console.log(c === F);

}());


/**
 * ---------------------------------------------------
 * Set 클래스
 * Q: Set 클래스를 만들어 보자
 * A: 
 * ---------------------------------------------------
 */

(function(){
    
    function Set() { //생성자를 정의
        this.values = {}; //세트를 보관하는 this 객체의 프로퍼티,
        this.n = 0; //세트에 저장된 값의 개수,
        this.add.apply(this, arguments); //모든 인자를 values에 추가한다.

        //각 인자를 세트에 추가한다.
        Set.prototype.add = function() {
            for(var i = 0; i < arguments.length; i++) { //각 인자에 대해 루프 순회
                var val = arguments[i]; //세트에 추가될 값이다.
                var str = Set._v2s(val); //해당 값을 문자열로 변환
                if(!this.values.hasOwnProperty(str)) { //세트에 해당 값이 없다면,
                    this.values[str] = val; //문자열과 값을 매핑한다.
                    this.n++; //세트의 크기를 늘린다.
                }
            }

            return this; //메서드 체이닝을 지원
        };
    }




})();