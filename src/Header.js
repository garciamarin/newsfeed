import './Header.css'
import Logo from './media/Logo.jpeg'



export default function Header() {
    return (
        <header >
            <img className='logo' src={Logo} alt="Logo" />
            <h1 className='title'>The Infallible Canine</h1>
            <ul className='navbar'>
            <li className="navitem">Li 1</li>
            <li className="navitem">Li 2</li>
            <li className="navitem">Li 3</li>
            </ul>
        </header>
        
    )
}
