# Project Structure

이 파일은 현재 Jekyll 블로그의 전체적인 파일 구조와 각 폴더/파일의 역할을 설명합니다. 특히 `_study` 폴더를 어떻게 구성하면 좋을지에 대한 가이드를 포함하고 있습니다.

## 1. 주요 디렉토리 구조

```text
.
├── _config.yml          # Jekyll 설정 (컬렉션, 테마, 네비게이션 등)
├── index.md             # 홈페이지 (Home)
├── study.md             # Study 페이지 (아코디언 및 필터링 로직 포함)
├── paper.md             # Paper 페이지
├── project.md           # Project 페이지
├── books.md             # Books 페이지
├── writings.md          # Writings 페이지
│
├── _posts/              # 일반 블로그 포스트 (Writings)
│   └── writings/        # 수필, 일기 등 저장
│
├── _study/              # [Collection] 학습 기록 저장 (Study)
├── _paper/              # [Collection] 논문 리뷰 저장 (Paper)
├── _project/            # [Collection] 프로젝트 기록 저장 (Project)
│
├── _layouts/            # 페이지 레이아웃 (default, home, page, post)
└── _site/               # 빌드된 결과물 (자동 생성)
```

## 2. Study 폴더 구조 제안 (`/_study`)

`study.md`의 로직에 최적화된 구조입니다. 폴더 깊이에 따라 화면에서 **대분류 > 중분류 > 문서** 순으로 표시됩니다.

```text
_study/
├── 1_Computer_Science/      # [대분류] (화면: 1 COMPUTER SCIENCE)
│   ├── OS/                  # [중분류] (화면: Os)
│   │   └── process.md       # [문서]
│   └── Network/             # [중분류]
│       └── tcp-ip.md
│
├── 2_Language/              # [대분류]
│   ├── Python/              # [중분류]
│   │   └── decorator.md
│   └── JS/
│       └── async.md
│
└── 9_Etc/                   # [대분류]
    └── git_tips.md          # 중분류 없이 바로 문서 배치 가능
```

## 3. 문서 작성 가이드 (Front Matter)

각 `.md` 파일 상단에는 아래와 같은 형식을 권장합니다.

```markdown
---
layout: default           # 기본 레이아웃 사용
title: "문서 제목"         # 화면에 표시될 제목
date: 2026-06-04         # 정렬 기준 (최신순)
tags: [Tag1, Tag2]       # 상단 필터에서 사용될 태그
---
```

## 4. 실행 및 관리 스크립트

- `run.sh`: 로컬 서버 실행 스크립트
- `git_push.sh`: 변경 사항을 깃허브에 배포하는 스크립트
