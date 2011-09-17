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

### Using _kansoblog_ as a carousel iframe

If you want an iframe in some other site (e.g. as a text widget in wordpress) that shows something like "random tips",
you can create a kansoblog instance for this purpose, fill it with some short items, and use the blog's `/carousel` page
as that iframe. You can see an example of such a carousel (Hebrew, RTL) [here](http://tipsanook.thedod.iriscouch.com/carousel).
This can also be used for tour dates, featured articles, and anything else that fits such a format.

Note that you can say in `lib/config.js` how many items you want to fetch for the carousel's query (e.g. latest 23 items). They will be randomize on the browser's side, but we fetch all of them - so a large number may take longer to load.

You should also define carousel's skin there: Kansoblog comes with a skin called _mango_
(a variation on _tango_ that came with _jcarousel_). _Jcarousel_ skins dictate size, colors, etc.,
so if you want to change any of these - duplicate `static/jcarousel/skins/mango/`,
customize the files there, and define the new folder's name as your _jcarousel_ style at `lib/config.js`.
