# Frontend développement

Voila comment j'ai organisé chaque controller

- controler : manipulations des donnée 
- service : fonctions qui font des requêtes en base de donnée

<br>
Voici un exemple :

J'ai séparé les fonctions fetch et les fonctions du controller qui manipule les données du front

1. Je récupère les données des inputs
2. J'utilise ma fonction du controller qui envoie les données des inputs dans la fonction qui s'occupe de faire la requête vers le back 
3. Je récupère la réponse du fetch dans le controller

cette organisation me permet de bien structurer mon code et de le rendre lisible.
J'ai utilisé cette ogranisation dans tout mes controller.

Exemple :
<div id="" align="center">
  <img src="./public/readme/controllerA.png" alt="Morning logo" width="100%" />
</div>


<div id="" align="center">
  <img src="./public/readme/serviceA.png" alt="Morning logo" width="100%" />
</div>