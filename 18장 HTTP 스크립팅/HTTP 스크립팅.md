# HTTP 스크립팅

HTTP는 웹브라우저가 서버로부터 문서를 전송받거나 폼의 내용을 보내는 방법, 그리고 해당 요청의 내용에 대해 서버가 응답하는 방법을 명세한다. 웹브라우저는 매우 많은 양의 HTTP를 처리한다. 일반적으로 HTTP는 스크립트의 제어를 받지 않는 대신 사용자가 링크를 클릭하거나 폼을 전송하거나 URL을 직접 입력할 때 발생한다.

### 1. Ajax

1. Ajax는 HTTP를 조작하는 데 특화된 웹 애플리케이션 설계 방식을 가리키는 용어다.
2. Ajax 애플리케이션의 핵심적인 특징은 HTTP를 조작하여, 페이지를 다시 불러오지 않고도 웹 서버와 데이터를 교환할 수 있도록 하는 것이다.
3. 웹 애플리케이션ㅇ에 Ajax 기술을 활용하면 사용자 반응 데이터를 서버에 저장하거나, 처음엔 간단한 페이지만 먼저 불러들인 후 추가적인 데이터와 필요한 페이지 구성 용소를 나중에 내려받는 식으로 초기 로딩 시간을 개선할 수 있다.

### 2. Comet

1. Comet은 비동기적으로 메시지를 클라이언트로 보내는 방식의 통신을 가능하게 하는 웹 서버다. 웹 애플리케이션이 서버로부터 전달받은 메시지에 응답해야 한다면, 이때 Ajax 기술을 사용하여 데이터를 보내거나 요청할 수 있다. Ajax는 클라이언트가 서버의 데이터를 '끌어'온다. Comet은 서버에서 클라이언트로 데이터를 '밀어'넣는다.
2. Comet은 '서버 푸시'나 'Ajax 푸시', 'HTTP 스트리밍'등으로도 불린다.

### 3. 데이터 전송방법

1. img
2. iframe
   - 동일 출처 제한에 걸린다.
3. JSONP
   - script 요소의 src 프로퍼티를 활용해서 HTTP GET 요청을 보낼 수도 있다.
   - script 요소를 활용한 HTTP 스크립팅은 동일 출처 정책의 영향을 받지 않는 크로스 도메인(cross-domain) 통신을 가능하게 하므로 특히 더 매력적인 방법이다.
   - script 요소 기반의 Ajax 전송 기법을 사용할 때는 보통, 실행될 때 자바스크립트 인터프리터가 데이터를 자동으로 '해석(decoded)'할 수 있도록, 서버의 응답 데이터를 JSON 형태로 인코딩한다. JSON 데이터 형식을 사용하기 때문에, 이 Ajax 전송 기법을 JSONP라고 한다.
4. XMLHttpRequest
   -HTTP를 조작하기 위해 정의된 API

# XMLHttpRequest 사용하기

1. 브라우저는 XMLHttpRequest 클래스에 HTTP API를 정의한다. 이 클래스의 각 인스턴스는 요청과 응답의 한 쌍을 나타내며, 이 객체의 프로퍼티와 메서드는 요청에 대한 세부 사항을 설정하고 응답 데이터를 추출할 수 있도록 한다.
2. 이 HTTP API를 사용하기 위해서는 XMLHttpRequest 객체의 인스턴스를 생성하는 것이다.
   - ```
        var request = new XMLHttpRequest();
     ```
   - 이미 생성된 XMLHttpRequest 객체를 재활용할 수도 있지만, 그러기 위해서는 먼저 이 객체에 걸려 있는 욫렁을 중단시켜야 한다는 점을 주의하다.
3. HTTP 요청 구성
   - HTTP 요청 방법 또는 '동사(verb)'
   - 요청된 URL
   - 인증 정보를 포함하는 부속 요청 헤더
   - 요청 본문(선택사항)
4. HTTP 응답 구성
   - 요청의 성공과 실패를 구분할 수 있는 숫자와 문자 상태 코드
   - 응답 헤더의 집합
   - 응답 본문

### 1. 요청 설정하기

1. XMLHttpRequest 객체의 open() 메서드를 사용하여 HTTP 요청을 만드는 데 필요한 두 요소를 지정한다.
   - ```
        request.open('GET',  //HTTP Get 요청으로
                    'data.csv'); //이 URL의 내용을 가져오도록 만든다.
     ```
2. open() 첫 번째 인자
   - open() 메서드의 첫 번째 인자는 HTTP 요청 방식 또는 동사다. 대소문자 구분 없이 지정할 수 있으나 HTTP 프로토콜에는 일반적으로 대문자를 사용한다. GET과 POST 요청 방식은 보편적으로 지원된다.
     - GET
       - '일반적인' 요청이며, 해당 URL이 필요로 하는 리소스를 정확히 가리키고 있을 때
       - 해당 요청이 서버에 별 다른 영향을 끼치지 않을 때
       - 응답이 캐시될 수 있는 상황일 때 주로 사용된다.
     - POST
       - HTML 폼에서 주로 사용되는 방식이다.
       - 추가적인 데이터(폼 데이터)를 요청 본문에 포함할 수 있고, 해당 데이터는 서버의 데이터베이스에 저장되기도 한다.(서버에 영향을 미친다.) -똑같은 URL에 반복적으로 POST 요청을 보내더라도 서버의 응답은 각각 다를 수 있으므로 이 방식의 요청은 캐시되지 않아야 한다.
   - open() 메서드의 첫 번째 인자로로 사용할 수 있는 것
     - GET
     - POST
     - DELETE
     - HEAD
     - OPTIONS
     - PUT
3. open() 두 번째 인자

   - 요청할 목적 URL이다. 이 URL은 open() 메서드를 호출하는 스크립트를 포함하는 문서의 URL과 관련이 있다.
   - 특정 프로토콜과 호스트, 포트를 지정한 절대 URL을 사용할 때는 일반적으로 현재 문서의 URL 구성 요소들과 일치해야 한다.
   - 교차 출처(cross-origin) HTTP 요청은 보통 오류를 발생하지만, XMLHttpRequest 2단계 규격에서는 서버에서 허용할 경우 교차 출처 요청을 보낼 수도 있다.

4. 요청 과정의 다음 단계는 **_요청 헤더를 설정_** 하는 것이다. 예를 들어, POST 요청을 보낼 때 본문의 MIME 타입으로 Content-Type 헤더를 지정할 필요가 있다면 다음과 같이 설정한다.

   - ```
        request.setRequestHeader('Content-Type', 'text/plain');
     ```
   - **_setRequestHeader()를 호출해서 같은 헤더를 여러 번 설정하더라도, 새로 설정한 값은 이전에 설정한 값을 바꿀 수 없다._** 그 대신, HTTP 요청에는 같은 헤더의 여러 복사본이나 하나 이상의 값이 지정된 헤더가 포함될 것이다.
   - Content-Length나 Date, Referer, User-Agent와 같은 헤더는 임의로 지정할 수 없다. XMLHttpRequest는 이런 종류의 헤더들을 자동으로 추가하며, 값을 수정할 수 없다. 마찬가지로, XMLHttpRequest 객체는 쿠키와 연결 유지 시간(connection lifetime), 문자셋(charset), 인코딩 방식(encoding negotiations)등을 자동으로 처리하기 때문에, 이것과 관련된 헤더들은 setRequestHeader() 메서드를 통해 사용할 수 없다.

5. 요청시 Authorization 헤더를 지정할 수도 있지만, 일반적으로는 필요하지 않을 것이다. 암호 보안을 적용한 URL을 요청할 때 open() 메서드의 네 번째와 다섯번째 전달인자를 각각 사용자명과 암호로 지정하면, XMLHttpRequest가 적절한 헤더를 설정해 준다.

6. XMLHttpRequest를 사용해서 HTTP 요청을 만드는 마지막 단계는, 부가적인 요청 본문을 지정하고 서버로 전송하는 것이다. 이 작업은 send() 메서드로 수행한다.

   - ```
          request.send(null);
     ```
   - GET 요청은 본문을 가질 수 없으므로, send() 메서드의 인자를 null로 지정하거나 생략해야 한다. 대부분의 POST 요청은 본문을 포함하며, 해당 본문은 setRequestHeader()에서 지정한 Content-Type 형식이어야 한다.
   - **_send() 메서드는 요청을 보낸 즉시 반환한다._** 즉, 서버의 응답을 기다리는 도앙ㄴ 브라우저를 중단시키지 않는다.

### 2. 응답 데이터 가져오기

완료된 HTTP 응답에는 상태 코드와 응답 헤더, 응답 본문이 존재한다. 이런 응답에 대한 구성 요소에는 XMLHttpRequest 객체의 프로퍼티와 메서드로 접근할 수 있다.

1. status와 statusText 프로퍼티는 HTTP의 상태를 숫자와 문자 형태로 반환한다.
2. 응답 헤더는 getResponseHeader()와 getAllResponseHeader() 메서드를 통해 조회할 수 있다.
   - XMLHttpRequest는 쿠키를 자동으로 처리하기 때문에 getAllResponseHeader()는 쿠키 관련 헤더 값들을 제거한 후 반환하고, getResponseHeader()메서드는 'Set-Cookie'나 'Set-Cookie2'를 전달하면 null을 반환한다.
3. 응답 본문은 responseText 프로퍼티를 통해 텍스트 형태로 반환되거나 responseXML 프로퍼티를 통해 문서 형태로 반환될 수 있다. responseXML 프로퍼티는 이름과는 달리 XML 문서 뿐만 아니라 XHTML로도 사용할 수 있고, XHR2에서는 보통의 HTML 문서로도 동작한다.
4. 응답이 준비되었음을 통보받기 위해서는, **_XMLHttpRequest 객체의 readystatechange 이벤트를 사용하거나 XHR2의 새로운 이벤트인 progress를 사용해야 한다._**
   - readyState
     - HTTP 요청 상태를 나타내는 정수 값이다.
   - 이론적으로 readystatechange 이벤트는 readyState 프로퍼티의 값이 변경될 때마다 발생해야 한다. 그러나 실제로는 readyState가 0이나 1로 변경될 때는 발생하지 않을 것이다. 이 이벤트는 open() 메서드를 호출하여 이미 readyState가 OPENED 상태임에도 불구하고, send() 메서드가 호출될 때 발생하곤 한다. 몇몇 브라우저는 readyState가 LOADING 상태인 동안 여러 번 이벤트를 발생시키기도 한다. **_모든 브라우저는 readyState가 4로 변경되거나 서버의 응답이 완료되면 readystatechange 이벤트를 발생시킨다._** 즉, 응답이 완료되기 전에도 이벤트가 여러 번 발생하기 때문에, 이벤트 핸들러에서 항상 readyState 값을 확인해야 한다.
5. readystatechange 이벤트를 구독하기 위해서는, **_XMLHttpRequest 객체의 onreadystatechange 프로퍼티를 이벤트 핸들러 함수로 설정해야 한다._**

   - ```
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
            }
        }
        request.send(null);
     ```

6. 동기 방식으로 응답 가져오기

   - 원칙적으로, HTTP 응답은 비동기적으로 처리될 때 가장 이상적이다. 그럼에도 불구하고, XMLHttpRequest는 응답을 동기적으로 가져오는 방식도 지원한다.
   - open() 메서드의 세 번째 인자를 false로 지정하면, **_send() 메서드는 요청이 완료될 때까지 브라우저를 중단시킬 것이다._** 이때는 이벤트 핸들러를 사용할 필요 없이, send() 메서드의 실행이 종료된 후 XMLHttpRequest 객체의 status와 responseText 프로퍼티를 확인하기만 하면 된다.

7. 응답 해석하기
   - 서버의 응답을 올바르게 해석하기 위해서는, 서버가 'Content-Type' 헤더에서 지정한 것과 일치하는 MIME 타입으로 응답을 보내주어야 한다. 예를 들어, 서버가 해당 MIME 타입 설정 없이 XML 문서를 보낸다면, XMLHttpRequest 객체는 응답을 해석할 수 없으므로 responseXML 프로퍼티를 설정하지 않는다. XMR2에서는 이 문제를 해결하기 위해 overrideMimeType() 메서드를 정의하였으며, 이는 다수의 브라우저에 이미 구현되어 있다. 해당 리소스의 MIME 타입을 미리 알고 있다면, send() 메서드를 호출하기 전에 overrideMimeType()에 올바른 타입을 지정할 수 있다. 이렇게 하면 XMLHttpRequest가 contet-type 헤더를 무사하는 대신, overrideMimeType()에서 지정한 타입을 사용하게 된다.

### 3. 요청 본문 인코딩

HTTP POST 요청에는 클라이언트에서 서버로 전달할 데이터를 포함하는 요청 본문이 존재한다. 종종 HTTP 요청에 복잡한 데이터를 보내야할 때가 있는데 이런 복잡한 데이터를 전송하는 방법을 설명한다.

1. 폼 인코딩(Form-encoded) 요청
   - HTML 폼에 대해 생각해보자. 사용자가 폼을 전송할 때 , 폼의 데이터(각 폼 요소의 이름과 값)는 문자열로 인코딩되어 전송된다. 기본적으로 HTML 폼은 POST 방식으로 서버에 전송되고, 인코딩된 폼 데이터를 요청 본문으로 사용한다. 폼 데이터의 **_인코딩 스키마(encoding scheme)는 상대적으로 간단하다. 각 폼 요소의 이름과 값을 일반 URI 인코딩 방식(특수 문자를 16진수 형태로 치환한다)으로 암호화하고 이름과 값을 '='기호로 묶은 다음, 이 한 쌍의 이름과 값을 엠퍼센트(&)구분한 형태다._**
     - find=pizza&zipcode=02134
     - 이 폼 데이터 인코딩 형식의 MIME 타입은 application/x-www-form-urlencoded이다.
   - 이런 형식으로 폼 데이터를 전송(POST 방식)하려면 'Content-Type' 요청 헤더를 이와 같이 설정해야 한다.
2. JSON 인코딩 요청
   - JSON.stringify()을 사용해서 요청 본문을 인코딩한다.
3. XML 인코딩 요청

   - send() 메서드에 XML 문서를 전달할 때는, Content-Type 헤더를 미리 지정하지 않아도 XMLHttpRequest 객체가 자동으로 헤더를 적절히 설정해 준다. 마찬가지로, send()에 문자열을 전달하고 Content-Type을 지정하지 않아도, XMLHttpRequest는 'text/plain; charset=UTF-8'을 헤더 값으로 추가할 것이다.
   - ```
         var request = new XMLHtttpRequest();
         request.open('POST', url);

         //root 요소로 <query>가 존재하는 XML 문서를 생성한다.
         var doc = document.implementation.createDocument('', 'query', null);
         var query = doc.documentElement; // <query>요소
         var find = doc.createElement('find'); //<find>요소를 생성한다.
         query.appendChild(find); //그리고 <query> 요소에 <find>를 추가한다.
         find.setAttribute('zipcode', where); //<find> 요소의 속성을 설정한다.
         find.appendChild(doc.createTextNode(what)); //<find>의 내용을 추가한다.

         //이제 XML로 인코딩된 데이터를 서버로 전송한다.
        request.send(doc);
     ```

4. 파일 업로드하기

   - HTML 폼의 기능 중 하나로, 사용자는 \<input='file'>인 요소를 통해 파일을 선택하여 POST 요청의 본문에 파일 내용을 포함해 전송할 수 있다.
   - **_XHR2 API에서는 File 객체를 send() 메서드에 전달하여 업로드를 할 수 있다._**
     - File() 객체는 생성자가 존재하지 않는다.자바스크립트에서는 사용자가 선택한 파일을 가리키는 File 객체만을 사용할 수 있다. \*\*\*브라우저에서 지원하는 File 객체는 , 모든 \<input type="file"> 요소에 유사 배열 형태로 File 객체들을 담고 있는 files 프로퍼티에 존재한다.
       - ```
            input.addEventListener('change', function() {
                var file = this.files[0];
                if(!file) return;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url); //지정한 URL로 보낼 POST 요청을 만든다.
                xhr.send(file); //파일을 요청 본문으로 전송한다.
            }, false);
         ```
       - File 타입은 Blob타입의 좀더 일반적인 형태 중 하나다. XHR2는 어떤 Blob 객체라도 send() 메서드에 전달할 수 있게 해준다. Blob의 type 프로퍼티는 업로드시 헤더를 명시적으로 지정하지 않았을 때 대신 적용할 Content-Type 헤더를 설정한다. 생성한 2진 데이터를 업로드하기 위해 Blob 객체로 변환하는 기술을 사용하여 요청 본문으로 지정할 수 있다. 생성한 2진 데이터를 업로드 하기 위해 Blob 객체로 변환하는 기술을 사용하여 요청 본문으로 지정할 수 있다.

5. multipart/form-data 요청
   - HTML 폼에 업로드할 요소와 기타 다른 요소들이 포함되어 있을 때는 브라우저가 보통의 폼 인코딩 방식을 사용할 수 없으므로 'multipart/form-data'라는 특정 content-type을 설정하여 POST 요청을 보내야 한다. 이 인코딩은 여러 부분으로 나뉜 요청 본문을 구분하기 위해 사용하는 긴 '경계(boundary)' 문자열을 포함한다.
   - XHR2는 멀티 파트 요청 본문을 간단하게 만들 수 있는 FormData API를 새롭게 정의한다.
     - FormData 객체를 사용하려면 먼저, FormData() 클래스 생성자를 사용해서 FomrmData 객체를 생성한다.
     - 요청에 추가할 개별 '부분' 데이터(문자열이나 파일 또는 Blob 객체)의 개수만큼 append() 메서드를 반복 호출한다.
     - 마지막으로, FormData 객체를 send() 메서드에 전달한다. send() 메서드는 적당한 경계 문자열(boundary string)이 정의된 'Content-Type'헤더를 설정하여 요청을 전송한다.

### 4. HTTP 진행 이벤트

앞의 예제에서는 readystatechange 이벤트를 사용하여 HTTP 요청의 완료 상황을 확인할 수 있었다. XHR2 초안에서는 더 유용한 이벤트들을 정의하였고, 파이어폭스와 크롬, 사파리가 이를 이미 구현하고 있다. **_이 새 이벤트 모델에서 XMLHttpRequest 객체는 요청 단계별로 서로 다른 이벤트를 발생시키므로 더이상 readyState 프로퍼티를 확인할 필요가 없다._**

1. 브라우저에서는 이벤트를 다음과 같이 발생시킨다.
   - loadstart 이벤트
     - send() 메서드가 호출되었을 때 발생
   - progress 이벤트
     - 서버의 응답을 내려받는 중에 발생
     - 이 이벤트는 보통 50밀리초마다 발생하므로 요청의 진행 상황을 사용자에게 알려주기 위해 해당 이벤트를 활용할 수 있다.
     - 요청이 매우 빠르게 완료되면 progress 이벤트가 발생하지 않을지도 모른다.
   - load 이벤트
     - 요청이 완료될시 발생한다.
     - 완료된 요청이 반드시 성공한 요청이라고는 볼 수 없으므로, load 이벤트 핸들러에서는 XMLHttpRequest 객체의 상태 코드를 확인해야 한다.
   - timeout 이벤트
     - 요청 시간이 초과할때 발생한다.
   - abort 이벤트
     - 요청이 취소될 시 발생한다.
   - error 이벤트
     - 너무 빈번한 연결 재설정과 같은 기타 네트워크 오류일 때는, 요청이 완료되지 않도록 보호한 다음 이벤트 발생시킨다.
2. 브라우저는 어떤 요청이든지 load나 abort, timeout, error 이벤트 중 하나만을 발생시킨다.
3. 각 진행 이벤트에 핸들러를 등록하기 위해서 XMLHttpRequest 객체의 addEventListener() 메서드를 사용할 수 있다. 각 이벤트에 하나의 핸들러만 필요하다면, onprogress와 onload처럼 해당 이벤트 핸들러 프로퍼티를 바로 설정하는 것이 보통 더 쉬운 방법이다.
4. 이 진행 이벤트들의 이벤트 객체에는 type이나 timestamp와 같이 유용한 프로퍼티가 세 가지 추가 되어 있다.
   - loaded 프로퍼티는 전송된 정보량(바이트 단위)
   - total 프로퍼티는 'Content-Length' 헤더의 값을 기반으로 한 전송받을 데이터의 총량(바이트 단위) 또는 알 수 없을 경우 0이다.
   - lengthComputable 프로퍼티는 내용의 크기를 알고 있으면 true이고 그렇지 않다면 false 이다.
   - progress 이벤트 핸들러에서 사용하는 예시
     - ```
        request.onprogress = function(e) {
            if(e.lengthComputable) {
                progress.innerHTML = Math.round(100 * e.loaded / e.total) + '%';
                //진행도를 보여준다. HTTP 응답 다운로드 모니터링
            }
        }
       ```

**_업로드 진행 이벤트_**  
XHR2에서는 HTTP 요청의 업로드 상황을 모니터링할 수 있는 이벤트도 제공한다.
이 기능이 구현된 브라우저에는, XMLHttpRequest 객체에 upload 프로퍼티가 존재할 것이다.

1. upload 프로퍼티에는 addEventListener() 메서드와 onprogress나 onload와 같은 모든 진행 이벤트 프로퍼티들이 정의된 객체가 값으로 존재한다.
2. 업로드 이벤트 핸들러는 정식 진행 이벤트 핸들러를 쓰듯이 사용할 수 있다. XMLHttpRequest 객체인 x의 응답 다운로드 진행 상황을 모니터하기 위해 x.onprogress를 설정하듯이, x.upload.onprogress를 설정하여 요청의 업로드 진행 상황을 모니터할 수 있다.

### 5. 요청 취소와 타임아웃

1. abort() 메서드
   - XMLHttpRequest 객체의 abort() 메서드를 호출하면 진행 중인 HTTP 요청을 중단할 수 있다.
   - abort() 메서드는 모든 버전의 XMLHttpRequest에서 사용할 수 있고, XHR2에서는 abort() 메서드가 호출되면 abort 이벤트를 발생시킨다.
   - abort() 메서드를 호출하는 주된 이유는, 응답이 완료될 때까지 걸리는 시간이 너무 길어 요청 시간이 초과되었거나(timeout), 부적절한 응답을 받을 경우 해당 요청을 중단하기 위해서다.
     - 예시로 텍스트 입력 필드의 검색어 자동 완성 기능을 위해 XMLHttpRequest를 사용한다고 가정하자. 사용자가 새 문자를 필드에 입력하기 전에 서버의 제안 검색어가 도착한다면, 완료되지 않은 채 걸려있는 요청을 더 이상 확인할 필요가 없기 때문에 중단시킬 수도 있다.
2. timeout 프로퍼티
   - XHR2에서는 timeout 프로퍼티를 정의하여 지정한 밀리초의 시간이 지나면 자동으로 요청을 중단시키고, 해당 시점에 timeout 이벤트(abort 이벤트 대신)가 발생한다.

### 6. 교차 출처(Cross-Origin) HTTP 요청

1. **_XMLHttpRequest 객체는 교차 출처 보안 정책의 일부로써 오직 해당 문서가 위치한 서버로만 요청을 보낼 수 있다._** 이 제한 사항으로 보안 허점을 메울 수 있지만, 올바른 관계의 교차 출처 요청까지도 보호되므로 너무 제한적인 면이 있다.
2. 그러나 \<script> 요소를 사용할 때는 동일 출처 정책을 전혀 신경쓰지 않아도 된다. 출처에 관계없이 어떤 스크립트도 내려받고 실행할 수 있다.
3. XHR2에서는 HTTP 응답에 부가적으로 적절한 CORS(Cross-Origin Reource Sharing) 헤더를 보냄으로써 교차 출처 요청을 부분적으로 허용한다.
   - XMLHttpRequest의 open() 메서드에 사용자명과 비밀번호를 전달하면, 교차 출처 요청은 절대 전송되지 않는다. 또한 교차 출처 요청은 기본적으로 어떠한 사용자 정보도 포함하지 않는다. 쿠키나 HTTP 인증 토큰은 요청의 일부로 전송되지 않으며, 교차 출처 응답으로 넘겨받은 쿠키는 폐기된다. **_교차 출처 요청이 이런 종류의 인증 정보를 필요로 하고 이를 성공시켜야 할 때는, 요청을 send() 메서드로 전송하기 전에 XMLHttpRequest의 withCredentials 프로퍼티를 true로 설정해야한다._**

### 7. \<script> 요소를 활용한 HTTP\:JSONP

1. \<script> 요소의 src 속성을 설정한 다음 문서에 삽입하면, 브라우저가 지정한 URL을 다운로드하기 위한 HTTP 요청을 발생시키는 것이 기본 원리이다.
2. \<script> 요소가 아주 좋은 Ajax 전송 방식으로 사용되는 주요한 이유는, 동일 출처 정책에 영향을 받지 않아서 제 3의 웹 서버로 데이터를 요청할 수 있다는 점 때문이다. 부가적인 이유료, 이 방식이 JSON으로 인코딩된 응답 본문을 자동으로 해석(또는 실행)한다는 점도 있다.
3. JSONP에서는 서버에서 JSON 응답 데이터를 대신, 서비스에서 데이터를 괄호로 감싸서 자바스크립트 함수에 '밀어 넣은(pad)' 형태로 응답을 보내주어야 한다.
   - ```
        handleResponse(
            [1, 2, {"buckle": "my shoe"}]
        )
     ```

# Server-Send 이벤트를 활용한 Comet

Server-Sent 이벤트 표준의 초안에서는 Comet 애플리케이션을 손쉽게 만들 수 있게 해주는 EventSource 객체를 정의한다. 간단히, EventSource() 생성자에 URL을 전달하고, 해당 인스턴스 객체의 message이벤트를 구독하기만 하면 된다.

```
    var ticker = new EventSource('stockprices.php');
    ticker.onmessage = function(e) {
        var type = e.type;
        var data = e.data;
        //이벤트 타입과 데이터 문자열을 처리한다.
    }
```

message 이벤트의 이벤트 객체에는 서버가 보낸 데이터 문자열을 포함하는 data 프로퍼티가 존재한다. message 이벤트 객체에도 모든 이벤트 객체가 그렇듯 type 프로퍼티가 존재한다. 기본 값은 'message'지만, 이벤트를 발생시킨 출처에 따라 해당 프로퍼티의 값이 다르게 지정될 수도 있다.

1. Server-Sent 이벤트 프로토콜은 다음과 같다.
   - 클라이언트가 서버에 연결되면(EventSource 객체를 생성하면) 서버는 해당 연결을 유지한다.
   - 이벤트가 발생하면 서버는 해당 연결에 여러 행의 텍스트를 기록한다.
   - 해당 이벤트 발생 시 기록되는 형태는 다음과 같다.
     - ```
            evnet: bid  이벤트 객체의 타입
            data: GooG  data 프로퍼티
            data: 999   추가적인 데이터를 새로운 행에 기록하며
                        빈 행은 message 이벤트를 발생시킨다.
       ```
   - 이 이벤트 프로토콜에는 몇 가지 추가적인 내용이 존재한다. 해당 이벤트에 ID를 부여해서, 서버에 재접속한 클라리언트에게 최근에 처리된 이벤트의 아이디를 알려줄 수 있다. 따라서 서버는 접속이 끊어져 있던 동안 클라이언트가 받지 못했던 데이터를 재전송할 수 있다.
