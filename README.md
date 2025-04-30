
![Manda 브로셔 이미지](https://github.com/user-attachments/assets/d5fd0e4c-7a0f-4a66-a16a-968cf8cf9b71)


# Manda

> 만다라트 표를 친구와 같이 작성하고, AI로 도움을 받으며, 만다라트 표의 소주제를 TODO와 연결하여 
만다라트 표의 달성을 도와주는 서비스

하고 싶은 건 많고 머릿속도 복잡했는데, 뭔가 목표를 정리할 뾰족한 수단이 없었습니다.
만다라트는 단순한 9칸 구조지만, 중심 목표를 기준으로 구체적인 실행 계획까지 자연스럽게 확장할 수 있습니다. 
또한 실제로 목표를 “어떻게 이룰 것인가”까지 연결시켜준다는 점이 좋았습니다.

**복잡한 생각을 함께 시각적으로 정리하고, 실천 가능한 목표로 연결해 주는 도구**라는 점에서 기획을 하게 되었습니다.

### 📌 [**Manda 바로가기**](https://www.manda.io.kr/) 

# 🗓️ 프로젝트 기간

**2025.03.28 ~ 현재 진행중**

# ⚙️ 주요 기능

### 1. 회원 만다라트 제작

- 만다라트를 todo와 연동하여 제작할 수 있습니다.
- 주제 선정이 어려울 경우 AI한테 추천을 받을 수 있습니다.
- 친구를 초대하여 그룹별로 만다라트 실시간 편집이 가능합니다.

https://github.com/user-attachments/assets/86190845-6971-4750-a2b1-cd3e14ec52b8

### 2. 비회원 만다라트 제작

- 간단하게 만다라트 제작을 할 수 있습니다.
- 제작을 완료한 후 이미지 파일로 저장할 수 있습니다.
- 모바일에서도 줌인/줌아웃 기능을 활용하여 자유롭게 이동할 수 있습니다.

https://github.com/user-attachments/assets/8a00ff38-3fe4-4afa-8a6a-1f325b0ed8ab

### 3. 내 만다라트

- 만다라트를 생성할 수 있습니다.
- 각 만다라트의 핵심 목표, 기간, 목표 문구를 설정할 수 있습니다.
- 내 만다라트를 모두 볼 수 있으며, 목표를 달성한 만다라트를 확인할 수 있습니다.

https://github.com/user-attachments/assets/170e9e83-8889-468a-b43b-5e7e77f5a100


### 4. 캘린더

- 본인이 작성한 만다라트의 TODO를 날짜별로 한눈에 확인할 수 있습니다.
- 플로팅 시트를 통해 TODO 달성 여부를 관리하고 삭제할 수 있습니다.

https://github.com/user-attachments/assets/c1630e0d-335a-48c3-a631-f4a262763f72


### 5. 투두 모아보기

- 본인이 작성한 만다라트의 TODO를 한눈에 볼 수 있습니다.

https://github.com/user-attachments/assets/a5c09de1-8018-44bc-8bcf-b2fc20c5035f

### 6. 회원가입 / 로그인

- 사용자는 이메일, 비밀번호, 닉네임을 입력하고 중복 검사를 거쳐 회원가입이 가능합니다.
- 구글, 카카오 소셜 로그인을 지원합니다.
- 회원가입 후 자동으로 로그인 처리가 되며 랜딩 페이지로 이동합니다.

https://github.com/user-attachments/assets/7367ae81-5989-4f34-922c-2a589db4edc2

### 7. 랜딩 페이지

- 간단한 서비스 소개를 확인할 수 있습니다.
- 버튼을 클릭하면 내 만다라트 페이지로 이동합니다.

https://github.com/user-attachments/assets/7819ff69-da5e-4920-af55-746bc247e9c7

### 8. 마이페이지

- 프로필 이미지 수정, 닉네임 변경이 가능합니다.
- 로그아웃을 할 수 있습니다.
- 비밀번호 변경과 계정 삭제 기능을 추가로 구현할 예정입니다.

# 📝 논의 과정

- [만다라트 주제 선정까지의 여정](https://moram-moram.palms.blog/journey-to-mandalart-topic) <br/>
- [실시간 통신 기술 선택 논의 과정](https://moram-moram.palms.blog/realtime-communication-technology-selection-process) <br/>
- [브로드캐스트 방식을 선택하기까지의 과정 및 생각 정리](https://www.notion.so/teamsparta/1e42dc3ef514809d8fade93c88e71b85?pvs=4) <br/>


# 📝 트러블 슈팅

- [브로드캐스트 통신 시 필요한 처리](https://moram-moram.palms.blog/broadcast-sync-and-batch-updates) <br/>
- [하나의 핸들러에서 리렌더링 여러번, 배치업데이트 적용 시점](https://velog.io/@taejin7088/하나의-핸들러에서-리렌더링-여러번-배치업데이트-적용-시점) <br/>
- [Zustand 전역 상태 변경으로 인한 불필요한 컴포넌트 리렌더링 해결](https://velog.io/@bungbuung/Zustand-전역-상태-변경으로-인한-불필요한-컴포넌트-리렌더링-해결) <br/>
- [쿠키와 인증인가](https://moram-moram.palms.blog/cookie-with-auth) <br/>
- [n중 for문 처리하기](https://moram-moram.palms.blog/using-rpc-to-flat-data) <br/>


# ⚒️ 기술스택

### 프로그래밍 언어 및 프레임워크

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

### UI 프레임워크 및 스타일링

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-111827?style=for-the-badge&logo=vercel&logoColor=white)


### 코드 품질 및 포맷팅

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

### 백엔드 및 데이터베이스

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### 버전, 상태관리

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-20232a?style=for-the-badge&logo=react&logoColor=white)

# 💏 멤버 소개

📌 [모람모람 팀블로그](https://moram-moram.palms.blog/)

<table>
  <tbody>
    <tr>
      <td width="300px" align="center">
        <a href="https://github.com/KIMgyeongmIN00">
        <img src="https://avatars.githubusercontent.com/u/190255869?v=4" width="80" alt="KGyoeng"/>
        <br />
        <sub><b>김경민</b></sub>
        </a>
        <br />
      </td>
         <td width="300px" align="center">
        <a href="https://github.com/LSJ0706">
        <img src="https://avatars.githubusercontent.com/u/66673374?v=4" width="80" alt="Lee Seung Jun"/>
        <br />
        <sub><b>이승준</b></sub>
        </a>
        <br />
      </td>
      <td width="300px" align="center">
        <a href="https://github.com/Taejin7088">
        <img src="https://avatars.githubusercontent.com/u/192602679?v=4" width="80" alt="Taejin7088"/>
        <br />
        <sub><b>김태진</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>리더</b> <br/>
      </td>
      <td align="center">
        <b>부리더</b> <br/>
      </td>
      <td align="center">
        <b>팀원</b> <br/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/lje00220">
        <img src="https://avatars.githubusercontent.com/u/155710708?v=4" width="80" alt="lje00220"/>
        <br />
        <sub><b>이지은</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <img src="" width="80" alt=""/>
        <br />
        <sub><b></b></sub>
        <br />
      </td>
            <td align="center">
        <img src="" width="80" alt=""/>
        <br />
        <sub><b></b></sub>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>팀원</b> <br/>
      </td>
      <td align="center">
        <b></b> <br/>
      </td>
      <td align="center">
        <b></b> <br/>
      </td>
    </tr>
  </tbody>
</table>
