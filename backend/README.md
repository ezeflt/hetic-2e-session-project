<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
# Backend développement

Voila comment j'ai organisé chaque controller

- controler : manipulations des donnée 
- service : fonctions qui font des requetes en base de donnée
- Dto : verification des données récuperé

Voici un exemple :

1. J'utilise un route post qui récupère des données du body
ces données sont vérifié par le dto pour voir si elles sont valide
2. J'envoie ces données dans ma function qui excutera une requete en base de donnée
3. Je récupère la réponse de la function
4. je renvoie une réponse avec un message qui montre si la route fonctionnée ou échoué 


## 1/4 Controller
<div id="" align="center">
  <img src="../frontend/public/readme/controller.png" alt="Morning logo" width="100%" />
</div>
## 2/4 DTO (data transfere object)
<div id="" align="center">
  <img src="../frontend/public/readme/dto.png" alt="Morning logo" width="100%" />
</div>
## 3/4 Service fonction 
<div id="" align="center">
  <img src="../frontend/public/readme/service.png" alt="Morning logo" width="100%" />
</div>
## 4/4 renvoie la réponse de la route 
<div id="" align="center">
  <img src="../frontend/public/readme/return.png" alt="Morning logo" width="100%" />
</div>

J'ai utilisé chacune de mes routes de cette manière la.