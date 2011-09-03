This blog is a [couchapp](http://couchapp.org/) based on the [Kanso tutorial](http://kansojs.org/guides/getting_started.html), with several differences:

  * No comments (not sure whether I'll implement them and how).
  * WYSIWYG editor ([jwysiwyg](https://github.com/akzhan/jwysiwyg/)).
  * Although this is not needed in this case (since all documents are written by the blog's admin), html stored in a post's text field is not trusted (maybe the editor was bypassed - e.g. via curl). This is why the text goes through [Sanitize.js](https://github.com/gbirke/Sanitize.js).
  * Session UI (login/logout/etc.), flash messages, etc. shamelessly copy/pasted from Kanso's admin code.

Note that Sanitize.js is a client-side thing: If you view this post with javascript disabled in your browser, you'll see quoted html instead of the real deal. I'd rather have this server-side (e.g. as part of the code of a view), but couldn't find such a sanitizer [yet?].

### Installing

  * Install [Kanso](http://kansojs.org) on your computer.
  * Clone this repository, `cd` to its folder, do `git submoule init` and `git submodule update`.
  * Copy `lib/config-example.js` to `lib/config.js` and edit it (e.g. site name).
  * Setup a CouchDB server (version >= 1.1.0), or use a [public](http://iriscouch.com) one.
  * Create a user (for publishing blog posts), (say - _blogger_), and give it the staff role from `lib/config.js` (default is _bloggers_).
  * Create a database (say - _myblog_), click `security`, and add the staff role to the admin roles (say - _[ "bloggers" ]_).
  * Push to the server. For example: `kanso push blogger@http://localhost:5984/myblog`, and browse to the url it gives you. 

**Important:** If the server is _not_ localhost, user ssl whenever you push or login, even if it means using an ugly url like `https://myserver.iriscouch.com/myblog/_design/icanblogz/_rewrite/` instead of `http://blog.myserver.iriscouch.com`.

**Sad note:** I can push this app to localhost, but I keep getting _Error: EPIPE, Broken pipe_ when I try it on iriscouch. I simply push to localhost, keep the db clean of docs (only design docs) and replicate to iriscouch each time I change the code. Sad [as promised], but I'll live.
