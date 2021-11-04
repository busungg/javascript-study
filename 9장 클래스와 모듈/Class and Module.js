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