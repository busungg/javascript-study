# HTML5 API

HTML5라는 용어는 당연하게도 최신 버번의 HTML 규격을 가리키지만, HTML 자체 혹은 HTML 규격의 일부분으로 개발되고 규격화된 웹 애플리케이션 기술을 총체적으로 일컫는 용어가 되기도 했다. 이 기술을 좀더 형식적으로 일컫는 용어는 '오픈 웹 플랫폼'이다.

1. Geolocation API
   - 브라우저가 사용자의 물리적인 위치를 알아낼 수 있게 해주는(사용자가 동의한다면) API
2. 히스토리 관리 API
   - 웹 애플리케이션을 새로 고치지 않아도, 현재 상태를 저장하고 업데이트하여 브라우저의 뒤로 가기와 앞으로 가기 버튼에 반응할 수 있게 하는 히스토리 관리 API
3. 서로 다른 출처아ㅢ 문서 사이에 메시지를 전달하는 간단한 API를 설명한다. 이 API는 다른 웹 서버의 문서들이 직접적으로 상호작용할 수 없도록 보호하는 동일 출처 보안 정책을 안전하게 우회한다.
4. 워커 스레드
   - 격리된 백그라운드 스레드에서 자바스크립트 코드를 실행하는 기능과 이 '워커'스레드들과 안전하게 통신 할 수 있는 방법을 다룬다.
5. 메모리를 효율적으로 사용하기 위한 특수 목적 타입을 가진 2진 배열과 바이트 배열을 활용하는 방법에 대해 설명한다.
6. Blob
   - Blob은 새롭고 다양한 2진 데이터 API를 위해 중앙 데이터 교환 형식으로 제공되는 데이터 덩어리들을 말한다. 이 절에서는 File과 FileReader 객체, BlobBuilder 타입과 Blob URL같은 다수의 Blob 관련 타입과 API들에 대해 설명한다.
7. Filesystem API
   - 웹 애플리케이션에서 개인화된 파일 시스템의 파일을 읽고 쓸 수 있는 API에 대해 설명한다.
8. IndexedDB API
   - 간단한 데이터베이스에 객체를 저장하고 가져올 수 있는 API를 설명한다.
9. 웹 소켓 API
   - XMLHttpRequest가 지원하는 요청/응답 네트워킹 대신 양방향 스트림 기반 네트워킹을 사용하여 웹 애플리케이션을 서버에 연결할 수 있는 웹 소켓 API에 대해 다룬다.

# Geolocation

Geolocation API는 자바스크립트 프로그램이 사용자의 실제 위치를 브라우저에게 요청할 수 있도록 해준다. 위치 기반 애플리케이션에서는 지도와 길 찾기 또는 사용자의 현재 위치와 관련된 정보를 표시할 수 있다. 물론 이런 정보들은 중요한 개인 정보와 관련되어 있으므로, 브라우저에서는 Geolocation API가 물리적인 위치 정보에 접근하기 전에 자바스크립트 프로그램이 항상 사용자의 허락을 받도록 하고 있다.  
브라우저가 지원하는 Geolocation API는 navigator.geolocation으로 정의되어 있다.

1. 메서드

   - navigator.geolocation.getCurrentPosition()
     - 사용자의 현재 위치를 요청한다.
   - navigator.geolocation.watchPosition()
     - 현재 위치를 요청하는 것은 동일하지만. 지속적으로 확인하여 사용자의 위치가 변경될 때마다 지정된 콜백 함수를 호출한다.
   - navigator.geolocation.clearWatch()
     - 사용자의 위치 정보를 수집하는 작업을 중단한다. 이 메서드의 전달인자는 watchPosition()을 호출한 다음 다음 반환받은 숫자 값이어야 한다.

2. GPS를 포함하는 기기에서는 GPS를 통해 매우 정밀한 위치 정보를 획득할 수 있다.
3. **_보통은 웹을 통해서 위치 정보를 얻게 된다. 브라우저에서 인터넷 IP 주소를 웹 서비스로 전송하면, ISP 기록을 기반으로 해당 IP의 사용자가 어느 도시에 위치하는지를 알 수 있다._**
   - 이러한 서비스는 보통 광고주들이 서버에서 제공한다.
   - 심지어 브라우저는 위치의 정확성을 더 높이기 위해 근접한 무선 네트워크 목록과 신호 강도를 운영체제에 요청할 수도 있다.
4. geolocation 기술에는 네트워크를 통해 위치 정보를 교환하거나 다수의 위성과 교신하는 등의 형태가 포함되어 있으므로, Geolocation API는 비동기적으로 동작한다.
   - getCurrentPosition()과 watchPosition()은 즉시 반환하지만, 사용자의 위치가 결정되거나 변경될 때마다 실행시킬 콜백 함수도 인자로 받는다.
     - ```
            navigator.geolocation.getCurrentPosition(
                function(pos) {
                    var latitude = pos.coords.latitude;
                    var longitude = pos.coords.longitude;
                    alert('현재 위치는: ' + latitude + ', ' + longitude);
                }
            )
       ```
5. Geolocation API에는 추가 기능도 존재한다. 상세내용은 MDN 참고하자

# 히스토리 관리

웹브라우저는 창에 어떤 문서가 로드되었는지를 추적하여 저장해두고 있으며, 사용자가 이 분서들 사이를 이동할 수 있도록 앞으로 가기와 뒤로 가기 버튼을 제공한다.  
이 브라우저 히스토리 모델은 모든 연산이 서버에서 완료된 이후의 과거 문서들을 일정 기간 거슬러 올라갈 수 있도록 한다. **_오늘날의 웹 애플리케이션에서는 자주, 새 문서를 로드하지 않도도 내용을 생성하거나 동적으로 로드하여 애플리케이션의 새로운 상태를 보여준다. 이런 애플리케이션에서 사용자가 뒤로 가기와 앞으로 가기 버튼을 사용해 하나의 상태에서 또 다른 상태로 이동할 수 있게 하려면, 히스토리를 자체적으로 관리해야 한다._** HTML5에서는 히스토리 관리를 위해 두 가지 메커니즘을 정의한다.

1. 단순한 히스토리 관리
   - location.hash와 hashchange 이벤트가 필요하다.
   - location.hash 프로퍼티를 설정하여 주소 표시줄에 출력되는 URL을 업데이트하고 브라우저의 히스토리에 새로운 항목을 추가할 수 있다.
   - hash 프로퍼티는 URL의 부분 식별자를 설정하며, 전통적으로 문서의 특정 위치에 ID를 지정하여 해당 위치로 스크롤하는 데 사용되었다. 그러나 location.hash에는 요소 ID가 존재하지 않는다. 단지, 문자열을 설정할 수 있을 뿐이다. 만약, 애플리케이션 상태를 문자열로 인코딩할 수 있다면, 해당 문자열을 부분 식별자로 활용할 수 있다.
   - location.hash 프로퍼티를 설정함으로써, 사용자는 뒤로 가기와 앞으로 가기 버튼을 사용해 문서의 상태를 이동할 수 있다. **_이 기능이 제대로 동작하게 하기 위해서는 애플리케이션이 상태의 변화를 감지하여 부분 식별자에 저장된 상태를 읽거나 수정할 수 있어야 한다._** HTML5에서는 부분 식별자가 변경될 때마다 브라우저가 Window의 hashchange 이벤트를 발생시킨다. hashchange 이벤트를 지원하는 브라우저에서는 부분 식별자가 변경될 때마다 호출되는 이벤트 핸들러 함수를 window.onhashchange 프로퍼티에 설정하여 히스토리 이동의 결과를 처리할 수 있다.
   - window.onhashchange 프로퍼티의 핸들러가 호출되면 해당 함수는 location.hash의 값을 해석하고 해당 값에 포함된 상태 정보를 이용하여 애플리케이션을 다시 출력할 것이다.
2. 복잡하지만 강력한 히스토리 관리
   - history.pushState() 메서드와 popState 이벤트가 존재한다.
   - 웹 애플리케이션이 새로운 상태로 진입하면 history.pushState() 메서드를 호출하여 브라우징 히스토리에 상태를 추가한다.
     - 첫 번째 인자는 문서의 현재 상태를 복원하는 데 필요한 정보를 포함한 객체다. 어떠한 객체라도 JSON.stringify()를 활용해서 문자열로 변환할 수 있으며, Date나 RegExp와 같은 다른 종류의 원시 타입 객체 또한 문자열로 변환할 수 있다.
     - 두 번째 인자는 부가적으로 브라우저가 브라우징 히스토리에 저장된 상태를 구분하는 데 사용할 수 있는(예를 들어 '뒤로 가기' 버튼) 일반 텍스트 문자열 형태의 제목이다.
     - 세 번째 인자는 부가적으로 현재 상태의 위치를 출력하는 URL이다. 상대 URL은 문서의 현재 위치에 대응되는 절대 위치로 변환되며, 일반적으로 #state와 같이 간단하게 URL의 해시 또는 '부분 식별자'를 지정한다. 일반적으로 #state와 같이 간단하게 URL의 해시 또는 '부분 식별자'를 지정한다. 각 상태를 조합한 URL은 해당 애플리케이션의 내부 상태를 사용자가 즐겨찾기에 추가할 수 있게 하고, URL에 충분한 정보가 포함되어 있다면 즐겨찾기를 통해 애플리케이션이 해당 상태를 복원 할 수도 있다.
   - replaceState()
     - pushState()와 동일한 전달인자를 사용하지만 브라우징 히스토리에 새 상태를 추가하는 대신 현재 히스토리의 상태를 교체하는 역할을 한다.
   - 사용자가 뒤로 가기 또는 앞으로 가기 버튼을 사용하여 저장된 히스토리의 상태를 이동할 때 브라우저는 Window 객체에 popstate 이벤트를 발생시킨다. 이벤트 객체에는 특정 상태의 이름이 프로퍼티로 존재하며 pushState()에 전달된 상태의 복사본(또 다른 구조체 복제본)을 포함한다.

# 교차 출처 메시징

몇몇 브라우저의 창과 탭들은 서로 완벽히 단절되어 있으며, 한 군데에서 실행되는 코드는 다른 곳의 코드를 전혀 참조할 수 없다.  
한편 스크립트가 명시적으로 새 창을 열거나 문서에 포함된 프레임을 활용하는 경우에는, 이 다중 창이나 프레임들은 서로의 코드를 참조할 수 있다. 이 창이나 프레임들이 같은 웹 서버의 문서들을 포함한다면, 해당 문서들이 상호 작용하거나 서로의 문서를 조작할 수 있다.  
때로는, 스크립트가 다른 Window 객체를 참조할 수도 있다. 그러면 창에는 서로 다른 출처의 내용이 존재하게 되므로, 동일 출처 정책을 따르는 웹브라우저는 스크립트가 다른 창의 문서 내용을 참조하는 것을 허용하지 않는다. 대부분의 경우, 브라우저는 서로 다른 창들 사이에서 프로퍼티를 읽거나 메서드를 호출하는 것을 금지한다.

1. postMessage()
   - 다른 출처의 스크립트 호출을 허용하는 Window 객체의 메서드인 postMessage()를 활용하면, 다른 출처의 스크립트 사이에서 제한적으로 일종의 비동기 메시지 통신이 가능하다.
   - 첫 번째 전달 인자는 전송할 메시지이다.
   - 두 번째 인자는 메시지를 보낼 대상이 되는 창의 출처를 지정하는 문자열이다. 이 문자열은 URL 구성 요소인 프로토콜과 호스트명, 포트(필요하다면)를 포함한다. 이것은 보안을 위한 기능으로, 악의적인 코드 또는 정상적인 사용자라도 예기치 않게 창을 새 문서로 이동시킬 수 있으므로, 창에 지정한 출처와 다른 문서가 포함되어 있으면 postMessage()가 메시지를 전송하지 않도록 할 것이다.
     - 민감한 정보가 포함되어 있지 않기 때문에 출처와 상관없이 메시지를 보내려면, 출처 문자열 대신 와일드카드 '\*'를 전달하면 된다. 현재 창의 출처와 동일하게 지정하려면, 간단히 '/'를 사용하면 된다.

# 웹 워커

클라이언트 측 자바스크립트의 근본적인 특징 중 하나는 싱글 스레드로 처리된다는 점이다. 브라우저는 두 이벤트 핸들러를 동시에 수행할 수 없다. **_예를 들어 이벤트 핸들러가 실행된는 중에는 타이머가 발생되지 않을 것이다._** 쉽게 말해서 애플리케이션의 상태나 문서를 동시에 업데이트하기는 불가능하므로, 클라이이언트 측 프로그래머가 병행 프로그래밍을 이해하고 있더라도 이것에 대해 고려할 필요는 없다. **_결론적으로 클라이언트 측 자바스크립트 함수는 실행 시간이 너무 길면 안된다._**

1. 웹 워커 규격에서는 클라이언트 측 자바스크립트의 단일 스레드를 느슨하게 만들었다. '워커'는 효과적으로 병렬 스레드를 실행하도록 정의되어 있다.
2. 웹 워커는 자체적으로 생성한 실행 환경에 존재한다. 그러나 Window 또는 Document 객체에 접근하지는 않고, 오직 비동기 메시지 전달을 통해서만 메인 스레드와 통신할 수 있다.
3. 즉 DOM의 변경을 동시에 수행하기란 여전히 가능하지 않지만, API를 동기적으로 사용할 수 있고 이벤트 순환을 방해하지 않고 브라우저도 중단시키지 않은 채 오랫동안 실행되는 함수를 작성할 수도 있다.

### 1. Worker 객체

새 워커를 만들려면 Worker 생성자에 워커가 실행되는 자바스크립트 코드 URL을 지정하면 된다.

```
    var loader = new Worker('utils/loader.js');
```

상대 URL을 지정하면 해당 URL은 Worker() 생성자를 호출하는 스크립트를 포함한 문서를 기준으로 해석된다. 절대 URL을 지정할 때는 해당 URL이 문서의 출처(동일한 프로토콜과 호스트, 포트)와 반드시 일치해야 한다.  
Worker 객체를 한번 생성하면 **_postMessage()를 활용하여 데이터를 전송할 수 있다. postMessage()에 전달하는 값은 복제되며 해당 복사본은 message이벤트를 통해 워커에 전달될 것이다._**

```
    loader.postMessage('file.txt');

    //Worker 객체의 message 이벤트를 구독하면 워커로부터의 메시지를 전달받을 수 있다.
    worker.onmessage = function(e) {
        var message = e.data; //이벤트로부터 메시지를 가져온다.
        console.log('URL contents: ' + message); //메시지를 사용하여 작업을 수행한다.
    };

    //우커가 예외를 발생시켰으나 내부적으로 처리되지는 않았다면, 해당 예외는 구독 가능한 다른 이벤트로 전파된다.
    worker.onerror = function(e) {

    };
```

모든 이벤트 대상과 마찬가지로 **_Worker 객체에도 표준 addEventListener()와 removeEventListener()메서드가 존재하기 때문에, 이 메서드들을 onmessage와 onerror 프로퍼티 대신 사용하면 다중 이벤트 핸들러를 관리할 수 있다._**
이 밖에 다른 Worker 객체의 메서드는 terminate() 하나뿐이다. terminate() 메서드는 워커 스레드를 강제로 종료한다.

### 2. Worker 범위

Worker() 생성자를 활용하여 새 워커를 생성할 때는 해당 자바스크립트 코드를 포함하는 파일의 URL을 지정해야 한다. 해당 워커 코드는 워커를 생성한 스크립트로부터 완전히 독립적인 새로운 순수 자바스크립트 실행 환경에서 구동된다.
