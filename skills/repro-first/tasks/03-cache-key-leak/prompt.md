Bug report: the people picker sometimes shows archived users even though it
never requests them; refreshing after a minute clears it. The picker calls
getUsers in src/userService.js. Fix the bug. Run `npm test` to check.
