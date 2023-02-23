### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Custom Events Js

EventEmitter
2 pilares => Events e Listeners
Emissão de eventos para os listeners ouvirem
com a api do CustomEventos nativa do js

- Por que criar nosso próprio eventManager?
  - Compatibilidade com os navegadores e dispositivos;
  - Se não tiver acoplado a DOM não faz sentido usar o document;

# Acessibilidade

- tabIndex -> é como o z-index da tela;
- role -> pra tornar uma coisa trigavel pro leitor de tela

O timeOut retorna o id para ser usado no clearTimeOut

# States

StateLifting -> Levar o estado de um filho para o pai (invés de usar os estados no filho, usar no pai);
Derived state -> um estado que inicia seu valor a partir de uma propriedade;
Declarativo -> como deve se comportar
Imperativo -> a gente diz como algo vai acontecer

A propriedade key monta e desmonta o componente da tela a cada vez que o key for alterado

-> Sempre que tiver uma operação critica na interface use uma opção de confirmação;

## Porque é mais complicado animar saida de componentes

Tecnicamente quando fechamos o componente não tem mais nada para animar.
