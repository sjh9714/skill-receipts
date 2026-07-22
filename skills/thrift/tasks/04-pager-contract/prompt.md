Bug report from users: when paging through a list, the last item of each page
shows up again as the first item of the next page.

Fix the bug. The pagination cursor contract is documented in src/cursor.js.
Run `npm test` to check.
