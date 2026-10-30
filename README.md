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

## 건물 시스템

- 빈 SAP 도시에 도착하면 도시와 첫 건물인 **SAP**를 함께 인수할 수 있습니다.
- 세계 일주 횟수에 따라 **SAP Labs → 랜드마크**가 차례로 해금됩니다.
- SAP와 SAP Labs를 모두 건설한 도시는 최종 단계인 랜드마크로 성장할 수 있습니다.
- 건물이 해금된 뒤 새 도시를 인수하면, 보유 자금 안에서 해금된 단계까지 한 번에 건설할 수 있습니다.
- 내 도시에 다시 도착하면 다음 단계 건설을 선택할 수 있습니다.
- 건설 비용은 도시 가격을 기준으로 **SAP 1배 → SAP Labs 1.5배 → 랜드마크 2.5배**로 높아집니다.
- 건물 단계가 높을수록 통행료가 올라가며, 랜드마크는 다른 팀이 인수할 수 없습니다.
- 같은 색의 도시를 모두 보유하면 해당 도시 통행료가 2배가 됩니다.

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
