# hottoplay
로또 예상번호 조합을 생성하는 웹 앱 프로젝트입니다.

## 개발 기간
- 2024.11.18(월) ~ 2024.11.22(일)
- 클라이언트 디자인
- S3와 Redis연결

> Commit 컨벤션
- Feat : 새로운 기능 추가
- Fix : 버그 수정
- Docs : 문서 수정
- Style: 코드 포매팅, 세미콜론 누락, 코드 변경 없는 경우
- Refactor : 코드 리팩토링
- Test : 테스트 코드, 리팩토링 테스트 코드 추가
- Chore : 빌드 업무 수정, 패키지 매니저 수정

> Branch 전략
- main : 출시 가능한 프로덕션 코드를 모아두는 브랜치, 프로젝트 시작 시 생성되며, 개발 프로세스 전반에 걸쳐 유지됨, 배포된 각 버전을 Tag를 이용해 표시함
- develop : 다음 버전 개발을 위한 코드를 모아두는 브랜치, Main 브랜치에서 처음 생성, 개발이 완료되면 Main 브랜치로 머지됨, Squash And Merge
- release : 소프트웨어 배포를 준비하기 위한 브랜치, Develop 브랜치에서 생성하며, 소소한 데이터를 수정 및 배포전 사소한 버그를 수정하기 위해 사용, 배포 준비가 완료되었다면 Main 과 Develop 브랜치에 둘 다 머지 함 → Main 브랜치에는 태그를 이용하여 버전을 표시, Develop에 머지할 때 : merge, Main에 머지할 때 : Squash And Merge, 네이밍 예) releas/v1.1
- hotfix : 이미 배포된 버전에 문제가 발생했다면, Hotfix 브랜치를 사용하여 문제 해결, Main 브랜치에서 생성 → 문제 해결이 완료되면 Main과 Develop 브랜치에 둘 다 머지, Develop에 머지할 때 : merge, Main에 머지할 때 : Squash And Merge, Release에는 머지 X, 네이밍 예) hotfix/1.1.1
- feature : 하나의 기능을 개발하기 위한 브랜치, Develop 브랜치에서 생성하며, 기능이 개발 완료되면 다시 Develop 브랜치로 머지 됨, Develop에 Merge 할 때는 Squash And Merge로 PR을 생성함, Merge Commit을 생성하여 머지를 해줘야 함
