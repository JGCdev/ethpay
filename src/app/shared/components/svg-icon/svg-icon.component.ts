import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser'
let svgIcons = {
    "metamask": 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxOC42IDMxOC42IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMTguNiAzMTguNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogICAgICAgICAgICAgICAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KICAgICAgICAgICAgICAgICAgICAuc3Qwe2ZpbGw6I0UyNzYxQjtzdHJva2U6I0UyNzYxQjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQogICAgICAgICAgICAgICAgICAgIC5zdDF7ZmlsbDojRTQ3NjFCO3N0cm9rZTojRTQ3NjFCO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9CiAgICAgICAgICAgICAgICAgICAgLnN0MntmaWxsOiNEN0MxQjM7c3Ryb2tlOiNEN0MxQjM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KICAgICAgICAgICAgICAgICAgICAuc3Qze2ZpbGw6IzIzMzQ0NztzdHJva2U6IzIzMzQ0NztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQogICAgICAgICAgICAgICAgICAgIC5zdDR7ZmlsbDojQ0Q2MTE2O3N0cm9rZTojQ0Q2MTE2O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9CiAgICAgICAgICAgICAgICAgICAgLnN0NXtmaWxsOiNFNDc1MUY7c3Ryb2tlOiNFNDc1MUY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KICAgICAgICAgICAgICAgICAgICAuc3Q2e2ZpbGw6I0Y2ODUxQjtzdHJva2U6I0Y2ODUxQjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQogICAgICAgICAgICAgICAgICAgIC5zdDd7ZmlsbDojQzBBRDlFO3N0cm9rZTojQzBBRDlFO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9CiAgICAgICAgICAgICAgICAgICAgLnN0OHtmaWxsOiMxNjE2MTY7c3Ryb2tlOiMxNjE2MTY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KICAgICAgICAgICAgICAgICAgICAuc3Q5e2ZpbGw6Izc2M0QxNjtzdHJva2U6Izc2M0QxNjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQogICAgICAgICAgICAgICAgPC9zdHlsZT4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMjc0LjEsMzUuNSAxNzQuNiwxMDkuNCAxOTMsNjUuOCAiLz4KICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iNDQuNCwzNS41IDE0My4xLDExMC4xIDEyNS42LDY1LjggICIvPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMjM4LjMsMjA2LjggMjExLjgsMjQ3LjQgMjY4LjUsMjYzIDI4NC44LDIwNy43ICAiLz4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjMzLjksMjA3LjcgNTAuMSwyNjMgMTA2LjgsMjQ3LjQgODAuMywyMDYuOCAgIi8+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMDMuNiwxMzguMiA4Ny44LDE2Mi4xIDE0NC4xLDE2NC42IDE0Mi4xLDEwNC4xICAiLz4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjIxNC45LDEzOC4yIDE3NS45LDEwMy40IDE3NC42LDE2NC42IDIzMC44LDE2Mi4xICAiLz4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjEwNi44LDI0Ny40IDE0MC42LDIzMC45IDExMS40LDIwOC4xICAiLz4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjE3Ny45LDIzMC45IDIxMS44LDI0Ny40IDIwNy4xLDIwOC4xICAiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMjExLjgsMjQ3LjQgMTc3LjksMjMwLjkgMTgwLjYsMjUzIDE4MC4zLDI2Mi4zICAiLz4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjEwNi44LDI0Ny40IDEzOC4zLDI2Mi4zIDEzOC4xLDI1MyAxNDAuNiwyMzAuOSAgIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3QzIiBwb2ludHM9IjEzOC44LDE5My41IDExMC42LDE4NS4yIDEzMC41LDE3Ni4xICIvPgogICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0MyIgcG9pbnRzPSIxNzkuNywxOTMuNSAxODgsMTc2LjEgMjA4LDE4NS4yICIvPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIxMDYuOCwyNDcuNCAxMTEuNiwyMDYuOCA4MC4zLDIwNy43ICAiLz4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3Q0IiBwb2ludHM9IjIwNywyMDYuOCAyMTEuOCwyNDcuNCAyMzguMywyMDcuNyAgIi8+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIyMzAuOCwxNjIuMSAxNzQuNiwxNjQuNiAxNzkuOCwxOTMuNSAxODguMSwxNzYuMSAyMDguMSwxODUuMiAgIi8+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIxMTAuNiwxODUuMiAxMzAuNiwxNzYuMSAxMzguOCwxOTMuNSAxNDQuMSwxNjQuNiA4Ny44LDE2Mi4xICAiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzdDUiIHBvaW50cz0iODcuOCwxNjIuMSAxMTEuNCwyMDguMSAxMTAuNiwxODUuMiAgIi8+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIyMDguMSwxODUuMiAyMDcuMSwyMDguMSAyMzAuOCwxNjIuMSAgIi8+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIxNDQuMSwxNjQuNiAxMzguOCwxOTMuNSAxNDUuNCwyMjcuNiAxNDYuOSwxODIuNyAgIi8+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIxNzQuNiwxNjQuNiAxNzEuOSwxODIuNiAxNzMuMSwyMjcuNiAxNzkuOCwxOTMuNSAgIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjE3OS44LDE5My41IDE3My4xLDIyNy42IDE3Ny45LDIzMC45IDIwNy4xLDIwOC4xIDIwOC4xLDE4NS4yICIvPgogICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0NiIgcG9pbnRzPSIxMTAuNiwxODUuMiAxMTEuNCwyMDguMSAxNDAuNiwyMzAuOSAxNDUuNCwyMjcuNiAxMzguOCwxOTMuNSAiLz4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzdDciIHBvaW50cz0iMTgwLjMsMjYyLjMgMTgwLjYsMjUzIDE3OC4xLDI1MC44IDE0MC40LDI1MC44IDEzOC4xLDI1MyAxMzguMywyNjIuMyAxMDYuOCwyNDcuNCAxMTcuOCwyNTYuNCAgIDE0MC4xLDI3MS45IDE3OC40LDI3MS45IDIwMC44LDI1Ni40IDIxMS44LDI0Ny40ICIvPgogICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0OCIgcG9pbnRzPSIxNzcuOSwyMzAuOSAxNzMuMSwyMjcuNiAxNDUuNCwyMjcuNiAxNDAuNiwyMzAuOSAxMzguMSwyNTMgMTQwLjQsMjUwLjggMTc4LjEsMjUwLjggMTgwLjYsMjUzICIvPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0OSIgcG9pbnRzPSIyNzguMywxMTQuMiAyODYuOCw3My40IDI3NC4xLDM1LjUgMTc3LjksMTA2LjkgMjE0LjksMTM4LjIgMjY3LjIsMTUzLjUgMjc4LjgsMTQwIDI3My44LDEzNi40ICAgIDI4MS44LDEyOS4xIDI3NS42LDEyNC4zIDI4My42LDExOC4yICAiLz4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0ic3Q5IiBwb2ludHM9IjMxLjgsNzMuNCA0MC4zLDExNC4yIDM0LjksMTE4LjIgNDIuOSwxMjQuMyAzNi44LDEyOS4xIDQ0LjgsMTM2LjQgMzkuOCwxNDAgNTEuMywxNTMuNSAxMDMuNiwxMzguMiAgICAxNDAuNiwxMDYuOSA0NC40LDM1LjUgICIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9InN0NiIgcG9pbnRzPSIyNjcuMiwxNTMuNSAyMTQuOSwxMzguMiAyMzAuOCwxNjIuMSAyMDcuMSwyMDguMSAyMzguMywyMDcuNyAyODQuOCwyMDcuNyAiLz4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzdDYiIHBvaW50cz0iMTAzLjYsMTM4LjIgNTEuMywxNTMuNSAzMy45LDIwNy43IDgwLjMsMjA3LjcgMTExLjQsMjA4LjEgODcuOCwxNjIuMSAiLz4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzdDYiIHBvaW50cz0iMTc0LjYsMTY0LjYgMTc3LjksMTA2LjkgMTkzLjEsNjUuOCAxMjUuNiw2NS44IDE0MC42LDEwNi45IDE0NC4xLDE2NC42IDE0NS4zLDE4Mi44IDE0NS40LDIyNy42ICAgMTczLjEsMjI3LjYgMTczLjMsMTgyLjggIi8+CiAgICAgICAgICA8L3N2Zz4=',
    "twitter": 'PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VHdpdHRlcjwvdGl0bGU+PHBhdGggZD0iTTIzLjk1MyA0LjU3YTEwIDEwIDAgMDEtMi44MjUuNzc1IDQuOTU4IDQuOTU4IDAgMDAyLjE2My0yLjcyM2MtLjk1MS41NTUtMi4wMDUuOTU5LTMuMTI3IDEuMTg0YTQuOTIgNC45MiAwIDAwLTguMzg0IDQuNDgyQzcuNjkgOC4wOTUgNC4wNjcgNi4xMyAxLjY0IDMuMTYyYTQuODIyIDQuODIyIDAgMDAtLjY2NiAyLjQ3NWMwIDEuNzEuODcgMy4yMTMgMi4xODggNC4wOTZhNC45MDQgNC45MDQgMCAwMS0yLjIyOC0uNjE2di4wNmE0LjkyMyA0LjkyMyAwIDAwMy45NDYgNC44MjcgNC45OTYgNC45OTYgMCAwMS0yLjIxMi4wODUgNC45MzYgNC45MzYgMCAwMDQuNjA0IDMuNDE3IDkuODY3IDkuODY3IDAgMDEtNi4xMDIgMi4xMDVjLS4zOSAwLS43NzktLjAyMy0xLjE3LS4wNjdhMTMuOTk1IDEzLjk5NSAwIDAwNy41NTcgMi4yMDljOS4wNTMgMCAxMy45OTgtNy40OTYgMTMuOTk4LTEzLjk4NSAwLS4yMSAwLS40Mi0uMDE1LS42M0E5LjkzNSA5LjkzNSAwIDAwMjQgNC41OXoiLz48L3N2Zz4=',
    "instagram": "PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+SW5zdGFncmFtPC90aXRsZT48cGF0aCBkPSJNMTIgMEM4Ljc0IDAgOC4zMzMuMDE1IDcuMDUzLjA3MiA1Ljc3NS4xMzIgNC45MDUuMzMzIDQuMTQuNjNjLS43ODkuMzA2LTEuNDU5LjcxNy0yLjEyNiAxLjM4NFMuOTM1IDMuMzUuNjMgNC4xNEMuMzMzIDQuOTA1LjEzMSA1Ljc3NS4wNzIgNy4wNTMuMDEyIDguMzMzIDAgOC43NCAwIDEycy4wMTUgMy42NjcuMDcyIDQuOTQ3Yy4wNiAxLjI3Ny4yNjEgMi4xNDguNTU4IDIuOTEzLjMwNi43ODguNzE3IDEuNDU5IDEuMzg0IDIuMTI2LjY2Ny42NjYgMS4zMzYgMS4wNzkgMi4xMjYgMS4zODQuNzY2LjI5NiAxLjYzNi40OTkgMi45MTMuNTU4QzguMzMzIDIzLjk4OCA4Ljc0IDI0IDEyIDI0czMuNjY3LS4wMTUgNC45NDctLjA3MmMxLjI3Ny0uMDYgMi4xNDgtLjI2MiAyLjkxMy0uNTU4Ljc4OC0uMzA2IDEuNDU5LS43MTggMi4xMjYtMS4zODQuNjY2LS42NjcgMS4wNzktMS4zMzUgMS4zODQtMi4xMjYuMjk2LS43NjUuNDk5LTEuNjM2LjU1OC0yLjkxMy4wNi0xLjI4LjA3Mi0xLjY4Ny4wNzItNC45NDdzLS4wMTUtMy42NjctLjA3Mi00Ljk0N2MtLjA2LTEuMjc3LS4yNjItMi4xNDktLjU1OC0yLjkxMy0uMzA2LS43ODktLjcxOC0xLjQ1OS0xLjM4NC0yLjEyNkMyMS4zMTkgMS4zNDcgMjAuNjUxLjkzNSAxOS44Ni42M2MtLjc2NS0uMjk3LTEuNjM2LS40OTktMi45MTMtLjU1OEMxNS42NjcuMDEyIDE1LjI2IDAgMTIgMHptMCAyLjE2YzMuMjAzIDAgMy41ODUuMDE2IDQuODUuMDcxIDEuMTcuMDU1IDEuODA1LjI0OSAyLjIyNy40MTUuNTYyLjIxNy45Ni40NzcgMS4zODIuODk2LjQxOS40Mi42NzkuODE5Ljg5NiAxLjM4MS4xNjQuNDIyLjM2IDEuMDU3LjQxMyAyLjIyNy4wNTcgMS4yNjYuMDcgMS42NDYuMDcgNC44NXMtLjAxNSAzLjU4NS0uMDc0IDQuODVjLS4wNjEgMS4xNy0uMjU2IDEuODA1LS40MjEgMi4yMjctLjIyNC41NjItLjQ3OS45Ni0uODk5IDEuMzgyLS40MTkuNDE5LS44MjQuNjc5LTEuMzguODk2LS40Mi4xNjQtMS4wNjUuMzYtMi4yMzUuNDEzLTEuMjc0LjA1Ny0xLjY0OS4wNy00Ljg1OS4wNy0zLjIxMSAwLTMuNTg2LS4wMTUtNC44NTktLjA3NC0xLjE3MS0uMDYxLTEuODE2LS4yNTYtMi4yMzYtLjQyMS0uNTY5LS4yMjQtLjk2LS40NzktMS4zNzktLjg5OS0uNDIxLS40MTktLjY5LS44MjQtLjktMS4zOC0uMTY1LS40Mi0uMzU5LTEuMDY1LS40Mi0yLjIzNS0uMDQ1LTEuMjYtLjA2MS0xLjY0OS0uMDYxLTQuODQ0IDAtMy4xOTYuMDE2LTMuNTg2LjA2MS00Ljg2MS4wNjEtMS4xNy4yNTUtMS44MTQuNDItMi4yMzQuMjEtLjU3LjQ3OS0uOTYuOS0xLjM4MS40MTktLjQxOS44MS0uNjg5IDEuMzc5LS44OTguNDItLjE2NiAxLjA1MS0uMzYxIDIuMjIxLS40MjEgMS4yNzUtLjA0NSAxLjY1LS4wNiA0Ljg1OS0uMDZsLjA0NS4wM3ptMCAzLjY3OGMtMy40MDUgMC02LjE2MiAyLjc2LTYuMTYyIDYuMTYyIDAgMy40MDUgMi43NiA2LjE2MiA2LjE2MiA2LjE2MiAzLjQwNSAwIDYuMTYyLTIuNzYgNi4xNjItNi4xNjIgMC0zLjQwNS0yLjc2LTYuMTYyLTYuMTYyLTYuMTYyek0xMiAxNmMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNCA0IDEuNzkgNCA0LTEuNzkgNC00IDR6bTcuODQ2LTEwLjQwNWMwIC43OTUtLjY0NiAxLjQ0LTEuNDQgMS40NC0uNzk1IDAtMS40NC0uNjQ2LTEuNDQtMS40NCAwLS43OTQuNjQ2LTEuNDM5IDEuNDQtMS40MzkuNzkzLS4wMDEgMS40NC42NDUgMS40NCAxLjQzOXoiLz48L3N2Zz4=",
    "logout": "CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMzg0Ljk3MSAzODQuOTcxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzODQuOTcxIDM4NC45NzE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iU2lnbl9PdXQiPgoJCTxwYXRoIGQ9Ik0xODAuNDU1LDM2MC45MUgyNC4wNjFWMjQuMDYxaDE1Ni4zOTRjNi42NDEsMCwxMi4wMy01LjM5LDEyLjAzLTEyLjAzcy01LjM5LTEyLjAzLTEyLjAzLTEyLjAzSDEyLjAzCgkJCUM1LjM5LDAuMDAxLDAsNS4zOSwwLDEyLjAzMVYzNzIuOTRjMCw2LjY0MSw1LjM5LDEyLjAzLDEyLjAzLDEyLjAzaDE2OC40MjRjNi42NDEsMCwxMi4wMy01LjM5LDEyLjAzLTEyLjAzCgkJCUMxOTIuNDg1LDM2Ni4yOTksMTg3LjA5NSwzNjAuOTEsMTgwLjQ1NSwzNjAuOTF6Ii8+CgkJPHBhdGggZD0iTTM4MS40ODEsMTg0LjA4OGwtODMuMDA5LTg0LjJjLTQuNzA0LTQuNzUyLTEyLjMxOS00Ljc0LTE3LjAxMSwwYy00LjcwNCw0Ljc0LTQuNzA0LDEyLjQzOSwwLDE3LjE3OWw2Mi41NTgsNjMuNDZIOTYuMjc5CgkJCWMtNi42NDEsMC0xMi4wMyw1LjQzOC0xMi4wMywxMi4xNTFjMCw2LjcxMyw1LjM5LDEyLjE1MSwxMi4wMywxMi4xNTFoMjQ3Ljc0bC02Mi41NTgsNjMuNDZjLTQuNzA0LDQuNzUyLTQuNzA0LDEyLjQzOSwwLDE3LjE3OQoJCQljNC43MDQsNC43NTIsMTIuMzE5LDQuNzUyLDE3LjAxMSwwbDgyLjk5Ny04NC4yQzM4Ni4xMTMsMTk2LjU4OCwzODYuMTYxLDE4OC43NTYsMzgxLjQ4MSwxODQuMDg4eiIvPgoJPC9nPgoJPC9nPgo8L3N2Zz4K",
    "github": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDBjLTYuNjI2IDAtMTIgNS4zNzMtMTIgMTIgMCA1LjMwMiAzLjQzOCA5LjggOC4yMDcgMTEuMzg3LjU5OS4xMTEuNzkzLS4yNjEuNzkzLS41Nzd2LTIuMjM0Yy0zLjMzOC43MjYtNC4wMzMtMS40MTYtNC4wMzMtMS40MTYtLjU0Ni0xLjM4Ny0xLjMzMy0xLjc1Ni0xLjMzMy0xLjc1Ni0xLjA4OS0uNzQ1LjA4My0uNzI5LjA4My0uNzI5IDEuMjA1LjA4NCAxLjgzOSAxLjIzNyAxLjgzOSAxLjIzNyAxLjA3IDEuODM0IDIuODA3IDEuMzA0IDMuNDkyLjk5Ny4xMDctLjc3NS40MTgtMS4zMDUuNzYyLTEuNjA0LTIuNjY1LS4zMDUtNS40NjctMS4zMzQtNS40NjctNS45MzEgMC0xLjMxMS40NjktMi4zODEgMS4yMzYtMy4yMjEtLjEyNC0uMzAzLS41MzUtMS41MjQuMTE3LTMuMTc2IDAgMCAxLjAwOC0uMzIyIDMuMzAxIDEuMjMuOTU3LS4yNjYgMS45ODMtLjM5OSAzLjAwMy0uNDA0IDEuMDIuMDA1IDIuMDQ3LjEzOCAzLjAwNi40MDQgMi4yOTEtMS41NTIgMy4yOTctMS4yMyAzLjI5Ny0xLjIzLjY1MyAxLjY1My4yNDIgMi44NzQuMTE4IDMuMTc2Ljc3Ljg0IDEuMjM1IDEuOTExIDEuMjM1IDMuMjIxIDAgNC42MDktMi44MDcgNS42MjQtNS40NzkgNS45MjEuNDMuMzcyLjgyMyAxLjEwMi44MjMgMi4yMjJ2My4yOTNjMCAuMzE5LjE5Mi42OTQuODAxLjU3NiA0Ljc2NS0xLjU4OSA4LjE5OS02LjA4NiA4LjE5OS0xMS4zODYgMC02LjYyNy01LjM3My0xMi0xMi0xMnoiLz48L3N2Zz4=",
    "arrow-down": "PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMzMwIDMzMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzMwIDMzMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBpZD0iWE1MSURfMjI1XyIgZD0iTTMyNS42MDcsNzkuMzkzYy01Ljg1Ny01Ljg1Ny0xNS4zNTUtNS44NTgtMjEuMjEzLDAuMDAxbC0xMzkuMzksMTM5LjM5M0wyNS42MDcsNzkuMzkzCgljLTUuODU3LTUuODU3LTE1LjM1NS01Ljg1OC0yMS4yMTMsMC4wMDFjLTUuODU4LDUuODU4LTUuODU4LDE1LjM1NSwwLDIxLjIxM2wxNTAuMDA0LDE1MGMyLjgxMywyLjgxMyw2LjYyOCw0LjM5MywxMC42MDYsNC4zOTMKCXM3Ljc5NC0xLjU4MSwxMC42MDYtNC4zOTRsMTQ5Ljk5Ni0xNTBDMzMxLjQ2NSw5NC43NDksMzMxLjQ2NSw4NS4yNTEsMzI1LjYwNyw3OS4zOTN6Ii8+Cjwvc3ZnPg==",
    "opensea": "PHN2ZyB2aWV3Qm94PSIwIDAgOTAgOTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00NSAwQzIwLjE1MSAwIDAgMjAuMTUxIDAgNDVDMCA2OS44NDkgMjAuMTUxIDkwIDQ1IDkwQzY5Ljg0OSA5MCA5MCA2OS44NDkgOTAgNDVDOTAgMjAuMTUxIDY5Ljg1OCAwIDQ1IDBaTTIyLjIwMyA0Ni41MTJMMjIuMzkyIDQ2LjIwNkwzNC4xMDEgMjcuODkxQzM0LjI3MiAyNy42MyAzNC42NzcgMjcuNjU3IDM0LjgwMyAyNy45NDVDMzYuNzU2IDMyLjMyOCAzOC40NDggMzcuNzgyIDM3LjY1NiA0MS4xNzVDMzcuMzIzIDQyLjU3IDM2LjM5NiA0NC40NiAzNS4zNTIgNDYuMjA2QzM1LjIxNyA0Ni40NTggMzUuMDczIDQ2LjcxIDM0LjkxMSA0Ni45NTNDMzQuODM5IDQ3LjA2MSAzNC43MTMgNDcuMTI0IDM0LjU3OCA0Ny4xMjRIMjIuNTQ1QzIyLjIyMSA0Ny4xMjQgMjIuMDMyIDQ2Ljc3MyAyMi4yMDMgNDYuNTEyWk03NC4zNzYgNTIuODEyQzc0LjM3NiA1Mi45ODMgNzQuMjc3IDUzLjEyNyA3NC4xMzMgNTMuMTlDNzMuMjI0IDUzLjU3NyA3MC4xMTkgNTUuMDA4IDY4LjgzMiA1Ni43OTlDNjUuNTM4IDYxLjM4IDYzLjAyNyA2Ny45MzIgNTcuNDAyIDY3LjkzMkgzMy45NDhDMjUuNjMyIDY3LjkzMiAxOC45IDYxLjE3MyAxOC45IDUyLjgzVjUyLjU2QzE4LjkgNTIuMzQ0IDE5LjA4IDUyLjE2NCAxOS4zMDUgNTIuMTY0SDMyLjM3M0MzMi42MzQgNTIuMTY0IDMyLjgyMyA1Mi4zOTggMzIuODA1IDUyLjY1OUMzMi43MDYgNTMuNTA1IDMyLjg2OCA1NC4zNzggMzMuMjczIDU1LjE3QzM0LjA0NyA1Ni43NDUgMzUuNjU4IDU3LjcyNiAzNy4zOTUgNTcuNzI2SDQzLjg2NlY1Mi42NzdIMzcuNDY3QzM3LjE0MyA1Mi42NzcgMzYuOTQ1IDUyLjI5OSAzNy4xMzQgNTIuMDI5QzM3LjIwNiA1MS45MjEgMzcuMjc4IDUxLjgxMyAzNy4zNjggNTEuNjg3QzM3Ljk3MSA1MC44MjMgMzguODM1IDQ5LjQ5MSAzOS42OTkgNDcuOTdDNDAuMjg0IDQ2Ljk0NCA0MC44NTEgNDUuODQ2IDQxLjMxIDQ0Ljc0OEM0MS40IDQ0LjU1IDQxLjQ3MiA0NC4zNDMgNDEuNTUzIDQ0LjE0NUM0MS42NzkgNDMuNzk0IDQxLjgwNSA0My40NjEgNDEuODk1IDQzLjEzN0M0MS45ODUgNDIuODU4IDQyLjA2NiA0Mi41NyA0Mi4xMzggNDIuM0M0Mi4zNTQgNDEuMzY0IDQyLjQ0NCA0MC4zNzQgNDIuNDQ0IDM5LjM0OEM0Mi40NDQgMzguOTQzIDQyLjQyNiAzOC41MiA0Mi4zOSAzOC4xMjRDNDIuMzcyIDM3LjY4MyA0Mi4zMTggMzcuMjQyIDQyLjI2NCAzNi44MDFDNDIuMjI4IDM2LjQxNCA0Mi4xNTYgMzYuMDI3IDQyLjA4NCAzNS42MzFDNDEuOTg1IDM1LjA0NiA0MS44NTkgMzQuNDYxIDQxLjcxNSAzMy44NzZMNDEuNjYxIDMzLjY1MUM0MS41NTMgMzMuMjQ2IDQxLjQ1NCAzMi44NjggNDEuMzI4IDMyLjQ2M0M0MC45NTkgMzEuMjAzIDQwLjU0NSAyOS45NyA0MC4wOTUgMjguODE4QzM5LjkzMyAyOC4zNTkgMzkuNzUzIDI3LjkxOCAzOS41NjQgMjcuNDg2QzM5LjI5NCAyNi44MiAzOS4wMTUgMjYuMjE3IDM4Ljc2MyAyNS42NUMzOC42MjggMjUuMzg5IDM4LjUyIDI1LjE1NSAzOC40MTIgMjQuOTEyQzM4LjI4NiAyNC42NDIgMzguMTYgMjQuMzcyIDM4LjAyNSAyNC4xMTFDMzcuOTM1IDIzLjkxMyAzNy44MjcgMjMuNzI0IDM3Ljc1NSAyMy41NDRMMzYuOTYzIDIyLjA4NkMzNi44NTUgMjEuODg4IDM3LjAzNSAyMS42NDUgMzcuMjUxIDIxLjcwOEw0Mi4yMDEgMjMuMDQ5SDQyLjIxOUM0Mi4yMjggMjMuMDQ5IDQyLjIyOCAyMy4wNDkgNDIuMjM3IDIzLjA0OUw0Mi44ODUgMjMuMjM4TDQzLjYwNSAyMy40MzZMNDMuODY2IDIzLjUwOFYyMC41NzRDNDMuODY2IDE5LjE1MiA0NSAxOCA0Ni40MTMgMThDNDcuMTE1IDE4IDQ3Ljc1NCAxOC4yODggNDguMjA0IDE4Ljc1NkM0OC42NjMgMTkuMjI0IDQ4Ljk1MSAxOS44NjMgNDguOTUxIDIwLjU3NFYyNC45MzlMNDkuNDgyIDI1LjA4M0M0OS41MTggMjUuMTAxIDQ5LjU2MyAyNS4xMTkgNDkuNTk5IDI1LjE0NkM0OS43MjUgMjUuMjM2IDQ5LjkxNCAyNS4zOCA1MC4xNDggMjUuNTZDNTAuMzM3IDI1LjcwNCA1MC41MzUgMjUuODg0IDUwLjc2OSAyNi4wNzNDNTEuMjQ2IDI2LjQ2IDUxLjgyMiAyNi45NTUgNTIuNDQzIDI3LjUyMkM1Mi42MDUgMjcuNjY2IDUyLjc2NyAyNy44MSA1Mi45MiAyNy45NjNDNTMuNzIxIDI4LjcxIDU0LjYyMSAyOS41ODMgNTUuNDg1IDMwLjU1NUM1NS43MjggMzAuODM0IDU1Ljk2MiAzMS4xMDQgNTYuMjA1IDMxLjQwMUM1Ni40MzkgMzEuNjk4IDU2LjcgMzEuOTg2IDU2LjkxNiAzMi4yNzRDNTcuMjEzIDMyLjY2MSA1Ny41MTkgMzMuMDY2IDU3Ljc5OCAzMy40ODlDNTcuOTI0IDMzLjY4NyA1OC4wNzcgMzMuODk0IDU4LjE5NCAzNC4wOTJDNTguNTU0IDM0LjYyMyA1OC44NiAzNS4xNzIgNTkuMTU3IDM1LjcyMUM1OS4yODMgMzUuOTczIDU5LjQwOSAzNi4yNTIgNTkuNTE3IDM2LjUyMkM1OS44NSAzNy4yNiA2MC4xMTEgMzguMDA3IDYwLjI3MyAzOC43NjNDNjAuMzI3IDM4LjkyNSA2MC4zNjMgMzkuMDk2IDYwLjM4MSAzOS4yNThWMzkuMjk0QzYwLjQzNSAzOS41MSA2MC40NTMgMzkuNzQ0IDYwLjQ3MSAzOS45ODdDNjAuNTQzIDQwLjc1MiA2MC41MDcgNDEuNTI2IDYwLjM0NSA0Mi4zQzYwLjI3MyA0Mi42MjQgNjAuMTgzIDQyLjkzIDYwLjA3NSA0My4yNjNDNTkuOTU4IDQzLjU3OCA1OS44NSA0My45MDIgNTkuNzA2IDQ0LjIxN0M1OS40MjcgNDQuODU2IDU5LjEwMyA0NS41MDQgNTguNzE2IDQ2LjA5OEM1OC41OSA0Ni4zMjMgNTguNDM3IDQ2LjU1NyA1OC4yOTMgNDYuNzgyQzU4LjEzMSA0Ny4wMTYgNTcuOTYgNDcuMjQxIDU3LjgxNiA0Ny40NTdDNTcuNjA5IDQ3LjczNiA1Ny4zOTMgNDguMDI0IDU3LjE2OCA0OC4yODVDNTYuOTcgNDguNTU1IDU2Ljc3MiA0OC44MjUgNTYuNTQ3IDQ5LjA2OEM1Ni4yNDEgNDkuNDM3IDU1Ljk0NCA0OS43NzkgNTUuNjI5IDUwLjExMkM1NS40NDkgNTAuMzI4IDU1LjI1MSA1MC41NTMgNTUuMDQ0IDUwLjc1MUM1NC44NDYgNTAuOTc2IDU0LjYzOSA1MS4xNzQgNTQuNDU5IDUxLjM1NEM1NC4xNDQgNTEuNjY5IDUzLjg5MiA1MS45MDMgNTMuNjc2IDUyLjExTDUzLjE2MyA1Mi41NjlDNTMuMDkxIDUyLjY0MSA1Mi45OTIgNTIuNjc3IDUyLjg5MyA1Mi42NzdINDguOTUxVjU3LjcyNkg1My45MUM1NS4wMTcgNTcuNzI2IDU2LjA3IDU3LjMzOSA1Ni45MjUgNTYuNjFDNTcuMjEzIDU2LjM1OCA1OC40ODIgNTUuMjYgNTkuOTg1IDUzLjYwNEM2MC4wMzkgNTMuNTQxIDYwLjEwMiA1My41MDUgNjAuMTc0IDUzLjQ4N0w3My44NjMgNDkuNTI3Qzc0LjEyNCA0OS40NTUgNzQuMzc2IDQ5LjY0NCA3NC4zNzYgNDkuOTE0VjUyLjgxMlY1Mi44MTJaIiAvPgo8L3N2Zz4=",
    "discord": "PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI5MyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+CiAgICA8Zz4KICAgICAgICA8cGF0aCBkPSJNMjI2LjAxMTQyOSwwIEwyOS45ODg1NzE0LDAgQzEzLjQ1ODI4NTcsMCAwLDEzLjQ1ODI4NTcgMCwzMC4xMzQ4NTcxIEwwLDIyNy45MTMxNDMgQzAsMjQ0LjU4OTcxNCAxMy40NTgyODU3LDI1OC4wNDggMjkuOTg4NTcxNCwyNTguMDQ4IEwxOTUuODc2NTcxLDI1OC4wNDggTDE4OC4xMjM0MjksMjMwLjk4NTE0MyBMMjA2Ljg0OCwyNDguMzkzMTQzIEwyMjQuNTQ4NTcxLDI2NC43NzcxNDMgTDI1NiwyOTIuNTcxNDI5IEwyNTYsMzAuMTM0ODU3MSBDMjU2LDEzLjQ1ODI4NTcgMjQyLjU0MTcxNCwwIDIyNi4wMTE0MjksMCBaIE0xNjkuNTQ1MTQzLDE5MS4wNDkxNDMgQzE2OS41NDUxNDMsMTkxLjA0OTE0MyAxNjQuMjc4ODU3LDE4NC43NTg4NTcgMTU5Ljg5MDI4NiwxNzkuMiBDMTc5LjA1MzcxNCwxNzMuNzg3NDI5IDE4Ni4zNjgsMTYxLjc5MiAxODYuMzY4LDE2MS43OTIgQzE4MC4zNzAyODYsMTY1Ljc0MTcxNCAxNzQuNjY1MTQzLDE2OC41MjExNDMgMTY5LjU0NTE0MywxNzAuNDIyODU3IEMxNjIuMjMwODU3LDE3My40OTQ4NTcgMTU1LjIwOTE0MywxNzUuNTQyODU3IDE0OC4zMzM3MTQsMTc2LjcxMzE0MyBDMTM0LjI5MDI4NiwxNzkuMzQ2Mjg2IDEyMS40MTcxNDMsMTc4LjYxNDg1NyAxMTAuNDQ1NzE0LDE3Ni41NjY4NTcgQzEwMi4xMDc0MjksMTc0Ljk1NzcxNCA5NC45Mzk0Mjg2LDE3Mi42MTcxNDMgODguOTQxNzE0MywxNzAuMjc2NTcxIEM4NS41NzcxNDI5LDE2OC45NiA4MS45MiwxNjcuMzUwODU3IDc4LjI2Mjg1NzEsMTY1LjMwMjg1NyBDNzcuODI0LDE2NS4wMTAyODYgNzcuMzg1MTQyOSwxNjQuODY0IDc2Ljk0NjI4NTcsMTY0LjU3MTQyOSBDNzYuNjUzNzE0MywxNjQuNDI1MTQzIDc2LjUwNzQyODYsMTY0LjI3ODg1NyA3Ni4zNjExNDI5LDE2NC4xMzI1NzEgQzczLjcyOCwxNjIuNjY5NzE0IDcyLjI2NTE0MjksMTYxLjY0NTcxNCA3Mi4yNjUxNDI5LDE2MS42NDU3MTQgQzcyLjI2NTE0MjksMTYxLjY0NTcxNCA3OS4yODY4NTcxLDE3My4zNDg1NzEgOTcuODY1MTQyOSwxNzguOTA3NDI5IEM5My40NzY1NzE0LDE4NC40NjYyODYgODguMDY0LDE5MS4wNDkxNDMgODguMDY0LDE5MS4wNDkxNDMgQzU1LjczNDg1NzEsMTkwLjAyNTE0MyA0My40NDY4NTcxLDE2OC44MTM3MTQgNDMuNDQ2ODU3MSwxNjguODEzNzE0IEM0My40NDY4NTcxLDEyMS43MDk3MTQgNjQuNTEyLDgzLjUyOTE0MjkgNjQuNTEyLDgzLjUyOTE0MjkgQzg1LjU3NzE0MjksNjcuNzMwMjg1NyAxMDUuNjE4Mjg2LDY4LjE2OTE0MjkgMTA1LjYxODI4Niw2OC4xNjkxNDI5IEwxMDcuMDgxMTQzLDY5LjkyNDU3MTQgQzgwLjc0OTcxNDMsNzcuNTMxNDI4NiA2OC42MDgsODkuMDg4IDY4LjYwOCw4OS4wODggQzY4LjYwOCw4OS4wODggNzEuODI2Mjg1Nyw4Ny4zMzI1NzE0IDc3LjIzODg1NzEsODQuODQ1NzE0MyBDOTIuODkxNDI4Niw3Ny45NzAyODU3IDEwNS4zMjU3MTQsNzYuMDY4NTcxNCAxMTAuNDQ1NzE0LDc1LjYyOTcxNDMgQzExMS4zMjM0MjksNzUuNDgzNDI4NiAxMTIuMDU0ODU3LDc1LjMzNzE0MjkgMTEyLjkzMjU3MSw3NS4zMzcxNDI5IEMxMjEuODU2LDc0LjE2Njg1NzEgMTMxLjk0OTcxNCw3My44NzQyODU3IDE0Mi40ODIyODYsNzUuMDQ0NTcxNCBDMTU2LjM3OTQyOSw3Ni42NTM3MTQzIDE3MS4zMDA1NzEsODAuNzQ5NzE0MyAxODYuNTE0Mjg2LDg5LjA4OCBDMTg2LjUxNDI4Niw4OS4wODggMTc0Ljk1NzcxNCw3OC4xMTY1NzE0IDE1MC4wODkxNDMsNzAuNTA5NzE0MyBMMTUyLjEzNzE0Myw2OC4xNjkxNDI5IEMxNTIuMTM3MTQzLDY4LjE2OTE0MjkgMTcyLjE3ODI4Niw2Ny43MzAyODU3IDE5My4yNDM0MjksODMuNTI5MTQyOSBDMTkzLjI0MzQyOSw4My41MjkxNDI5IDIxNC4zMDg1NzEsMTIxLjcwOTcxNCAyMTQuMzA4NTcxLDE2OC44MTM3MTQgQzIxNC4zMDg1NzEsMTY4LjgxMzcxNCAyMDEuODc0Mjg2LDE5MC4wMjUxNDMgMTY5LjU0NTE0MywxOTEuMDQ5MTQzIFogTTEwMS41MjIyODYsMTIyLjczMzcxNCBDOTMuMTg0LDEyMi43MzM3MTQgODYuNjAxMTQyOSwxMzAuMDQ4IDg2LjYwMTE0MjksMTM4Ljk3MTQyOSBDODYuNjAxMTQyOSwxNDcuODk0ODU3IDkzLjMzMDI4NTcsMTU1LjIwOTE0MyAxMDEuNTIyMjg2LDE1NS4yMDkxNDMgQzEwOS44NjA1NzEsMTU1LjIwOTE0MyAxMTYuNDQzNDI5LDE0Ny44OTQ4NTcgMTE2LjQ0MzQyOSwxMzguOTcxNDI5IEMxMTYuNTg5NzE0LDEzMC4wNDggMTA5Ljg2MDU3MSwxMjIuNzMzNzE0IDEwMS41MjIyODYsMTIyLjczMzcxNCBNMTU0LjkxNjU3MSwxMjIuNzMzNzE0IEMxNDYuNTc4Mjg2LDEyMi43MzM3MTQgMTM5Ljk5NTQyOSwxMzAuMDQ4IDEzOS45OTU0MjksMTM4Ljk3MTQyOSBDMTM5Ljk5NTQyOSwxNDcuODk0ODU3IDE0Ni43MjQ1NzEsMTU1LjIwOTE0MyAxNTQuOTE2NTcxLDE1NS4yMDkxNDMgQzE2My4yNTQ4NTcsMTU1LjIwOTE0MyAxNjkuODM3NzE0LDE0Ny44OTQ4NTcgMTY5LjgzNzcxNCwxMzguOTcxNDI5IEMxNjkuODM3NzE0LDEzMC4wNDggMTYzLjI1NDg1NywxMjIuNzMzNzE0IDE1NC45MTY1NzEsMTIyLjczMzcxNCI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4K",
    "hamburger": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiPjxwYXRoIGQ9Ik0gNSA4IEEgMi4wMDAyIDIuMDAwMiAwIDEgMCA1IDEyIEwgNDUgMTIgQSAyLjAwMDIgMi4wMDAyIDAgMSAwIDQ1IDggTCA1IDggeiBNIDUgMjMgQSAyLjAwMDIgMi4wMDAyIDAgMSAwIDUgMjcgTCA0NSAyNyBBIDIuMDAwMiAyLjAwMDIgMCAxIDAgNDUgMjMgTCA1IDIzIHogTSA1IDM4IEEgMi4wMDAyIDIuMDAwMiAwIDEgMCA1IDQyIEwgNDUgNDIgQSAyLjAwMDIgMi4wMDAyIDAgMSAwIDQ1IDM4IEwgNSAzOCB6Ii8+PC9zdmc+",
    "hamburger-close": "PHN2ZyB2aWV3Qm94PSIwIDAgMTcgMTciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iSWNvbnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgICAgICAgPGcgaWQ9IjI0LXB4LUljb25zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzY0LjAwMDAwMCwgLTEyNC4wMDAwMDApIiBzdHJva2U9IiMwMDAwMDAiPgogICAgICAgICAgICA8ZyBpZD0iaWNfY2FuY2VsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNjAuMDAwMDAwLCAxMjAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iY3Jvc3MiPgogICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDAwMDAwLCA1LjAwMDAwMCkiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDAgTDE0LjE0MjEzNTYsMTQuMTQyMTM1NiIgaWQ9IkxpbmUiIHN0cm9rZT0id2hpdGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0LDAgTDEuNzc2MzU2ODRlLTE1LDE0IiBpZD0iTGluZSIgc3Ryb2tlPSJ3aGl0ZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
    "website": "PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuODggMTIyLjg4Ij48cGF0aCBkPSJNNjAuNTQsMzQuMDdBNy42NSw3LjY1LDAsMCwxLDQ5LjcyLDIzLjI1bDEzLTEyLjk1YTM1LjM4LDM1LjM4LDAsMCwxLDQ5LjkxLDBsLjA3LjA4YTM1LjM3LDM1LjM3LDAsMCwxLS4wNyw0OS44M2wtMTMsMTIuOTVBNy42NSw3LjY1LDAsMCwxLDg4LjgxLDYyLjM0bDEzLTEzYTIwLjA4LDIwLjA4LDAsMCwwLDAtMjguMjNsLS4xMS0uMTFhMjAuMDgsMjAuMDgsMCwwLDAtMjguMi4wN2wtMTIuOTUsMTNabTE0LDMuMTZBNy42NSw3LjY1LDAsMCwxLDg1LjMxLDQ4LjA1TDQ4LjA1LDg1LjMxQTcuNjUsNy42NSwwLDAsMSwzNy4yMyw3NC41TDc0LjUsMzcuMjNaTTYyLjEsODkuMDVBNy42NSw3LjY1LDAsMCwxLDcyLjkxLDk5Ljg3bC0xMi43LDEyLjcxYTM1LjM3LDM1LjM3LDAsMCwxLTQ5Ljc2LjE0bC0uMjgtLjI3YTM1LjM4LDM1LjM4LDAsMCwxLC4xMy00OS43OEwyMyw1MEE3LjY1LDcuNjUsMCwxLDEsMzMuODMsNjAuNzhMMjEuMTIsNzMuNDlhMjAuMDksMjAuMDksMCwwLDAsMCwyOC4yNWwwLDBhMjAuMDcsMjAuMDcsMCwwLDAsMjguMjcsMEw2Mi4xLDg5LjA1WiIvPjwvc3ZnPg=="
  };

@Component({
  selector: 'svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {

  @Input() src: string = '';

  html: SafeHtml | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    for (const [key, value] of Object.entries(svgIcons)) {
      if (key === this.src) {
        this.html = this.sanitizer.bypassSecurityTrustHtml(atob(value));
      }
    }
  }

}
