# SAPmarble

SAP 오피스가 있는 도시를 여행하며 기업가치를 키우는 2–6인 로컬 보드게임입니다.

## 로컬에서 실행하기

로컬 실행에는 OpenAI 호스팅이나 별도 API가 필요하지 않습니다. Node.js만 설치되어 있으면 됩니다.

```bash
git clone https://github.com/Germ-y/SAPmarble.git
cd SAPmarble
npm start
```

서버가 시작되면 브라우저에서 아래 주소를 여세요.

```text
http://localhost:4173
```

서버를 종료하려면 실행 중인 터미널에서 `Ctrl + C`를 누르면 됩니다.

### npm 없이 실행

`npm start` 대신 Node.js로 직접 실행해도 됩니다.

```bash
node server.mjs
```

다른 포트를 사용하려면 포트 번호를 뒤에 붙이세요.

```bash
node server.mjs 5000
```

### Python으로 실행

Node.js가 없다면 Python 3의 기본 서버도 사용할 수 있습니다.

```bash
python -m http.server 4173 --directory dist
```

## 저장 방식

- 게임 진행 상황은 브라우저의 `localStorage`에 자동 저장됩니다.
- 별도의 데이터베이스나 백엔드 서버가 필요하지 않습니다.
- 브라우저 데이터를 삭제하면 저장된 게임도 함께 삭제됩니다.

## 프로젝트 구조

```text
dist/
  index.html   게임 화면
  styles.css   디자인과 애니메이션
  app.js       게임 규칙과 상태 관리
server.mjs     의존성 없는 로컬 서버
package.json   npm 실행 명령
```

> 학습용 비공식 프로젝트이며 SAP SE와 제휴 또는 보증 관계가 없습니다. SAP 및 SAP 로고는 SAP SE의 상표입니다.
