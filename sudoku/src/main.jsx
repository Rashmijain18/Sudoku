import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sudoku from './SudoKu.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sudoku />
  </StrictMode>,
)
