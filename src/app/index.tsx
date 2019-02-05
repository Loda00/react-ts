import * as React from 'react'
import { render } from 'react-dom'

import App from './components/main/app'

render( React.createElement(App) , document.getElementById('app'))
//NO PUEDO USAR TSX Y QUE A ESTE LO CONTENGA UN JSX O JS
//TODOS PUEDEN SER TSX MIENTRAS EN EL RENDER USE REACT.CREATEELEMENT