Backlog
=======

This is product backlog for Padio.

To do
-----
* Support for other browsers (FF and IE)
  - console log instead of debug for IE
  - warning about unsupported codecs for FF on win, maybe link to codecs pack 
  - unsupported FF on linux warning

* Media queries
  - handle width for mobile devices, maybe station info should go to the bottom of the page

* Favourites tab
  - new main tab - favourites
  - star for marking station as favourite (icon in svg)
  - nothing here msg when there is no favs

* Search field or tab?

* "Add station" functionality

* Add m3u support

* Select by country tab

* Bugfix: Playing stalls after computer wake up

* Share buttons (twitter, facebook, etc)
  - ability to share station info via social media with link to ladio
  - share info about application

* Display currently played track

* Switch to [IceCast](http://api.dir.xiph.org/experimental/full). Check first for possibility to add stations based on shoutcast servers.

* SSO support

* Remote ctrl using mobile browser

* Remove empty genres from the list

* Add expandable panel with station details

* Add clock - regular one that displays time

Tech backlog
------------
* grunt-replace for backend URLs and support email

In progress
-----------
* Install application in Google Play. Check Google Analytics.

Done
----
* Introduce recenty played stations
* Introduce play/stop controls and station name in the header
* Bugfix: second click of play doesn't start station
* Bugfix: handling of paused station (causes suspended state)
* Refresh UI (+background img, +url icon, +station margin, +button icons, +header shadow, +stations layout in js, +nothing here text for recent, +capitalize first letters in names and descs)
* Make 'Catalog' tab remember last location so user don't have to traverse
  whole directory to get to place where he was before. Swap recent and catalog items.
  Remember last open tab.
* Spinner for loading stations/genres.
* Home or about tab/popup with refs to me, bg_img, dirble. Also think out application name and change branding. Find icon for app. Put note that it's alpha version.

