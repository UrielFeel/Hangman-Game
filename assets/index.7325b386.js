(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerpolicy&&(s.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?s.credentials="include":l.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(l){if(l.ep)return;l.ep=!0;const s=t(l);fetch(l.href,s)}})();const i={secretWord:"",discoverdLetters:[],wrongLetters:[],isAlive:void 0,chooseSecretWord:function(o,e){return this.resetWord(),e?this.secretWord=e.toUpperCase():this.secretWord=o[Math.floor(Math.random()*o.length)].toUpperCase(),this.discoverdLetters=Array(this.secretWord.length).fill("_"),console.log(this.discoverdLetters),this.secretWord},resetWord:function(){this.secretWord="",this.discoverdLetters=[],this.wrongLetters=[],this.isAlive=void 0},pickLetter:function(o){if(o=o.toUpperCase(),!!/^[a-zñ]$/i.test(o)){if(this.secretWord.includes(o)){for(let e=0;e<this.secretWord.length;e++)this.secretWord[e]===o&&(this.discoverdLetters[e]=o);console.log(this.discoverdLetters)}else this.wrongLetters.includes(o)||(this.wrongLetters.push(o),console.log(this.wrongLetters));this.secretWord===this.discoverdLetters.join("")?(this.isAlive=!0,console.log("You win!")):this.wrongLetters.length>8&&(this.isAlive="dead",console.log(`You lose, the word was "${this.secretWord}"`))}}};class y{constructor(e){this.gallow=e}draw(e){this.gallow.lineWidth=e,this.gallow.lineJoin="round",this.gallow.lineCap="round",this.gallow.strokeStyle="#474744"}write(e,t,n){this.gallow.font=`bold ${n}px Inter`,this.gallow.lineWidth=e,this.gallow.lineCap="round",this.gallow.lineJoin="round",this.gallow.fillStyle=t}drawSpaces(e){this.draw(6);const t=350/e;for(let n=0;n<e;n++)this.gallow.moveTo(80+t*n,500),this.gallow.lineTo(40+t*n,500);this.gallow.stroke(),this.gallow.closePath()}init(e){this.gallow.clearRect(0,0,410,570),this.draw(8),this.gallow.fillStyle="#d8dbe0",this.gallow.fillRect(0,0,410,570),this.gallow.beginPath(),this.gallow.moveTo(50,390),this.gallow.lineTo(350,390),this.gallow.stroke(),this.gallow.closePath(),this.drawSpaces(e.length)}drawHangman(e){this.draw(8),this.gallow.beginPath(),e===1&&(this.gallow.moveTo(150,390),this.gallow.lineTo(150,70)),e===2&&(this.gallow.moveTo(150,70),this.gallow.lineTo(275,70)),e===3&&(this.gallow.moveTo(275,70),this.gallow.lineTo(275,100)),e===4&&(this.gallow.moveTo(315,140),this.gallow.arc(275,145,40,0,2*Math.PI)),e===5&&(this.gallow.moveTo(275,185),this.gallow.lineTo(275,290)),e===6&&(this.gallow.moveTo(275,205),this.gallow.lineTo(235,215)),e===7&&(this.gallow.moveTo(275,205),this.gallow.lineTo(315,215)),e===8&&(this.gallow.moveTo(275,290),this.gallow.lineTo(235,320)),e===9&&(this.gallow.moveTo(275,290),this.gallow.lineTo(315,320)),this.gallow.stroke(),this.gallow.closePath()}righLetter(e,t){this.write(6,"#0A3871",54);const n=350/e.length;this.gallow.fillText(e[t],40+n*t,480),this.gallow.stroke()}wrongLetter(e,t){this.write(6,"#fa1e21",35),this.gallow.fillText(e,10+35*t,550,30),this.drawHangman(t)}}const c=document.querySelector("main"),f=document.querySelector("#game"),h=document.querySelector("#landing"),g=new y(document.querySelector("#gallow").getContext("2d")),m=["hola","adios","pizza","humanidad","humano","persona","gente","hombre","mujer","bebe","ni\xF1o","ni\xF1a","adolescente","adulto","adulta","anciano","anciana","don","do\xF1a","se\xF1or","se\xF1ora","caballero","dama","individuo"];function w(o){c.contains(h)&&(c.removeChild(h),f.style.display="flex"),g.init(i.chooseSecretWord(m,o)),window.addEventListener("keydown",r),a.close()}document.querySelector("#addWord").onclick=o=>{const e=prompt("Cual es la nueva palabra?");e&&(m.push(e),w(e))};const p=document.querySelector("#play");p.onclick=o=>{w()};const a=document.querySelector("#modal"),u=document.querySelector("#modal-body");document.querySelector(".close").onclick=()=>{i.isAlive===void 0&&window.addEventListener("keydown",r),a.close()};document.querySelector("#salir").onclick=()=>{confirm("seguro que quiere salir?")&&(c.appendChild(h),window.removeEventListener("keydown",r),f.style.display="none"),a.close(),window.addEventListener("keydown",r)};const v=document.querySelector("#menu");v.onclick=o=>{window.removeEventListener("keydown",r),u.innerHTML="<h2>Menu</h2>",a.showModal()};function L(){u.innerHTML='<img src="/trophy.png" class="modal-img" alt=""><h2>Felicidades Ganaste!</h2>',a.showModal(),window.removeEventListener("keydown",r)}function k(){u.innerHTML=`<img src="/hangman.png" class="modal-img" alt=""><h2>Game Over!</h2><p>La palabra era: "${i.secretWord}"</p>`,a.showModal(),window.removeEventListener("keydown",r)}document.querySelector("#newGame").onclick=()=>{confirm("Seguro que quiere iniciar un nuevo juego?")&&w(),a.close(),window.addEventListener("keydown",r)};const r=o=>{const e=o.key.toUpperCase();if(!(!/^[a-zñ]$/i.test(e)||i.wrongLetters.includes(e)||i.discoverdLetters.includes(e))){if(i.pickLetter(e),i.secretWord.includes(e))for(let t=0;t<i.secretWord.length;t++)i.secretWord[t]===e&&g.righLetter(i.secretWord,t);else i.wrongLetters.includes(e)&&i.wrongLetters[i.wrongLetters.length-1]&&g.wrongLetter(e,i.wrongLetters.length);i.isAlive===!0?L():i.isAlive==="dead"&&k()}};document.querySelector("#toggle-check").onclick=o=>{document.body.classList.toggle("dark")};