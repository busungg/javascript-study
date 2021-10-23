/**
 * -------------------------------------------------------------
 * extensible 테스트
 * -------------------------------------------------------------
 */

var p = {
  x: 1,
  y: 1,
  get r() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },

  get theta() {
    return Math.atan2(this.y, this.x);
  },
};

console.log(Object.isExtensible(p));
console.log(Object.preventExtensions(p));
console.log(Object.isExtensible(p));

p.r2 = function () {};
console.log(p.r2);
console.log(p);

/**
 * -------------------------------------------------------------
 * 객체 직렬화
 * -------------------------------------------------------------
 */

console.log(JSON.stringify(p));
console.log(JSON.parse(JSON.stringify(p)));
