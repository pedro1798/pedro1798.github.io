---
layout: default
title: 파일 시스템과 관련된 shell 명령어 
date: 2026-1-9
---
# fdisk
FDISK(8)		    System Manager's Manual		      FDISK(8)

NAME
     fdisk – DOS partition maintenance program

SYNOPSIS
     fdisk [-ieu] [-f mbrname] [-c cylinders] [-h heads] [-s sectors]
	   [-S size] [-b size] device

DESCRIPTION
In order for the BIOS to boot the kernel, certain conventions must be
     adhered to.  Sector 0 of a bootable hard disk must contain boot code, an
     MBR partition table, and a magic number (0xAA55).  These MBR partitions
     (also known as BIOS partitions) can be used to break the disk up into
     several pieces.

     The BIOS loads sector 0 of the boot disk into memory, verifies the magic
     number, and begins executing the code at the first byte.  The normal DOS
     MBR boot code searches the MBR partition table for an “active” partition
     (indicated by a ‘*’ in the first column), and if one is found, the boot
     block from that partition is loaded and executed in place of the original
     (MBR) boot block.

# dd

# lsblk

# mount, umount

# mkfs

# mkswap

## tip: col -b
man page 복사할 때 
```
man fdisk | col -b | head | pbcopy
```
처럼 col -b 명령어를 이용하면 편하다.

### col -b:
col 명령어는 column(열)의 약자로, 출력물에서 **역방향 라인 피드(reverse line feeds)**나 백스페이스 같은 제어 문자를 처리하여 텍스트를 정돈해 주는 필터 유틸리티이다.

- \-b: backspace 제거

Q. 왜 man 페이지와 함께 쓰나요?
man 명령어는 텍스트를 화면에 출력할 때 nroff라는 오래된 문서 형식화 도구를 사용한다. 이 도구는 강조(Bold)나 밑줄(Underline)을 표현하기 위해 아래와 같은 방식을 쓴다.

굵게(Bold): 글자 + \b + 글자 (예: N + \b + N → N)

밑줄(Underline): _ + \b + 글자 (예: _ + \b + f → <u>f</u>)

col -b는 이 복잡한 제어 문자 조합을 해석해서 우리 눈에 보이는 최종 텍스트만 남겨주기 때문에, 복사/붙여넣기를 할 때 필수적이다.
