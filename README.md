

# About

A desktop/portable version of the web-based point cloud viewer [Potree](https://github.com/potree/potree), thanks to [Electron](https://electronjs.org/).

* This version allows you to load [converted point clouds](https://github.com/potree/PotreeConverter) from your hard disc or USB drive. It's also portable so you can put your models together with the viewer on a USB drive and open it wherever you go. 
* It's only been tested on windows at the moment. It may not work on other systems or you may only be able to use it on the same Operating System that you've initially built it on.
* Modify index.html to change which point cloud should be loaded by default.
* You can also drag&drop cloud.js files into the window to add point clouds to the scene.
* This desktop version is in a prototype state and as such it may be a bit awkward to use at times. 
In order to reset the viewer, you'll have to click "window->reload".

# LICENSE

* BSD 2-clause license. (free to use, preservation of copyright notice/attribute when redistributing)

# Getting Started

* Install [Node.js](https://nodejs.org/en/)
* Execute PotreeDesktop.bat
* Drag and Drop a las or laz file to convert and load it.
* Drag and Drop a previously converted point cloud to load it. 
* Drag and Drop a .shp file to load its lines.
* Drag and Drop a .json / .json5 project to restore its volumes.

# Building Potree

The Potree viewer is developed in a separate checkout next to this one:

```
C:\src\potree           <- Potree source, where you edit and build
C:\src\PotreeDesktop    <- this repo
```

`libs/potree` holds Potree's compiled output and is generated, not tracked in git.
`PotreeDesktop.bat` re-copies it from `../potree/build/potree` on every launch, so
whatever you last built in the Potree checkout is what starts up here.

That copy is the *build*, not the source. Keep `npm start` running in `../potree`
so gulp rebuilds on every edit, then just relaunch this app to pick it up.

If `../potree` is missing or has never been built, the launcher warns and starts
with the previous copy rather than failing.

To sync by hand, or from a checkout somewhere else:

```bash
npm run potree:sync
npm run potree:sync -- ../path/to/potree
```

Anything edited directly inside `libs/potree` is overwritten on the next launch.
Change the Potree source instead.

# The labelling UI

The "Selected Annotation" panel - assigning a class and a colour to volumes and to
line measurements - is shared with the Potree repo and lives in exactly one file:

```
../potree/examples/annotation_panel.js
```

Edit it there. `PotreeDesktop.bat` re-copies it to `src/annotation_panel.js` on every
launch, alongside the Potree build, so this app always runs the current version.
`src/annotation_panel.js` is generated and gitignored - editing it is pointless,
because the next launch overwrites it.

That same file also backs `../potree/examples/potree_desktop_index.html`, a browser
preview of this app. With `npm start` running in the Potree checkout it is served at
http://localhost:1234/examples/potree_desktop_index.html, which is a faster way to
work on the labelling UI than restarting Electron.

`index.html` here is the real app shell: drag and drop, the converter, and the
Electron wiring. It is NOT a copy of the preview page and must not be overwritten
with one - only the shared panel travels between them.
