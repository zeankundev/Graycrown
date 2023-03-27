![graycrown logo](https://zeankundev.github.io/graycrown/assets/svg/logo.svg)
# Graycrown
<div style="text-align: center;">
<a href="https://www.producthunt.com/posts/graycrown?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-graycrown" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=363490&theme=dark" alt="Graycrown - Simple&#0044;&#0032;easy&#0032;and&#0032;fun&#0032;game&#0032;launcher&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</div>
A simple game launcher for games on Windows, Linux

# Why the old Coal repository?
After AB Studios has issued cease and desist letter to me, I have no choice but to rebrand it. With the old code written from scratch, Graycrown is now the base of AB Coal's source code such as game launching.

Yes, it's the old Coal I made, but with a different name

# Dang, how to run this shiny branded launcher?
**EDIT PER 28/03/23:** You can run Graycrown and debug it with KDevelop. [Click here to learn how.](https://github.com/zeankundev/graycrown/wiki/Running-or-contributing-to-Graycrown-with-KDevelop)

Easy, just have Node.js installed and npm.
Then run these commands
```
npm i
```
```
npm start
```
Self-build the binaries? No problem! Run the `build` command instead!
```
npm run build
```
# pls fix!
- Player window had issues with minimizing, maximizing and closing the player window [SOLVED]
- Fix on duplicating status for multiple batch downloads
- (BUG ON GNOME) Restored down window makes the button image as restored down instead of maximize
- `spawn wine ENOENT` error known of using snap version of Graycrown (tested with machine that has wine)
- Someone plagiarized our brand (cease and desist sent) [SOLVED]

# [Join the discussion on Discord. Click the heading to continue!](https://discord.gg/3ujWSgkawv)
